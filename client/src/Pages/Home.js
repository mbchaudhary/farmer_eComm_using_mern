import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import { useNavigate } from "react-router-dom";
import SimpleSlider from "./SimpleSlider";
import { Form, InputGroup, Button, Container, Row, Col } from "react-bootstrap"; // Bootstrap components for layout

export default function Home() {
  const apiURL = "https://farmer-backend-y5qj.onrender.com/product";
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const nav = useNavigate();
  const userEmail = localStorage.getItem("useremail");

  useEffect(() => {
    fetch(apiURL)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter products based on search term
  const filteredProducts = data.filter((product) =>
    product.pname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Product Cards
  const ProductCards = filteredProducts.map((product, index) => (
    <Col
      lg={4}
      md={6}
      className="d-flex justify-content-center mb-5"
      key={index}
    >
      <div
        className="card shadow-sm border-light rounded-lg"
        style={{
          width: "18rem",
          transition: "transform 0.3s",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <img
          src={product.image}
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
            {product.productperunit}₹ / {product.unit}
          </h6>
          <p className="card-text text-muted">
            {product.description.length >= 80
              ? product.description.substring(0, 81) + " see more..."
              : product.description}
          </p>
          {product.adminemail !== userEmail ? (
            <Button
              variant="primary"
              className="btn-block mt-3"
              onClick={() => {
                localStorage.setItem("adminEmail", product.adminemail);
                localStorage.setItem("adminmobileno", product.mobileno);
                nav("/productdetail/" + product._id);
              }}
            >
              Order Now
            </Button>
          ) : (
            <Button
              disabled={true}
              variant="primary"
              className="btn-block mt-3"
              onClick={() => {
                localStorage.setItem("adminEmail", product.adminemail);
                localStorage.setItem("adminmobileno", product.mobileno);
                nav("/productdetail/" + product._id);
              }}
            >
              Order Now
            </Button>
          )}
        </div>
      </div>
    </Col>
  ));

  return (
    <Container>
      {/* Product Slider */}
      <Row className="mb-5">
        <Col>
          <SimpleSlider />
        </Col>
      </Row>

      {/* Search Bar Section */}
      <Row className="mb-4">
        <Col lg={6} md={8} className="mx-auto">
          <InputGroup className="shadow-sm">
            <Form.Control
              type="text"
              placeholder="Search product by name..."
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              value={searchTerm}
              className="rounded-pill"
              style={{ paddingRight: "40px" }}
            />
            <Button
              variant="outline-secondary"
              className="rounded-pill"
              onClick={() => setSearchTerm("")}
              // style={{ marginLeft: "-0px" }}
            >
              Clear
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* Product Cards Section */}
      <Row className="justify-content-center">
        {filteredProducts.length > 0 ? (
          ProductCards
        ) : (
          <div className="text-center">
            <CircularProgress />
            <p className="mt-3">No products found</p>
          </div>
        )}
      </Row>
    </Container>
  );
}
