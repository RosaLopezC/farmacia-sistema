export default (sequelize, Sequelize) => {
  const Especialidad = sequelize.define("especialidad", {
    CodEspec: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    descripcion: Sequelize.STRING
  });
  return Especialidad;
};