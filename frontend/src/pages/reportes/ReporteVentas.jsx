import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReporteVentas() {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    fechaInicio: '',
    fechaFin: ''
  });

  const cargarVentas = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/api/reportes/ventas', {
        params: filtros
      });
      setVentas(respuesta.data);
    } catch (err) {
      setError('Error al cargar reporte de ventas');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  const handleFiltrar = (e) => {
    e.preventDefault();
    cargarVentas();
  };

  if (cargando) return <div className="container mt-4">Cargando...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Reporte de Ventas</h2>
      
      <form onSubmit={handleFiltrar} className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="form-label">Fecha Inicio</label>
          <input
            type="date"
            className="form-control"
            value={filtros.fechaInicio}
            onChange={e => setFiltros({...filtros, fechaInicio: e.target.value})}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Fecha Fin</label>
          <input
            type="date"
            className="form-control"
            value={filtros.fechaFin}
            onChange={e => setFiltros({...filtros, fechaFin: e.target.value})}
          />
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
              <th>ID Venta</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.id}</td>
                <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                <td>${venta.total.toFixed(2)}</td>
                <td>
                  <span className={`badge bg-${venta.estado === 'COMPLETADA' ? 'success' : 'warning'}`}>
                    {venta.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}