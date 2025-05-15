import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MedicamentoList() {
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/medicamentos');
        setMedicamentos(response.data);
      } catch (error) {
        console.error('Error fetching medicamentos:', error);
      }
    };

    fetchMedicamentos();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lista de Medicamentos</h2>
        <Link to="/medicamentos/gestionar" className="btn btn-primary">
          Nuevo Medicamento
        </Link>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Tipo</th>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((med) => (
            <tr key={med.CodMedicamento}>
              <td>{med.CodMedicamento}</td>
              <td>{med.nombre}</td>
              <td>{med.descripcion}</td>
              <td>${med.precio}</td>
              <td>{med.stock}</td>
              <td>{med.CodTipoMed}</td>
              <td>{med.CodEspec}</td>
              <td>
                <Link 
                  to={`/medicamentos/gestionar/${med.CodMedicamento}`} 
                  className="btn btn-sm btn-warning me-2"
                >
                  Editar
                </Link>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(med.CodMedicamento)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}