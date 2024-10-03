import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap"; // Import Bootstrap components

export default function AdminHome() {
  const email = localStorage.getItem('useremail');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [searchTerm, setSearchTerm] = useState(""); // Add search term state
  const nav = useNavigate();

  useEffect(() => {
    if (email) {
      fetch(`https://farmer-backend-y5qj.onrender.com/products/${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setData(data);
          } else {
            console.error("Unexpected data format:", data);
          }
          setLoading(false); // Set loading to false after fetching the data
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
          setLoading(false); // Set loading to false even if there is an error
        });
    }
  }, [email]);

  // Filter products based on search term
  const filteredProducts = data.filter((product) =>
    product.pname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle product deletion
  const handleDelete = (id) => {
    fetch(`https://farmer-backend-y5qj.onrender.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        // Remove the deleted product from the state
        setData((prevData) => prevData.filter((product) => product._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
      });
  };

  // Function to handle product edit
  const handleEdit = (id) => {
    nav(`/edit_product/${id}`); // Navigate to the edit product page with product id
  };

  // Product Cards
  const ProductCards = filteredProducts.map((product, index) => (
    <div className="col-lg-4 col-md-6 d-flex justify-content-center mb-5" key={index}>
      <div
        className="card shadow-lg border-light rounded-lg"
        style={{ width: "18rem", transition: "transform 0.3s", overflow: "hidden" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <img
          src={product.image || "https://via.placeholder.com/200"} // Fallback for missing image
          className="card-img-top"
          alt={product.pname || "Product"} // Fallback for missing product name
          style={{ height: "200px", objectFit: "cover", borderRadius: "10px 10px 0 0" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title font-weight-bold text-dark">
            {product.pname || "Product Name"} {/* Fallback for missing name */}
          </h5>
          <h6 className="text-muted">
            {product.productperunit || "N/A"}₹ / {product.unit || "unit"} {/* Fallbacks for missing price/unit */}
          </h6>
          <p className="card-text text-justify text-muted">
            {product.description
              ? product.description.length >= 80
                ? product.description.substring(0, 81) + " see more..."
                : product.description
              : "No description available."} {/* Fallback for missing description */}
          </p>
          
          {/* Buttons section with proper spacing */}
          <div className="d-flex justify-content-between">
            <button
              className="btn primaryBGColor btn-block mx-2"
              onClick={() => handleEdit(product._id)} // Edit product on click
            >
              Edit
            </button>

            <button
              className="btn btn-danger btn-block mx-2"
              onClick={() => handleDelete(product._id)} // Delete product on click
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      {/* Header */}
      <header className="text-center mb-4">
        <h1 className="font-weight-bold">Admin Products</h1>
        <p className="text-muted">Manage your products below.</p>
      </header>

      {/* Search Bar */}
      <Row className="mb-4">
        <Col lg={6} md={8} className="mx-auto">
          <InputGroup className="shadow-sm rounded-pill">
            <Form.Control
              type="text"
              placeholder="Search product by name..."
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              value={searchTerm}
              className="rounded-pill"
            />
            <Button
              variant="outline-secondary"
              className="rounded-pill"
              onClick={() => setSearchTerm("")} // Clear search term
            >
              Clear
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* Product Cards Section */}
      <div className="row justify-content-center mt-4">
        {loading ? ( // Show loader while data is being fetched
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : filteredProducts.length > 0 ? ( // Display filtered products
          ProductCards
        ) : (
          <div className="text-center">
            <h5>No products found.</h5>
          </div>
        )}
      </div>
    </div>
  );
}
