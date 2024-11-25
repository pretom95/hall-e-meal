import React, {useRef} from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from "./components/Home/LandingPage/Landing";
import SignIn from "./components/Home/SignInPage/SignIn";
import SignUp from "./components/Home/SignUpPage/SignUp";
import Dashboard from "./components/Home/Dashoboard/Student/StdDashboard";
import StdDashboard from "./components/Home/Dashoboard/Student/StdDashboard";
import MgrDashboard from "./components/Home/Dashoboard/Manager/MgrDashboard";
import Billing from "./components/Home/Billing/Billing";
import Schedule from "./components/Home/Schedule/Schedule";
import History from "./components/Home/History/History";
import NotificationPage from "./components/Home/NotificationPage/NotificationPage";
import EditProfile from "./components/Home/EditProfile/EditProfile";
import Header from "./components/Extra/Header";

function App() {
  const ref = useRef();
  return (
    <>
    <Router basename='/'>
      <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/mgrdashboard" element={<MgrDashboard/>}/>
          <Route path="/billing" element={<Billing/>}/>
          <Route path="/schedule" element={<Schedule/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="/notifications" element={<NotificationPage/>}/>
          <Route path="/editProfile" element={<EditProfile/>}/>
        
      </Routes>
    </Router>
    <Router basename="/dashboard">
        <Routes>
          <Route path="/student" element={<><Header/><StdDashboard/></>}/>
          <Route path="/manager" element={<MgrDashboard/>}/>
          <Route path="/schedule" element={<><Header/><Schedule/></>}/>
          <Route path="/notifications" element={<><Header/><NotificationPage/></>}/>
          <Route path="/history" element={<><Header/><History/></>}/>
          <Route path="/billing" element={<><Header/><Billing/></>}/>
          <Route path="/editProfile" element={<><Header/><EditProfile/></>}/>
      </Routes>
    </Router>
    </>
  );
}
export default App;
