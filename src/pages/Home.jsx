
import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, ArrowRight, ShieldCheck, Clock, CarFront } from "lucide-react";
import { getCars } from "../data";
import CarCard from "../components/CarCard";

export default function Home() {
  const [search, setSearch] = useState("");
  const cars = getCars();

  const filtered = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">PREMIUM CAR RENTALS</p>
          <h1>Find Your Freedom.<br />Drive Your Journey.</h1>
          <p className="hero-description">
            Discover the perfect car for every journey.
            Choose your favourite vehicle and book it easily.
          </p>
          <Link to="/cars" className="hero-button">
            Explore All Cars <ArrowRight size={18} />
          </Link>
        </div>
        <div className="hero-caption">DRIVEON — DRIVE YOUR DREAMS</div>
      </section>

      <section className="benefits">
        <div><CarFront /><span><b>Premium Fleet</b><small>Cars for every journey</small></span></div>
        <div><ShieldCheck /><span><b>Easy Booking</b><small>Simple and convenient</small></span></div>
        <div><Clock /><span><b>24/7 Support</b><small>Here when you need us</small></span></div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <p className="section-label">OUR COLLECTION</p>
            <h2>Explore Our Cars</h2>
            <p>Choose the perfect ride for your next journey.</p>
          </div>
          <Link to="/cars" className="text-link">View All Cars →</Link>
        </div>

        <div className="home-search">
          <Search size={20} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by car name or brand..."
          />
          <Link to="/cars">All Cars →</Link>
        </div>

        <div className="car-grid">
          {filtered.slice(0, 6).map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {filtered.length === 0 && <p className="empty-state">No cars found.</p>}

        <div className="center-button">
          <Link to="/cars" className="outline-button">Explore All Cars</Link>
        </div>
      </section>

      <section className="journey-banner">
        <div>
          <p className="section-label">YOUR NEXT ADVENTURE</p>
          <h2>Make every journey memorable.</h2>
          <p>Find your perfect car and hit the road.</p>
          <Link to="/cars" className="hero-button">Find Your Car <ArrowRight size={18} /></Link>
        </div>
      </section>
    </main>
  );
}
