
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function BookingSuccess() {
  const booking = JSON.parse(localStorage.getItem("lastBooking") || "null");

  return (
    <main className="success-page">
      <CheckCircle size={70} />
      <p className="section-label">BOOKING CONFIRMED</p>
      <h1>Your journey begins here!</h1>
      <p>Your booking has been saved successfully.</p>

      {booking && (
        <div className="success-card">
          <h3>{booking.carName}</h3>
          <p>Pickup: {booking.pickup}</p>
          <p>Return: {booking.dropoff}</p>
          <p>Duration: {booking.days} day(s)</p>
          <h2>₹{booking.total.toLocaleString("en-IN")}</h2>
          <p>Booking ID: {booking.id}</p>
        </div>
      )}

      <Link to="/my-bookings" className="primary-button">View My Bookings</Link>
      <Link to="/cars" className="text-link">Continue Exploring Cars →</Link>
    </main>
  );
}
