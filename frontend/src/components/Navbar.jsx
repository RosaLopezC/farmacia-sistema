import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/authService';
import './Navbar.css';

export default function Navbar() {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  // Función auxiliar para verificar roles
  const hasRole = (roles) => {
    return roles.some(role => user?.roles.includes(role));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Sistema Farmacia</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {!user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Iniciar Sesión</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Registrarse</Link>
              </li>
            </>
          ) : (
            <>
              {/* Menú de Perfil - Disponible para todos los usuarios */}
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Perfil</Link>
              </li>

              {/* Menú de Medicamentos */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  Medicamentos
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/medicamentos">Ver Catálogo</Link></li>
                  {hasRole(["ROLE_ADMIN", "ROLE_MODERATOR"]) && (
                    <li><Link className="dropdown-item" to="/medicamentos/gestionar">Gestionar Medicamentos</Link></li>
                  )}
                </ul>
              </li>

              {/* Menú de Órdenes - Solo para Moderador y Admin */}
              {hasRole(["ROLE_ADMIN", "ROLE_MODERATOR"]) && (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    Órdenes
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/ordenes">Ver Órdenes</Link></li>
                    <li><Link className="dropdown-item" to="/ordenes/crear">Nueva Orden</Link></li>
                  </ul>
                </li>
              )}

              {/* Menú de Administración - Solo Admin */}
              {hasRole(["ROLE_ADMIN"]) && (
                <>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                      Administración
                    </a>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/admin">Dashboard</Link></li>
                      <li><Link className="dropdown-item" to="/usuarios">Gestión de Usuarios</Link></li>
                      <li><hr className="dropdown-divider"/></li>
                      <li><Link className="dropdown-item" to="/laboratorios">Laboratorios</Link></li>
                      <li><Link className="dropdown-item" to="/tipos-medicamentos">Tipos de Medicamentos</Link></li>
                    </ul>
                  </li>
                </>
              )}
            </>
          )}
        </ul>

        {user && (
          <div className="d-flex align-items-center">
            <span className="text-light me-3">
              Bienvenido, {user.username}
              <span className="badge bg-light text-dark ms-2">
                {user.roles.includes("ROLE_ADMIN") ? "Administrador" : 
                 user.roles.includes("ROLE_MODERATOR") ? "Moderador" : "Usuario"}
              </span>
            </span>
            <button className="btn btn-outline-light" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        )}
      </div>
    </nav>
  );
}