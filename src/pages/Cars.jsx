
import { useState } from "react";
import { initialCars } from "../data";
import CarCard from "../components/CarCard";

export default function Cars() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredCars = initialCars.filter(car => {
    const matchName = car.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || car.category === category;

    return matchName && matchCategory;
  });

  return (
    <main className="page-container">
      <div className="page-heading">
        <span className="eyebrow">OUR FLEET</span>
        <h1>Explore Our Cars</h1>
        <p>Choose your perfect ride.</p>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search car..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Luxury</option>
          <option>SUV</option>
          <option>Sedan</option>
          <option>Hatchback</option>
        </select>
      </div>

      <div className="car-grid">
        {filteredCars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {filteredCars.length === 0 && (
        <p className="empty-message">No cars found.</p>
      )}
    </main>
  );
}
