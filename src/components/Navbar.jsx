
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, UserCircle } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  function logout() {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  }

  return (
    <header className="navbar">
      <Link to="/" className="brand">DRIVEON<span>.</span></Link>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X /> : <Menu />}
      </button>

      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/cars" onClick={() => setMenuOpen(false)}>Our Cars</Link>
        {user && <Link to="/my-bookings" onClick={() => setMenuOpen(false)}>My Bookings</Link>}
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}

        {user ? (
          <div className="nav-user">
            <UserCircle size={18} />
            <span>{user.name}</span>
            <button className="nav-login" onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="nav-actions">
            <Link to="/login" className="login-link">Login</Link>
            <Link to="/register" className="signup-link">Sign Up</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
