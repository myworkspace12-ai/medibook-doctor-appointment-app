import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorProfile() {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const [name, setName] = useState(
    loggedInUser.name || ""
  );

  const [specialization, setSpecialization] = useState(
    loggedInUser.specialization || ""
  );

  const [experience, setExperience] = useState(
    loggedInUser.experience || ""
  );

  const [location, setLocation] = useState(
    loggedInUser.location || ""
  );

  const [fee, setFee] = useState(
    loggedInUser.fee || ""
  );

  const [available, setAvailable] = useState(
    loggedInUser.available ?? true
  );

  const [image, setImage] = useState(
    loggedInUser.image || ""
  );

  const handleUpdate = (event) => {
    event.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) =>
      user.id === loggedInUser.id
        ? {
            ...user,
            name,
            specialization,
            experience: Number(experience),
            location,
            fee: Number(fee),
            available,
            image,
          }
        : user
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    const updatedLoggedInUser = {
      ...loggedInUser,
      name,
      specialization,
      experience: Number(experience),
      location,
      fee: Number(fee),
      available,
      image,
    };

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updatedLoggedInUser)
    );

    alert("Profile updated successfully");

    navigate("/doctor-dashboard");

    window.location.reload();
  };

  return (
    <section className="profile-page">

      <div className="profile-container">

        <div className="profile-header">
          <p className="section-label">
            Doctor Profile
          </p>

          <h1>
            Manage Your Profile
          </h1>

          <p>
            Update your professional information.
          </p>
        </div>

        <form
          className="profile-form"
          onSubmit={handleUpdate}
        >

          <div className="form-group">
            <label>
              Doctor Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>
              Specialization
            </label>

            <input
              type="text"
              value={specialization}
              onChange={(event) =>
                setSpecialization(
                  event.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>
              Experience
            </label>

            <input
              type="number"
              value={experience}
              onChange={(event) =>
                setExperience(
                  event.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>
              Location
            </label>

            <input
              type="text"
              value={location}
              onChange={(event) =>
                setLocation(
                  event.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>
              Consultation Fee
            </label>

            <input
              type="number"
              value={fee}
              onChange={(event) =>
                setFee(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>
              Profile Image URL
            </label>

            <input
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={(event) =>
                setImage(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>
              Availability
            </label>

            <select
              value={available ? "true" : "false"}
              onChange={(event) =>
                setAvailable(
                  event.target.value === "true"
                )
              }
            >
              <option value="true">
                Available
              </option>

              <option value="false">
                Not Available
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Save Changes
          </button>

        </form>

      </div>

    </section>
  );
}

export default DoctorProfile;