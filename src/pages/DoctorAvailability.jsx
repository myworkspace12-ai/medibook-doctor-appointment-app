import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorAvailability() {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const defaultSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  const [selectedDays, setSelectedDays] = useState(
    loggedInUser.availableDays || []
  );

  const [selectedSlots, setSelectedSlots] = useState(
    loggedInUser.availableSlots || []
  );

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleDayChange = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter(
          (selectedDay) => selectedDay !== day
        )
      );
    } else {
      setSelectedDays([
        ...selectedDays,
        day,
      ]);
    }
  };

  const handleSlotChange = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(
        selectedSlots.filter(
          (selectedSlot) => selectedSlot !== slot
        )
      );
    } else {
      setSelectedSlots([
        ...selectedSlots,
        slot,
      ]);
    }
  };

  const handleSave = () => {
    if (
      selectedDays.length === 0 ||
      selectedSlots.length === 0
    ) {
      alert(
        "Please select at least one day and one time slot"
      );

      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) =>
      user.id === loggedInUser.id
        ? {
            ...user,
            availableDays: selectedDays,
            availableSlots: selectedSlots,
          }
        : user
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    const updatedLoggedInUser = {
      ...loggedInUser,
      availableDays: selectedDays,
      availableSlots: selectedSlots,
    };

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updatedLoggedInUser)
    );

    alert("Availability updated successfully");

    navigate("/doctor-dashboard");

    window.location.reload();
  };

  return (
    <section className="availability-page">

      <div className="availability-container">

        <div className="profile-header">
          <p className="section-label">
            Doctor Availability
          </p>

          <h1>
            Manage Your Schedule
          </h1>

          <p>
            Select the days and appointment times
            you are available.
          </p>
        </div>

        <div className="availability-card">

          <h2>
            Select Working Days
          </h2>

          <div className="availability-options">

            {days.map((day) => (
              <label
                key={day}
                className="availability-option"
              >

                <input
                  type="checkbox"
                  checked={
                    selectedDays.includes(day)
                  }
                  onChange={() =>
                    handleDayChange(day)
                  }
                />

                {day}

              </label>
            ))}

          </div>

          <h2>
            Select Time Slots
          </h2>

          <div className="availability-options">

            {defaultSlots.map((slot) => (
              <label
                key={slot}
                className="availability-option"
              >

                <input
                  type="checkbox"
                  checked={
                    selectedSlots.includes(slot)
                  }
                  onChange={() =>
                    handleSlotChange(slot)
                  }
                />

                {slot}

              </label>
            ))}

          </div>

          <button
            className="auth-button"
            onClick={handleSave}
          >
            Save Availability
          </button>

        </div>

      </div>

    </section>
  );
}

export default DoctorAvailability;