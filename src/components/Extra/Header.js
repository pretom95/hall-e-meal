import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top komola">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand wel" href="#">Welcome User</a>
        <div className="collapse navbar-collapse mine" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0 nav nav-tabs">
            <li className="nav-item active">
              <Link to="/student" className="nav-link"><b>Home</b></Link>
            </li>
            <li className="nav-item">
              <Link to="/schedule" className="nav-link"><b>Schedule</b></Link>
            </li>
            <li className="nav-item">
              <Link to="/notifications" className="nav-link"><b>Notifications</b></Link>
            </li>
            <li className="nav-item">
              <Link to="/history" className="nav-link"><b>Meal History</b></Link>
            </li>
            <li className="nav-item">
              <Link to="/billing" className="nav-link"><b>Make Payment</b></Link>
            </li>
            <li className="nav-item">
              <Link to="/editProfile" className="nav-link"><b>Edit Profile</b></Link>
            </li>
            <li className="nav-item">
              <Link to="/signin" className="nav-link"><b>Log out</b></Link>
            </li>
          </ul>
        </div>
      </nav>
  )
}
