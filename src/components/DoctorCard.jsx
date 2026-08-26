import { Link } from "react-router-dom";

function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">

      <img
        src={doctor.image}
        alt={doctor.name}
        className="doctor-image"
      />

      <div className="doctor-content">

        <div className="doctor-title-row">
          <div>
            <h2>{doctor.name}</h2>

            <p className="specialization">
              {doctor.specialization}
            </p>
          </div>

          <span className="rating">
            ⭐ {doctor.rating}
          </span>
        </div>

        <div className="doctor-info">
          <p>
            Experience: {doctor.experience} Years
          </p>

          <p>
            Location: {doctor.location}
          </p>

          <p>
            Consultation Fee: ${doctor.fee}
          </p>
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

        <Link
          to={`/doctor/${doctor.id}`}
          className="view-profile-button"
        >
          View Profile
        </Link>

      </div>
    </div>
  );
}

export default DoctorCard;