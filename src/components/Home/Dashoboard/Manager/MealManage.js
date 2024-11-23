import React from 'react';
import './MealManage.css';

const MealManage = () => {
  return (
    <div className="meal-manager-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>Meal Manager Dashboard</h1>
        <p>Manage meals efficiently for the hall residents.</p>
      </header>

      {/* Overview Section */}
      <div className="overview-section">
        <div className="overview-card">
          <h3>Today's Meals</h3>
          <p>150</p>
        </div>
        <div className="overview-card">
          <h3>Weekly Total</h3>
          <p>1050</p>
        </div>
        <div className="overview-card">
          <h3>Pending Requests</h3>
          <p>3</p>
        </div>
      </div>

      {/* Meal Schedule Section */}
      <section className="meal-schedule">
        <h2>Manage Meal Schedules</h2>
        <button className="add-button">Add Meal</button>
        <table>
          <thead>
            <tr>
              <th>Meal</th>
              <th>Time</th>
              <th>Participants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Breakfast</td>
              <td>7:00 AM</td>
              <td>50</td>
              <td>
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Lunch</td>
              <td>12:30 PM</td>
              <td>70</td>
              <td>
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Billing Section */}
      <section className="billing-section">
        <h2>Billing & Expenses</h2>
        <p>Total Expenses This Month: $1,200</p>
        <button className="generate-report-button">Generate Report</button>
      </section>

      {/* Announcements Section */}
      <section className="announcements-section">
        <h2>Notices & Announcements</h2>
        <textarea placeholder="Write a new announcement..."></textarea>
        <button className="post-button">Post Announcement</button>
        <ul>
          <li>Meal service will be closed on Friday evening.</li>
          <li>Special dinner scheduled for Sunday.</li>
        </ul>
      </section>
    </div>
  );
};

export default MealManage;
