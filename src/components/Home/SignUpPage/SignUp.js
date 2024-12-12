import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    student_ID: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      // Send POST request to the API
      const response = await axios.post("http://localhost:5000/auth/register-student", {
        student_ID: formData.student_ID,
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Handle success
      setSuccessMessage("Account created successfully!");
      setErrorMessage(""); // Clear any previous error messages

      // Redirect to sign-in page after success
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      // Handle API errors
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || "Failed to create account.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className="signup-container">
      <div className="header">
        <h1>HALL E MEAL</h1>
      </div>
      <div className="form-container">
        <h2>CREATE A NEW ACCOUNT</h2>
        <p>IT'S QUICK AND EASY!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="FULL NAME"
            className="input-field"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="student_ID"
            placeholder="STUDENT ID"
            className="input-field"
            value={formData.student_ID}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="NEW PASSWORD"
            className="input-field"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="CONFIRM PASSWORD"
            className="input-field"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="text-center">
          <p className="text-muted mt-5 mb-0">
            Already have an account?{" "}
            <Link to="/signin" className="fw-bold text-body">
              <u>Sign in now</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
