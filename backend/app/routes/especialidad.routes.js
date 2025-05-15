import express from "express";
import { authJwt } from "../middlewares/index.js";
import db from '../models/index.js';

const router = express.Router();

// Controlador de especialidades
const especialidadController = {
  getAllEspecialidades: async (req, res) => {
    try {
      const especialidades = await db.especialidad.findAll();
      res.json(especialidades);
    } catch (err) {
      console.error('Error en getAllEspecialidades:', err);
      res.status(500).json({ message: err.message });
    }
  },

  createEspecialidad: async (req, res) => {
    try {
      const { nombre, descripcion } = req.body;
      const nuevaEspecialidad = await db.especialidad.create({
        nombre,
        descripcion
      });
      res.status(201).json(nuevaEspecialidad);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateEspecialidad: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;
      
      const especialidad = await db.especialidad.findByPk(id);
      if (!especialidad) {
        return res.status(404).json({ message: "Especialidad no encontrada" });
      }

      await especialidad.update({ nombre, descripcion });
      res.json(especialidad);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteEspecialidad: async (req, res) => {
    try {
      const { id } = req.params;
      const especialidad = await db.especialidad.findByPk(id);
      
      if (!especialidad) {
        return res.status(404).json({ message: "Especialidad no encontrada" });
      }

      await especialidad.destroy();
      res.json({ message: "Especialidad eliminada correctamente" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

// Rutas de especialidades
router.get("/", [authJwt.verifyToken], especialidadController.getAllEspecialidades);
router.post("/", [authJwt.verifyToken, authJwt.isAdmin], especialidadController.createEspecialidad);
router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], especialidadController.updateEspecialidad);
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], especialidadController.deleteEspecialidad);

export default router;