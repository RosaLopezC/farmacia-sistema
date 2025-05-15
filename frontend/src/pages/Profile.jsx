import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) return <div className="container mt-4">Cargando...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Perfil de Usuario</h3>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <strong>Usuario:</strong> {user?.username}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {user?.email}
              </div>
              <div className="mb-3">
                <strong>Roles:</strong>{' '}
                {user?.roles.map(role => (
                  <span key={role} className="badge bg-primary me-1">
                    {role.replace('ROLE_', '')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}