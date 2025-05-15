export default (sequelize, Sequelize) => {
  const Medicamento = sequelize.define("medicamento", {
    CodMedicamento: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING(100), // Añadido límite
      allowNull: false
    },
    descripcion: {
      type: Sequelize.TEXT // Cambiado de STRING a TEXT
    },
    precio: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false
    },
    stock: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    CodTipoMed: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    CodEspec: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
  return Medicamento;
};