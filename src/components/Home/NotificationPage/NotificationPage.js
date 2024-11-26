import React, { useState } from "react";
import "./NotificationPage.css";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Meal Schedule",
      message: "Breakfast menu updated for tomorrow.",
      date: "2024-11-14",
      read: false,
    },
    {
      id: 2,
      type: "Billing",
      message: "Your payment for October is due.",
      date: "2024-11-13",
      read: true,
    },
    {
      id: 3,
      type: "Announcement",
      message: "Special dinner scheduled on Sunday evening.",
      date: "2024-11-12",
      read: false,
    },
  ]);

  const [filter, setFilter] = useState("All");

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((notification) => notification.type === filter);

  return (
    <div className="notification-page">
      <header className="notification-header">
        <h1>Notices</h1>
        <p>Stay updated with the latest announcements and reminders.</p>
      </header>

      {/* Filter Section */}
      <div className="filter-section">
        <label htmlFor="filter">Filter by Type:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Meal Schedule">Meal Schedule</option>
          <option value="Billing">Billing</option>
          <option value="Announcement">Announcement</option>
        </select>
      </div>

      {/* Notification List */}
      <section className="notification-list">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-card ${
              notification.read ? "read" : "unread"
            }`}
          >
            <h3>{notification.type}</h3>
            <p>{notification.message}</p>
            <p className="notification-date">{notification.date}</p>
            {!notification.read && (
              <button
                className="mark-read-button"
                onClick={() => handleMarkAsRead(notification.id)}
              >
                Mark as Read
              </button>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default NotificationPage;
