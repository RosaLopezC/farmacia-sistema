import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children, roles = [] }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirigir a login y guardar la ubicación intentada
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length > 0 && !roles.some(role => user.roles.includes(role))) {
    // Si el usuario no tiene los roles requeridos, redirigir a home
    return <Navigate to="/" replace />;
  }

  return children;
}