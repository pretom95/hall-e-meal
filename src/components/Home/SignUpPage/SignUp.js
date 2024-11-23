import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="header">
        <h1>HALL E MEAL</h1>
      </div>
      <div className="form-container">
        <h2>CREATE A NEW ACCOUNT</h2>
        <p>IT'S QUICK AND EASY!</p>
        <form>
          <input type="text" placeholder="FULL NAME" className="input-field" />
          <input type="text" placeholder="STUDENT ID" className="input-field" />
          <input type="email" placeholder="EMAIL" className="input-field" />
          <input
            type="password"
            placeholder="NEW PASSWORD"
            className="input-field"
          />
          <input
            type="password"
            placeholder="CONFIRM PASSWORD"
            className="input-field"
          />
          <div>
          <Link to="/signin"className="signup-button">Sign Up</Link>
        </div>
        </form>
        <div className="create-account">
          <Link to="/signin"className="create-account">ALREADY HAVE ACCOUNT?</Link>
        </div>
      </div>
    </div>
  );
};
//
export default SignUp;
