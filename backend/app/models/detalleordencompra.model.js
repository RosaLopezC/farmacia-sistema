export default (sequelize, Sequelize) => {
  const DetalleOrdenCompra = sequelize.define("detalleordencompra", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NroOrdenC: {
      type: Sequelize.INTEGER,
    },
    CodMedicamento: {
      type: Sequelize.INTEGER,
    },
    descripcion: {
      type: Sequelize.TEXT, // Cambiado a TEXT para descripciones largas
    },
    cantidad: {
      type: Sequelize.INTEGER,
    },
    precio: {
      type: Sequelize.DECIMAL(10,2), // Cambiado de FLOAT a DECIMAL
    },
    montouni: {
      type: Sequelize.DECIMAL(10,2), // Cambiado de FLOAT a DECIMAL
    },
  });

  return DetalleOrdenCompra;
};
