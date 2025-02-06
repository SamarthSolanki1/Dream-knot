import * as React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "Jan", bookings: 20 },
  { month: "Feb", bookings: 35 },
  { month: "Mar", bookings: 50 },
  { month: "Apr", bookings: 42 },
  { month: "May", bookings: 60 },
  { month: "Jun", bookings: 80 },
  { month: "Jul", bookings: 90 },
  { month: "Aug", bookings: 75 },
  { month: "Sep", bookings: 65 },
  { month: "Oct", bookings: 70 },
  { month: "Nov", bookings: 85 },
  { month: "Dec", bookings: 95 },
];

export function ChartComponent() {
  console.log(chartData);
  return (
    <div 
      style={{ 
        border: "1px solid #ddd", 
        borderRadius: "8px", 
        backgroundColor: "#fff", 
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
        padding: "20px", 
        margin: "20px" 
      }} 
    > 
      <div 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          borderBottom: "1px solid #eee", 
          paddingBottom: "10px" 
        }}
      >
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>Monthly Bookings Overview</h2>
          <p style={{ fontSize: "14px", color: "#666" }}>Number of bookings made per month</p>
        </div>
      </div>
      <div style={{ width:"1300px", height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillBookings" x1="1" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#84d885" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fill: "#333" }} />
            <YAxis />
            <Tooltip />
            <Area
              dataKey="bookings"
              type="monotone"
              fill="url(#fillBookings)"
              stroke="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}  
