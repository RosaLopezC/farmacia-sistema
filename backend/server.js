import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import bcrypt from "bcryptjs";

import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from './app/routes/user.routes.js';
import ordenRoutes from "./app/routes/ordencompra.routes.js";
import medicamentoRoutes from "./app/routes/medicamento.routes.js";
import tipoMedicRoutes from "./app/routes/tipomedic.routes.js";
import especialidadRoutes from "./app/routes/especialidad.routes.js";
import laboratorioRoutes from "./app/routes/laboratorio.routes.js";
import ordenVentaRoutes from "./app/routes/ordenventa.routes.js";
import roleRoutes from "./app/routes/role.routes.js";

const app = express();

// Configuración de CORS para producción
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tu-frontend.onrender.com']
    : 'http://localhost:5173'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Node.js JWT Authentication API." });
});

// Rutas API
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ordenes", ordenRoutes);
app.use("/api/medicamentos", medicamentoRoutes);
app.use("/api/tipomedic", tipoMedicRoutes);
app.use("/api/especialidades", especialidadRoutes);
app.use("/api/laboratorios", laboratorioRoutes);
app.use("/api/ordenventas", ordenVentaRoutes);
app.use("/api/roles", roleRoutes);

const PORT = process.env.PORT || 3000;

// Inicializar roles
const initial = async () => {
  try {
    // 1. Crear roles base
    await db.role.bulkCreate([
      { id: 1, name: "user" },
      { id: 2, name: "moderator" },
      { id: 3, name: "admin" }
    ]);
    console.log("✅ Roles creados exitosamente");

    // 2. Crear tipos de medicamentos
    await db.tipomedic.bulkCreate([
      { nombre: "Analgésico", descripcion: "Medicamentos para el dolor" },
      { nombre: "Antibiótico", descripcion: "Medicamentos contra infecciones" }
    ]);
    console.log("✅ Tipos de medicamentos creados exitosamente");

    // 3. Crear especialidades
    await db.especialidad.bulkCreate([
      { nombre: "Cardiología", descripcion: "Especialidad del corazón" },
      { nombre: "Pediatría", descripcion: "Especialidad infantil" }
    ]);
    console.log("✅ Especialidades creadas exitosamente");

    // 4. Crear laboratorios
    await db.laboratorio.bulkCreate([
      { nombre: "Bayer", direccion: "Alemania", telefono: "123456789" },
      { nombre: "Pfizer", direccion: "USA", telefono: "987654321" }
    ]);
    console.log("✅ Laboratorios creados exitosamente");

    // 5. Crear medicamentos
    await db.medicamento.bulkCreate([
      {
        nombre: "Paracetamol",
        descripcion: "Analgésico común",
        precio: 5.99,
        stock: 100,
        CodTipoMed: 1,
        CodEspec: 1
      },
      {
        nombre: "Amoxicilina",
        descripcion: "Antibiótico general",
        precio: 15.99,
        stock: 50,
        CodTipoMed: 2,
        CodEspec: 2
      }
    ]);
    console.log("✅ Medicamentos creados exitosamente");

    // 6. Crear órdenes de compra
    const orden = await db.ordencompra.create({
      fechaEmision: new Date(),
      Situacion: "PENDIENTE",
      Total: 500.00,
      CodLab: 1,
      NrofacturaProv: "FAC001"
    });

    // 7. Crear detalles de orden
    await db.detalleordencompra.bulkCreate([
      {
        NroOrdenC: orden.NroOrdenC,
        CodMedicamento: 1,
        descripcion: "Paracetamol 500mg",
        cantidad: 100,
        precio: 5.00,
        montouni: 500.00
      }
    ]);
    console.log("✅ Órdenes de compra creadas exitosamente");

    // 8. Crear órdenes de venta
    await db.ordenventa.bulkCreate([
      {
        fecha: new Date(),
        total: 100.00,
        estado: "PENDIENTE"
      }
    ]);
    console.log("✅ Órdenes de venta creadas exitosamente");

    // 9. Crear usuarios por defecto
    const users = [
      {
        username: "admin",
        email: "admin@example.com",
        password: bcrypt.hashSync("admin123", 8),
        role: "admin"
      },
      {
        username: "moderador",
        email: "mod@example.com",
        password: bcrypt.hashSync("mod123", 8),
        role: "moderator"
      },
      {
        username: "usuario",
        email: "user@example.com",
        password: bcrypt.hashSync("user123", 8),
        role: "user"
      }
    ];

    for (let user of users) {
      const createdUser = await db.user.create({
        username: user.username,
        email: user.email,
        password: user.password
      });

      const role = await db.role.findOne({
        where: { name: user.role }
      });

      await createdUser.setRoles([role]);
      console.log(`Usuario ${user.username} creado con rol ${user.role}`);
    }
    
    console.log('Base de datos inicializada con roles, tipos de medicamentos, especialidades, laboratorios y usuarios');
  } catch (error) {
    console.error("Error inicializando la base de datos:", error);
    console.error("Detalle del error:", error.stack);
  }
};

db.sequelize.sync({ force: true }).then(async () => {
  console.log('Drop and re-sync db.');
  await initial();
});

db.sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida.');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error conectando a la base de datos:', err);
  });
