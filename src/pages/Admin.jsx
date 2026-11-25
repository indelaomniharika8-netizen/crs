
import { useEffect, useState } from "react";
import { initialCars } from "../data";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState(initialCars);

  useEffect(() => {
    setBookings(JSON.parse(localStorage.getItem("bookings") || "[]"));
  }, []);

  function deleteBooking(id) {
    const updated = bookings.filter(item => item.id !== id);

    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated);
  }

  function addCar() {
    const name = prompt("Enter car name:");
    const price = Number(prompt("Enter price per day:"));

    if (!name || !Number.isFinite(price) || price <= 0) {
      alert("Enter valid car details.");
      return;
    }

    const newCar = {
      id: Date.now(),
      name,
      category: "Sedan",
      price,
      seats: 5,
      fuel: "Petrol",
      transmission: "Manual",
      year: 2026,
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900",
      description: "Newly added vehicle."
    };

    const updated = [...cars, newCar];
    setCars(updated);
    localStorage.setItem("extraCars", JSON.stringify(updated));
  }

  return (
    <main className="page-container">
      <div className="page-heading">
        <span className="eyebrow">ADMIN PANEL</span>
        <h1>Dashboard</h1>
        <p>Manage your car rental demo application.</p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>{cars.length}</h3>
          <p>Total Cars</p>
        </div>
        <div className="stat-card">
          <h3>{bookings.length}</h3>
          <p>Total Bookings</p>
        </div>
        <div className="stat-card">
          <h3>{bookings.filter(b => b.status === "Confirmed").length}</h3>
          <p>Confirmed Bookings</p>
        </div>
      </div>

      <div className="section-heading">
        <h2>Manage Cars</h2>
        <button className="primary-btn" onClick={addCar}>+ Add Car</button>
      </div>

      <div className="section-heading">
        <h2>All Bookings</h2>
      </div>

      <div className="admin-bookings">
        {bookings.map(item => (
          <div className="admin-booking" key={item.id}>
            <div>
              <h3>{item.carName}</h3>
              <p>{item.customerName} · {item.email}</p>
              <p>{item.pickup} to {item.returnDate}</p>
              <p>₹{item.total} · {item.status}</p>
            </div>

            <button
              className="outline-btn"
              onClick={() => deleteBooking(item.id)}
            >
              Delete
            </button>
          </div>
        ))}

        {bookings.length === 0 && <p>No bookings available.</p>}
      </div>
    </main>
  );
}
