
import { Link } from "react-router-dom";
import CarCard from "../components/CarCard";
import { initialCars } from "../data";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">PREMIUM CAR RENTALS</span>
          <h1>Find Your Freedom.<br /><span>Drive Your Journey.</span></h1>
          <p>
            Discover the perfect car for every journey.
            Book your favourite vehicle with ease.
          </p>

          <Link to="/cars" className="primary-btn">
            Explore Cars →
          </Link>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200"
            alt="Luxury car"
          />
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">OUR COLLECTION</span>
            <h2>Featured Cars</h2>
          </div>
          <Link to="/cars">View All →</Link>
        </div>

        <div className="car-grid">
          {initialCars.slice(0, 3).map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      <section className="why-section">
        <h2>Why Choose DRIVEON?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Easy Booking</h3>
            <p>Book your preferred car in just a few steps.</p>
          </div>
          <div className="feature-card">
            <h3>Affordable Prices</h3>
            <p>Choose from different cars and rental prices.</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Support</h3>
            <p>Access your booking details whenever you need.</p>
          </div>
        </div>
      </section>
    </>
  );
}
