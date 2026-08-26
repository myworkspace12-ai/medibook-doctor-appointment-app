import {
  useParams,
  Link,
} from "react-router-dom";

import staticDoctors from "../data/doctors";

function DoctorDetails() {
  const { id } = useParams();

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

  if (!doctor) {
    return <h2>Doctor not found</h2>;
  }

  return (
    <section className="doctor-details-page">
      <div className="doctor-details-card">

        <div className="doctor-details-image-section">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="doctor-details-image"
          />
        </div>

        <div className="doctor-details-content">

          <div className="doctor-details-header">
            <div>
              <p className="doctor-specialization">
                {doctor.specialization}
              </p>

              <h1>
                {doctor.name}
              </h1>
            </div>

            <span
              className={
                doctor.available
                  ? "status available"
                  : "status unavailable"
              }
            >
              {doctor.available
                ? "Available"
                : "Not Available"}
            </span>
          </div>

          <div className="doctor-rating">
            ⭐ {doctor.rating}
          </div>

          <div className="doctor-details-info">

            <div className="detail-box">
              <span>
                Experience
              </span>

              <strong>
                {doctor.experience} Years
              </strong>
            </div>

            <div className="detail-box">
              <span>
                Location
              </span>

              <strong>
                {doctor.location}
              </strong>
            </div>

            <div className="detail-box">
              <span>
                Consultation Fee
              </span>

              <strong>
                ${doctor.fee}
              </strong>
            </div>

          </div>

          <div className="doctor-about">
            <h2>
              About Doctor
            </h2>

            <p>
              {doctor.name} is an experienced{" "}
              {doctor.specialization.toLowerCase()}
              providing professional healthcare
              services and personalized treatment
              for patients.
            </p>
          </div>

          <div className="doctor-actions">
            <Link
              to="/"
              className="back-button"
            >
              Back to Doctors
            </Link>

            {doctor.available && (
              <Link
                to={`/book/${doctor.id}`}
                className="book-button"
              >
                Book Appointment
              </Link>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

export default DoctorDetails;