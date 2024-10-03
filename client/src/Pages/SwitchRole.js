import React from "react";
import { useNavigate } from "react-router-dom";

export default function SwitchRole() {
  const nav = useNavigate();
  const str1 = "Buyer Side";
  const str2 = "Farmer Side";

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light"
      style={{
        backgroundImage: "url('Assets/BackGroundImage.png')", // Replace with your general background image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="row justify-content-center">
        {/* Farmer Side Card */}
        <div className="col-12 col-md-5 mb-4">
          <div
            className="card shadow-lg border-0 text-light h-100"
            style={{
              backgroundImage: "url('Assets/FarmerSideImage.png')", // Farmer-related image
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="card-body text-center d-flex flex-column justify-content-between bg-success bg-opacity-75">
              <h5 className="card-title display-6 fw-bold">Farmer Side</h5>
              <p className="card-text lead mb-4">
                Connect with buyers, list your products, and manage your sales
                easily. Access tools that help you maximize your farm's
                potential.
              </p>
              <button
                className="btn btn-light rounded-pill shadow-sm mt-3"
                onClick={() => {
                  localStorage.setItem("userRole", str2);
                  nav("/admin_home");
                }}
              >
                Switch to Farmer
              </button>
            </div>
          </div>
        </div>

        {/* Buyer Side Card */}
        <div className="col-12 col-md-5 mb-4">
          <div
            className="card shadow-lg border-0 text-light h-100"
            style={{
              backgroundImage: "url('Assets/BuyerSideImage.png')", // Buyer-related image
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="card-body text-center d-flex flex-column justify-content-between bg-info bg-opacity-75">
              <h5 className="card-title display-6 fw-bold">Buyer Side</h5>
              <p className="card-text lead mb-4">
                Browse products, compare prices, and make purchases from local
                farmers. Enjoy fresh produce delivered right to your doorstep.
              </p>
              <button
                className="btn btn-light rounded-pill shadow-sm mt-3"
                onClick={() => {
                  localStorage.setItem("userRole", str1);
                  nav("/home");
                }}
              >
                Switch to Buyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
