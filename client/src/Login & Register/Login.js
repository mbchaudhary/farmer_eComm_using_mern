import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../App.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const nav = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        localStorage.setItem("useremail", formData.email);
        localStorage.setItem("userName", result.username);
        localStorage.setItem("mobileno", result.mobileno);
        localStorage.setItem("userID", result.id);

        nav("/switchrole");
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Swal.fire("Error", "An error occurred. Please try again.", "error");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: "url('Assets/LoginBG.png')", // Replace with your image path
        backgroundSize: "cover", 
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh", // Ensures it covers the full screen height
        width: "100%", // Ensures it covers the full width
      }}
    >
      <div
        className="card shadow-lg p-4 rounded"
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.6)", // Transparent white background
          backdropFilter: "blur(10px)", // Adds a blur effect for a frosted glass appearance
        }}
      >
        <h3 className="text-center text-primary mb-4">Login</h3>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
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
            <div className="invalid-feedback">Please enter a valid email.</div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
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
            <div className="invalid-feedback">Please enter your password.</div>
          </div>

          <div className="d-flex justify-content-between mb-4">
            <Link to="/register" className="text-decoration-none text-primary">
              Create New User
            </Link>
            <Link to="#" className="text-decoration-none text-primary">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn primaryBGColor btn-block w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
