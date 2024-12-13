import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminMealManager.css";

const AdminMealManager = () => {
  const [currentManagers, setCurrentManagers] = useState([]);
  const [form, setForm] = useState({
    manager_ID: "", // Allow independent input
    student_ID: "",
    appointment_date: "",
    retirement_date: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCurrentManagers();
  }, []);

  const fetchCurrentManagers = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get("http://localhost:5000/admin/current-managers", {
        headers,
      });
      setCurrentManagers(response.data);
    } catch (err) {
      console.error("Error fetching current managers:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddManager = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.post(
        "http://localhost:5000/admin/add-manager",
        form,
        { headers }
      );
      setMessage(response.data.message);
      fetchCurrentManagers(); // Refresh the list
    } catch (err) {
      console.error("Error adding manager:", err);
      setMessage("Failed to add manager.");
    }
  };

  const handleRemoveManager = async (manager_ID) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.delete(`http://localhost:5000/admin/remove-manager/${manager_ID}`, {
        headers,
      });
      setMessage("Manager removed successfully.");
      fetchCurrentManagers(); // Refresh the list
    } catch (err) {
      console.error("Error removing manager:", err);
      setMessage("Failed to remove manager.");
    }
  };

  return (
    <div className="admin-meal-manager">
      <header>
        <h1>Manage Meal Managers</h1>
      </header>

      <main>
        {/* Add Manager Section */}
        <section>
          <form onSubmit={handleAddManager}>
            <label>
              Manager ID:
              <input
                type="number"
                name="manager_ID"
                value={form.manager_ID}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Student ID:
              <input
                type="number"
                name="student_ID"
                value={form.student_ID}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Appointment Date:
              <input
                type="date"
                name="appointment_date"
                value={form.appointment_date}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Retirement Date:
              <input
                type="date"
                name="retirement_date"
                value={form.retirement_date}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit">Add Manager</button>
          </form>
          {message && <p className="message">{message}</p>}
        </section>

        {/* Current Managers Section */}
        <section>
          <h2>Current Meal Managers</h2>
          <table>
            <thead>
              <tr>
                <th>Manager ID</th>
                <th>Student ID</th>
                <th>Name</th>
                <th>Appointment Date</th>
                <th>Retirement Date</th>
              </tr>
            </thead>
            <tbody>
              {currentManagers.map((manager) => (
                <tr key={manager.manager_ID}>
                  <td>{manager.manager_ID}</td>
                  <td>{manager.student_ID}</td>
                  <td>{manager.name}</td>
                  <td>{manager.appointment_date}</td>
                  <td>{manager.retirement_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <footer>
        <p>© 2024 Hall Meal Management System</p>
      </footer>
    </div>
  );
};

export default AdminMealManager;
