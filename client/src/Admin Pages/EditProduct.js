import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function EditProduct() {
  const { id } = useParams(); // Get the product id from the URL

  const unitOptions = {
    INR: ["Kilogram", "Gram", "Liter", "Milliliter"],
    USD: ["Pound", "Ounce", "Gallon", "Quart"],
    EUR: ["Kilogram", "Gram", "Liter", "Milliliter"],
  };

  const [formData, setFormData] = useState({
    image: "",
    pname: "",
    productperunit: "",
    currency: "",
    unit: "",
    qty: "",
    mobileno: "",
    adminemail: "",
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Track if the form is in edit mode
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if the form is submitting
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details to prefill the form
    fetch(`https://farmer-backend-api.onrender.com/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data); // Prefill the form with product data
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch(`https://farmer-backend-api.onrender.com/editproduct/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been Updated",
            showConfirmButton: false,
            timer: 1500
          });
        navigate("/admin_home");
      } else {
        console.error("Update failed:", data); // Log the error response for debugging
        alert("Failed to update the product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col text-center">
          <h2 className="display-5 text-primary">Edit Product</h2>
        </div>
      </div>

      <div className="card shadow-lg p-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Image URL */}
            <div className="col-md-6 mb-3">
              <label htmlFor="image">Image URL</label>
              <input
                type="text"
                className="form-control shadow-sm"
                id="image"
                name="image"
                placeholder="Enter image URL"
                value={formData.image}
                onChange={handleChange}
                // readOnly={!isEditing}
                required
              />
            </div>

            {/* Product Name */}
            <div className="col-md-6 mb-3">
              <label htmlFor="pname">Product Name</label>
              <input
                type="text"
                className="form-control shadow-sm"
                id="pname"
                name="pname"
                placeholder="Enter product name"
                value={formData.pname}
                onChange={handleChange}
                // readOnly={!isEditing}
                required
              />
            </div>
          </div>

          <div className="row">
            {/* Product Price Per Unit */}
            <div className="col-md-6 mb-3">
              <label htmlFor="productperunit">Price Per Unit</label>
              <input
                type="text"
                className="form-control shadow-sm"
                id="productperunit"
                name="productperunit"
                placeholder="Enter price per unit"
                value={formData.productperunit}
                onChange={handleChange}
                // readOnly={!isEditing}
                required
              />
            </div>

            {/* Currency */}

            <div className="col-md-6 mb-3">
              <label htmlFor="currency">Currency</label>
              <select
                className="form-control shadow-sm"
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                // readOnly={!isEditing}
                required
              >
                <option value="">Select Currency</option>
                <option value="INR">INR</option>
                <option value="USD">Dollar</option>
                <option value="EUR">Euro</option>
              </select>
            </div>
          </div>

          <div className="row">
            {/* Unit */}
            <div className="col-md-6 mb-3">
              <label htmlFor="unit">Unit</label>
              <select
                className="form-control shadow-sm"
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                // readOnly={!isEditing}
                required
              >
                <option value="">Select Unit</option>
                {formData.currency &&
                  unitOptions[formData.currency]?.map((unit, index) => (
                    <option key={index} value={unit}>
                      {unit}
                    </option>
                  ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="col-md-6 mb-3">
              <label htmlFor="qty">Quantity</label>
              <input
                type="number"
                className="form-control shadow-sm"
                id="qty"
                name="qty"
                placeholder="Enter quantity"
                value={formData.qty}
                onChange={handleChange}
                // readOnly={!isEditing}
                required
              />
            </div>
          </div>

          <div className="row">
            {/* Mobile Number */}
            <div className="col-md-6 mb-3">
              <label htmlFor="mobileno">Mobile Number</label>
              <input
                type="tel"
                className="form-control shadow-sm"
                id="mobileno"
                name="mobileno"
                placeholder="Enter mobile number"
                value={formData.mobileno}
                onChange={handleChange}
                // readOnly={!isEditing}
                required
              />
            </div>

            {/* Admin Email */}
            <div className="col-md-6 mb-3">
              <label htmlFor="adminemail">Admin Email</label>
              <input
                type="email"
                className="form-control shadow-sm"
                id="adminemail"
                name="adminemail"
                placeholder="Enter admin email"
                value={formData.adminemail}
                onChange={handleChange}
                // readOnly={!isEditing}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-group mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control shadow-sm"
              id="description"
              name="description"
              rows="3"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
            //   readOnly={!isEditing}
              required
            ></textarea>
          </div>

          {/* Submit and Edit Buttons */}
          <div className="row d-flex justify-content-center">
            {isEditing ? (
              <div className="col-md-3 text-center mb-2">
                <button
                  type="submit"
                  className="btn primaryBGColor w-100 shadow-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Product"}
                </button>
              </div>
            ) : (
              <div className="col-md-3 text-center mb-2">
                <button
                  type="button"
                  className="btn btn-secondary w-100 shadow-sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Product
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
