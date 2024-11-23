import React, { useState } from "react";
import "./History.css";

const History = () => {
  const [meals, setMeals] = useState([
    { id: 1, type: "Breakfast", date: "2024-11-01", cost: 50, status: "Taken" },
    { id: 2, type: "Lunch", date: "2024-11-01", cost: 100, status: "Skiped" },
    { id: 3, type: "Dinner", date: "2024-11-02", cost: 120, status: "Taken" },
    // Add more meal history data here
  ]);

  const [filter, setFilter] = useState("All");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredMeals =
    filter === "All"
      ? meals
      : meals.filter((meal) => meal.type === filter);

  return (
    <div className="meal-history-container">
      {/* Header */}
      <header className="history-header">
        <h1>Meal History</h1>
        <p>Review your meal participation and costs.</p>
      </header>

      {/* Filter Section */}
      <div className="filter-section">
        <label htmlFor="mealFilter">Filter by Meal Type:</label>
        <select id="mealFilter" value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
      </div>

      {/* History Table */}
      <section className="history-table">
        <table>
          <thead>
            <tr>
              <th>Meal Type</th>
              <th>Date</th>
              <th>Cost (BDT)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeals.map((meal) => (
              <tr key={meal.id}>
                <td>{meal.type}</td>
                <td>{meal.date}</td>
                <td>{meal.cost}</td>
                <td className={meal.status.toLowerCase()}>{meal.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default History;
