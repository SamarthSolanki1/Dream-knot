import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/Searchbar";
import Dropdown from "../components/DropDown";
import Cards from "../components/Card";
import Login from "../pages/login.jsx"
import Sign from "../pages/Signin.jsx"
import CardDetails from "../components/CardDetail";
import Customer from "./Customer";
import "../styles/Home.css";
import Landing from "../components/Landing"
import TestimonialSection from "../components/Testimonial";

const HomePage = () => {
  return (
    <Router>
      <div className="home">
        <Header />
        <main className="main-content">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  {/* Search Bar */}
                

                  {/* Categories Dropdown */}
                 

                  {/* Cards Section */}
                 <Landing />
                 <TestimonialSection />
                </>
              }
            />
            
              
            {/* Card Details Page */}
            <Route path="/cards/:cardId" element={<CardDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Sign />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/cards/:cardId" element={<CardDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default HomePage;
