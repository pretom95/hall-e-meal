import React from "react";
import "./StdDashboard.css"; // Add styles here

export default function StdDashboard () {
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
            <p>BDT 150.00</p>
          </div>
        </div>
      </main>

      {/* Buttons Section */}
    </div>
  );
};
