import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) =>
        user.email.trim().toLowerCase() ===
          email.trim().toLowerCase() &&
        user.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    // ===== UPDATED CODE START =====

    if (
      user.role === "doctor" &&
      user.approved !== true
    ) {
      alert(
        "Your doctor account is waiting for admin approval."
      );

      return;
    }

    // ===== UPDATED CODE END =====

    const loggedInUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      approved: user.approved,
      specialization: user.specialization,
      experience: user.experience,
      location: user.location,
      fee: user.fee,
    };

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(loggedInUser)
    );

    if (user.role === "admin") {
      navigate("/admin-dashboard");

      window.location.reload();

      return;
    }

    if (user.role === "doctor") {
      navigate("/doctor-dashboard");

      window.location.reload();

      return;
    }

    navigate("/patient-dashboard");

    window.location.reload();
  };

  return (
    <section className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <h1>
            Welcome Back
          </h1>

          <p>
            Login to manage your appointments.
          </p>

        </div>

        <form onSubmit={handleLogin}>

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />

          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

        </form>

        <p className="auth-footer">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </section>
  );
}

export default Login;