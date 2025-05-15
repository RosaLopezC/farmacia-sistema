import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (role) {
    const allowedRoles = Array.isArray(role) ? role : [role];
    const hasRole = allowedRoles.some(r => user.roles.includes(`ROLE_${r.toUpperCase()}`));
    if (!hasRole) return <Navigate to="/" />;
  }

  return children;
}
