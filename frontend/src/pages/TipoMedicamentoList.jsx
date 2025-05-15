import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TipoMedicamentoList() {
  const [tipos, setTipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarTipos();
  }, []);

  const cargarTipos = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/api/tipomedic');
      setTipos(respuesta.data);
    } catch (err) {
      setError('Error al cargar tipos de medicamentos');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const eliminarTipo = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este tipo de medicamento?')) {
      try {
        await axios.delete(`http://localhost:3000/api/tipomedic/${id}`);
        cargarTipos();
      } catch (err) {
        setError('Error al eliminar tipo de medicamento');
      }
    }
  };

  if (cargando) return <div className="container mt-4">Cargando...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Tipos de Medicamentos</h2>
      <button className="btn btn-primary mb-3">
        Nuevo Tipo de Medicamento
      </button>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tipos.map((tipo) => (
              <tr key={tipo.CodTipoMed}>
                <td>{tipo.CodTipoMed}</td>
                <td>{tipo.nombre}</td>
                <td>{tipo.descripcion}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2">
                    Editar
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarTipo(tipo.CodTipoMed)}
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