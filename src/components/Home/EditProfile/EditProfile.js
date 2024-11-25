import React, { useState } from "react";
import { Link } from 'react-router-dom'
import "./EditProfile.css"; // Include styles here or use inline styling

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "John Doe", // Pre-filled values
    email: "john@example.com",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Profile Updated Successfully!");
    // Add API call to update the profile
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        
        {/* Email Field */}
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        
        {/* Password Field */}
        <label>
          New Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter new password"
          />
        </label>
        
        {/* Confirm Password Field */}
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm new password"
          />
        </label>

        {/* Submit and Cancel Buttons */}
        <div className="form-actions">
          <button type="submit">Save Changes</button>
          <Link to="/student"><button
            type="button"
          >
            Cancel
          </button></Link>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
