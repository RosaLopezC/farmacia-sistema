import db from "../models/index.js";
const Role = db.role;

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ 
      message: error.message || "Error obteniendo roles." 
    });
  }
};