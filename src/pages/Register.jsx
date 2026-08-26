import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");

  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [fee, setFee] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    if (
      role === "doctor" &&
      (!specialization ||
        !experience ||
        !location ||
        !fee)
    ) {
      alert("Please complete all doctor details");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() ===
        email.trim().toLowerCase()
    );

    if (existingUser) {
      alert("User already exists");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,

      approved:
        role === "doctor"
          ? false
          : true,

      ...(role === "doctor" && {
        specialization,
        experience: Number(experience),
        location,
        fee: Number(fee),
        available: true,
        rating: 0,
      }),
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert(
      role === "doctor"
        ? "Doctor registration submitted. Waiting for admin approval."
        : "Registration successful"
    );

    navigate("/login");
  };

  return (
    <section className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <h1>Create Account</h1>

          <p>
            Register as a patient or doctor.
          </p>
        </div>

        <form onSubmit={handleRegister}>

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Email</label>

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
            <label>Password</label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Register As</label>

            <select
              value={role}
              onChange={(event) =>
                setRole(event.target.value)
              }
            >
              <option value="patient">
                Patient
              </option>

              <option value="doctor">
                Doctor
              </option>
            </select>
          </div>

          {role === "doctor" && (
            <>
              <div className="form-group">
                <label>Specialization</label>

                <input
                  type="text"
                  placeholder="Example: Cardiologist"
                  value={specialization}
                  onChange={(event) =>
                    setSpecialization(
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>Experience</label>

                <input
                  type="number"
                  placeholder="Years of experience"
                  value={experience}
                  onChange={(event) =>
                    setExperience(
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>Location</label>

                <input
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(event) =>
                    setLocation(
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>Consultation Fee</label>

                <input
                  type="number"
                  placeholder="Example: 150"
                  value={fee}
                  onChange={(event) =>
                    setFee(event.target.value)
                  }
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="auth-button"
          >
            Create Account
          </button>

        </form>

        <p className="auth-footer">
          Already have an account?

          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </section>
  );
}

export default Register;