
import { useEffect, useState } from "react";

export default function MyBookings() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    setBookings(
      allBookings.filter(item => item.email === user?.email)
    );
  }, [user?.email]);

  function cancelBooking(id) {
    const updated = bookings.map(item =>
      item.id === id ? { ...item, status: "Cancelled" } : item
    );

    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    const newAllBookings = allBookings.map(item =>
      item.id === id ? { ...item, status: "Cancelled" } : item
    );

    localStorage.setItem("bookings", JSON.stringify(newAllBookings));
    setBookings(updated);
  }

  return (
    <main className="page-container">
      <div className="page-heading">
        <span className="eyebrow">YOUR ACCOUNT</span>
        <h1>My Bookings</h1>
        <p>Manage your car reservations.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-message">
          <h2>No bookings yet</h2>
          <p>Your bookings will appear here.</p>
        </div>
      ) : (
        <div className="booking-list">
          {bookings.map(item => (
            <div className="booking-item" key={item.id}>
              <img src={item.image} alt={item.carName} />

              <div className="booking-info">
                <h3>{item.carName}</h3>
                <p>Pickup: {item.pickup}</p>
                <p>Return: {item.returnDate}</p>
                <p>Location: {item.location}</p>
                <p>Total: ₹{item.total}</p>
                <span className={item.status === "Cancelled" ? "status cancelled" : "status"}>
                  {item.status}
                </span>
              </div>

              {item.status !== "Cancelled" && (
                <button
                  className="outline-btn"
                  onClick={() => cancelBooking(item.id)}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
