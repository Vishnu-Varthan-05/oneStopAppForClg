import { Navigate, useLocation } from 'react-router-dom';

const AuthRoute = ({ element, userType, requiredUserType, ...rest }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredUserType && user.userType !== requiredUserType) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return element;
};

export default AuthRoute;
