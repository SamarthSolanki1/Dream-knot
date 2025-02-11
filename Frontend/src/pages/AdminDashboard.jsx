import React from "react";
import "../styles/AdminDashboard.css";
import { Users, CalendarCheck, Briefcase,ChartNoAxesCombined } from "lucide-react";
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
    const handleviewbookings = () => {
        navigate('Viewbookings');
    }
    const handlestats = () => {
        navigate('Viewstats');
    }
    const handlecustombookings = () => {
        navigate('Assignbookings');
    }

    return (
        <div className="admin-dashboard">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            
            {/* Statistics Section */}
            <div className="dashboard-stats">
                <div className="stat-card" onClick={handleusers}>
                    <Users size={32} />
                    <h2>View Users</h2>
                 
                </div>
                <div className="stat-card" onClick={handleviewbookings}>
                    <CalendarCheck size={32} />
                    <h2>View Bookings</h2>
                   
                </div>
                <div className="stat-card" onClick={handleemployee}>
                    <Briefcase size={32} />
                    <h2>View Employees</h2>
              
                </div>
                <div className="stat-card" onClick={handlecustombookings}>
                    <Briefcase size={32} />
                    <h2>Assign Custom Bookings</h2>
                 
                </div>
                <div className="stat-card" onClick={handlestats}>
                    <ChartNoAxesCombined size={32} />
                    <h2>View Stats</h2>
                 
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
