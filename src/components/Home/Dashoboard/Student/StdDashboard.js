import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StdDashboard.css";
import Header from "../../../Extra/Header";

const StdDashboard = () => {
  const [todayMeal, setTodayMeal] = useState({});
  const [totalMeals, setTotalMeals] = useState(0);
  const [outstandingDues, setOutstandingDues] = useState(0);
  const [highestMealTaker, setHighestMealTaker] = useState({ name: "", totalMeals: 0 });
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
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token"); // Get JWT token
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch today's meal
        const mealResponse = await axios.get(
          "http://localhost:5000/dashboard/student/today-meal",
          { headers }
        );
        setTodayMeal(mealResponse.data[0] || {});

        // Fetch total meals
        const totalMealsResponse = await axios.get(
          "http://localhost:5000/dashboard/student/total-meals",
          { headers }
        );
        setTotalMeals(totalMealsResponse.data.total_meals || 0);

        // Fetch outstanding dues
        const duesResponse = await axios.get(
          "http://localhost:5000/dashboard/student/outstanding-dues",
          { headers }
        );
        setOutstandingDues(duesResponse.data.outstanding_dues || 0);

        // Fetch highest meal taker
        const highestTakerResponse = await axios.get(
          "http://localhost:5000/dashboard/highest-meal-taker",
          { headers }
        );
        setHighestMealTaker(highestTakerResponse.data || { name: "", totalMeals: 0 });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to fetch dashboard data. Please try again.");
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <Header />
      {/* Sliding Message Bar */}
      <div className="fixed-top sliding-back sliding-bar ">
       
            Highest meal taker this month is {highestMealTaker.name || "N/A"} with{" "}
            {highestMealTaker.totalMeals || 0} meals.
      </div>

      {/* Main Content */}
      <main className="dashboard-main">
        {error && <p className="error-message">{error}</p>}
        <div className="stats">
          <div className="stat-card">
            <h3>Today's Meal</h3>
            <p>{todayMeal.description || "No meal scheduled"}</p>
            <p>Type: {todayMeal.meal_type || "N/A"}</p>
            <p>Price: BDT {todayMeal.price || "0.00"}</p>
          </div>
          <div className="stat-card">
            <h3>Total Meals This Month</h3>
            <p>{totalMeals} Meals</p>
          </div>
          <div className="stat-card">
            <h3>Outstanding Dues</h3>
            <p>BDT {outstandingDues}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StdDashboard;
