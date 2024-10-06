import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const apiURL = "https://farmer-backend-api.onrender.com/addUserData";

  const [formData, setFormData] = useState({
    username: "",
    mobileno: "",
    email: "",
    password: "",
    city: "",
    pincode: "",
    district: "",
    state: "",
  });

  const nav = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("userData", JSON.stringify(formData));

    fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {

      console.log(formData);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Register",
        showConfirmButton: false,
        timer: 1500,
      });

      nav("/");
    });
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: "url('Assets/LoginBG.png')", // Replace with your background image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(10px)", // Frosted glass effect
        }}
      >
        <h3 className="text-center mb-4">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <div className="form-group mb-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group mb-3">
                <label htmlFor="mobileno">Mobile Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="mobileno"
                  name="mobileno"
                  placeholder="Enter mobile number"
                  value={formData.mobileno}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group mb-3">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group mb-3">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group mb-3">
                <label htmlFor="district">District</label>
                <input
                  type="text"
                  className="form-control"
                  id="district"
                  name="district"
                  placeholder="Enter district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group mb-3">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mb-4">
            <Link to="/" style={{ textDecoration: "none" }}>
              Already Registered
            </Link>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn primaryBGColor btn-block">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
