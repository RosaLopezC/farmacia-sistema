export default (sequelize, Sequelize) => {
  const OrdenCompra = sequelize.define("ordencompra", {
    NroOrdenC: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fechaEmision: {
      type: Sequelize.DATE,
    },
    Situacion: {
      type: Sequelize.STRING,
    },
    Total: {
      type: Sequelize.DECIMAL(10, 2), // Cambiado de FLOAT a DECIMAL
    },
    CodLab: {
      type: Sequelize.INTEGER,
    },
    NrofacturaProv: {
      type: Sequelize.STRING,
    },
  });

  return OrdenCompra;
};
