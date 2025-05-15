import { Router } from "express";
import { getMedicamentos, createMedicamento } from "../controllers/medicamento.controller.js";

const router = Router();

router.get("/", getMedicamentos);
router.post("/", createMedicamento);

export default router;