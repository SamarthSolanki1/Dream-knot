import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import "../styles/Viewstats.css";

function Viewstats() {
  // Mock Data
  const venueData = [
    { name: "Taj Goa", bookings: 50 },
    { name: "Safari Hotels", bookings: 35 },
    { name: "City Palace", bookings: 60 },
    { name: "Beach Resort", bookings: 45 },
  ];

  const fixedPackageData = [
    { name: "Beach Wedding", value: 60 },
    { name: "Garden Wedding", value: 50 },
    { name: "Royal Palace Wedding", value: 40 },
    { name: "Mountain Retreat", value: 30 },
    { name: "Urban Chic Wedding", value: 35 },
  ];

  const customPackageData = [
    { name: "Venue", value: 100 },
    { name: "Decorations", value: 90 },
    { name: "Photography", value: 80 },
    { name: "Pathway", value: 70 },
    { name: "Catering", value: 95 },
  ];

  const bookingTrendsData = [
    { month: "Jan", fixed: 20, custom: 15 },
    { month: "Feb", fixed: 25, custom: 20 },
    { month: "Mar", fixed: 30, custom: 25 },
    { month: "Apr", fixed: 40, custom: 35 },
    { month: "May", fixed: 50, custom: 40 },
    { month: "Jun", fixed: 55, custom: 45 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 100000 },
    { month: "Feb", revenue: 150000 },
    { month: "Mar", revenue: 200000 },
    { month: "Apr", revenue: 250000 },
    { month: "May", revenue: 300000 },
    { month: "Jun", revenue: 350000 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <div className="viewstats-container">
      <h2 className="heading">Admin Statistics</h2>
      <div className="charts-container">
        {/* Best Venue Chart */}
        <div className="chart-card">
          <h3>Best Venues</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={venueData}>
              <Bar dataKey="bookings" fill="#82ca9d" />
              <Tooltip />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fixed Packages Popularity Chart */}
        <div className="chart-card">
          <h3>Fixed Packages Popularity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fixedPackageData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {fixedPackageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Packages Breakdown */}
        <div className="chart-card">
          <h3>Custom Package Preferences</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customPackageData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
              >
                {customPackageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Trends Chart */}
        <div className="chart-card">
          <h3>Booking Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingTrendsData}>
              <Line type="monotone" dataKey="fixed" stroke="#8884d8" />
              <Line type="monotone" dataKey="custom" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Growth Chart */}
        <div className="chart-card">
          <h3>Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <Area type="monotone" dataKey="revenue" stroke="#82ca9d" fill="#82ca9d" />
              <Tooltip />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Viewstats;
