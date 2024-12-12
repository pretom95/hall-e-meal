import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignIn.css";
import { Button } from "@mui/material";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/signin", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Store the JWT token and user details in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("student_ID", user.student_ID); // Store student_ID separately for queries

      // console.log(localStorage.getItem("student_ID"));
      // console.log(localStorage.getItem("user"));


      // Redirect based on user role
      if (user.is_admin) {
        navigate("/admin/home");
      } else {
        navigate("/dashboard/student");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="signin-container">
      <div className="left-section">
        <h1><b>HALL E MEAL</b></h1>
        <h2>WELCOME TO HALL E MEAL</h2>
      </div>
      <div className="right-section">
        <h2>SIGN IN</h2>
        <form className="signin-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="EMAIL"
            className="signin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="PASSWORD"
            className="signin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="second-container">
            <Button type="submit" className="nbutton">Sign In</Button>
          </div>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div>
          <Link to="/signup" className="create-account">OR CREATE ACCOUNT?</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
