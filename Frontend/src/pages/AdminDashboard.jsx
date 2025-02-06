import React from "react";
import "../styles/AdminDashboard.css";
import { Users, CalendarCheck, Briefcase } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { ChartComponent } from "../components/Areachart" // Import the Chart Component

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleusers = () => {
        navigate('Viewusers');
    };

    const handleemployee = () => {
        navigate('Viewemployee');
    };

    return (
        <div className="admin-dashboard">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            
            {/* Statistics Section */}
            <div className="dashboard-stats">
                <div className="stat-card" onClick={handleusers}>
                    <Users size={32} />
                    <h2>View Users</h2>
                    <p>120</p>
                </div>
                <div className="stat-card">
                    <CalendarCheck size={32} />
                    <h2>View Bookings</h2>
                    <p>45</p>
                </div>
                <div className="stat-card" onClick={handleemployee}>
                    <Briefcase size={32} />
                    <h2>View Employees</h2>
                    <p>25</p>
                </div>
                <div className="stat-card">
                    <Briefcase size={32} />
                    <h2>Assign Custom Bookings</h2>
                    <p>25</p>
                </div>
            </div>

            {/* Monthly Bookings Chart */}
            <div className="dashboard-section">
                <h2>Bookings Trend</h2>
                <ChartComponent /> {/* Replaces the Recent Bookings Table */}
            </div>
        </div>
    );
};

export default AdminDashboard;
