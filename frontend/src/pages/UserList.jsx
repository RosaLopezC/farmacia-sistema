// filepath: c:\Users\loros\Downloads\SEMANA 08 OTRO\SEMANA 08 OTRO\frontend\src\pages\UserList.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function UserList() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      console.log('Fetching users...'); // Debug log
      const respuesta = await axios.get('http://localhost:3000/api/users', {
        headers: {
          'x-access-token': user?.accessToken
        },
        withCredentials: true
      });
      console.log('Response:', respuesta.data); // Debug log
      setUsuarios(respuesta.data);
      setError(null);
    } catch (err) {
      console.error('Error loading users:', err);
      setError(err.response?.data?.message || 'Error al cargar usuarios');
    } finally {
      setCargando(false);
    }
  };

  const cambiarEstadoUsuario = async (id, activo) => {
    try {
      await axios.patch(`http://localhost:3000/api/users/${id}/estado`, {
        activo: !activo
      }, {
        withCredentials: true
      });
      await cargarUsuarios();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar usuario');
    }
  };

  if (cargando) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">Cargando usuarios...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Gestión de Usuarios</h2>
      {usuarios.length === 0 ? (
        <div className="alert alert-warning">
          No hay usuarios registrados
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Roles</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.username}</td>
                  <td>{usuario.email}</td>
                  <td>
                    {usuario.roles?.map(rol => (
                      <span key={rol} className="badge bg-primary me-1">
                        {rol.replace('ROLE_', '')}
                      </span>
                    ))}
                  </td>
                  <td>
                    <span className={`badge bg-${usuario.activo ? 'success' : 'danger'}`}>
                      {usuario.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm btn-${usuario.activo ? 'danger' : 'success'}`}
                      onClick={() => cambiarEstadoUsuario(usuario.id, usuario.activo)}
                    >
                      {usuario.activo ? 'Desactivar' : 'Activar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}