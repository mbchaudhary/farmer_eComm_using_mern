import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function AddProduct() {
  const mobileNo = localStorage.getItem('mobileno');
  const emailID = localStorage.getItem('useremail');

  const [formData, setFormData] = useState({
    image: "",
    pname: "",
    productperunit: "",
    currency: "",
    unit: "",
    qty: "",
    mobileno: mobileNo || "", // Set from localStorage or default to empty string
    adminemail: emailID || "", // Set from localStorage or default to empty string
    description: "",
  });

  const [isEditing, setIsEditing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // For loader or disabling button

  // Define unit options based on currency
  const unitOptions = {
    INR: ["Kilogram", "Gram", "Liter", "Milliliter"],
    USD: ["Pound", "Ounce", "Gallon", "Quart"],
    EUR: ["Kilogram", "Gram", "Liter", "Milliliter"],
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Reset the form after product addition
  const resetForm = () => {
    setFormData({
      image: "",
      pname: "",
      productperunit: "",
      currency: "",
      unit: "",
      qty: "",
      mobileno: mobileNo || "", // Reset with localStorage value or default
      adminemail: emailID || "", // Reset with localStorage value or default
      description: "",
    });
    setIsEditing(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing && !isSubmitting) {
      setIsSubmitting(true); // Disable the button during form submission
      try {
        // API call to add product
        const response = await fetch("https://farmer-backend-y5qj.onrender.com/addproduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to add product");
        }

        Swal.fire({
          title: "Product Added!",
          text: "Product has been added successfully!",
          icon: "success",
        });

        resetForm(); // Clear the form
        setIsEditing(false); // Disable editing after successful submission
      } catch (error) {
        console.error("Error adding product:", error);
        Swal.fire({
          title: "Error!",
          text: error.message || "An error occurred while adding the product.",
          icon: "error",
        });
      } finally {
        setIsSubmitting(false); // Re-enable the button
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col text-center">
          <h2 className="display-5 text-primary">Add New Product</h2>
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
                readOnly={!isEditing}
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
                readOnly={!isEditing}
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
                readOnly={!isEditing}
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
                readOnly={!isEditing}
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
                readOnly={!isEditing}
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
                readOnly={!isEditing}
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
                value={formData.mobileno} // Prefilled with localStorage value
                onChange={handleChange}
                readOnly={!isEditing}
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
                value={formData.adminemail} // Prefilled with localStorage value
                onChange={handleChange}
                readOnly={!isEditing}
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
              readOnly={!isEditing}
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
                  disabled={isSubmitting} // Disable button while submitting
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
