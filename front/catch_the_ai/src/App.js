import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './Navbar/navbar';
import { ImageDetector } from './image_detector/image-detector';
import { AudioDetector } from './audio_detector/audio_detector';
import { TextDetector } from './Navbar/text_detector/text-detector';
import { Pricing } from './Navbar/pricing/pricing';
import { Footer } from './Footer/Footer';
import { TOS } from './Footer/TOS';
import FAQs from './FAQs/FAQs';
import { PrivacyPolicy } from './Footer/PrivacyPolicy';
import './App.css';
import SignUp from './Sign_Up/SignUp';
import Admin from './Admin/admin'
import Sign_In from './Sign-In/Sign_In';
import FP from './Sign-In/forget_password/FP';
import VP from './Sign-In/password_verification/VP';
import UserProfile from './profile/UserProfile';
import UpdateProfile from './profile/UpdateProfile';
import AdminProfile from './profile/AdminProfile';
import Home from './Home/Home';
import { AboutUs } from './Navbar/AboutUs/AboutUs';


export default class App extends Component {
  render() {
    return (
      <Router>
        <>

          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/image-detector" element={<ImageDetector />} />
            <Route path="/Pricing" element={<Pricing />} />
            <Route path="/audio-detector" element={<AudioDetector />} />
            <Route path="/text-detector" element={<TextDetector />} />
            <Route path="/terms-of-service" element={<TOS />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/FAQs" element={<FAQs />} />
            <Route path="/Sign-In" element={<Sign_In />} />
            <Route path="/FP" element={<FP />} />
            <Route path="/VP" element={<VP />} />

            <Route path="/Sign-Up" element={<SignUp />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/footer" element={<Footer />} />
            <Route index path="/UserProfile" element={<UserProfile />} />
            <Route  path="/UpdateProfile" element={<UpdateProfile />} />
            <Route path="/AdminProfile" element={<AdminProfile />} />
            <Route path ="/AboutUs" element={<AboutUs />} />

          </Routes>
          <Footer />
        </>
      </Router>
    );
  }
}
