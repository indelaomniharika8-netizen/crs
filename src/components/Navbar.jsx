
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  }

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        DRIVE<span>ON.</span>
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/cars">Cars</Link>
        {user && <Link to="/my-bookings">My Bookings</Link>}
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      </nav>

      <div className="nav-actions">
        {user ? (
          <>
            <span>{user.name}</span>
            <button onClick={logout} className="outline-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="primary-btn">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
}
