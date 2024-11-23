import React, { useState } from "react";
import "./Schedule.css";

const Schedule = () => {
    const schedule = [
        {
          day: "Monday",
          meals: [
            { type: "Breakfast", details: "Paratha, Omelette, Tea", price: 50 },
            { type: "Lunch", details: "Rice, Chicken Curry, Salad", price: 100 },
          ],
        },
        {
          day: "Tuesday",
          meals: [
            { type: "Breakfast", details: "Bread, Jam, Boiled Egg", price: 40 },
            { type: "Lunch", details: "Rice, Fish Curry, Vegetables", price: 120 },
          ],
        },
        // Add the rest of the week’s schedule
      ];
    
      // Simulate getting next day's schedule
      const getNextDaySchedule = () => {
        const today = new Date().getDay(); // Get current day as a number (0=Sunday, 1=Monday)
        return schedule[(today + 1) % schedule.length];
      };
    
      const nextDaySchedule = getNextDaySchedule();
    
      const [filteredMeals, setFilteredMeals] = useState(nextDaySchedule.meals);
      const [filter, setFilter] = useState("All");
    
      const handleFilterChange = (event) => {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);
        if (selectedFilter === "All") {
          setFilteredMeals(nextDaySchedule.meals);
        } else {
          setFilteredMeals(
            nextDaySchedule.meals.filter((meal) => meal.type === selectedFilter)
          );
        }
      };
    
      const handleMealBooking = (mealType) => {
        alert(`You have successfully booked your ${mealType}!`);
      };
    
      return (
        <div className="meal-schedule-container">
          {/* Header */}
          <header className="schedule-header">
            <h1>Next Day Meal Schedule</h1>
            <p>Plan and book your meal for tomorrow!</p>
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
            <h2>{nextDaySchedule.day}'s Meal</h2>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Details</th>
                  <th>Price (BDT)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMeals.map((meal, index) => (
                  <tr key={index}>
                    <td>{meal.type}</td>
                    <td>{meal.details}</td>
                    <td>{meal.price}</td>
                    <td>
                      <button
                        className="book-button"
                        onClick={() => handleMealBooking(meal.type)}
                      >
                        Book Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      );
    };
export default Schedule;
