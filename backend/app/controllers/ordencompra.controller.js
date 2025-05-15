import db from "../models/index.js";

const OrdenCompra = db.ordencompra;
const DetalleOrdenCompra = db.detalleordencompra;

// Crear una orden con sus detalles
export const createOrden = async (req, res) => {
  try {
    const { fechaEmision, Situacion, Total, CodLab, NrofacturaProv, detalles } = req.body;

    const orden = await OrdenCompra.create({
      fechaEmision,
      Situacion,
      Total,
      CodLab,
      NrofacturaProv,
    });

    if (detalles && detalles.length > 0) {
      for (const item of detalles) {
        await DetalleOrdenCompra.create({
          ...item,
          NroOrdenC: orden.NroOrdenC,
        });
      }
    }

    res.status(201).json({ message: "Orden de compra creada", orden });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las órdenes con detalles
export const getAllOrdenes = async (req, res) => {
  try {
    const ordenes = await OrdenCompra.findAll({
      include: [{ model: DetalleOrdenCompra, as: "detalles" }],
    });
    res.status(200).json(ordenes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una orden por ID
export const getOrdenById = async (req, res) => {
  try {
    const orden = await OrdenCompra.findByPk(req.params.id, {
      include: [{ model: DetalleOrdenCompra, as: "detalles" }],
    });
    if (!orden) return res.status(404).json({ message: "Orden no encontrada" });
    res.status(200).json(orden);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una orden y sus detalles
export const updateOrden = async (req, res) => {
  try {
    const { id } = req.params;
    const { detalles, ...ordenData } = req.body;

    const [updated] = await OrdenCompra.update(ordenData, {
      where: { NroOrdenC: id },
    });

    if (updated === 0) return res.status(404).json({ message: "Orden no encontrada" });

    if (detalles && detalles.length > 0) {
      // Eliminar detalles anteriores
      await DetalleOrdenCompra.destroy({ where: { NroOrdenC: id } });

      // Insertar nuevos detalles
      for (const item of detalles) {
        await DetalleOrdenCompra.create({
          ...item,
          NroOrdenC: id,
        });
      }
    }

    res.status(200).json({ message: "Orden y detalles actualizados" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una orden
export const deleteOrden = async (req, res) => {
  try {
    const { id } = req.params;
    await DetalleOrdenCompra.destroy({ where: { NroOrdenC: id } });
    const rows = await OrdenCompra.destroy({ where: { NroOrdenC: id } });
    if (rows === 0) return res.status(404).json({ message: "Orden no encontrada" });
    res.status(200).json({ message: "Orden eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};