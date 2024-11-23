import React from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'

export default function Landing({}) {
  return (
    // <div className="container">
    //   <div className="left">
    //     <h1>HALL E MEAL</h1>
    //     <p>Your friendly dining companion</p>
    //     <div className="buttons">
    //       <Link to={"/signin"}>Sign In</Link>
    //       <button className="creat account">Creat account?</button>
    //     </div>
    //   </div>
    //   <div className="right">
    //     <img
    //       src="https://via.placeholder.com/600x400" // Replace with your image URL
    //       alt="Meal Platter"
    //     />
    //   </div>
    // </div>

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
          src="G:\Web Dev\react-first\public\meal.jpg"
          alt="Delicious Meal"
          className="food-image"
        />
      </div>
    </div>
  )
}
