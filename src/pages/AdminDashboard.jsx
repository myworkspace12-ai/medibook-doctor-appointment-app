import { useState } from "react";

function AdminDashboard() {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  const [allUsers, setAllUsers] = useState(users);

  const doctors = allUsers.filter((user) => user.role === "doctor");

  const patients = allUsers.filter((user) => user.role === "patient");

  const approvedDoctors = doctors.filter((doctor) => doctor.approved === true);

  const pendingDoctors = doctors.filter((doctor) => doctor.approved !== true);

  const updateDoctorStatus = (doctorId, approvedStatus) => {
    const updatedUsers = allUsers.map((user) =>
      user.id === doctorId
        ? {
            ...user,
            approved: approvedStatus,
          }
        : user,
    );

    setAllUsers(updatedUsers);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <section className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <p className="section-label">Admin Dashboard</p>

            <h1>System Overview</h1>

            <p>Manage users, doctors and appointments.</p>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="dashboard-stat-card">
            <span>Total Patients</span>

            <h2>{patients.length}</h2>
          </div>

          <div className="dashboard-stat-card">
            <span>Total Doctors</span>

            <h2>{doctors.length}</h2>
          </div>

          <div className="dashboard-stat-card">
            <span>Total Appointments</span>

            <h2>{appointments.length}</h2>
          </div>

          <div className="dashboard-stat-card">
            <span>Approved Doctors</span>

            <h2>{approvedDoctors.length}</h2>
          </div>
        </div>

        <div className="admin-section">
          <div className="dashboard-section-header">
            <h2>Doctor Approvals</h2>

            <span>Pending: {pendingDoctors.length}</span>
          </div>

          {doctors.length === 0 ? (
            <div className="dashboard-empty">
              <p>No doctors registered.</p>
            </div>
          ) : (
            <div className="admin-doctor-list">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="admin-doctor-card">
                  <div>
                    <h3>{doctor.name}</h3>

                    <p>{doctor.email}</p>

                    <p>{doctor.specialization || "Not provided"}</p>

                    <p>Experience: {doctor.experience || 0} Years</p>

                    <p>Location: {doctor.location || "Not provided"}</p>

                    <p>Fee: ${doctor.fee || 0}</p>
                  </div>

                  <div>
                    <span>Status</span>

                    <strong
                      className={
                        doctor.approved ? "admin-approved" : "admin-pending"
                      }
                    >
                      {doctor.approved ? "Approved" : "Pending"}
                    </strong>
                  </div>

                  <div className="admin-actions">
                    <button
                      className="approve-button"
                      onClick={() => updateDoctorStatus(doctor.id, true)}
                    >
                      Approve
                    </button>

                    <button
                      className="reject-button"
                      onClick={() => updateDoctorStatus(doctor.id, false)}
                    >
                      Reject
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

export default AdminDashboard;
