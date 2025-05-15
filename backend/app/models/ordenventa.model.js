export default (sequelize, Sequelize) => {
  const OrdenVenta = sequelize.define("ordenventa", {
    NroOrdenVta: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    total: {
      type: Sequelize.DECIMAL(10,2),
      defaultValue: 0
    },
    estado: {
      type: Sequelize.STRING,
      defaultValue: 'PENDIENTE'
    }
  });
  return OrdenVenta;
};