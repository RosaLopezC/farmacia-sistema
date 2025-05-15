import db from "../models/index.js";
const Laboratorio = db.laboratorio;

export const create = async (req, res) => {
  try {
    const laboratorio = await Laboratorio.create(req.body);
    res.status(201).json(laboratorio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const laboratorios = await Laboratorio.findAll();
    res.json(laboratorios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findOne = async (req, res) => {
  try {
    const laboratorio = await Laboratorio.findByPk(req.params.id);
    if (!laboratorio) {
      return res.status(404).json({ message: "Laboratorio no encontrado" });
    }
    res.json(laboratorio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const updated = await Laboratorio.update(req.body, {
      where: { CodLab: req.params.id }
    });
    if (updated[0] === 0) {
      return res.status(404).json({ message: "Laboratorio no encontrado" });
    }
    res.json({ message: "Laboratorio actualizado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await Laboratorio.destroy({
      where: { CodLab: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ message: "Laboratorio no encontrado" });
    }
    res.json({ message: "Laboratorio eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};