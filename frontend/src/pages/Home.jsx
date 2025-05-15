import './Home.css';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container mt-4">
      <div className="jumbotron">
        <h1 className="display-4">Sistema de Farmacia</h1>
        <p className="lead">
          Bienvenido al sistema de gestión farmacéutica
        </p>
        <hr className="my-4"/>
        {!user ? (
          <p>Por favor, inicia sesión para acceder al sistema.</p>
        ) : (
          <p>
            Hola {user.username}, tienes acceso a los siguientes módulos según tu rol:
            <ul className="mt-3">
              {user.roles.includes("ROLE_ADMIN") && (
                <li>Administración completa del sistema</li>
              )}
              {user.roles.includes("ROLE_MODERATOR") && (
                <li>Gestión de medicamentos y órdenes</li>
              )}
              <li>Consulta de medicamentos</li>
            </ul>
          </p>
        )}
      </div>
    </div>
  );
}
