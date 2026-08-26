import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import staticDoctors from "../data/doctors";

function BookAppointment() {
  const { id } = useParams();

  const navigate = useNavigate();
  
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const registeredDoctors = users
    .filter((user) => user.role === "doctor" && user.approved === true)
    .map((doctor) => ({
      id: doctor.id,
      name: doctor.name,
      specialization: doctor.specialization,
      experience: doctor.experience,
      location: doctor.location,
      fee: doctor.fee,
      available: doctor.available,
      rating: doctor.rating || 0,
      image:
        doctor.image ||
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500",
    }));

  const allDoctors = [...staticDoctors, ...registeredDoctors];

  const doctor = allDoctors.find((doctor) => String(doctor.id) === String(id));

  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!patientName || !email || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      alert("Please login before booking an appointment");
      navigate("/login");
      return;
    }

    const appointment = {
      id: Date.now(),
      patientId: loggedInUser.id,
      patientName,
      email,
      doctorName: doctor.name,
      doctorId: doctor.id,
      date,
      time,
      status: "Upcoming",
    };

    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.push(appointment);

    localStorage.setItem("appointments", JSON.stringify(appointments));

    localStorage.setItem("latestAppointment", JSON.stringify(appointment));
    navigate("/appointment-success");
  };

  if (!doctor) {
    return <h2>Doctor not found</h2>;
  }

  return (
    <section className="booking-page">
      <div className="booking-container">
        <div className="booking-doctor-card">
          <img src={doctor.image} alt={doctor.name} />

          <div>
            <p className="booking-label">Booking appointment with</p>

            <h2>{doctor.name}</h2>

            <p>{doctor.specialization}</p>

            <span>⭐ {doctor.rating}</span>
          </div>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <h1>Book Appointment</h1>

          <p className="form-description">
            Enter your details and select your preferred appointment time.
          </p>

          <div className="form-group">
            <label>Patient Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={patientName}
              onChange={(event) => setPatientName(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Appointment Date</label>

              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Appointment Time</label>

              <select
                value={time}
                onChange={(event) => setTime(event.target.value)}
              >
                <option value="">Select Time</option>

                <option value="9:00 AM">9:00 AM</option>

                <option value="10:00 AM">10:00 AM</option>

                <option value="11:00 AM">11:00 AM</option>

                <option value="2:00 PM">2:00 PM</option>

                <option value="3:00 PM">3:00 PM</option>
              </select>
            </div>
          </div>

          <button type="submit" className="confirm-booking-button">
            Confirm Appointment
          </button>
        </form>
      </div>
    </section>
  );
}

export default BookAppointment;
