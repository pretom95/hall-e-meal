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
        <div className='my-5 text-center'>
          <p class="text-center text-muted mt-5 mb-0">Already have an account? <a href="#!"
                    class="fw-bold text-body"><Link to={"/signin"}><u>Sign in now</u></Link></a></p>
          
          </div>
      </div>
    </div>
  );
};
//
export default SignUp;
