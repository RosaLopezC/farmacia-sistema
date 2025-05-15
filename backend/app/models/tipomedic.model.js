export default (sequelize, Sequelize) => {
  const TipoMedic = sequelize.define("tipomedic", {
    CodTipoMed: {
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
  return TipoMedic;
};