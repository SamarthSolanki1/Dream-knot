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
import "../styles/Home.css";

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
                  <section className="search-section">
                    <SearchBar />
                  </section>

                  {/* Categories Dropdown */}
                  <section className="categories-section">
                    <Dropdown />
                  </section>

                  {/* Cards Section */}
                  <section className="cards-section">
                    <h2>Featured Wedding Plans</h2>
                    <Cards />
                  </section>
                </>
              }
            />

            {/* Card Details Page */}
            <Route path="/cards/:cardId" element={<CardDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/signin" element={<Sign />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default HomePage;
