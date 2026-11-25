
import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  return (
    <div className="car-card">
      <Link to={`/cars/${car.id}`}>
        <img src={car.image} alt={car.name} />
      </Link>

      <div className="car-content">
        <span className="category">{car.category}</span>
        <h3>{car.name}</h3>

        <div className="car-info">
          <span>{car.seats} Seats</span>
          <span>{car.fuel}</span>
          <span>{car.transmission}</span>
        </div>

        <div className="car-price">
          <h3>₹{car.price} <small>/ day</small></h3>
          <Link to={`/cars/${car.id}`} className="primary-btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
