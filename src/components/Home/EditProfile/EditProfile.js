import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import "./EditProfile.css"; // Include styles here or use inline styling

const EditProfile = () => {
  // State to store form data and errors
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); 
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user"))
    setUserData(userdata)
    // userData: {
    //   student_ID:,
    //   name,
    //   email,
    //   is_manager,
    // }

  }, []);

  useEffect(() => {
    // Fetch the current user's details from API (if you want to pre-fill the form)
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get("http://localhost:5000/profile/get-profile", {
          headers,
        });

        setFormData({
          name: response.data.name,
          email: response.data.email,
          password: "",
          confirmPassword: "",
        });
      } catch (err) {
        console.error("Error fetching user details:", err);
        setErrorMessage("Failed to fetch user details.");
      }
    };

    fetchUserDetails();
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
        "http://localhost:5000/profile/update-profile",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
        { headers }
      );

      // Handle success
      setSuccessMessage(response.data.message);
      const tempUserData = userData;
      tempUserData.name = formData.name;
      localStorage.setItem("user",JSON.stringify(tempUserData))
      navigate("/dashboard/student");
      setErrorMessage(""); // Clear any error messages
    } catch (error) {
      // Handle error response
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
      <h2>Edit Profile</h2>

      {/* Display success or error message */}
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
            required
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
            required
          />
        </label>

        {/* Submit and Cancel Buttons */}
        <div className="form-actions">
          <Button  onClick={(e)=>{handleSubmit(e)}} type="submit" >Save Changes</Button>
          {/* <Link to="/student">
            <button type="button">Cancel</button>
          </Link> */}
          <Button onClick={(e)=>{handleSubmit(e)}} type="button">
              <b>Cancel</b>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
