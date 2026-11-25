
import { Link, useParams } from "react-router-dom";
import { Users, Settings2, Fuel, Star, ArrowLeft } from "lucide-react";
import { getCars } from "../data";
import { addRecentlyViewed } from "../utils/recentlyViewed";
import Reviews from "../components/Reviews";

export default function CarDetails() {
  const { id } = useParams();
  const car = getCars().find((item) => String(item.id) === id);

  if (!car) {
    return <div className="empty-state">Car not found. <Link to="/cars">Back to cars</Link></div>;
  }

  addRecentlyViewed(car);

  return (
    <main className="details-page">
      <Link to="/cars" className="back-link"><ArrowLeft size={17} /> Back to Cars</Link>

      <div className="details-layout">
        <div className="details-image">
          <img src={car.image} alt={car.name} />
        </div>

        <div className="details-info">
          <p className="section-label">DRIVEON COLLECTION</p>
          <h1>{car.name}</h1>
          <p className="details-rating"><Star size={17} fill="currentColor" /> {car.rating} Customer Rating</p>
          <p className="details-description">{car.description}</p>

          <div className="details-specs">
            <span><Users /> {car.seats} Seats</span>
            <span><Settings2 /> {car.transmission}</span>
            <span><Fuel /> {car.fuel}</span>
          </div>

          <div className="details-price">
            <strong>₹{car.price.toLocaleString("en-IN")}</strong> / day
          </div>

          <Link to={`/booking/${car.id}`} className="book-button">Book This Car</Link>
        </div>
      </div>

      <Reviews carId={car.id} />
    </main>
  );
}
