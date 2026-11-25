
import { useState } from "react";
import { Link } from "react-router-dom";

export default function MyBookings() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [bookings, setBookings] = useState(() => {
    const all = JSON.parse(localStorage.getItem("bookings") || "[]");
    return user ? all.filter((b) => b.userEmail === user.email) : [];
  });

  function cancelBooking(id) {
    const updatedAll = JSON.parse(localStorage.getItem("bookings") || "[]")
      .map((b) => b.id === id ? { ...b, status: "Cancelled" } : b);

    localStorage.setItem("bookings", JSON.stringify(updatedAll));
    setBookings(updatedAll.filter((b) => b.userEmail === user.email));
  }

  if (!user) {
    return <main className="empty-state"><h2>Please login to view bookings.</h2><Link to="/login">Login</Link></main>;
  }

  return (
    <main className="my-bookings-page">
      <div className="page-heading">
        <p className="section-label">YOUR JOURNEYS</p>
        <h1>My Bookings</h1>
        <p>Manage and view your reservations.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <h2>No bookings yet</h2>
          <p>Find a car for your next journey.</p>
          <Link to="/cars" className="primary-button">Explore Cars</Link>
        </div>
      ) : (
        <div className="booking-list">
          {bookings.map((b) => (
            <article className="booking-card" key={b.id}>
              <img src={b.carImage} alt={b.carName} />
              <div className="booking-card-info">
                <h3>{b.carName}</h3>
                <p>{b.pickup} to {b.dropoff}</p>
                <p>{b.days} day(s) · {b.location}</p>
                <strong>₹{b.total.toLocaleString("en-IN")}</strong>
                <span className={b.status === "Cancelled" ? "status cancelled" : "status"}>{b.status}</span>
              </div>
              {b.status !== "Cancelled" && (
                <button className="cancel-button" onClick={() => cancelBooking(b.id)}>Cancel Booking</button>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
