import { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import DoctorDetails from "./pages/DoctorDetails";
import BookAppointment from "./pages/BookAppointment";
import AppointmentSuccess from "./pages/AppointmentSuccess";
import MyAppointments from "./pages/MyAppointments";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import DoctorProfile from "./pages/DoctorProfile";
import DoctorAvailability from "./pages/DoctorAvailability";

function App() {
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const adminExists = users.find((user) => user.role === "admin");

    if (!adminExists) {
      const defaultAdmin = {
        id: 999,
        name: "Admin",
        email: "admin@medibook.com",
        password: "admin123",
        role: "admin",
        approved: true,
      };

      users.push(defaultAdmin);

      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/doctor/:id" element={<DoctorDetails />} />

        <Route
          path="/book/:id"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <BookAppointment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointment-success"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <AppointmentSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-appointments"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <MyAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/doctor-profile"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-availability"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorAvailability />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
