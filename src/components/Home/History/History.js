import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MenuItem, Select, FormControl, InputLabel, Typography } from "@mui/material";
import axios from "axios";
import "./History.css";

const History = () => {
  const [meals, setMeals] = useState([]);
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
    const fetchMealHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get("http://localhost:5000/history/meal-history", {
          headers,
        });
        setMeals(response.data);
      } catch (err) {
        console.error("Error fetching meal history:", err);
        setError("Failed to fetch meal history. Please try again.");
      }
    };

    fetchMealHistory();
  }, []);

  // Filter meals based on selected filter
  const filteredMeals = filter === "All" ? meals : meals.filter((meal) => meal.type === filter);

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
      headerName: "Cost (BDT)", // Already set up to show cost
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
      <header className="history-header">
        <Typography variant="h4" component="h1">
          Meal History
        </Typography>
        <Typography variant="subtitle1">
          Review your meal participation and costs.
        </Typography>
      </header>

      <div className="filter-section">
        <FormControl style={{ minWidth: 200 }}>
          <InputLabel id="meal-filter-label" className="allign">Filter by Meal Type</InputLabel>
          <p className="allign"></p>
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

      <section className="history-table">
        {error && <p className="error-message">{error}</p>}
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
