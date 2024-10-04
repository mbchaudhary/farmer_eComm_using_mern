import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap"; // Bootstrap components for layout

export default function Services() {
  // Static array of services with specific images and external links
  const servicesData = [
    {
      id: 1,
      name: "Tractor Rental",
      description: "Affordable and reliable tractor rental for your farming needs.",
      image: "https://content.jdmagicbox.com/comp/def_content/tractor-dealers/shutterstock-1405724069-tractor-dealers-5-jqpmb.jpg?fit=around%7C350:350&crop=350:350;*,*",
      link: "https://www.rentkart.com/sub-category/tractors#:~:text=Rentkart%20is%20India's%20foremost%20tractor%20and%20farm%20equipment%20rental%20service.,-Different%20types%20of", // External link for Tractor Rental
    },
    {
      id: 2,
      name: "Irrigation Systems",
      description: "Efficient irrigation systems for sustainable farming.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmwBTnj_94rdrrnV1epq2dujJ_gZFok1utNg&s",
      link: "https://www.jains.com/", // External link for Irrigation Systems
    },
    {
      id: 3,
      name: "Crop Consultation",
      description: "Get expert advice on improving crop yield and health.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvqnTrrN3351UCC8MWEDMzP5FeQmj3CNyNSA&s",
      link: "https://www.cropquest.com/crop-consulting-services/", // External link for Crop Consultation
    },
    {
      id: 4,
      name: "Soil Testing",
      description: "Comprehensive soil analysis to optimize your farming results.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNAnyHhtwtxuj7Ctolym0Grz3qBUphwEGAtw&s",
      link: "https://soilhealth.dac.gov.in/home", // External link for Soil Testing
    },
    {
      id: 5,
      name: "Fertilizer Supply",
      description: "Quality fertilizers to enhance soil productivity.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGir7LLsPEC5tSSko6zayU-CbUA6dkgfiE9A&s",
      link: "https://fertiliserindia.com/", // External link for Fertilizer Supply
    },
    {
      id: 6,
      name: "Pest Control Services",
      description: "Eco-friendly pest control solutions to protect your crops.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRvXnljzh12ekZjITyzhf-wTiTp_uaph6qmw&s",
      link: "https://www.rentokil-pestcontrolindia.com/", // External link for Pest Control Services
    },
  ];
  

  // Service Cards
  const ServiceCards = servicesData.map((service, index) => (
    <Col lg={4} md={6} className="d-flex justify-content-center mb-5" key={index}>
      <div
        className="card shadow-lg border-0 rounded-lg"
        style={{
          width: "20rem",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.1)";
        }}
      >
        <img
          src={service.image}
          className="card-img-top"
          alt={service.name}
          style={{
            height: "220px",
            objectFit: "cover",
            borderTopLeftRadius: "0.25rem",
            borderTopRightRadius: "0.25rem",
          }}
        />
        <div className="card-body text-center">
          <h5 className="card-title font-weight-bold text-dark">
            {service.name}
          </h5>
          <p className="card-text text-muted">{service.description}</p>
          <Button
            variant="success"
            className="btn-block mt-3"
            onClick={() => window.open(service.link, "_blank")} // Open external website in a new tab
          >
            Learn More
          </Button>
        </div>
      </div>
    </Col>
  ));

  return (
    <Container>
      {/* Service Cards Section */}
      <Row className="justify-content-center mt-4">
        {ServiceCards}
      </Row>
    </Container>
  );
}
