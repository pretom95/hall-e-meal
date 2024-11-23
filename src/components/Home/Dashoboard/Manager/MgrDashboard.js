import React, { useState } from "react";
import "./MgrDashboard.css";

const MgrDashboard = () => {
  const [announcements, setAnnouncements] = useState([
    "Special dinner planned for Friday.",
    "Kitchen maintenance on Sunday; no meals will be served.",
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState("");

  const handleAddAnnouncement = () => {
    if (newAnnouncement.trim()) {
      setAnnouncements([newAnnouncement, ...announcements]);
      setNewAnnouncement("");
    }
  };

  return (
    <div className="manager-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Meal Manager Dashboard</h1>
        <p>Oversee meal schedules, student participation, and announcements.</p>
      </header>

      {/* Meal Schedule Management */}
      <section className="schedule-management">
        <h2>Meal Schedule Management</h2>
        <table>
          <thead>
            <tr>
              <th>Meal Type</th>
              <th>Time</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Breakfast</td>
              <td>7:00 AM</td>
              <td>Paratha, Omelette, Tea</td>
              <td>
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Lunch</td>
              <td>12:30 PM</td>
              <td>Rice, Chicken Curry, Salad</td>
              <td>
                <button className="edit-button">Edit</button>
                <button className="delete-button">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Billing Overview */}
      <section className="billing-overview">
        <h2>Billing Overview</h2>
        <div className="stats">
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p>$1200</p>
          </div>
          <div className="stat-card">
            <h3>Outstanding Dues</h3>
            <p>$300</p>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="announcements">
        <h2>Announcements</h2>
        <div className="announcement-input">
          <textarea
            placeholder="Write a new announcement..."
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
          />
          <button onClick={handleAddAnnouncement}>Post</button>
        </div>
        <ul>
          {announcements.map((announcement, index) => (
            <li key={index}>{announcement}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default MgrDashboard;
