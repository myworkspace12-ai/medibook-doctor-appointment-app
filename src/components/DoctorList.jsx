import { useState } from "react";
import DoctorCard from "./DoctorCard";
import staticDoctors from "../data/doctors";

function DoctorList() {
  const [searchText, setSearchText] = useState("");

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

  const filteredDoctors = allDoctors.filter(
    (doctor) => {
      const searchValue =
        searchText.toLowerCase();

      return (
        doctor.name
          .toLowerCase()
          .includes(searchValue) ||
        doctor.specialization
          .toLowerCase()
          .includes(searchValue) ||
        doctor.location
          .toLowerCase()
          .includes(searchValue)
      );
    }
  );

  return (
    <section className="doctor-section">
      <div className="section-header">
        <p className="section-label">
          Find Your Doctor
        </p>

        <h1>
          Trusted Doctors Near You
        </h1>

        <p>
          Search doctors by name,
          specialization or location.
        </p>
      </div>

      <input
        className="doctor-search"
        type="text"
        placeholder="Search doctor, specialization or location..."
        value={searchText}
        onChange={(event) =>
          setSearchText(event.target.value)
        }
      />

      <div className="doctor-grid">
        {filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
          />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="empty-message">
          No doctors found.
        </div>
      )}
    </section>
  );
}

export default DoctorList;