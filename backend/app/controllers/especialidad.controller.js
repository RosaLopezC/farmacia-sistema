import db from '../models/index.js';
const Especialidad = db.especialidad;

export const getEspecialidades = async (req, res) => {
  try {
    const especialidades = await Especialidad.findAll();
    res.json(especialidades);
  } catch (err) {
    console.error('Error en getEspecialidades:', err);
    res.status(500).json({ 
      message: err.message || "Error obteniendo especialidades."
    });
  }
};

export const createEspecialidad = async (req, res) => {
  try {
    const especialidad = await Especialidad.create(req.body);
    res.status(201).json(especialidad);
  } catch (err) {
    res.status(500).json({ 
      message: err.message || "Error creando especialidad."
    });
  }
};

export const findAll = async (req, res) => {
  try {
    const especialidades = await Especialidad.findAll();
    res.json(especialidades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findOne = async (req, res) => {
  try {
    const especialidad = await Especialidad.findByPk(req.params.id);
    if (!especialidad) {
      return res.status(404).json({ message: "Especialidad no encontrada" });
    }
    res.json(especialidad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const updated = await Especialidad.update(req.body, {
      where: { CodEspec: req.params.id }
    });
    if (updated[0] === 0) {
      return res.status(404).json({ message: "Especialidad no encontrada" });
    }
    res.json({ message: "Especialidad actualizada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await Especialidad.destroy({
      where: { CodEspec: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ message: "Especialidad no encontrada" });
    }
    res.json({ message: "Especialidad eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};