import { Router } from 'express';
import { authJwt } from "../middlewares/index.js";
import * as controller from "../controllers/tipomedic.controller.js";

const router = Router();

// Ruta para crear un nuevo tipo de medicamento (solo usuarios autenticados)
router.post("/", [authJwt.verifyToken], controller.create);

// Rutas públicas para obtener tipos de medicamentos
router.get("/", controller.findAll);
router.get("/:id", controller.findOne);

// Rutas protegidas para actualizar y eliminar
router.put("/:id", [authJwt.verifyToken], controller.update);
router.delete("/:id", [authJwt.verifyToken], controller.remove);

export default router;