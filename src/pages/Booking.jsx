
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCars } from "../data";
import Coupon from "../components/Coupon";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = getCars().find((item) => String(item.id) === id);

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [location, setLocation] = useState("");
  const [payment, setPayment] = useState("UPI");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");

  const days = useMemo(() => {
    if (!pickup || !dropoff) return 0;
    const start = new Date(`${pickup}T00:00:00`);
    const end = new Date(`${dropoff}T00:00:00`);
    return Math.max(0, Math.ceil((end - start) / 86400000));
  }, [pickup, dropoff]);

  if (!car) return <div className="empty-state">Car not found. <Link to="/cars">Browse cars</Link></div>;

  const subtotal = days * car.price;
  const total = subtotal - Math.round(subtotal * discount / 100);

  function confirmBooking(e) {
    e.preventDefault();
    setError("");

    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
      navigate("/login");
      return;
    }

    if (!pickup || !dropoff || days < 1 || !location.trim()) {
      setError("Please select valid dates and enter your pickup location.");
      return;
    }

    const booking = {
      id: Date.now(),
      carId: car.id,
      carName: car.name,
      carImage: car.image,
      price: car.price,
      pickup,
      dropoff,
      days,
      location,
      payment,
      discount,
      total,
      userEmail: user.email,
      status: "Confirmed",
      createdAt: new Date().toISOString()
    };

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    localStorage.setItem("lastBooking", JSON.stringify(booking));

    navigate("/booking-success");
  }

  return (
    <main className="booking-page">
      <div className="page-heading">
        <p className="section-label">RESERVE YOUR RIDE</p>
        <h1>Complete Your Booking</h1>
        <p>You're one step away from your next journey.</p>
      </div>

      <div className="booking-layout">
        <form className="booking-form" onSubmit={confirmBooking}>
          <h2>Booking Details</h2>

          <label>Pickup Date</label>
          <input type="date" value={pickup} min={new Date().toISOString().split("T")[0]} onChange={(e) => setPickup(e.target.value)} required />

          <label>Return Date</label>
          <input type="date" value={dropoff} min={pickup || new Date().toISOString().split("T")[0]} onChange={(e) => setDropoff(e.target.value)} required />

          <label>Pickup Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter pickup location" required />

          <label>Payment Method</label>
          <select value={payment} onChange={(e) => setPayment(e.target.value)}>
            <option>UPI</option>
            <option>Credit / Debit Card (Demo)</option>
            <option>Pay at Pickup</option>
          </select>

          <Coupon onApply={setDiscount} />

          {error && <p className="auth-error">{error}</p>}

          <button className="primary-button" type="submit">Confirm Booking</button>
        </form>

        <aside className="booking-summary">
          <img src={car.image} alt={car.name} />
          <h2>{car.name}</h2>
          <p>₹{car.price.toLocaleString("en-IN")} / day</p>
          <div className="summary-line"><span>Rental days</span><b>{days}</b></div>
          <div className="summary-line"><span>Subtotal</span><b>₹{subtotal.toLocaleString("en-IN")}</b></div>
          <div className="summary-line"><span>Discount</span><b>{discount}%</b></div>
          <div className="summary-total"><span>Total</span><strong>₹{total.toLocaleString("en-IN")}</strong></div>
          <small>Demo payment only. No real payment is processed.</small>
        </aside>
      </div>
    </main>
  );
}
