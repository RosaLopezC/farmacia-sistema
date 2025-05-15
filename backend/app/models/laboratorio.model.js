export default (sequelize, Sequelize) => {
  const Laboratorio = sequelize.define("laboratorio", {
    CodLab: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    direccion: Sequelize.STRING,
    telefono: Sequelize.STRING
  });
  return Laboratorio;
};