const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const DBConnection = require("./config");

require("./config");

require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "your_jwt_secret_key"; // Replace with a secure key

//connect mongo
DBConnection();

const port = 5000 || process.env.PORT;

const ProductData = new require("./ProductAdd");
const authData = new require("./Auth");
const orderData = new require('./Order');

// Product CRUD

app.get("/" , async(req ,res)=>{
  res.send("Welcome to the Farmer's E-commerce Server!"); 
})


app.get("/userData", async (req, res) => {
  // console.log("Product Get");

  try {
    let result = await authData.find();

    res.send(result);
  } catch (error) {
    res.status(200).json({ error: true });
  }
});
app.get("/product", async (req, res) => {
  // console.log("Product Get");

  try {
    let result = await ProductData.find();

    res.send(result);
  } catch (error) {
    res.status(200).json({ error: true });
  }
});

app.get("/product/:id", async (req, res) => {
  const productId = req.params.id; 

  try {
    let result = await ProductData.findById(productId);

    if (!result) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.send(result);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});


app.post("/addproduct", async (req, res) => {
  // console.log("Add Product");

  console.log(req.body);

  try {
    let {
      image,
      pname,
      productperunit,
      currency,
      unit,
      qty,
      mobileno,
      adminemail,
      description,
    } = req.body;
    let result = new ProductData({
      image,
      pname,
      productperunit,
      currency,
      unit,
      qty,
      mobileno,
      adminemail,
      description,
    });

    await result.save();
    res.status(200).send("Data Saved");
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: true, message: "Failed to save product." });
  }
});

app.put("/editproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      pname,
      productperunit,
      currency,
      unit,
      qty,
      mobileno,
      email,
      description,
    } = req.body;

    let product = await ProductData.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ error: true, message: "Product not found" });
    }

    await ProductData.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          image: image,
          pname: pname,
          productperunit: productperunit,
          currency: currency,
          unit: unit,
          qty: qty,
          mobileno: mobileno,
          email: email,
          description: description,
        },
      }
    );

    res.status(200).json(product); // Return the updated product
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: true });
  }
});

app.delete("/deleteproduct/:id", async (req, res) => {
  // console.log("Delete Product");
  try {
    const { id } = req.params;

    const deletedProduct = await ProductData.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ error: true, message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: true });
  }
});

// Login and Register CRUD

app.post("/addUserData", async (req, res) => {
  // console.log("Add UserData");
  console.log(req.body);

  try {
    let {
      username,
      mobileno,
      email,
      password,
      city,
      pincode,
      district,
      state,
    } = req.body;
    let result = new authData({
      username,
      mobileno,
      email,
      password,
      city,
      pincode,
      district,
      state,
    });

    await result.save();
    res.status(200).send("Data Saved");
  } catch (error) {
    console.error("Error saving UserData:", error);
    res.status(500).json({ error: true, message: "Failed to save UserData." });
  }
});

//login user

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authData.findOne({ email });

    if (user && user.password === password) {
      res.status(200).json({ message: "Login successful" , id:user._id,username : user.username, mobileno : user.mobileno });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
});

//User Data Find For Profile Page

app.get("/userdata/:email", async (req, res) => {
  // console.log("Get UserData by Email");

  try {
    const { email } = req.params;
    const user = await authData.findOne({ email }); // Use findOne to find the user by email

    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    res.status(200).json(user); // Return user data if found
  } catch (error) {
    console.error("Error fetching user data:", error);
    res
      .status(500)
      .json({ error: true, message: "Failed to fetch user data." });
  }
});

app.put("/userdata/:email", async (req, res) => {
  const { email } = req.params;
  const updatedData = req.body;

  try {
    const user = await authData.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    Object.keys(updatedData).forEach((key) => {
      user[key] = updatedData[key];
    });

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating user data:", error);
    res
      .status(500)
      .json({ error: true, message: "Failed to update user profile." });
  }
});

//Order Data

app.post("/order", async (req, res) => {
  // Log the incoming request body for debugging
  console.log(req.body);

  try {
    let {
      image,
      pname,
      productperunit,
      currency,
      unit,
      qty,
      mobileno,
      adminmobileno,
      clientemail,
      adminemail,
      userID,
      totalprice,  // Corrected field name
      status,
      orderDate,
      bid1,
      bid2,
    } = req.body;

    // Creating a new order object using the schema
    let result = new orderData({
      image,
      pname,
      productperunit,
      currency,
      unit,
      qty,
      mobileno,
      adminmobileno,
      clientemail,
      adminemail,
      userID,
      totalprice,  // Corrected field name
      status,
      orderDate,
      bid1,
      bid2,
    });

    // Save the new order to the database
    await result.save();

    // Sending a success response
    res.status(200).send("Data Saved");
  } catch (error) {
    // Log and send the error response
    console.error("Error saving product:", error);
    res.status(500).json({ error: true, message: "Failed to save product." });
  }
});

app.get("/orders/:clientemail", async (req, res) => {
  console.log(req.params.clientemail);
  try {
    const { clientemail } = req.params;

    // console.log

    console.log("Try catch email", clientemail);
    const order = await orderData.find({clientemail: clientemail });
    // const order = await orderData.findOne();

    console.log(order);
    if (!order) {
      return res.status(404).json({ error: true, message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).json({ error: true, message: "Failed to fetch order data." });
  }
});

app.delete("/orderDelete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the order by ID
    const order = await orderData.findById(id);

    console.log(order);
    if (!order) {
      return res.status(404).json({ error: true, message: "Order not found" });
    }

    // Find the related product in productData using pname (product name)
    const product = await ProductData.findOne({ pname: order.pname });
    if (!product) {
      return res.status(404).json({ error: true, message: "Product not found" });
    }

    // Update the product's quantity by adding the deleted order quantity back
    product.qty = (parseInt(product.qty) + parseInt(order.qty)).toString(); // convert to integer and add
    await product.save(); // save the updated product

    // Delete the order from the orderData collection
    const deletedOrder = await orderData.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: true, message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted and product quantity updated successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: true, message: "Server error" });
  }
});


app.get("/AdminOrders/:adminemail", async (req, res) => {
  console.log(req.params.adminemail);
  try {
    const { adminemail } = req.params;

    // console.log

    console.log("Try catch email", adminemail);
    const order = await orderData.find({adminemail: adminemail });
    // const order = await orderData.findOne();

    console.log(order);
    if (!order) {
      return res.status(404).json({ error: true, message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).json({ error: true, message: "Failed to fetch order data." });
  }
});

app.get("/products/:adminemail", async (req, res) => {
  console.log("Admin email from params:", req.params.adminemail);
  try {
    const { adminemail } = req.params;

    const products = await ProductData.find({ adminemail: adminemail });

    if (!products || products.length === 0) {
      return res.status(404).json({ error: true, message: "No products found for this admin." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: true, message: "Failed to fetch products." });
  }
});

app.put("/UpdateOrderStatus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      status
    } = req.body;

    let order = await orderData.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ error: true, message: "order not found" });
    }

    await orderData.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          status
        },
      }
    );

    res.status(200).json(order); // Return the updated order
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: true });
  }
});

app.listen(port, () => {
  console.log(`Database is running on ${port}`);
});
