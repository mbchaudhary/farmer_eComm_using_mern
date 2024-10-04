import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AdminOrder() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading feedback
  const useremail = localStorage.getItem("useremail");

  // Fetch the admin's orders when the component loads
  useEffect(() => {
    if (useremail) {
      fetch(`http://localhost:5000/adminorder/${useremail}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setProducts(data);
          } else {
            console.error("Unexpected data format:", data);
          }
        })
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [useremail]);

  // Function to delete an order
  // const handleDelete = async (id) => {
  //   const confirmDelete = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   });

  //   if (confirmDelete.isConfirmed) {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:5000/orderDelete/${id}`,
  //         {
  //           method: "DELETE",
  //         }
  //       );
  //       const result = await response.json();

  //       if (response.ok) {
  //         setProducts(products.filter((product) => product._id !== id));
  //         Swal.fire({
  //           title: "Deleted!",
  //           text: "Your order has been deleted.",
  //           icon: "success",
  //         });
  //       } else {
  //         Swal.fire({
  //           title: "Error!",
  //           text: result.message,
  //           icon: "error",
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error deleting product:", error);
  //       Swal.fire({
  //         title: "Error!",
  //         text: "There was an error deleting your order.",
  //         icon: "error",
  //       });
  //     }
  //   }
  // };

  // Function to update order status
  const handleStatusChange = async (id, newStatus) => {
    setLoading(true); // Set loading state to true
    try {
      const response = await fetch(
        `http://localhost:5000/updateOrderStatus/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const result = await response.json();

      console.log("Order Status: ", result.status);

      if (response.ok) {
        Swal.fire({
          title: "Status Updated!",
          text: `Order status has been updated to ${newStatus}.`,
          icon: "success",
        });

        // Update the status of the product in the products array
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id ? { ...product, status: newStatus } : product
          )
        );
      } else {
        Swal.fire({
          title: "Error!",
          text: "There was an error updating the order status.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the order status.",
        icon: "error",
      });
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="container">
      <header className="mb-4 text-center">
        <h1 className="font-weight-bold">Order Products</h1>
        <p className="text-muted">Select your favorite products below</p>
      </header>

      <div className="row justify-content-center">
        {products.length === 0 ? (
          <div className="text-center">
            <h5 className="text-muted">No products found for this admin.</h5>
          </div>
        ) : (
          products.map((product) => (
            <div
              className="col-lg-4 col-md-6 d-flex justify-content-center mb-5"
              key={product._id}
            >
              <div
                className="card shadow-lg border-light rounded-lg"
                style={{
                  width: "18rem",
                  transition: "transform 0.3s",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={product.image || "https://via.placeholder.com/200"}
                  className="card-img-top"
                  alt={product.pname}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px 10px 0 0",
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title font-weight-bold text-dark">
                    {product.pname}
                  </h5>
                  <h6 className="text-muted">
                    Order: {product.qty} {product.unit}
                  </h6>
                  <h6 className="text-muted">
                    Price: {product.productperunit}₹ / {product.unit}
                  </h6>
                  <h6 className="text-muted">
                    Bid: {product.bid1}₹ to {product.bid2}₹
                  </h6>
                  <h6 className="text-muted">
                    Order Date: {product.orderDate}
                  </h6>
                  <h6 className="text-muted">--- Order Status ---</h6>
                  <h6
                    style={{
                      color:
                        product.status === "Confirm"
                          ? "green"
                          : product.status === "Pending"
                          ? "blue"
                          : product.status === "Cancel"
                          ? "red"
                          : "black",
                    }}
                  >
                    Status: {product.status}
                  </h6>

                  <h6 className="text-muted">--- Contact Seller ---</h6>
                  {/* Clickable Email */}
                  <h6 className="text-muted">
                    Email:{" "}
                    <a href={`mailto:${product.clientemail}`}>
                      {product.clientemail}
                    </a>
                  </h6>
                  {/* Clickable Phone */}
                  <h6 className="text-muted">
                    Mobile No.:{" "}
                    <a href={`tel:${product.mobileno}`}>
                      {product.mobileno}
                    </a>
                  </h6>

                  <div className="form-group mt-3">
                    <select
                      className="form-control"
                      value={product.status} // Use `value` instead of `defaultValue`
                      onChange={(e) =>
                        handleStatusChange(product._id, e.target.value)
                      }
                      disabled={loading} // Disable while loading
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirm">Confirm</option>
                      <option value="Cancel">Cancel</option>
                    </select>
                  </div>
                  {/* {product.status !== "Cancle" ? (
                    <button
                      className="btn btn-danger btn-block rounded-pill mt-3"
                      onClick={() => handleDelete(product._id)}
                      disabled={loading} // Disable button while loading
                    >
                      Cancel Order
                    </button>
                  ) : (
                    <span></span>
                  )} */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {loading && (
        <div className="text-center mt-3">
          <p className="text-muted">Processing...</p>
        </div>
      )}
    </div>
  );
}
