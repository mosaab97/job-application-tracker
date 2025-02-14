import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  console.log(loading, user)
  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;