//import mealImage from './meal.jpg';
import React from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'

export default function Landing({}) {
  return (
    <div className="home-container">
      <div className="left-section">
        <h1>HALL E MEAL</h1>
        <h2>Your friendly dining companion</h2>
        {/* //<div className="button-container"> */}
          <div >
          <Link to={"/signin"} className="button">Sign In</Link>
          </div>
          <p></p>
          <div >
          <Link to={"/signup"}className="create-account a">creat-account </Link>
          </div>
          
        {/* </div> */}
      </div>
      <div className="right-section">
        <img
          src='./meal.jpg'
          alt="Delicious Meal"
          className="food-image"
        />
      </div>
    </div>
  )
}
