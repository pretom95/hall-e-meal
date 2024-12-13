import React, { useEffect, useState } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "./AdminMealOverview.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AdminMealOverview = () => {
  const [mealTypeData, setMealTypeData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMealTypeOverview();
  }, []);

  const fetchMealTypeOverview = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      console.log("Ok")
      const response = await axios.get("http://localhost:5000/admin/meal-overview", {
        headers,
      });
      setMealTypeData(response.data);
    } catch (err) {
      console.error("Error fetching meal type overview:", err);
      setError("Failed to fetch meal type overview. Please try again.");
    }
  };

  const chartData = {
    labels: mealTypeData.map((meal_type) => meal_type.type),
    datasets: [
      {
        label: "Total Meals Sold",
        data: mealTypeData.map((meal_type) => meal_type.totalSold),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "orange",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Meal Type Sales Overview",
      },
    },
  };

  return (
    <div className="admin-meal-overview">
      <h1>Meal Type Overview</h1>
      {error && <p className="error-message">{error}</p>}
      {!error && mealTypeData.length > 0 && (
        <Bar className="chart-container" data={chartData} options={chartOptions} />
      )}
      {mealTypeData.length === 0 && !error && <p>No data available.</p>}
    </div>
  );
};

export default AdminMealOverview;
