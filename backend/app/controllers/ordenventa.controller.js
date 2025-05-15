import db from "../models/index.js";
const OrdenVenta = db.ordenventa;
const DetalleOrdenVenta = db.detalleordenventa;

export const create = async (req, res) => {
  try {
    const { detalles, ...ordenData } = req.body;
    const orden = await OrdenVenta.create(ordenData);
    
    if (detalles && detalles.length > 0) {
      const detallesWithOrden = detalles.map(detalle => ({
        ...detalle,
        NroOrdenVta: orden.NroOrdenVta
      }));
      await DetalleOrdenVenta.bulkCreate(detallesWithOrden);
    }
    
    res.status(201).json(orden);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const ordenes = await OrdenVenta.findAll({
      include: ["detalles"]
    });
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findOne = async (req, res) => {
  try {
    const orden = await OrdenVenta.findByPk(req.params.id, {
      include: ["detalles"]
    });
    if (!orden) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    res.json(orden);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { detalles, ...ordenData } = req.body;
    const updated = await OrdenVenta.update(ordenData, {
      where: { NroOrdenVta: req.params.id }
    });
    if (updated[0] === 0) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    res.json({ message: "Orden actualizada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await OrdenVenta.destroy({
      where: { NroOrdenVta: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    res.json({ message: "Orden eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};