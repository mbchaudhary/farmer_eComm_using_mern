import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const nav = useNavigate();
  const localname = localStorage.getItem("userName");
  const localRole = localStorage.getItem("userRole");
  console.log("LocalStorage Name: ", localname);
  console.log("LocalStorage Name: ", localRole);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          Farmer
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {localRole === "Buyer Side" ? (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Services">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <span className="me-3">
                Welcome, <strong>{localname}</strong>
              </span>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => {
                  nav("/");
                  localStorage.removeItem("userName");
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/admin_home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add_product">
                  Add Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin_order">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <span className="me-3">
                Welcome, <strong>{localname}</strong>
              </span>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => {
                  nav("/");
                  localStorage.removeItem("userName");
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
