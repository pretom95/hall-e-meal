import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MgrDashboard.css";

const MgrDashboard = () => {
  const [mealData, setMealData] = useState([
    { id: 1, mealType: "Breakfast", time: "7:00 AM", details: "Paratha, Omelette, Tea" },
    { id: 2, mealType: "Lunch", time: "12:30 PM", details: "Rice, Chicken Curry, Salad" },
  ]);

  const columns = [
    { field: "mealType", headerName: "Meal Type", width: 150 },
    { field: "time", headerName: "Time", width: 130 },
    { field: "details", headerName: "Details", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <button className="edit-button" onClick={() => handleEdit(params.row)}>Edit</button>
          <button className="delete-button" onClick={() => handleDelete(params.row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    alert(`Edit meal: ${row.mealType}`);
  };

  const handleDelete = (id) => {
    const updatedData = mealData.filter((meal) => meal.id !== id);
    setMealData(updatedData);
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
        <div className="data-grid-container">
          <DataGrid
            rows={mealData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            className="mui-data-grid"
          />
        </div>
      </section>

      {/* Additional sections like Billing Overview and Announcements go here */}
    </div>
  );
};

export default MgrDashboard;
