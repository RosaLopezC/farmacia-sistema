import db from '../models/index.js';
const User = db.user;
const Role = db.role;

// Controlador que responde a rutas públicas (accesibles sin autenticación)
export const allAccess = (req, res) => {
  res.status(200).send("Public Content."); // Responde con contenido público
};

// Controlador que responde a rutas accesibles solo para usuarios autenticados
export const userBoard = (req, res) => {
  res.status(200).send("User Content."); // Responde con contenido para usuarios comunes
};

// Controlador que responde a rutas exclusivas para administradores
export const adminBoard = (req, res) => {
  res.status(200).send("Admin Content."); // Responde con contenido para admins
};

// Controlador que responde a rutas exclusivas para moderadores
export const moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content."); // Responde con contenido para moderadores
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{
        model: Role,
        as: 'roles',
        attributes: ['name'],
        through: { attributes: [] }
      }],
      attributes: ['id', 'username', 'email']
    });

    // Transform the data for frontend
    const formattedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles.map(role => `ROLE_${role.name.toUpperCase()}`),
      activo: true // Por defecto todos activos
    }));

    console.log('Users found:', formattedUsers); // Debug log
    res.json(formattedUsers);
  } catch (err) {
    console.error('Error en getAllUsers:', err);
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{
        model: Role,
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
};

export const updateUserStatus = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.update({ activo: req.body.activo });
    res.json({ message: "Estado actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
