import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Profile() {
  const nav = useNavigate();
  const [data, setData] = useState({
    username: "",
    mobileno: "",
    email: "",
    city: "",
    pincode: "",
    district: "",
    state: "",
  });

  const [isEditing, setIsEditing] = useState(false); 
  const localData = localStorage.getItem("useremail");

  useEffect(() => {
    if (localData) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`https://farmer-backend-api.onrender.com/userdata/${localData}`);
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [localData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://farmer-backend-api.onrender.com/userdata/${localData}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Updated!", "Your profile has been updated.", "success");
        }
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col text-center">
          <h1 className="display-4 text-primary">Your Profile</h1>
          <p className="text-muted">View or update your profile information below.</p>
        </div>
      </div>

      <div className="card shadow-lg p-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  className="form-control shadow-sm"
                  type="text"
                  value={data.username}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label htmlFor="mobileno" className="form-label">
                  Mobile No
                </label>
                <input
                  id="mobileno"
                  name="mobileno"
                  className="form-control shadow-sm"
                  type="text"
                  value={data.mobileno}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  className="form-control shadow-sm"
                  type="email"
                  value={data.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  className="form-control shadow-sm"
                  type="text"
                  value={data.city}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label htmlFor="pincode" className="form-label">
                  Pincode
                </label>
                <input
                  id="pincode"
                  name="pincode"
                  className="form-control shadow-sm"
                  type="text"
                  value={data.pincode}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label htmlFor="district" className="form-label">
                  District
                </label>
                <input
                  id="district"
                  name="district"
                  className="form-control shadow-sm"
                  type="text"
                  value={data.district}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  className="form-control shadow-sm"
                  type="text"
                  value={data.state}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
          </div>

          <div className="row mt-4 d-flex justify-content-center">
            {isEditing ? (
              <>
                <div className="col-md-3 text-center mb-2">
                  <button
                    className="btn btn-success w-100 shadow-sm"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                </div>
                <div className="col-md-3 text-center mb-2">
                  <button
                    className="btn btn-secondary w-100 shadow-sm"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="col-md-3 text-center mb-2">
                <button
                  className="btn primaryBGColor w-100 shadow-sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            )}

            <div className="col-md-3 text-center">
              <button
                className="btn btn-warning w-100 shadow-sm"
                onClick={() => {
                  nav("/switchrole");
                }}
              >
                Switch Role
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
