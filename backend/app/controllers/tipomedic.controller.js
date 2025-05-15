import db from "../models/index.js";
const TipoMedic = db.tipomedic;

export const create = async (req, res) => {
  try {
    const tipoMedic = await TipoMedic.create(req.body);
    res.status(201).json(tipoMedic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const tiposMedic = await TipoMedic.findAll();
    res.json(tiposMedic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findOne = async (req, res) => {
  try {
    const tipoMedic = await TipoMedic.findByPk(req.params.id);
    if (!tipoMedic) {
      return res.status(404).json({ message: "Tipo de medicamento no encontrado" });
    }
    res.json(tipoMedic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const updated = await TipoMedic.update(req.body, {
      where: { CodTipoMed: req.params.id }
    });
    if (updated[0] === 0) {
      return res.status(404).json({ message: "Tipo de medicamento no encontrado" });
    }
    res.json({ message: "Tipo de medicamento actualizado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await TipoMedic.destroy({
      where: { CodTipoMed: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ message: "Tipo de medicamento no encontrado" });
    }
    res.json({ message: "Tipo de medicamento eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};