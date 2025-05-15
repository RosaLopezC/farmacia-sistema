import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function LaboratorioList() {
  const [laboratorios, setLaboratorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLaboratorios();
  }, []);

  const fetchLaboratorios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/laboratorios');
      setLaboratorios(response.data);
    } catch (err) {
      setError('Error al cargar laboratorios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este laboratorio?')) {
      try {
        await axios.delete(`http://localhost:3000/api/laboratorios/${id}`);
        fetchLaboratorios();
      } catch (err) {
        setError('Error al eliminar laboratorio');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="container mt-4">Cargando...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Laboratorios</h2>
        <Link to="/laboratorios/crear" className="btn btn-primary">
          Nuevo Laboratorio
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {laboratorios.map((lab) => (
              <tr key={lab.CodLab}>
                <td>{lab.CodLab}</td>
                <td>{lab.nombre}</td>
                <td>{lab.direccion}</td>
                <td>{lab.telefono}</td>
                <td>
                  <Link 
                    to={`/laboratorios/editar/${lab.CodLab}`} 
                    className="btn btn-sm btn-warning me-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(lab.CodLab)}
                    className="btn btn-sm btn-danger"
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