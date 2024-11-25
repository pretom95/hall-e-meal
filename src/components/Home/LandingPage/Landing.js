//import mealImage from './meal.jpg';
import React from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'

export default function Landing({ }) {
  return (
    <div className="nhome-container">
      <div className="nleft-section text-center">
        <h1><b>HALL E MEAL</b></h1>
        <h2>Your friendly dining companion</h2>
        {/* //<div className="button-container"> */}
        <div className='text-center my-5'>
          <Link to={"/signin"} className="">
            <button class="nbutton">
              <b>Sign In</b>
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
        <div className='my-5 text-center'>
          <p class="text-center text-muted mt-5 mb-0"><b>Don't have an account?</b><a href="#!"
            class="fw-bold text-body"><Link to={"/signup"}> &nbsp;Register now</Link></a></p>

        </div>


        {/* </div> */}
      </div>

      <div class="col-sm-6 px-0 d-none d-sm-block">
        <img
          src='./meal.jpg'
          alt="Delicious Meal"
          class="w-100 vh-100" htmlStyle="object-fit: cover; object-position: left;"
        />
      </div>
    </div>
  )
}
