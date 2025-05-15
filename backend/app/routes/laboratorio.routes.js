import { Router } from 'express';
import { authJwt } from "../middlewares/index.js";
import * as controller from "../controllers/laboratorio.controller.js";

const router = Router();

router.post("/", [authJwt.verifyToken], controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.put("/:id", [authJwt.verifyToken], controller.update);
router.delete("/:id", [authJwt.verifyToken], controller.remove);

export default router;