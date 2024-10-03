import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Order() {
  const [products, setProducts] = useState([]);
  const userEmail = localStorage.getItem("useremail");

  useEffect(() => {
    if (userEmail) {
      fetch(`https://farmer-backend-y5qj.onrender.com/orders/${userEmail}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [userEmail]);

  console.log("Email is: ", userEmail);

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(
          `https://farmer-backend-y5qj.onrender.com/orderDelete/${id}`,
          {
            method: "DELETE",
          }
        );
        const result = await response.json();

        if (response.ok) {
          setProducts(products.filter((product) => product._id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Your order has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: result.message, // Notify user of failure
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error deleting your order.",
          icon: "error",
        });
      }
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
            <h5 className="text-muted">No orders found.</h5>
          </div>
        ) : (
          products.map((product) => (
            <div
              className="col-lg-4 col-md-6 d-flex justify-content-center mb-5"
              key={product._id} // Use product ID as the key
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
                  src={product.image || "https://via.placeholder.com/200"} // Placeholder if no image
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
                  <h6 className="text-muted">Email : {product.adminemail}</h6>
                  <h6 className="text-muted">
                    Mobile No. : {product.adminmobileno}
                  </h6>

                  {product.status !== "Confirm" ? (
                    <button
                      className="btn btn-danger btn-block mt-3"
                      onClick={() => handleDelete(product._id)}
                    >
                      Cancel Order
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
