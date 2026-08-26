import { Link } from "react-router-dom";
import { useState } from "react";

function MyAppointments() {
  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const allAppointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

  const userAppointments = allAppointments.filter(
    (appointment) =>
      appointment.patientId === loggedInUser.id
  );

  const [appointments, setAppointments] =
    useState(userAppointments);

  const handleCancel = (id) => {
    const updatedUserAppointments =
      appointments.filter(
        (appointment) => appointment.id !== id
      );

    setAppointments(updatedUserAppointments);

    const updatedAllAppointments =
      allAppointments.filter(
        (appointment) => appointment.id !== id
      );

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAllAppointments)
    );
  };

  return (
    <section className="appointments-page">
      <div className="appointments-container">

        <div className="appointments-header">
          <div>
            <p className="section-label">
              Appointment Management
            </p>

            <h1>My Appointments</h1>

            <p>
              View and manage your upcoming appointments.
            </p>
          </div>

          <Link
            to="/"
            className="book-new-button"
          >
            Book New Appointment
          </Link>
        </div>

        {appointments.length === 0 ? (
          <div className="no-appointments">

            <div className="empty-icon">
              📅
            </div>

            <h2>No Appointments Yet</h2>

            <p>
              You haven't booked any appointments.
            </p>

            <Link
              to="/"
              className="book-button"
            >
              Find a Doctor
            </Link>

          </div>
        ) : (
          <div className="appointment-list">

            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="appointment-card"
              >

                <div className="appointment-doctor-icon">
                  👨‍⚕️
                </div>

                <div className="appointment-doctor-info">

                  <h2>
                    {appointment.doctorName}
                  </h2>

                  <p>
                    Patient: {appointment.patientName}
                  </p>

                  <span className="appointment-status">
                    {appointment.status || "Upcoming"}
                  </span>

                </div>

                <div className="appointment-date-info">

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

                <div className="appointment-actions">

                  <Link
                    to={`/doctor/${appointment.doctorId}`}
                    className="view-doctor-button"
                  >
                    View Doctor
                  </Link>

                  <button
                    className="cancel-button"
                    onClick={() =>
                      handleCancel(appointment.id)
                    }
                  >
                    Cancel
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default MyAppointments;