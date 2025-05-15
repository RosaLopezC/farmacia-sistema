import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function LaboratorioForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [laboratorio, setLaboratorio] = useState({
    nombre: '',
    direccion: '',
    telefono: ''
  });

  useEffect(() => {
    if (id) {
      fetchLaboratorio();
    }
  }, [id]);

  const fetchLaboratorio = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/laboratorios/${id}`);
      setLaboratorio(response.data);
    } catch (err) {
      setError('Error al cargar laboratorio');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (id) {
        await axios.put(`http://localhost:3000/api/laboratorios/${id}`, laboratorio);
      } else {
        await axios.post('http://localhost:3000/api/laboratorios', laboratorio);
      }
      navigate('/laboratorios');
    } catch (err) {
      setError('Error al guardar laboratorio');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLaboratorio(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar' : 'Nuevo'} Laboratorio</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={laboratorio.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            name="direccion"
            value={laboratorio.direccion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            name="telefono"
            value={laboratorio.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <button 
            type="submit" 
            className="btn btn-primary me-2"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/laboratorios')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}