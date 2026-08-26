import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <section className="unauthorized-page">
      <div className="unauthorized-card">

        <h1>Access Denied</h1>

        <p>
          You do not have permission to
          access this page.
        </p>

        <Link
          to="/"
          className="book-button"
        >
          Go to Home
        </Link>

      </div>
    </section>
  );
}

export default Unauthorized;