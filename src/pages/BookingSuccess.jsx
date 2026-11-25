
import { Link } from "react-router-dom";

export default function BookingSuccess() {
  return (
    <main className="success-container">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Booking Successful!</h1>
        <p>Your demo booking has been saved successfully.</p>

        <Link to="/my-bookings" className="primary-btn">
          View My Bookings
        </Link>

        <Link to="/cars" className="secondary-btn">
          Explore More Cars
        </Link>
      </div>
    </main>
  );
}
