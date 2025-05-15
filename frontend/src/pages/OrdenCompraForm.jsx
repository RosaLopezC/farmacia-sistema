import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrdenById, createOrden, updateOrden } from "../services/ordenService";
import './OrdenCompra.css';

export default function OrdenCompraForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orden, setOrden] = useState({
    fechaEmision: "",
    Situacion: "",
    Total: 0,
    CodLab: 0,
    NrofacturaProv: "",
    detalles: [{ CodMedicamento: 0, descripcion: "", cantidad: 1, precio: 0, montouni: 0 }],
  });

  const loadOrden = async () => {
    const data = await getOrdenById(id);
    setOrden(data);
  };

  useEffect(() => {
    if (id) loadOrden();
  }, [id]);

  const handleChange = (e) => {
    setOrden({ ...orden, [e.target.name]: e.target.value });
  };

  const handleDetalleChange = (index, e) => {
    const nuevosDetalles = [...orden.detalles];
    nuevosDetalles[index][e.target.name] = e.target.value;
    setOrden({ ...orden, detalles: nuevosDetalles });
  };

  const agregarDetalle = () => {
    setOrden({
      ...orden,
      detalles: [...orden.detalles, { CodMedicamento: 0, descripcion: "", cantidad: 1, precio: 0, montouni: 0 }],
    });
  };

  const eliminarDetalle = (index) => {
    const nuevosDetalles = orden.detalles.filter((_, i) => i !== index);
    setOrden({ ...orden, detalles: nuevosDetalles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateOrden(id, orden);
    } else {
      await createOrden(orden);
    }
    navigate("/ordenes");
  };

  useEffect(() => {
    // Datos de prueba
    const testData = {
      fechaEmision: new Date().toISOString().split('T')[0],
      Situacion: "PENDIENTE",
      Total: 500,
      CodLab: 1,
      NrofacturaProv: "TEST-001",
      detalles: [{
        CodMedicamento: 1,
        descripcion: "Medicamento Prueba",
        cantidad: 10,
        precio: 50,
        montouni: 500
      }]
    };
    
    // Descomentar para probar con datos de ejemplo
    // setOrden(testData);
  }, []);

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar Orden" : "Nueva Orden"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <label>Fecha Emisión</label>
            <input name="fechaEmision" value={orden.fechaEmision} onChange={handleChange} className="form-control" type="date" required />
          </div>
          <div className="col-md-6">
            <label>Situación</label>
            <input name="Situacion" value={orden.Situacion} onChange={handleChange} className="form-control" required />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <label>Total</label>
            <input name="Total" value={orden.Total} onChange={handleChange} className="form-control" type="number" />
          </div>
          <div className="col-md-4">
            <label>Cod. Laboratorio</label>
            <input name="CodLab" value={orden.CodLab} onChange={handleChange} className="form-control" type="number" />
          </div>
          <div className="col-md-4">
            <label>Nro Factura</label>
            <input name="NrofacturaProv" value={orden.NrofacturaProv} onChange={handleChange} className="form-control" />
          </div>
        </div>

        <h5 className="mt-4">Detalles</h5>
        {orden.detalles.map((detalle, index) => (
          <div key={index} className="row mb-3">
            <div className="col-md-2">
              <input name="CodMedicamento" value={detalle.CodMedicamento} onChange={(e) => handleDetalleChange(index, e)} className="form-control" placeholder="CodMed" />
            </div>
            <div className="col-md-3">
              <input name="descripcion" value={detalle.descripcion} onChange={(e) => handleDetalleChange(index, e)} className="form-control" placeholder="Descripción" />
            </div>
            <div className="col-md-2">
              <input name="cantidad" value={detalle.cantidad} onChange={(e) => handleDetalleChange(index, e)} className="form-control" placeholder="Cantidad" />
            </div>
            <div className="col-md-2">
              <input name="precio" value={detalle.precio} onChange={(e) => handleDetalleChange(index, e)} className="form-control" placeholder="Precio" />
            </div>
            <div className="col-md-2">
              <input name="montouni" value={detalle.montouni} onChange={(e) => handleDetalleChange(index, e)} className="form-control" placeholder="Monto" />
            </div>
            <div className="col-md-1">
              <button type="button" className="btn btn-danger" onClick={() => eliminarDetalle(index)}>X</button>
            </div>
          </div>
        ))}

        <button type="button" className="btn btn-secondary mb-3" onClick={agregarDetalle}>Agregar Detalle</button>
        <br />
        <button type="submit" className="btn btn-primary">Guardar Orden</button>
      </form>
    </div>
  );
}
