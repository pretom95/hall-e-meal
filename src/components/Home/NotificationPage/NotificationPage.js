import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NotificationPage.css";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user"))
    setUserData(userdata)
    // userData: {
    //   student_ID:,
    //   name,
    //   email,
    //   is_manager,
    // }

  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get("http://localhost:5000/notice", {
          headers,
        });
        setNotifications(response.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to fetch notifications.");
      }
    };

    fetchNotifications();
  }, []);

  // const handleMarkAsRead = async (id) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const headers = { Authorization: `Bearer ${token}` };

  //     await axios.put(`http://localhost:5000/notice/${id}/mark-read`, {}, { headers });

  //     setNotifications(
  //       notifications.map((notification) =>
  //         notification.id === id ? { ...notification, read: true } : notification
  //       )
  //     );
  //   } catch (err) {
  //     console.error("Error marking notification as read:", err);
  //     setError("Failed to mark notification as read.");
  //   }
  // };

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
            {/* {!notification.read && (
              // <button
              //   className="mark-read-button"
              //   onClick={() => handleMarkAsRead(notification.id)}
              // >
              //   Mark as Read
              // </button>
            )} */}
          </div>
        ))}
        {error && <p className="error-message">{error}</p>}
      </section>
    </div>
  );
};

export default NotificationPage;
