import { useEffect, useState } from "react";
import { getOrdenes, deleteOrden } from "../services/ordenService";
import { Link } from "react-router-dom";
import './OrdenCompra.css';

export default function OrdenCompraList() {
  const [ordenes, setOrdenes] = useState([]);

  const cargarOrdenes = async () => {
    const data = await getOrdenes();
    setOrdenes(data);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que deseas eliminar esta orden?")) {
      await deleteOrden(id);
      cargarOrdenes();
    }
  };

  useEffect(() => {
    cargarOrdenes();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Órdenes de Compra</h2>
        <Link to="/ordenes/nueva" className="btn btn-success">Nueva Orden</Link>
      </div>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Situación</th>
            <th>Total</th>
            <th>Factura</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden.NroOrdenC}>
              <td>{orden.NroOrdenC}</td>
              <td>{orden.fechaEmision.split("T")[0]}</td>
              <td>{orden.Situacion}</td>
              <td>S/ {orden.Total}</td>
              <td>{orden.NrofacturaProv}</td>
              <td>
                <Link to={`/ordenes/${orden.NroOrdenC}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(orden.NroOrdenC)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}