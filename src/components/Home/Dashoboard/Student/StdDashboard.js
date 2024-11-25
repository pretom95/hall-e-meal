import React from "react";
import { Link } from 'react-router-dom'
import "./StdDashboard.css"; // Add styles here

const StdDashboard = () => {
  return (
    <div className="dashboard">
      {/* Header Section */}
      
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
    </div>
  );
};

export default StdDashboard;
