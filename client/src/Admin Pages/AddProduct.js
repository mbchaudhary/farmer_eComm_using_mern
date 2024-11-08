import React, { useState } from "react";
import Swal from "sweetalert2";
import uploadFileUsingCludinaryAPI from "../Util/imgToUrl";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const nav = useNavigate();
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
  const [isImageUploading, setIsImageUploading] = useState(false); // For image upload loading state

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

    if (isEditing && !isSubmitting && !isImageUploading) { // Only submit when image is not uploading
      setIsSubmitting(true); // Disable the button during form submission
      try {
        // API call to add product
        const response = await fetch("http://localhost:5000/addproduct", {
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
        nav('/admin_home');
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

  // Handle image upload
  const handleImageChange = async (e) => {
    setIsImageUploading(true); // Set loading state for image upload
    try {
      let url = await uploadFileUsingCludinaryAPI(e);

      if (url.trim().length !== 0) {
        setFormData({ ...formData, image: url });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to upload image. Please try again.",
        icon: "error",
      });
    } finally {
      setIsImageUploading(false); // Reset loading state
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
              <label htmlFor="image">Image Upload</label>
              <input
                type="file"
                className="form-control shadow-sm"
                id="image"
                name="image"
                onChange={handleImageChange}
                readOnly={!isEditing}
                required
              />
              {isImageUploading && <p className="text-muted mt-2">Uploading image...</p>}
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
                type="number"
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
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              {/* Add Product Button */}
              <button
                type="submit"
                className="btn btn-primary shadow-sm"
                disabled={isSubmitting || isImageUploading}
              >
                {isSubmitting ? "Adding Product..." : "Add Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
