import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import "./EditProfile.css"; // Include styles here or use inline styling

const AdminEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    const adminInfo = JSON.parse(localStorage.getItem("user"));
    setAdminData(adminInfo);
  }, []);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get("http://localhost:5000/admin/get-profile", {
          headers,
        });

        setFormData({
          name: response.data.name,
          email: response.data.email,
          password: "",
          confirmPassword: "",
        });
      } catch (err) {
        console.error("Error fetching admin details:", err);
        setErrorMessage("Failed to fetch admin details.");
      }
    };

    fetchAdminDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.put(
        "http://localhost:5000/admin/update-profile",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        { headers }
      );

      setSuccessMessage(response.data.message);
      const tempUserData = adminData;
      tempUserData.name = formData.name;
      localStorage.setItem("user",JSON.stringify(tempUserData))
      navigate("/admin/home");
      setErrorMessage(""); // Clear any error messages
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || "Failed to update profile.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Admin Profile</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
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
            required
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
        <Button  onClick={(e)=>{handleSubmit(e)}} type="submit" >Save Changes</Button>
          <Button onClick={() => navigate("/admin/home")} type="button">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminEdit;
