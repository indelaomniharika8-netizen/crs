
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

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
      if (users.some(user => user.email === email)) {
        setError("Email already registered.");
        return;
      }

      const newUser = {
        name,
        email,
        password,
        role: "user"
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("/");
    } else {
      const foundUser = users.find(
        user => user.email === email && user.password === password
      );

      const admin =
        email === "admin@driveon.com" && password === "Admin123";

      if (admin) {
        localStorage.setItem("user", JSON.stringify({
          name: "Admin",
          email,
          role: "admin"
        }));
        navigate("/admin");
        return;
      }

      if (!foundUser) {
        setError("Invalid email or password.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(foundUser));
      navigate("/");
    }
  }

  return (
    <main className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <span className="eyebrow">WELCOME TO DRIVEON</span>

        <h1>{isRegister ? "Create Account" : "Welcome Back"}</h1>
        <p>{isRegister ? "Register to book your car." : "Login to continue."}</p>

        {isRegister && (
          <input
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button className="primary-btn full-btn" type="submit">
          {isRegister ? "Create Account" : "Login"}
        </button>

        <p className="auth-switch">
          {isRegister ? "Already registered?" : "Don't have an account?"}
          <a href={isRegister ? "/login" : "/register"}>
            {isRegister ? " Login" : " Register"}
          </a>
        </p>

        {!isRegister && (
          <p className="demo-note">
            Admin demo: admin@driveon.com / Admin123
          </p>
        )}
      </form>
    </main>
  );
}
