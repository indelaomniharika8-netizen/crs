
import { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { initialCars } from "../data";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const car = initialCars.find(item => item.id === Number(id));
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [pickup, setPickup] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [location, setLocation] = useState("");
  const [payment, setPayment] = useState("Demo UPI");

  if (!user) return <Navigate to="/login" />;
  if (!car) return <Navigate to="/cars" />;

  const today = new Date().toISOString().split("T")[0];

  const days = pickup && returnDate
    ? Math.max(
        0,
        Math.ceil(
          (new Date(returnDate) - new Date(pickup)) /
          (1000 * 60 * 60 * 24)
        )
      )
    : 0;

  const total = days * car.price;

  function handleBooking(e) {
    e.preventDefault();

    if (!pickup || !returnDate || !location) {
      alert("Please fill all booking details.");
      return;
    }

    if (pickup < today || returnDate <= pickup) {
      alert("Please choose valid pickup and return dates.");
      return;
    }

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    const newBooking = {
      id: Date.now(),
      carId: car.id,
      carName: car.name,
      image: car.image,
      email: user.email,
      customerName: user.name,
      pickup,
      returnDate,
      location,
      days,
      total,
      payment,
      status: "Confirmed",
      createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    navigate("/booking-success");
  }

  return (
    <main className="auth-container">
      <form className="booking-card" onSubmit={handleBooking}>
        <span className="eyebrow">RESERVE YOUR RIDE</span>
        <h1>Book {car.name}</h1>

        <img className="booking-image" src={car.image} alt={car.name} />

        <label>Pickup Date</label>
        <input
          type="date"
          min={today}
          value={pickup}
          onChange={e => setPickup(e.target.value)}
          required
        />

        <label>Return Date</label>
        <input
          type="date"
          min={pickup || today}
          value={returnDate}
          onChange={e => setReturnDate(e.target.value)}
          required
        />

        <label>Pickup Location</label>
        <input
          placeholder="Enter pickup location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
        />

        <label>Demo Payment Method</label>
        <select value={payment} onChange={e => setPayment(e.target.value)}>
          <option>Demo UPI</option>
          <option>Demo Card</option>
          <option>Pay at Pickup (Demo)</option>
        </select>

        <div className="price-summary">
          <p>Price per day: ₹{car.price}</p>
          <p>Rental days: {days}</p>
          <h2>Total: ₹{total}</h2>
        </div>

        <button className="primary-btn full-btn" type="submit">
          Confirm Demo Booking
        </button>

        <p className="demo-note">
          Demo only. No actual payment will be collected.
        </p>
      </form>
    </main>
  );
}
