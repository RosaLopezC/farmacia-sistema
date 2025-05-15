// Importa Express para crear rutas
import express, { Router } from "express";
import { authJwt } from "../middlewares/index.js";
import db from '../models/index.js';

// Crea una instancia de router para definir las rutas protegidas por roles
const router = Router();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

// Controlador de usuarios
const userController = {
  allAccess: (req, res) => {
    res.status(200).send("Contenido Público.");
  },

  userBoard: (req, res) => {
    res.status(200).send("Contenido de Usuario.");
  },

  moderatorBoard: (req, res) => {
    res.status(200).send("Contenido de Moderador.");
  },

  adminBoard: (req, res) => {
    res.status(200).send("Contenido de Admin.");
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await db.user.findAll({
        include: [{
          model: db.role,
          as: 'roles',
          attributes: ['name'],
          through: { attributes: [] }
        }],
        attributes: ['id', 'username', 'email']
      });

      const formattedUsers = users.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles.map(role => `ROLE_${role.name.toUpperCase()}`),
        activo: true
      }));

      res.json(formattedUsers);
    } catch (err) {
      console.error('Error en getAllUsers:', err);
      res.status(500).json({ message: err.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await db.user.findByPk(req.params.id, {
        include: [{
          model: db.role,
          as: 'roles',
          through: { attributes: [] }
        }]
      });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateUserStatus: async (req, res) => {
    try {
      const user = await db.user.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      await user.update({ activo: req.body.activo });
      res.json({ message: "Estado actualizado correctamente" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getRoles: async (req, res) => {
    try {
      const roles = await db.role.findAll();
      res.json(roles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

// Rutas públicas y protegidas
router.get("/all", userController.allAccess);
router.get("/user", [authJwt.verifyToken], userController.userBoard);
router.get("/mod", [authJwt.verifyToken, authJwt.isModerator], userController.moderatorBoard);
router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], userController.adminBoard);

// Rutas de gestión de usuarios
router.get("/", [authJwt.verifyToken, authJwt.isAdmin], userController.getAllUsers);
router.get("/:id", [authJwt.verifyToken], userController.getUserById);
router.patch("/:id/estado", [authJwt.verifyToken, authJwt.isAdmin], userController.updateUserStatus);
router.get("/roles", [authJwt.verifyToken, authJwt.isAdmin], userController.getRoles);

// Exporta el router para que pueda ser usado en app.js o server.js
export default router;
