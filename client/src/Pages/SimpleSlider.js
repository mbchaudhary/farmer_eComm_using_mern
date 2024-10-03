import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,  // Better control over scrolling
    centerMode: true,   // Allows for spacing between slides
    centerPadding: "20px", // Adds space between slides
    responsive: [
      {
        breakpoint: 768, // Mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const apiURL = "http://localhost:5000/product";
  const [data, setData] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetch(apiURL)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container mt-5">
      <Slider {...settings}>
        {data.map((product, index) => (
          <div key={index} style={{ padding: "0 10px" }}> {/* Add padding for space between images */}
            <img
              src={product.image || "https://via.placeholder.com/400"} // Fallback image
              alt={product.pname}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
