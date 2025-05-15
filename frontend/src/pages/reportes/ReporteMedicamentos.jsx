import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReporteMedicamentos() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    laboratorio: '',
    ordenarPor: 'nombre'
  });

  useEffect(() => {
    Promise.all([
      cargarMedicamentos(),
      cargarLaboratorios()
    ]);
  }, []);

  const cargarMedicamentos = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/api/reportes/medicamentos-lab', {
        params: filtros
      });
      setMedicamentos(respuesta.data);
    } catch (err) {
      setError('Error al cargar medicamentos');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const cargarLaboratorios = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/api/laboratorios');
      setLaboratorios(respuesta.data);
    } catch (err) {
      console.error('Error al cargar laboratorios:', err);
    }
  };

  const handleFiltrar = (e) => {
    e.preventDefault();
    cargarMedicamentos();
  };

  if (cargando) return <div className="container mt-4">Cargando...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Reporte de Medicamentos por Laboratorio</h2>

      <form onSubmit={handleFiltrar} className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="form-label">Laboratorio</label>
          <select 
            className="form-select"
            value={filtros.laboratorio}
            onChange={e => setFiltros({...filtros, laboratorio: e.target.value})}
          >
            <option value="">Todos los laboratorios</option>
            {laboratorios.map(lab => (
              <option key={lab.CodLab} value={lab.CodLab}>
                {lab.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Ordenar por</label>
          <select 
            className="form-select"
            value={filtros.ordenarPor}
            onChange={e => setFiltros({...filtros, ordenarPor: e.target.value})}
          >
            <option value="nombre">Nombre</option>
            <option value="stock">Stock</option>
            <option value="precio">Precio</option>
          </select>
        </div>
        <div className="col-md-4 d-flex align-items-end">
          <button type="submit" className="btn btn-primary">
            Filtrar
          </button>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Código</th>
              <th>Medicamento</th>
              <th>Laboratorio</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.map((med) => (
              <tr key={med.CodMedicamento}>
                <td>{med.CodMedicamento}</td>
                <td>{med.nombre}</td>
                <td>{med.laboratorio?.nombre}</td>
                <td>
                  <span className={`badge bg-${med.stock > 10 ? 'success' : 'danger'}`}>
                    {med.stock}
                  </span>
                </td>
                <td>${med.precio}</td>
                <td>{med.tipomedic?.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <h4>Resumen por Laboratorio</h4>
        <div className="row">
          {laboratorios.map(lab => {
            const medsPorLab = medicamentos.filter(
              med => med.laboratorio?.CodLab === lab.CodLab
            );
            return (
              <div key={lab.CodLab} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{lab.nombre}</h5>
                    <p className="card-text">
                      Total Medicamentos: {medsPorLab.length}<br/>
                      Valor Total: ${medsPorLab.reduce((sum, med) => 
                        sum + (med.precio * med.stock), 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}