import express from "express";
import {
  createOrden,
  getAllOrdenes,
  getOrdenById,
  updateOrden,
  deleteOrden,
} from "../controllers/ordencompra.controller.js";

const router = express.Router();

router.post("/", createOrden);
router.get("/", getAllOrdenes);
router.get("/:id", getOrdenById);
router.put("/:id", updateOrden);
router.delete("/:id", deleteOrden);

export default router;
