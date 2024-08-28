import { Navigate, useLocation } from 'react-router-dom';

const AuthRoute = ({ element, ...rest }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token && rest.protected) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return element;
};

export default AuthRoute;
