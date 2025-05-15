import { Router } from "express";
import { getRoles } from "../controllers/role.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";

const router = Router();

// Ruta pública para obtener roles
router.get("/", getRoles);

export default router;