import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function EspecialidadList() {
  const [especialidades, setEspecialidades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarEspecialidades();
  }, []);

  const cargarEspecialidades = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/api/especialidad');
      setEspecialidades(respuesta.data);
    } catch (err) {
      setError('Error al cargar especialidades');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const eliminarEspecialidad = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta especialidad?')) {
      try {
        await axios.delete(`http://localhost:3000/api/especialidad/${id}`);
        cargarEspecialidades();
      } catch (err) {
        setError('Error al eliminar especialidad');
      }
    }
  };

  if (cargando) return <div className="container mt-4">Cargando...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Especialidades Médicas</h2>
        <Link to="/especialidades/crear" className="btn btn-primary">
          Nueva Especialidad
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {especialidades.map((esp) => (
              <tr key={esp.CodEspec}>
                <td>{esp.CodEspec}</td>
                <td>{esp.nombre}</td>
                <td>{esp.descripcion}</td>
                <td>
                  <Link 
                    to={`/especialidades/editar/${esp.CodEspec}`} 
                    className="btn btn-warning btn-sm me-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => eliminarEspecialidad(esp.CodEspec)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}