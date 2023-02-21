import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About/About";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Contact from "./pages/ContactUs/Contact";
import Home from "./pages/Home/Home";
import Listings from "./pages/Listings/Listings";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import UserProfile from "./pages/Profile/UserProfile";
import ReportDetail from "./pages/ReportDetails/ReportDetail";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id/:uid" element={<ReportDetail />} />

        {/* <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<AboutUs />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
