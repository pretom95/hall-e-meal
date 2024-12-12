import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Schedule.css";
import Header from "../../Extra/Header";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [filter, setFilter] = useState("All");
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [error, setError] = useState("");
  const [quantities, setQuantities] = useState({}); // Track selected quantities for each meal
  const [successMessage, setSuccessMessage] = useState("");
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

  // Fetch next day's meal schedule
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get("http://localhost:5000/schedule/next-day-schedule", {
          headers,
        });
        setSchedule(response.data || []);
        setFilteredMeals(response.data || []);

        // Initialize quantities with default values (1 for each meal)
        const initialQuantities = {};
        response.data.forEach((meal) => {
          initialQuantities[meal.meal_ID] = 1;
        });
        setQuantities(initialQuantities);
      } catch (err) {
        console.error("Error fetching schedule:", err);
        setError("Failed to fetch next day's schedule. Please try again.");
      }
    };

    fetchSchedule();
  }, []);

  // Handle meal type filtering
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);

    if (selectedFilter === "All") {
      setFilteredMeals(schedule);
    } else {
      setFilteredMeals(schedule.filter((meal) => meal.meal_type === selectedFilter));
    }
  };

  // Handle meal booking
  const handleMealBooking = async (meal_ID) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
  
      const response = await axios.post(
        "http://localhost:5000/schedule/book-meal",
        { meal_ID, quantities: quantities[meal_ID] }, // Include quantities
        { headers }
      );
  
      //alert(`Meal booked successfully! Booking ID: ${response.data.booking_ID}`);
      setSuccessMessage(`Meal booked successfully! Booking ID: ${response.data.booking_ID}`);
    } catch (err) {
      console.error("Error booking meal:", err);
      setError("Failed to book the meal. Please try again.");
      setSuccessMessage(""); // Clear any previous success messages
    }
  };
  
  // Handle quantity change for a specific meal
  const handleQuantityChange = (meal_ID, value) => {
    setQuantities({
      ...quantities,
      [meal_ID]: value,
    });
  };

  

  return (
    <div className="meal-schedule-container">
      <Header />
      <header className="schedule-header">
        <h1>Meal Schedule</h1>
        <p>Plan and book your meal for today!</p>
      </header>

      {/* Filter */}
      <div className="filter-section">
        <label htmlFor="mealFilter">Filter by Meal:</label>
        <select id="mealFilter" value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
      </div>

      {/* Schedule */}
      <section className="schedule-table">
        <h2>Today's Meal</h2>
        {error && <p className="error-message">{error}</p>}
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Price (BDT)</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeals.map((meal) => (
              <tr key={meal.meal_ID}>
                <td>{meal.meal_type}</td>
                <td>{meal.description}</td>
                <td>{meal.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={quantities[meal.meal_ID] || 1}
                    onChange={(e) => handleQuantityChange(meal.meal_ID, Number(e.target.value))}
                    className="quantity-input"
                  />
                </td>
                <td>
                  <button
                    className="book-button"
                    onClick={() => handleMealBooking(meal.meal_ID)}
                  >
                    Book Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default Schedule;
