import {
  Navigate,
  useLocation,
} from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRoles,
}) {
  const location = useLocation();

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  if (!loggedInUser) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
        }}
        replace
      />
    );
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(loggedInUser.role)
  ) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;