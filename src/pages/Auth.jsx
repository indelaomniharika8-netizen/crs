
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const isRegister = location.pathname === "/register";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (isRegister) {
      if (users.some((u) => u.email === email)) {
        setError("This email is already registered.");
        return;
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role: "user"
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify({
        id: newUser.id,
        name,
        email,
        role: "user"
      }));
      navigate("/");
      return;
    }

    // Demo admin login
    if (email === "admin@driveon.com" && password === "admin123") {
      const admin = {
        id: "admin",
        name: "Admin",
        email,
        role: "admin"
      };
      localStorage.setItem("user", JSON.stringify(admin));
      navigate("/admin");
      return;
    }

    const found = users.find((u) => u.email === email && u.password === password);

    if (!found) {
      setError("Incorrect email or password.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({
      id: found.id,
      name: found.name,
      email: found.email,
      role: "user"
    }));

    navigate("/");
  }

  return (
    <main className="auth-modern">
      <section className="auth-showcase">
        <Link to="/" className="auth-logo">DRIVEON<span>.</span></Link>
        <div className="auth-showcase-text">
          <span>THE DRIVEON EXPERIENCE</span>
          <h1>Your journey.<br />Your freedom.</h1>
          <p>Discover premium cars and make every journey memorable.</p>
          <div className="auth-showcase-line" />
          <small>PREMIUM CAR RENTALS</small>
        </div>
        <div className="auth-showcase-footer">DRIVEON — DRIVE YOUR DREAMS</div>
      </section>

      <section className="auth-form-side">
        <div className="auth-form-card">
          <p className="section-label">WELCOME TO DRIVEON</p>
          <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>
          <p className="auth-subtitle">
            {isRegister ? "Register to start your journey with us." : "Log in to continue your journey."}
          </p>

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="auth-input-group">
                <label>Full Name</label>
                <div className="auth-input-wrap">
                  <User size={19} />
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" required />
                </div>
              </div>
            )}

            <div className="auth-input-group">
              <label>Email Address</label>
              <div className="auth-input-wrap">
                <Mail size={19} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Password</label>
              <div className="auth-input-wrap">
                <Lock size={19} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" minLength={6} required />
              </div>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button className="auth-submit" type="submit">
              {isRegister ? "Create Account" : "Login"} <ArrowRight size={18} />
            </button>
          </form>

          <p className="auth-switch">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <Link to={isRegister ? "/login" : "/register"}>
              {isRegister ? " Login" : " Sign Up"}
            </Link>
          </p>

          {!isRegister && (
            <p className="demo-admin">
              Demo admin: admin@driveon.com / admin123
            </p>
          )}

          <Link to="/" className="auth-back">← Back to Home</Link>
        </div>
        <p className="auth-copyright">© 2026 DRIVEON. All rights reserved.</p>
      </section>
    </main>
  );
}
