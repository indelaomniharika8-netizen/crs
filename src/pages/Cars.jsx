
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { getCars } from "../data";
import CarCard from "../components/CarCard";

export default function Cars() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const cars = getCars();

  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => {
      const matchesSearch =
        `${car.name} ${car.brand}`.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || car.category === category;
      return matchesSearch && matchesCategory;
    });

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [cars, search, category, sort]);

  return (
    <main className="cars-page">
      <section className="page-heading">
        <p className="section-label">DRIVEON COLLECTION</p>
        <h1>Find Your Perfect Car</h1>
        <p>Explore our collection and choose your next ride.</p>
      </section>

      <section className="cars-container">
        <div className="filter-bar">
          <div className="search-field">
            <Search size={19} />
            <input
              placeholder="Search cars..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>All</option>
            <option>SUV</option>
            <option>Luxury</option>
            <option>Sedan</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div className="results-count">
          <SlidersHorizontal size={16} /> {filteredCars.length} cars available
        </div>

        <div className="car-grid">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {filteredCars.length === 0 && (
          <p className="empty-state">No cars match your search.</p>
        )}
      </section>
    </main>
  );
}
