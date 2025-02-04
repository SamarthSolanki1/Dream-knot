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
import CustomWedding from "../pages/CustomWedding";  
import MyBookings from "../pages/MyBookings";
import EmployeeDashboard from "./EmployeeDashboard";
import VenueDetails from '../pages/VenueDetails';
import MandapDetails from '../pages/MandapDetails';
import EntranceDetails from '../pages/EntranceDetails';
import PathwayDetails from '../pages/PathwayDetails';
import DiningDetails from '../pages/DiningDetails';
import LightingDetails from '../pages/LightningDetails.jsx';
import AddDetails from "./AddDetails";
import EmployeeBookings from "../pages/EmployeeBookings";

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
            <Route path="/customwedding" element={<CustomWedding />} />
            <Route path="/Employeebookings" element={<EmployeeBookings />} />
            <Route path = "/bookings" element= {<MyBookings />} />

            <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
            <Route path="/EmployeeDashboard/venue-details" element={<VenueDetails />} />
            <Route path="/EmployeeDashboard/mandap-details" element={<MandapDetails />} />
            <Route path="/EmployeeDashboard/entrance-details" element={<EntranceDetails />} />
            <Route path="/EmployeeDashboard/pathway-details" element={<PathwayDetails />} />
            <Route path="/EmployeeDashboard/dining-details" element={<DiningDetails />} />
            <Route path="/EmployeeDashboard/lighting-details" element={<LightingDetails />} />
            <Route path="/employee/:cardId" element={<AddDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const CardDetailsWrapper = () => {
  const { cardId } = useParams();

  if (cardId === "5") {
    return <Navigate to="/customwedding" />;
  }

  return <CardDetails />;
};

export default HomePage;
