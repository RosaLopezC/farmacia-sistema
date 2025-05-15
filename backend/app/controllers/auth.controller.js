// Importa el objeto de modelos (User, Role, etc.) desde la carpeta models
import db from "../models/index.js";

// Importa la librería jsonwebtoken para generar tokens JWT
import jwt from "jsonwebtoken";

// Importa bcryptjs para encriptar y comparar contraseñas
import bcrypt from "bcryptjs";

// Importa la función Op desde sequelize para operaciones con operadores
import { Op } from "sequelize";

// Importa la configuración del secreto JWT desde un archivo de configuración
import authConfig from "../config/auth.config.js";

// Extrae los modelos User y Role desde el objeto db
const { user: User, role: Role } = db;

/**
 * Controlador para el registro de usuarios
 */
export const signup = async (req, res) => {
  try {
    // Crear usuario
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    // Manejar roles
    if (req.body.roles && req.body.roles.length > 0) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      });

      if (!roles.length) {
        return res.status(400).json({
          message: "Rol no encontrado."
        });
      }

      await user.setRoles(roles);
      res.status(200).json({
        message: "Usuario registrado exitosamente!",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          roles: roles.map(r => r.name)
        }
      });
    } else {
      // Rol por defecto = "user"
      const role = await Role.findOne({
        where: { name: "user" }
      });
      await user.setRoles([role]);
      res.status(200).json({
        message: "Usuario registrado exitosamente!",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          roles: ["user"]
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error registrando usuario."
    });
  }
};

/**
 * Controlador para el inicio de sesión
 */
export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscamos al usuario por su nombre de usuario, incluyendo sus roles
    const user = await User.findOne({
      where: { username },
      include: {
        model: Role,
        as: "roles",
      },
    });

    // Si no se encuentra el usuario, responde con error 404
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compara la contraseña proporcionada con la almacenada (ya encriptada)
    const passwordIsValid = await bcrypt.compare(password, user.password);

    // Si la contraseña no es válida, responde con error 401
    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    // Si la contraseña es válida, genera un token JWT que expira en 24 horas
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400, // 24 horas
    });

    // Crea un array con los roles del usuario en el formato 'ROLE_ADMIN', 'ROLE_USER', etc.
    const authorities = user.roles.map((role) => `ROLE_${role.name.toUpperCase()}`);

    // Responde con la información del usuario y el token de acceso
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    // Si ocurre un error en el proceso, responde con código 500 y el mensaje del error
    res.status(500).json({ message: error.message });
  }
};
