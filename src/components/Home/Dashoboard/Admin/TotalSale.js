import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import "./TotalSale.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const TotalSale = () => {
  const [salesData, setSalesData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSalesOverview();
  }, []);

  const fetchSalesOverview = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get("http://localhost:5000/admin/sales-overview", {
        headers,
      });
      setSalesData(response.data);
    } catch (err) {
      console.error("Error fetching sales overview:", err);
      setError("Failed to fetch sales overview. Please try again.");
    }
  };

  const chartData = {
    labels: salesData.map((sale) => sale.period),
    datasets: [
      {
        label: "Total Sales (BDT)",
        data: salesData.map((sale) => sale.totalSale),
        backgroundColor: ["#4BC0C0", "#FFCE56"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly and Monthly Sales Overview",
      },
    },
  };

  return (
    <div className="total-sale-container">
      <h1>Total Sale Overview</h1>
      {error && <p className="error-message">{error}</p>}
      {!error && salesData.length > 0 && (
        <div>
          <Bar data={chartData} options={chartOptions} />
          <table className="sales-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Total Sale (BDT)</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale) => (
                <tr key={sale.period}>
                  <td>{sale.period.charAt(0).toUpperCase() + sale.period.slice(1)}</td>
                  <td>{sale.totalSale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {salesData.length === 0 && !error && <p>No data available.</p>}
    </div>
  );
};

export default TotalSale;
