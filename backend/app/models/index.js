// Importamos Sequelize, que es el ORM que utilizaremos para interactuar con la base de datos
import Sequelize from "sequelize";

// Importamos la configuración de la base de datos desde un archivo externo
import dbConfig from "../config/db.config.js";

// Importamos los modelos de usuario y rol
import userModel from "./user.model.js";
import roleModel from "./role.model.js";
import ordenCompraModel from "./ordencompra.model.js";
import detalleOrdenCompraModel from "./detalleordencompra.model.js";
import medicamentoModel from "./medicamento.model.js";
import tipoMedicModel from "./tipomedic.model.js";
import especialidadModel from "./especialidad.model.js";
import laboratorioModel from "./laboratorio.model.js";
import ordenVentaModel from "./ordenventa.model.js";

// Creamos una instancia de Sequelize con los parámetros de configuración
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  port: dbConfig.PORT,
});

// Creamos un objeto para almacenar los modelos y la instancia de Sequelize
const db = {};

// Asignamos Sequelize y la instancia sequelize al objeto db
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Inicializamos los modelos
db.user = userModel(sequelize, Sequelize);
db.role = roleModel(sequelize, Sequelize);
db.ordencompra = ordenCompraModel(sequelize, Sequelize);
db.detalleordencompra = detalleOrdenCompraModel(sequelize, Sequelize);
db.medicamento = medicamentoModel(sequelize, Sequelize);
db.tipomedic = tipoMedicModel(sequelize, Sequelize);
db.especialidad = especialidadModel(sequelize, Sequelize);
db.laboratorio = laboratorioModel(sequelize, Sequelize);
db.ordenventa = ordenVentaModel(sequelize, Sequelize);

// Relación muchos a muchos entre roles y usuarios
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

// Relación uno a muchos entre OrdenCompra y DetalleOrdenCompra
db.ordencompra.hasMany(db.detalleordencompra, {
  foreignKey: "NroOrdenC",
  as: "detalles"
});

db.detalleordencompra.belongsTo(db.ordencompra, {
  foreignKey: "NroOrdenC",
  as: "orden"
});

// Relaciones
db.tipomedic.hasMany(db.medicamento, { 
  foreignKey: 'CodTipoMed',
  as: 'medicamentos'
});
db.medicamento.belongsTo(db.tipomedic, { 
  foreignKey: 'CodTipoMed',
  as: 'tipomedic'
});

db.especialidad.hasMany(db.medicamento, { 
  foreignKey: 'CodEspec',
  as: 'medicamentos'
});
db.medicamento.belongsTo(db.especialidad, { 
  foreignKey: 'CodEspec',
  as: 'especialidad'
});

// Laboratorio - OrdenCompra
db.laboratorio.hasMany(db.ordencompra, {
  foreignKey: "CodLab",
  as: "ordenesCompra"
});
db.ordencompra.belongsTo(db.laboratorio, {
  foreignKey: "CodLab",
  as: "laboratorio"
});

// Define model associations
db.medicamento.belongsTo(db.tipomedic, {
  foreignKey: 'CodTipoMed'
});

db.medicamento.belongsTo(db.especialidad, {
  foreignKey: 'CodEspec'
});

db.tipomedic.hasMany(db.medicamento, {
  foreignKey: 'CodTipoMed',
  sourceKey: 'CodTipoMed'
});

db.especialidad.hasMany(db.medicamento, {
  foreignKey: 'CodEspec',
  sourceKey: 'CodEspec'
});

// Definimos una constante con los posibles roles que se pueden asignar
db.ROLES = ["user", "admin", "moderator"];

// Exportamos el objeto db para que pueda ser utilizado en otras partes de la aplicación
export default db;
