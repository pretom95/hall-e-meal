import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import axios from "axios";

export default function AdminHeader() {
  const [userName, setUserName] = useState("User"); // Default user name
  const [error, setError] = useState("");
  const [is_manager, setIs_manager] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    // setInterval(() => {
      
    // }, 1000);
    const userData = JSON.parse(localStorage.getItem("user"))
    setIs_manager(userData.is_manager)
      setUserName(userData.name)
    

  }, []);

  const handleLogout = async () => {
    try {
      // Optionally notify the backend about logout
      await axios.post("http://localhost:5000/dashboard/logout");

      // Clear token and navigate to login
      localStorage.removeItem("token");
      // alert("Logged out successfully!");
      navigate("/signin");
    } catch (err) {
      console.error("Error during logout:", err);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top komola">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand wel" href="#">
        Welcome, {userName} {/* Display the fetched user name */}
      </a>
      <div className="collapse navbar-collapse mine" id="navbarTogglerDemo03">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0 nav nav-tabs" id="nav-tab" role="tablist">
          <li className="nav-item active">
            <Link to="/admin/home" className="nav-item nav-link" id="nav-home-tab">
              <b>Home</b>
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/admin/manager" className="nav-item nav-link" id="nav-home-tab">
              <b>Managers</b>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/notifications" className="nav-item nav-link" id="nav-home-tab">
              <b>Notice</b>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/overview" className="nav-item nav-link" id="nav-home-tab">
              <b>Meal Overview</b>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/sale" className="nav-item nav-link" id="nav-home-tab">
              <b>Total Sale</b>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/editAdmin" className="nav-item nav-link" id="nav-home-tab">
              <b>Edit Profile</b>
            </Link>
          </li>
          {
            is_manager &&
            <li className="nav-item">
              <Link to="/mgrdashboard" className="nav-item nav-link" id="nav-home-tab">
                <b>Managership</b>
              </Link>
            </li>
          }
          
          <li className="nav-item">
            <button onClick={handleLogout} className="nav-item nav-link btn btn-link" id="nav-home-tab">
              <b>Log out</b>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}