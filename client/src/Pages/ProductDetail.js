import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const nav = useNavigate();
  const param = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [bidPrice1, setBidPrice1] = useState();
  const [bidPrice2, setBidPrice2] = useState();

  const isStatus = "Pending";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("https://farmer-backend-api.onrender.com/product/" + param.id);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [param]);

  const userEmail = localStorage.getItem("useremail");
  const usermobileno = localStorage.getItem("mobileno");
  const adminEmail = localStorage.getItem("adminEmail");
  const userID = localStorage.getItem("userID");
  const adminmobile = localStorage.getItem("adminmobileno");

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value) || 0;
    setQuantity(qty);
    setTotalPrice(qty * (product?.productperunit || 0));
  };

  const handleBidPrice1Change = (e) => {
    const bid1 = parseFloat(e.target.value) || 0;
    setBidPrice1(bid1);
  };

  const handleBidPrice2Change = (e) => {
    const bid2 = parseFloat(e.target.value) || 0;
    setBidPrice2(bid2);
  };

  if (loading) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  // const handleButton = async () => {
  //   // Check if the quantity is valid
  //   if (quantity > product.qty) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Enter Valid Stock",
  //     });
  //     return;
  //   }
  
  //   // Get the current date and format it as DD/MM/YYYY
  //   const orderDate = new Date();
  //   const formattedOrderDate = `${orderDate.getDate().toString().padStart(2, '0')}/${(orderDate.getMonth() + 1).toString().padStart(2, '0')}/${orderDate.getFullYear()}`;
  
  //   const orderData = {
  //     image: product.image,
  //     pname: product.pname,
  //     productperunit: product.productperunit,
  //     currency: product.currency,
  //     unit: product.unit,
  //     qty: quantity,
  //     mobileno: usermobileno,
  //     adminmobileno: adminmobile,
  //     clientemail: userEmail,
  //     adminemail: adminEmail,
  //     userID: userID,
  //     totalprice: totalPrice,
  //     orderDate: formattedOrderDate, // Use formatted date here
  //     bid1: bidPrice1,
  //     bid2: bidPrice2,
  //     status: isStatus,
  //   };
  
  //   try {
  //     const response = await fetch("https://farmer-backend-api.onrender.com/order", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(orderData),
  //     });
  
  //     if (response.ok) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Order placed successfully!",
  //         text: "Your order has been submitted.",
  //       }).then(() => {
  //         nav('/home'); // Navigate to home after success
  //       });
  //     } else {
  //       throw new Error("Failed to place order");
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "There was a problem placing your order. Please try again.",
  //     });
  //     console.error("Error placing order:", error);
  //   }
  // };
  
  const handleButton = async () => {
    // Check if the quantity is valid
    if (quantity > product.qty) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter Valid Stock",
      });
      return;
    }
  
    // Get the current date and format it as DD/MM/YYYY
    const orderDate = new Date();
    const formattedOrderDate = `${orderDate.getDate().toString().padStart(2, '0')}/${(orderDate.getMonth() + 1).toString().padStart(2, '0')}/${orderDate.getFullYear()}`;
  
    const orderData = {
      image:product.image,
      pname: product.pname,
      productperunit: product.productperunit,
      currency: product.currency,
      unit: product.unit,
      qty: quantity,
      mobileno: usermobileno,
      adminmobileno: adminmobile,
      adminemail: adminEmail,
      clientemail: userEmail,
      userID: userID,
      totalprice: totalPrice,
      orderDate: formattedOrderDate, // Use formatted date here
      bid1: bidPrice1,
      bid2: bidPrice2,
      status: isStatus,
    };
  
    // Update product quantity
    const updatedProductData = {
      qty: product.qty - quantity, // Decrease the quantity by the ordered amount
    };
  
    try {
      // Send the order data
      const orderResponse = await fetch("https://farmer-backend-api.onrender.com/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      // If order is placed successfully, update the product quantity
      if (orderResponse.ok) {
        const updateResponse = await fetch(`https://farmer-backend-api.onrender.com/editproduct/${product._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProductData),
        });
  
        if (updateResponse.ok) {
          Swal.fire({
            icon: "success",
            title: "Order placed successfully!",
            text: "Your order has been submitted.",
          }).then(() => {
            nav('/home'); // Navigate to home after success
          });
        } else {
          throw new Error("Failed to update product quantity");
        }
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was a problem placing your order. Please try again.",
      });
      console.error("Error placing order:", error);
    }
  };
  

  return (
    <div className="container mt-4">
      {/* Product Title Section */}
      <div className="row mb-3">
        <div className="col text-center">
          <h1 className="display-5 fw-bold text-primary">{product.pname}</h1>
          <hr className="my-2" />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="row gy-4">
        {/* Product Image */}
        <div className="col-12 col-md-6">
          <div className="card border-0 shadow-sm">
            <img
              src={product.image || "https://via.placeholder.com/400"}
              alt={product.name}
              className="card-img-top img-fluid rounded"
              style={{
                objectFit: "cover",
                height: "400px", // Set consistent height
                width: "100%", // Set width to fill the container
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-12 col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-dark mb-3">Product Information</h2>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Price:</strong>
                  <span>
                    {product.productperunit} ₹ / {product.unit}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Quantity Available:</strong>
                  <span>{product.qty}</span>
                </li>
              </ul>
              <h5 className="card-title mb-3">Description</h5>
              <p className="card-text">{product.description}</p>

              {/* Quantity Input Field */}
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  aria-label="Quantity"
                  placeholder="Enter Quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max={product.qty}
                />
              </div>

              {/* Total Price Display */}
              <div className="input-group mb-3">
                <span className="input-group-text">Total Price</span>
                <input
                  type="text"
                  className="form-control"
                  value={totalPrice}
                  readOnly
                />
                <span className="input-group-text">₹</span>
              </div>

              {/* Bid Price Inputs */}
              <div className="mb-4">
                <label className="form-label fw-bold">Bid Range</label>
                <div className="row">
                  <div className="col-12 col-md-6 mb-2">
                    <div className="input-group">
                      <span className="input-group-text">Bid Price 1</span>
                      <input
                        type="number"
                        className="form-control"
                        aria-label="Bid Price 1"
                        placeholder="Enter Bid Price 1"
                        value={bidPrice1}
                        onChange={handleBidPrice1Change}
                        min="0"
                      />
                      <span className="input-group-text">₹</span>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-2">
                    <div className="input-group">
                      <span className="input-group-text">Bid Price 2</span>
                      <input
                        type="number"
                        className="form-control"
                        aria-label="Bid Price 2"
                        placeholder="Enter Bid Price 2"
                        value={bidPrice2}
                        onChange={handleBidPrice2Change}
                        min="0"
                      />
                      <span className="input-group-text">₹</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Button */}
              <div className="text-center">
                <button
                  className="btn primaryBGColor btn-lg"
                  type="button"
                  onClick={handleButton}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Product Features */}
      <div className="row mt-5">
        <div className="col text-center">
          <h2 className="text-secondary">Why Choose This Product?</h2>
          <p className="lead">
            Here you can list additional features or reasons why this product is
            special.
          </p>
        </div>
      </div>
    </div>
  );
}
