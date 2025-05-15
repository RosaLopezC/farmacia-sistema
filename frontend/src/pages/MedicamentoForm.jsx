import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function MedicamentoForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [medicamento, setMedicamento] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    CodTipoMed: '',
    CodEspec: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:3000/api/medicamentos/${id}`, medicamento);
      } else {
        await axios.post('http://localhost:3000/api/medicamentos', medicamento);
      }
      navigate('/medicamentos');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchMedicamento = async () => {
        const response = await axios.get(`http://localhost:3000/api/medicamentos/${id}`);
        setMedicamento(response.data);
      };
      fetchMedicamento();
    }
  }, [id]);

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar' : 'Crear'} Medicamento</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={medicamento.nombre}
              onChange={(e) => setMedicamento({...medicamento, nombre: e.target.value})}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Descripción</label>
            <input
              type="text"
              className="form-control"
              name="descripcion"
              value={medicamento.descripcion}
              onChange={(e) => setMedicamento({...medicamento, descripcion: e.target.value})}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Precio</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="precio"
              value={medicamento.precio}
              onChange={(e) => setMedicamento({...medicamento, precio: parseFloat(e.target.value)})}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={medicamento.stock}
              onChange={(e) => setMedicamento({...medicamento, stock: parseInt(e.target.value)})}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Código Tipo Medicamento</label>
            <input
              type="number"
              className="form-control"
              name="CodTipoMed"
              value={medicamento.CodTipoMed}
              onChange={(e) => setMedicamento({...medicamento, CodTipoMed: parseInt(e.target.value)})}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Código Especialidad</label>
            <input
              type="number"
              className="form-control"
              name="CodEspec"
              value={medicamento.CodEspec}
              onChange={(e) => setMedicamento({...medicamento, CodEspec: parseInt(e.target.value)})}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary me-2">
            {id ? 'Actualizar' : 'Guardar'} Medicamento
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/medicamentos')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}