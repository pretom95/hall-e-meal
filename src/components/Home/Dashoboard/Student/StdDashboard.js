import React from "react";
import { Link } from 'react-router-dom'
import "./StdDashboard.css"; // Add styles here

const StdDashboard = () => {
  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>Welcome, [User Name]!</h1>
        <nav>
          <ul className="nav-links">
            <li> <Link to="/stddashboard">Home</Link></li>
            <li> <Link to="/schedule">Meal Schedule</Link></li>
            <li> <Link to="/notifications">Notifications</Link></li>
            <li> <Link to="/signin">Log Out</Link></li>
            
          </ul>
        </nav>
      </header>

      {/* Main Section */}
      <main className="dashboard-main">
        <div className="stats">
          <div className="stat-card">
            <h3>Today's Meal</h3>
            <p>Rice, Chicken Curry, Dal</p>
          </div>
          <div className="stat-card">
            <h3>Total Meals This Month</h3>
            <p>20 Meals</p>
          </div>
          <div className="stat-card">
            <h3>Outstanding Dues</h3>
            <p>$15.00</p>
          </div>
        </div>
      </main>

      {/* Buttons Section */}
      <footer className="dashboard-footer">
      <li> <Link to="/history" className="button">Meal history</Link></li>
      <li> <Link to="/billing" className="button">Make payment</Link></li>
      <li> <Link to="/editprofile" className="button">Edit Profile</Link></li>
      </footer>
    </div>
  );
};

export default StdDashboard;
