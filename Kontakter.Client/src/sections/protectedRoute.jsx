import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

/**
 * A component hiding or showing different components depending on authentication
 * @param {*} children The components to be shown or hidden
 * @returns a protected view of components
 */
function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch("/api/auth/check-auth", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.isAuthenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>;
  return isAuthenticated ? children : <Navigate to="/logginn" />;
}

export default ProtectedRoute;
