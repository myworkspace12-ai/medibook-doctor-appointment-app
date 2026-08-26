import { Link } from "react-router-dom";

function PatientDashboard() {
  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const allAppointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

  const patientAppointments = allAppointments.filter(
    (appointment) =>
      appointment.patientId === loggedInUser.id
  );

  const totalAppointments =
    patientAppointments.length;

  const upcomingAppointments =
    patientAppointments.filter(
      (appointment) =>
        appointment.status === "Upcoming"
    ).length;

  const completedAppointments =
    patientAppointments.filter(
      (appointment) =>
        appointment.status === "Completed"
    ).length;

  const recentAppointments =
    patientAppointments.slice(-3).reverse();

  return (
    <section className="dashboard-page">

      <div className="dashboard-container">

        <div className="dashboard-header">

          <div>
            <p className="section-label">
              Patient Dashboard
            </p>

            <h1>
              Welcome, {loggedInUser.name}
            </h1>

            <p>
              Manage your appointments and healthcare activity.
            </p>
          </div>

          <Link
            to="/"
            className="book-new-button"
          >
            Book Appointment
          </Link>

        </div>

        <div className="dashboard-stats">

          <div className="dashboard-stat-card">

            <span>Total Appointments</span>

            <h2>
              {totalAppointments}
            </h2>

          </div>

          <div className="dashboard-stat-card">

            <span>Upcoming</span>

            <h2>
              {upcomingAppointments}
            </h2>

          </div>

          <div className="dashboard-stat-card">

            <span>Completed</span>

            <h2>
              {completedAppointments}
            </h2>

          </div>

        </div>

        <div className="dashboard-content">

          <div className="dashboard-section">

            <div className="dashboard-section-header">

              <h2>
                Recent Appointments
              </h2>

              <Link to="/my-appointments">
                View All
              </Link>

            </div>

            {recentAppointments.length === 0 ? (

              <div className="dashboard-empty">

                <p>
                  No appointments found.
                </p>

                <Link
                  to="/"
                  className="book-button"
                >
                  Find a Doctor
                </Link>

              </div>

            ) : (

              <div className="recent-appointments">

                {recentAppointments.map(
                  (appointment) => (

                    <div
                      key={appointment.id}
                      className="recent-appointment-card"
                    >

                      <div>

                        <h3>
                          {appointment.doctorName}
                        </h3>

                        <p>
                          {appointment.date}
                        </p>

                      </div>

                      <div>

                        <p>
                          {appointment.time}
                        </p>

                        <span className="appointment-status">
                          {appointment.status}
                        </span>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

          <div className="dashboard-section">

            <h2>
              Quick Actions
            </h2>

            <div className="quick-actions">

              <Link
                to="/"
                className="quick-action-card"
              >
                <span>👨‍⚕️</span>
                Find Doctors
              </Link>

              <Link
                to="/my-appointments"
                className="quick-action-card"
              >
                <span>📅</span>
                My Appointments
              </Link>

              <Link
                to="/"
                className="quick-action-card"
              >
                <span>🏠</span>
                Home
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default PatientDashboard;