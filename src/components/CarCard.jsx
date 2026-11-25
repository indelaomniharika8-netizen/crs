
import { Link } from "react-router-dom";
import { Users, Settings2, Fuel, Star } from "lucide-react";

export default function CarCard({ car }) {
  return (
    <article className="car-card">
      <Link to={`/cars/${car.id}`} className="car-image-wrap">
        <img src={car.image} alt={car.name} className="car-image"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900";
          }}
        />
        <span className="car-category">{car.category}</span>
      </Link>

      <div className="car-card-body">
        <div className="car-rating">
          <Star size={15} fill="currentColor" /> {car.rating || "4.8"}
        </div>

        <p className="car-kicker">DRIVEON COLLECTION</p>
        <h3>{car.name}</h3>

        <div className="car-specs">
          <span><Users size={16} /> {car.seats} Seats</span>
          <span><Settings2 size={16} /> {car.transmission}</span>
          <span><Fuel size={16} /> {car.fuel}</span>
        </div>

        <div className="car-card-bottom">
          <p><strong>₹{Number(car.price).toLocaleString("en-IN")}</strong> / day</p>
          <Link to={`/cars/${car.id}`}>Details →</Link>
        </div>

        <Link to={`/booking/${car.id}`} className="book-button">Book Now</Link>
      </div>
    </article>
  );
}
