import React, {useRef} from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from "./components/Home/LandingPage/Landing";
import SignIn from "./components/Home/SignInPage/SignIn";
import SignUp from "./components/Home/SignUpPage/SignUp";
import StdDashboard from "./components/Home/Dashoboard/Student/StdDashboard";
import MgrDashboard from "./components/Home/Dashoboard/Manager/MgrDashboard";
import Billing from "./components/Home/Billing/Billing";
import Schedule from "./components/Home/Schedule/Schedule";
import History from "./components/Home/History/History";
import NotificationPage from "./components/Home/NotificationPage/NotificationPage";
import EditProfile from "./components/Home/EditProfile/EditProfile";
import Header from "./components/Extra/Header";
import AdminDashboard from "./components/Home/Dashoboard/Admin/AdminDashboard";
import AdminHeader from "./components/Extra/AdminHeader";
import AdminMealManager from "./components/Home/Dashoboard/Admin/AdminMealManager";
import AdminMealOverview from "./components/Home/Dashoboard/Admin/AdminMealOverview";
import TotalSale from "./components/Home/Dashoboard/Admin/TotalSale";
import AdminEdit from "./components/Home/Dashoboard/Admin/AdminEdit";

function App() {
  const ref = useRef();
  return (
    <Router basename='/'>
      <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/mgrdashboard" element={<><Header/><MgrDashboard/></>}/>
          <Route path="/admin/home" element={<><AdminHeader /><AdminDashboard /></>}/>
          <Route path="/admin/manager" element={<><AdminHeader /><AdminMealManager/></>}/>
          <Route path="/admin/overview" element={<><AdminHeader /><AdminMealOverview/></>}/>
          <Route path="/admin/sale" element={<><AdminHeader /><TotalSale/></>}/>
          <Route path="/admin/editAdmin" element={<><AdminHeader /><AdminEdit/></>}/>
          <Route path="/dashboard/student" element={<><Header /><StdDashboard /></>} />
          <Route path="/dashboard/schedule" element={<Schedule/>} />
          <Route path="/dashboard/notifications" element={<><Header /><NotificationPage /></>} />
          <Route path="/dashboard/history" element={<><Header /><History /></>} />
          <Route path="/dashboard/billing" element={<><Header /><Billing /></>} />
          <Route path="/dashboard/editProfile" element={<><Header /><EditProfile /></>} />
          
        
      </Routes>
    </Router>
  );
}
export default App;
