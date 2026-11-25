
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link to="/" className="brand footer-brand">DRIVEON<span>.</span></Link>
          <p>Your journey starts with the right car.</p>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/cars">Our Cars</Link>
          <Link to="/my-bookings">My Bookings</Link>
        </div>

        <div>
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Create Account</Link>
        </div>

        <div>
          <h4>Contact</h4>
          <p>Email: support@driveon.com</p>
          <p>Available 24/7</p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 DRIVEON. All rights reserved.
      </div>
    </footer>
  );
}
