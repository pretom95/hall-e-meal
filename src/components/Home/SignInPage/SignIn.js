import React from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  return (
    <div className="signin-container">
      <div className="left-section">
        <h1><b>HALL E MEAL</b></h1>
        <h2>WELCOME TO HALL E MEAL</h2>
      </div>
      <div className="right-section">
        <h2>SIGN IN</h2>
        <form className="signin-form">
          <input
            type="text"
            placeholder="STUDENT ID"
            className="signin-input"
          />
          <input
            type="password"
            placeholder="PASSWORD"
            className="signin-input"
          />
          <div className="second-container">
            <div className="checkbox-container">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">REMEMBER FOR 1 MONTH?</label>
            </div>
            <div>
              <a href="/dashboard/student" className="nbutton">Sign In</a>
            </div>
            <br />

            <div>
              <Link to="/signup" className="create-account">&nbsp; OR CREATE ACCOUNT?</Link>
            </div>
          </div>

        </form>

        {/* <div className="demodash">
          <Link to="/dashboard">dashboard</Link>
        </div> */}
      </div>
    </div>
  );
};

export default SignIn;
