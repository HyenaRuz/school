import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ role, children }) => {
  const userRole = useSelector((state) => state.user.role);

  return userRole === role ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
