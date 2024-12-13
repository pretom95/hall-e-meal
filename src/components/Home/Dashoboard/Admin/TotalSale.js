import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import "./TotalSale.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const TotalSale = () => {
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMonthlySales();
  }, []);

  const fetchMonthlySales = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get("http://localhost:5000/admin/sales-overview", {
        headers,
      });
      setMonthlySalesData(response.data);
    } catch (err) {
      console.error("Error fetching monthly sales:", err);
      setError("Failed to fetch monthly sales data. Please try again.");
    }
  };

  const chartData = {
    labels: monthlySalesData.map((sale) => sale.month),
    datasets: [
      {
        label: "Total Sales (BDT)",
        data: monthlySalesData.map((sale) => sale.totalSale),
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderWidth: 2,
        tension: 0.2,
        fill: true,
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
        text: "Monthly Sales Overview (BDT)",
      },
    },
  };

  return (
    <div className="monthly-sales-container">
      <h1>Monthly Sales Overview</h1>
      {error && <p className="error-message">{error}</p>}
      {!error && monthlySalesData.length > 0 && (
        <div>
          <Line data={chartData} options={chartOptions} />
          <table className="sales-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Total Sales (BDT)</th>
              </tr>
            </thead>
            <tbody>
              {monthlySalesData.map((sale) => (
                <tr key={sale.month}>
                  <td>{sale.month}</td>
                  <td>{sale.totalSale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {monthlySalesData.length === 0 && !error && <p>No data available.</p>}
    </div>
  );
};

export default TotalSale;
