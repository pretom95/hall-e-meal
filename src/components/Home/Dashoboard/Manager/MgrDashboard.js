import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "./MgrDashboard.css";

const MgrDashboard = () => {
  const [mealData, setMealData] = useState([]);
  const [notices, setNotices] = useState([]);
  const [notice, setNotice] = useState({ type: "", message: "" });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mealForm, setMealForm] = useState({
    meal_ID: "",
    meal_type: "",
    Date: "",
    description: "",
    price: "",
  });
  const [editMeal, setEditMeal] = useState(null);

  useEffect(() => {
    fetchMealData();
    fetchNotices();
  }, []);

  const fetchMealData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get("http://localhost:5000/manager/meals", {
        headers,
      });
      setMealData(response.data || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
      setErrorMessage("Failed to fetch meals. Please try again.");
    }
  };

  const fetchNotices = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get("http://localhost:5000/manager/notices", {
        headers,
      });
      setNotices(response.data || []);
    } catch (error) {
      console.error("Error fetching notices:", error);
      setErrorMessage("Failed to fetch notices. Please try again.");
    }
  };

  const handlePostNotice = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        "http://localhost:5000/manager/post-notice",
        notice,
        { headers }
      );
      setMessage(response.data.message);
      setNotice({ type: "", message: "" });
      fetchNotices(); // Refresh notices
    } catch (error) {
      console.error("Error posting notice:", error);
      setErrorMessage("Failed to post notice.");
    }
  };

  const handleDeleteNotice = async (notice_ID) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`http://localhost:5000/manager/delete-notice/${notice_ID}`, {
        headers,
      });
      setMessage("Notice deleted successfully.");
      fetchNotices(); // Refresh notices
    } catch (error) {
      console.error("Error deleting notice:", error);
      setErrorMessage("Failed to delete notice.");
    }
  };

  const handleMealChange = (e) => {
    const { name, value } = e.target;
    setMealForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddMeal = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // console.log(token)
      const headers = { Authorization: `Bearer ${token}` };
      // console.log(headers)
      const response = await axios.post(
        "http://localhost:5000/manager/add-meal",
        mealForm,
        { headers }
      );
      console.log(response)
      setMessage(response.data.message);
      setMealForm({
        meal_ID: "",
        meal_type: "",
        Date: "",
        description: "",
        price: "",
      }); // Reset form
      fetchMealData(); // Refresh meals
    } catch (error) {
      console.error("Error adding meal:", error);
      setErrorMessage("Failed to add meal.");
    }
  };

  const handleEditMeal = (meal) => {
    setMealForm({
      meal_ID: meal.meal_ID,
      meal_type: meal.meal_type,
      Date: meal.Date,
      description: meal.description,
      price: meal.price,
    });
    setEditMeal(meal); // Mark the meal as being edited
  };

  const handleUpdateMeal = async (e) => {
    e.preventDefault();
    if (!editMeal) return;

    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.put(
        `http://localhost:5000/manager/update-meal/${editMeal.meal_ID}`,
        mealForm,
        { headers }
      );

      setMessage(response.data.message);
      setMealForm({
        meal_ID: "",
        meal_type: "",
        Date: "",
        description: "",
        price: "",
      }); // Reset form
      setEditMeal(null); // Clear edit state
      fetchMealData(); // Refresh meals
    } catch (error) {
      console.error("Error updating meal:", error);
      setErrorMessage("Failed to update meal.");
    }
  };

  const handleDeleteMeal = async (meal_ID) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`http://localhost:5000/manager/delete-meal/${meal_ID}`, {
        headers,
      });
      setMessage("Meal deleted successfully.");
      fetchMealData(); // Refresh meals
    } catch (error) {
      console.error("Error deleting meal:", error);
      setErrorMessage("Failed to delete meal.");
    }
  };

  const mealColumns = [
    { field: "meal_type", headerName: "Meal Type", width: 150 },
    { field: "Date", headerName: "Time", width: 130 },
    { field: "description", headerName: "Details", width: 250 },
    { field: "price", headerName: "Price", width: 150 }, // New Price Column
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <button
            className="edit-button"
            onClick={() => handleEditMeal(params.row)}
          >
            Edit
          </button>
          <button
            className="delete-button"
            onClick={() => handleDeleteMeal(params.row.meal_ID)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const noticeColumns = [
    { field: "type", headerName: "Notice Type", width: 150 },
    { field: "message", headerName: "Message", width: 250 },
    { field: "date", headerName: "Date", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <button
          className="delete-button"
          onClick={() => handleDeleteNotice(params.row.notice_ID)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="manager-dashboard">
      <header className="dashboard-header">
        <h1>Meal Manager Dashboard</h1>
        <p>Oversee meal schedules and announcements.</p>
      </header>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {message && <p className="message">{message}</p>}

      {/* Meal Schedule Management */}
      <section className="schedule-management">
        <h2><center>Meal Schedule Management</center></h2>

        <form onSubmit={editMeal ? handleUpdateMeal : handleAddMeal}>
          <label>
            Meal ID:
            <input
              type="text"
              name="meal_ID"
              value={mealForm.meal_ID}
              onChange={handleMealChange}
              required
            />
          </label>
          <label>
            Meal Type:
            <select
              name="meal_type"
              value={mealForm.meal_type}
              onChange={handleMealChange}
              required
            >
              <option value="" disabled>Select a meal type</option>
              {/* Add meal type options here */}
              <option value="Breakfast">Breakfast</option>
              <option value="Special Breakfast">Special Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Special Lunch">Special Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Special Dinner">Special Dinner</option>
            </select>
          </label>
          <label>
            Time:
            <input
              type="date"
              name="Date"
              value={mealForm.Date}
              onChange={handleMealChange}
              required
            />
          </label>
          <label>
            Details:
            <textarea
              name="description"
              value={mealForm.description}
              onChange={handleMealChange}
              required
            />
          </label>

          <label>
           Price:
            <input
              type="text"
              name="price"
              value={mealForm.price}
              onChange={handleMealChange}
              required
            />
          </label>
          <button type="submit">{editMeal ? "Update Meal" : "Add Meal"}</button>
        </form>

        <div className="data-grid-container">
          <DataGrid
            rows={mealData}
            columns={mealColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            className="mui-data-grid"
            getRowId={(row) => row.meal_ID}
          />
        </div>
      </section>

      {/* Post Notice */}
      <section className="post-notice">
        <h2>Post a Notice</h2>
        <form onSubmit={handlePostNotice}>
          <label>
            Notice Type:
            <input
              type="text"
              value={notice.type}
              onChange={(e) => setNotice({ ...notice, type: e.target.value })}
              required
            />
          </label>
          <label>
            Message:
            <textarea
              value={notice.message}
              onChange={(e) => setNotice({ ...notice, message: e.target.value })}
              required
            />
          </label>
         
          <button type="submit">Post Notice</button>
        </form>
      </section>

      {/* View Notices */}
      <section className="view-notices">
        <h2>View Notices</h2>
        <div className="data-grid-container">
          <DataGrid
            rows={notices}
            columns={noticeColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            className="mui-data-grid"
            getRowId={(row) => row.notice_ID}
          />
        </div>
      </section>
    </div>
  );
};

export default MgrDashboard;
