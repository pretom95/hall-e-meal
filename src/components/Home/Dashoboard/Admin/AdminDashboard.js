import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [todayMeals, setTodayMeals] = useState([]);
  const [highestMealTaker, setHighestMealTaker] = useState({});
  const [highestBillPayer, setHighestBillPayer] = useState({});
  const [averageMealPrice, setAverageMealPrice] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch today's meals
      const mealsResponse = await axios.get("http://localhost:5000/admin/today-meals", { headers });
      setTodayMeals(mealsResponse.data);

      // Fetch highest meal taker
      const mealTakerResponse = await axios.get(
        "http://localhost:5000/admin/highest-meal-taker",
        { headers }
      );
      setHighestMealTaker(mealTakerResponse.data);

      // Fetch highest bill payer
      const billPayerResponse = await axios.get(
        "http://localhost:5000/admin/highest-bill-payer",
        { headers }
      );
      setHighestBillPayer(billPayerResponse.data);

      // Fetch average meal price
      const avgPriceResponse = await axios.get(
        "http://localhost:5000/admin/average-meal-price",
        { headers }
      );
      setAverageMealPrice(avgPriceResponse.data.averagePrice);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  };

  return (
    <div className="admin-dashboard">
      {/* <header>
        <h1>Admin Dashboard</h1>
      </header> */}

      <main>
        {/* Today's Meals Section */}
        <section className="today-meals">
          <h2>Today's Meals</h2>
          <table>
            <thead>
              <tr>
                <th>Meal Type</th>
                <th>Description</th>
                <th>Price</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              {todayMeals.map((meal, index) => (
                <tr key={index}>
                  <td>{meal.meal_type}</td>
                  <td>{meal.description}</td>
                  <td>BDT {meal.price}</td>
                  <td>{meal.creator_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Statistics Section */}
        <section className="stats">
          {/* <p><h2>Statistics</h2></p> */}
          <div className="stat-card">
            <p><strong>Highest Meal Taker:</strong> {highestMealTaker.name || "N/A"} with{" "}
              {highestMealTaker.totalMeals || 0} meals.
            </p>
            <p><strong>Highest Bill Payer:</strong> {highestBillPayer.name || "N/A"} with{" "}
              BDT {highestBillPayer.totalBill || 0}.
            </p>
            <p><strong>Average Meal Price:</strong> BDT {averageMealPrice || 0}</p>
          </div>
        </section>
      </main>

      <footer>
        <p>© 2024 Hall Meal Management System</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
