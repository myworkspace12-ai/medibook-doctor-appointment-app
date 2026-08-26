import { Link } from "react-router-dom";

function AppointmentSuccess() {
  const appointment = JSON.parse(
    localStorage.getItem("latestAppointment")
  );

  if (!appointment) {
    return (
      <div>
        <h2>No appointment found</h2>

        <Link to="/">
          <button>Go Home</button>
        </Link>
      </div>
    );
  }

  return (
    <section className="success-page">

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>Appointment Confirmed!</h1>

        <p className="success-message">
          Your appointment has been booked
          successfully.
        </p>

        <div className="appointment-summary">

          <div>
            <span>Patient</span>
            <strong>
              {appointment.patientName}
            </strong>
          </div>

          <div>
            <span>Doctor</span>
            <strong>
              {appointment.doctorName}
            </strong>
          </div>

          <div>
            <span>Date</span>
            <strong>
              {appointment.date}
            </strong>
          </div>

          <div>
            <span>Time</span>
            <strong>
              {appointment.time}
            </strong>
          </div>

        </div>

        <div className="success-actions">

          <Link
            to="/my-appointments"
            className="back-button"
          >
            View My Appointments
          </Link>

          <Link
            to="/"
            className="book-button"
          >
            Back to Home
          </Link>

        </div>

      </div>

    </section>
  );
}

export default AppointmentSuccess;