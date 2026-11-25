
import { useParams, Link, Navigate } from "react-router-dom";
import { initialCars } from "../data";

export default function CarDetails() {
  const { id } = useParams();

  const car = initialCars.find(item => item.id === Number(id));

  if (!car) return <Navigate to="/cars" />;

  return (
    <main className="details-container">
      <img src={car.image} alt={car.name} />

      <div className="details-content">
        <span className="category">{car.category}</span>
        <h1>{car.name}</h1>
        <p>{car.description}</p>

        <div className="details-grid">
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Seats:</strong> {car.seats}</p>
          <p><strong>Fuel:</strong> {car.fuel}</p>
          <p><strong>Transmission:</strong> {car.transmission}</p>
        </div>

        <h2>₹{car.price} / day</h2>

        <Link to={`/booking/${car.id}`} className="primary-btn">
          Book This Car
        </Link>
      </div>
    </main>
  );
}
