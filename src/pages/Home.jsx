import { Link } from "react-router-dom";
import DoctorList from "../components/DoctorList";

function Home() {
  return (
    <div>

      <section className="hero">

        <div className="hero-content">

          <span className="hero-badge">
            Welcome to MediBook
          </span>

          <h1>
            Find the Best Doctors
            <span> and Book Instantly</span>
          </h1>

          <p>
            Book appointments with trusted
            doctors. Fast, easy and secure.
          </p>

          <a
            href="#doctors"
            className="primary-button"
          >
            Find a Doctor
          </a>

        </div>

        <div className="hero-image-container">

          <img
            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800"
            alt="Doctor"
            className="hero-image"
          />

        </div>

      </section>

      <section className="feature-section">

        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <h3>Easy Booking</h3>
          <p>
            Book appointments in just
            a few clicks.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">👨‍⚕️</div>
          <h3>Verified Doctors</h3>
          <p>
            Find trusted and experienced
            doctors.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure & Safe</h3>
          <p>
            Your personal information
            remains protected.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎧</div>
          <h3>24/7 Support</h3>
          <p>
            We are available whenever
            you need assistance.
          </p>
        </div>

      </section>

      <div id="doctors">
        <DoctorList />
      </div>

      <section className="stats-section">

        <div>
          <h2>50+</h2>
          <p>Expert Doctors</p>
        </div>

        <div>
          <h2>15K+</h2>
          <p>Happy Patients</p>
        </div>

        <div>
          <h2>100+</h2>
          <p>Appointments</p>
        </div>

        <div>
          <h2>4.8</h2>
          <p>Average Rating</p>
        </div>

      </section>

    </div>
  );
}

export default Home;