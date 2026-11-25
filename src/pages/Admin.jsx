
import { useState } from "react";
import { getCars } from "../data";
import { Link } from "react-router-dom";

export default function Admin() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [cars, setCars] = useState(getCars());
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("SUV");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  if (user?.role !== "admin") {
    return <main className="empty-state"><h2>Admin access required</h2><Link to="/login">Login as admin</Link></main>;
  }

  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  function addCar(e) {
    e.preventDefault();

    const extra = JSON.parse(localStorage.getItem("extraCars") || "[]");
    const newCar = {
      id: Date.now(),
      name,
      brand,
      price: Number(price),
      category,
      seats: 5,
      transmission: "Automatic",
      fuel: "Petrol",
      rating: 4.8,
      image: image || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900",
      description: `Experience the ${name}.`
    };

    const updated = [...extra, newCar];
    localStorage.setItem("extraCars", JSON.stringify(updated));
    setCars(getCars());
    setName("");
    setBrand("");
    setPrice("");
    setImage("");
    setMessage("Car added successfully!");
  }

  function deleteCar(id) {
    const extra = JSON.parse(localStorage.getItem("extraCars") || "[]");
    localStorage.setItem("extraCars", JSON.stringify(extra.filter((c) => c.id !== id)));
    setCars(getCars());
  }

  return (
    <main className="admin-page">
      <div className="page-heading">
        <p className="section-label">DRIVEON MANAGEMENT</p>
        <h1>Admin Dashboard</h1>
        <p>Manage your vehicle collection and bookings.</p>
      </div>

      <div className="admin-stats">
        <div><span>Total Cars</span><strong>{cars.length}</strong></div>
        <div><span>Total Bookings</span><strong>{bookings.length}</strong></div>
        <div><span>Confirmed</span><strong>{bookings.filter((b) => b.status === "Confirmed").length}</strong></div>
      </div>

      <section className="admin-form-section">
        <h2>Add a New Car</h2>
        <form className="admin-form" onSubmit={addCar}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Car name" required />
          <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" required />
          <input type="number" min="1" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price per day" required />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>SUV</option><option>Luxury</option><option>Sedan</option>
          </select>
          <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Car image URL (optional)" />
          <button className="primary-button">Add Car</button>
        </form>
        {message && <p className="success-message">{message}</p>}
      </section>

      <section className="admin-cars">
        <h2>Manage Cars</h2>
        {cars.map((car) => (
          <div className="admin-car-row" key={car.id}>
            <img src={car.image} alt={car.name} />
            <div><b>{car.name}</b><p>₹{car.price} / day</p></div>
            {car.id > 6 && <button className="cancel-button" onClick={() => deleteCar(car.id)}>Delete</button>}
          </div>
        ))}
      </section>
    </main>
  );
}
