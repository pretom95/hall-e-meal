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
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0 nav nav-tabs" id="nav-tab" role="tablist">
            <li className="nav-item active">
              <Link to="/student" className="nav-item nav-link " id="nav-home-tab" ><b>Home</b></Link>
            </li>
            <li className="nav-item active">
              <Link to="/schedule" className="nav-item nav-link " id="nav-home-tab"><b>Schedule</b></Link>
            </li>
            <li className="nav-item">
              <Link to="/notifications" className="nav-item nav-link " id="nav-home-tab"><b>Notice</b></Link>
            </li>
            <li className="nav-item">
              <Link to="/history" className="nav-item nav-link " id="nav-home-tab"><b>Meal History</b></Link>
            </li>
            <li className="nav-item">
              <Link to="/billing" className="nav-item nav-link " id="nav-home-tab"><b>Bill Details</b></Link>
            </li>
            <li className="nav-item">
              <Link to="/editProfile" className="nav-item nav-link " id="nav-home-tab"><b>Edit Profile</b></Link>
            </li>
            <li className="nav-item">
              <a href="/signin" className="nav-item nav-link " id="nav-home-tab"><b>Log out</b></a>
            </li>
          </ul>
        </div>
      </nav>
  )
}
