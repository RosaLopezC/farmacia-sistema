import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReporteInventario() {
  const [inventario, setInventario] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    stockMinimo: '',
    laboratorio: '',
    tipoMedicamento: ''
  });

  useEffect(() => {
    cargarInventario();
  }, []);

  const cargarInventario = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/api/reportes/inventario', {
        params: filtros
      });
      setInventario(respuesta.data);
    } catch (err) {
      setError('Error al cargar reporte de inventario');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const handleFiltrar = (e) => {
    e.preventDefault();
    cargarInventario();
  };

  if (cargando) return <div className="container mt-4">Cargando...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Reporte de Inventario</h2>

      <form onSubmit={handleFiltrar} className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="form-label">Stock Mínimo</label>
          <input
            type="number"
            className="form-control"
            value={filtros.stockMinimo}
            onChange={e => setFiltros({...filtros, stockMinimo: e.target.value})}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Laboratorio</label>
          <select 
            className="form-select"
            value={filtros.laboratorio}
            onChange={e => setFiltros({...filtros, laboratorio: e.target.value})}
          >
            <option value="">Todos</option>
            {/* Opciones de laboratorios */}
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
              <th>Stock Actual</th>
              <th>Stock Mínimo</th>
              <th>Estado</th>
              <th>Laboratorio</th>
            </tr>
          </thead>
          <tbody>
            {inventario.map((item) => (
              <tr key={item.CodMedicamento}>
                <td>{item.CodMedicamento}</td>
                <td>{item.nombre}</td>
                <td>{item.stock}</td>
                <td>{item.stockMinimo}</td>
                <td>
                  <span className={`badge bg-${item.stock > item.stockMinimo ? 'success' : 'danger'}`}>
                    {item.stock > item.stockMinimo ? 'Normal' : 'Bajo Stock'}
                  </span>
                </td>
                <td>{item.laboratorio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <h4>Resumen</h4>
        <div className="row">
          <div className="col-md-4">
            <div className="card bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">Stock Normal</h5>
                <p className="card-text h2">
                  {inventario.filter(item => item.stock > item.stockMinimo).length}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-danger text-white">
              <div className="card-body">
                <h5 className="card-title">Bajo Stock</h5>
                <p className="card-text h2">
                  {inventario.filter(item => item.stock <= item.stockMinimo).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}