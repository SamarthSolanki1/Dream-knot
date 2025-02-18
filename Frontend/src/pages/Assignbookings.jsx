import React, { useEffect, useState } from 'react';
import api from '../api';
import "../styles/AssignCustomBookings.css";

const AssignCustomBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/api/custom-bookings');
        setBookings(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employee');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAssignClick = (booking) => {
    setSelectedBooking(booking);
    fetchEmployees();
    setShowModal(true);
  };

  const assignEmployee = async (employeeId) => {
    if (!selectedBooking) return;
    try {
      console.log(employeeId);
      await api.put(`/api/custom-bookings/${selectedBooking.id}/assign-employee/${employeeId}`);
      alert('Employee assigned successfully!');
      setShowModal(false);
      
      // Update the assigned employee in the bookings list
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === selectedBooking.id ? { ...booking, employee: employees.find(emp => emp.id === employeeId) } : booking
        )
      );
    } catch (error) {
      console.error('Error assigning employee:', error);
      alert('Assignment failed. Try again!');
    }
  };

  return (
    <div className="assign-bookings-container">
      <h2 className="assign-bookings-title">Assign Custom Bookings</h2>
      <div className="assign-bookings-table-container">
        <table className="assign-bookings-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Venue</th>
              <th>Event Date</th>
              <th>Status</th>
              <th>Assigned Employee</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.user.name} ({booking.user.email})</td>
                  <td>{booking.customVenue.name}</td>
                  <td>{booking.eventDate.join('-')}</td>
                  <td className={booking.status === 'Pending' ? 'pending' : 'confirmed'}>
                    {booking.status}
                  </td>
                  <td className="assigned">
                    {booking.employee ? booking.employee.name : "Not Assigned"}
                  </td>
                  <td>
                    <button className="assign-btn" onClick={() => handleAssignClick(booking)}>
                      Assign to Employee
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-bookings">No bookings are there</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="modal-header">Select an Employee</h3>
            <div className="employee-list">
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <div
                    key={employee.id}
                    className="employee-item"
                    onClick={() => assignEmployee(employee.id)}
                  >
                    {employee.name} ({employee.role})
                  </div>
                ))
              ) : (
                <p>No employees available</p>
              )}
            </div>
            <button className="close-modal" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignCustomBookings;
