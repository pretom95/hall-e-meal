import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MenuItem, Select, FormControl, InputLabel, Typography } from "@mui/material";
import "./History.css";

const History = () => {
  const [meals, setMeals] = useState([
    { id: 1, type: "Breakfast", date: "2024-11-01", cost: 50, status: "Taken" },
    { id: 2, type: "Lunch", date: "2024-11-01", cost: 100, status: "Skipped" },
    { id: 3, type: "Dinner", date: "2024-11-02", cost: 120, status: "Taken" },
    // Add more meal history data here
  ]);

  const [filter, setFilter] = useState("All");

  // Filter meals based on selected filter
  const filteredMeals =
    filter === "All" ? meals : meals.filter((meal) => meal.type === filter);

  // Define Data Grid columns
  const columns = [
    {
      field: "type",
      headerName: "Meal Type",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost (BDT)",
      flex: 1,
      type: "number",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <span
          className={`status ${
            params.value.toLowerCase() === "taken" ? "taken" : "skipped"
          }`}
        >
          {params.value}
        </span>
      ),
    },
  ];

  return (
    <div className="meal-history-container">
      {/* Header Section */}
      <header className="history-header">
        <Typography variant="h4" component="h1">
          Meal History
        </Typography>
        <Typography variant="subtitle1">
          Review your meal participation and costs.
        </Typography>
      </header>

      {/* Filter Section */}
      <div className="filter-section">
        <FormControl style={{ minWidth: 200 }}>
          <InputLabel id="meal-filter-label">Filter by Meal Type</InputLabel>
          <p></p>
          <Select
            labelId="meal-filter-label"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Breakfast">Breakfast</MenuItem>
            <MenuItem value="Lunch">Lunch</MenuItem>
            <MenuItem value="Dinner">Dinner</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* History Table */}
      <section className="history-table">
        <DataGrid
          rows={filteredMeals}
          columns={columns}
          pageSize={5}
          autoHeight
          disableSelectionOnClick
        />
      </section>
    </div>
  );
};

export default History;
