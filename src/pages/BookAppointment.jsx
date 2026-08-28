import { useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import staticDoctors from "../data/doctors";

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const registeredDoctors = users
    .filter(
      (user) =>
        user.role === "doctor" &&
        user.approved === true
    )
    .map((doctor) => ({
      id: doctor.id,
      name: doctor.name,
      specialization: doctor.specialization,
      experience: doctor.experience,
      location: doctor.location,
      fee: doctor.fee,
      available: doctor.available,
      rating: doctor.rating || 0,

      availableDays:
        doctor.availableDays || [],

      availableSlots:
        doctor.availableSlots || [],

      image:
        doctor.image ||
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500",
    }));

  const allDoctors = [
    ...staticDoctors,
    ...registeredDoctors,
  ];

  const doctor = allDoctors.find(
    (doctor) =>
      String(doctor.id) === String(id)
  );

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const getDayName = (selectedDate) => {
    const dateObject = new Date(
      selectedDate + "T00:00:00"
    );

    return dateObject.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
      }
    );
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;

    if (!selectedDate) {
      setDate("");
      return;
    }

    const selectedDay =
      getDayName(selectedDate);

    if (
      doctor.availableDays &&
      doctor.availableDays.length > 0 &&
      !doctor.availableDays.includes(selectedDay)
    ) {
      alert(
        `Doctor is not available on ${selectedDay}.`
      );

      setDate("");
      setTime("");

      return;
    }

    setDate(selectedDate);
    setTime("");
  };

  const getAvailableSlots = () => {
    if (!date) {
      return [];
    }

    const appointments =
      JSON.parse(
        localStorage.getItem("appointments")
      ) || [];

    const doctorSlots =
      doctor.availableSlots &&
      doctor.availableSlots.length > 0
        ? doctor.availableSlots
        : [
            "9:00 AM",
            "10:00 AM",
            "11:00 AM",
            "2:00 PM",
            "3:00 PM",
            "4:00 PM",
          ];

    const bookedSlots = appointments
      .filter(
        (appointment) =>
          String(appointment.doctorId) ===
            String(doctor.id) &&
          appointment.date === date &&
          appointment.status !== "Cancelled"
      )
      .map(
        (appointment) =>
          appointment.time
      );

    return doctorSlots.filter(
      (slot) =>
        !bookedSlots.includes(slot)
    );
  };

  const handleBooking = (event) => {
    event.preventDefault();

    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (!loggedInUser) {
      alert(
        "Please login before booking an appointment."
      );

      navigate("/login");
      return;
    }

    if (loggedInUser.role !== "patient") {
      alert(
        "Only patients can book appointments."
      );

      return;
    }

    if (!date || !time) {
      alert(
        "Please select appointment date and time."
      );

      return;
    }

    const appointments =
      JSON.parse(
        localStorage.getItem("appointments")
      ) || [];

    const alreadyBooked =
      appointments.find(
        (appointment) =>
          String(appointment.doctorId) ===
            String(doctor.id) &&
          appointment.date === date &&
          appointment.time === time &&
          appointment.status !== "Cancelled"
      );

    if (alreadyBooked) {
      alert(
        "This appointment slot is already booked."
      );

      setTime("");
      return;
    }

    const newAppointment = {
      id: Date.now(),

      doctorId: doctor.id,
      doctorName: doctor.name,

      specialization:
        doctor.specialization,

      patientId: loggedInUser.id,
      patientName: loggedInUser.name,

      date,
      time,
      reason,

      status: "Pending",
    };

    appointments.push(newAppointment);

    localStorage.setItem(
      "appointments",
      JSON.stringify(appointments)
    );

    alert(
      "Appointment booked successfully."
    );

    navigate("/my-appointments");
  };

  if (!doctor) {
    return (
      <div className="empty-message">
        Doctor not found.
      </div>
    );
  }

  if (doctor.available === false) {
    return (
      <div className="empty-message">
        This doctor is currently not available.
      </div>
    );
  }

  const availableSlots =
    getAvailableSlots();

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  return (
    <section className="booking-page">

      <div className="booking-container">

        <div className="profile-header">

          <p className="section-label">
            Book Appointment
          </p>

          <h1>
            Book with {doctor.name}
          </h1>

          <p>
            {doctor.specialization}
          </p>

        </div>

        {doctor.availableDays &&
          doctor.availableDays.length > 0 && (
            <div className="doctor-about">

              <h3>
                Available Days
              </h3>

              <p>
                {doctor.availableDays.join(", ")}
              </p>

            </div>
          )}

        <form
          className="profile-form"
          onSubmit={handleBooking}
        >

          <div className="form-group">

            <label>
              Appointment Date
            </label>

            <input
              type="date"
              min={today}
              value={date}
              onChange={handleDateChange}
              required
            />

          </div>

          <div className="form-group">

            <label>
              Appointment Time
            </label>

            <select
              value={time}
              onChange={(event) =>
                setTime(event.target.value)
              }
              disabled={!date}
              required
            >

              <option value="">
                Select Time
              </option>

              {availableSlots.map(
                (slot) => (
                  <option
                    key={slot}
                    value={slot}
                  >
                    {slot}
                  </option>
                )
              )}

            </select>

            {date &&
              availableSlots.length === 0 && (
                <p className="empty-message">
                  No available slots for this date.
                </p>
              )}

          </div>

          <div className="form-group">

            <label>
              Reason for Visit
            </label>

            <textarea
              placeholder="Describe your reason for appointment..."
              value={reason}
              onChange={(event) =>
                setReason(event.target.value)
              }
              rows="4"
            />

          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={
              !date ||
              availableSlots.length === 0
            }
          >
            Confirm Appointment
          </button>

        </form>

      </div>

    </section>
  );
}

export default BookAppointment;