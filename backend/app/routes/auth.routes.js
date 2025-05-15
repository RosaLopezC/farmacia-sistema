// Importa Express para definir rutas
import express from "express";

// Importa las funciones del controlador de autenticación
import { signup, signin } from "../controllers/auth.controller.js";

// Importa los middlewares que verifican datos antes de registrar un usuario
import {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} from "../middlewares/verifySignUp.js";

// Crea un router de Express para definir las rutas relacionadas con autenticación
const router = express.Router();

// Ruta para registrar un nuevo usuario (signup)
// Aplica los middlewares antes de ejecutar la función `signup`
// checkDuplicateUsernameOrEmail: asegura que el username y email no estén repetidos
// checkRolesExisted: valida que los roles proporcionados existan en la base de datos
router.post("/signup", [checkDuplicateUsernameOrEmail, checkRolesExisted], signup);

// Ruta para iniciar sesión (signin)
// Sin middlewares previos, va directo al controlador
router.post("/signin", signin);

// Exporta el router para poder usarlo en la configuración principal de rutas de la app
export default router;
