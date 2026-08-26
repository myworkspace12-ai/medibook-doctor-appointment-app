import { useState } from "react";
import { Link } from "react-router-dom";

function DoctorDashboard() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const allAppointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

  const doctorAppointments = allAppointments.filter(
    (appointment) => appointment.doctorName === loggedInUser.name,
  );

  const [appointments, setAppointments] = useState(doctorAppointments);

  const updateStatus = (id, newStatus) => {
    const updatedDoctorAppointments = appointments.map((appointment) =>
      appointment.id === id
        ? {
            ...appointment,
            status: newStatus,
          }
        : appointment,
    );

    setAppointments(updatedDoctorAppointments);

    const updatedAllAppointments = allAppointments.map((appointment) =>
      appointment.id === id
        ? {
            ...appointment,
            status: newStatus,
          }
        : appointment,
    );

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAllAppointments),
    );
  };

  const totalAppointments = appointments.length;

  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "Upcoming" || appointment.status === "Confirmed",
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed",
  ).length;

  return (
    <section className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <p className="section-label">Doctor Dashboard</p>

            <h1>Welcome, {loggedInUser.name}</h1>

            <p>Manage your patient appointments.</p>
          </div>
          <Link to="/doctor-profile" className="book-new-button">
            Edit Profile
          </Link>
        </div>

        <div className="dashboard-stats">
          <div className="dashboard-stat-card">
            <span>Total Appointments</span>

            <h2>{totalAppointments}</h2>
          </div>

          <div className="dashboard-stat-card">
            <span>Upcoming</span>

            <h2>{upcomingAppointments}</h2>
          </div>

          <div className="dashboard-stat-card">
            <span>Completed</span>

            <h2>{completedAppointments}</h2>
          </div>
        </div>

        <div className="doctor-dashboard-section">
          <h2>Patient Appointments</h2>

          {appointments.length === 0 ? (
            <div className="dashboard-empty">
              <p>No appointments found.</p>
            </div>
          ) : (
            <div className="doctor-appointment-list">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="doctor-appointment-card">
                  <div>
                    <h3>{appointment.patientName}</h3>

                    <p>{appointment.email}</p>
                  </div>

                  <div>
                    <span>Date</span>

                    <strong>{appointment.date}</strong>
                  </div>

                  <div>
                    <span>Time</span>

                    <strong>{appointment.time}</strong>
                  </div>

                  <div>
                    <span>Status</span>

                    <strong>{appointment.status}</strong>
                  </div>

                  <div className="doctor-status-actions">
                    <button
                      className="confirm-status-button"
                      onClick={() => updateStatus(appointment.id, "Confirmed")}
                    >
                      Confirm
                    </button>

                    <button
                      className="complete-status-button"
                      onClick={() => updateStatus(appointment.id, "Completed")}
                    >
                      Complete
                    </button>

                    <button
                      className="cancel-status-button"
                      onClick={() => updateStatus(appointment.id, "Cancelled")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DoctorDashboard;
