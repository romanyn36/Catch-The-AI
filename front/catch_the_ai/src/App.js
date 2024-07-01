import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/navbar';

import TextDetector from './Navbar/text_detector/text-detector';
import Pricing from './Navbar/pricing/pricing';
import { Footer } from './Footer/Footer';
import TOS from './Footer/TOS';
import FAQs from './FAQs/FAQs';
import PrivacyPolicy from './Footer/PrivacyPolicy';
import './App.css';
import SignUp from './Sign_Up/SignUp';
import SignIn from './Sign-In/Sign_In';
import FP from './Sign-In/forget_password/ForgetPassword';
import VP from './Sign-In/password_verification/VP';
import UserProfile from './profile/UserProfile';
import UpdateProfile from './profile/UpdateProfile';
import Home from './Home/Home';
import AboutUs from './Navbar/AboutUs/AboutUs';
import UserHistory from './profile/history/UserHistory';
import DetectedMedia from './profile/history/DetectedMedia';
import EmailActivation from './Sign_Up/EmailActivation/EmailActivation';
import ResetPassword from './Sign-In/ResetPassword/ResetPassword';
import SuccessfullyResetPassword from './Sign-In/ResetPassword/SuccessfullyResetPassword';
import ContactUs from './Navbar/ContactUs/ContactUs';
import Dashboard from './Dashboard/Dashboard';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/text-detector" element={<TextDetector />} />
          <Route path="/terms-of-service" element={<TOS />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route path="/Sign-In" element={<SignIn />} />
          <Route path="/FP" element={<FP />} />
          <Route path="/VP" element={<VP />} />
          <Route path="/Sign-Up" element={<SignUp />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/UserProfile/:username" element={<UserProfile />} />
          <Route path="/UpdateProfile" element={<UpdateProfile />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/UserHistory" element={<UserHistory />} />
          <Route path="/DetectedMedia/:media_id" element={<DetectedMedia />} />
          <Route path="/EmailActivation/:username" element={<EmailActivation />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/SuccessfullyResetPassword" element={<SuccessfullyResetPassword />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="*" element={<div className='container' style={{ backgroundColor: "#e6d1d0" }}><h1>this page Not Found</h1></div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;