import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");

    navigate("/login");

    window.location.reload();
  };

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        MediBook
      </Link>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/">
          Doctors
        </Link>

        {loggedInUser &&
          loggedInUser.role === "patient" && (
            <Link to="/my-appointments">
              My Appointments
            </Link>
          )}

        {loggedInUser ? (
          <div className="user-navbar">

            {loggedInUser.role === "admin" ? (
              <Link
                to="/admin-dashboard"
                className="dashboard-link"
              >
                Dashboard
              </Link>
            ) : loggedInUser.role === "doctor" ? (
              <Link
                to="/doctor-dashboard"
                className="dashboard-link"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/patient-dashboard"
                className="dashboard-link"
              >
                Dashboard
              </Link>
            )}

            <span className="user-name">
              Hi, {loggedInUser.name}
            </span>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        ) : (
          <Link
            to="/login"
            className="login-button"
          >
            Login
          </Link>
        )}

      </div>

    </nav>
  );
}

export default Navbar;