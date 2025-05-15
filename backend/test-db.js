import db from "./app/models/index.js";

async function testConnection() {
  try {
    console.log('🔄 Intentando conectar a la base de datos...');
    
    // Aumentar el timeout de la conexión
    db.sequelize.options.pool.acquire = 60000;
    
    // Prueba la conexión con retry y más tiempo de espera
    for(let i = 0; i < 5; i++) {
      try {
        await db.sequelize.authenticate({
          timeout: 60000
        });
        console.log('✅ Conexión establecida correctamente.');
        break;
      } catch (error) {
        if(i === 4) throw error;
        console.log(`⚠️ Intento ${i + 1} fallido, reintentando en 5 segundos...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    // Sincroniza los modelos
    console.log('🔄 Sincronizando modelos...');
    await db.sequelize.sync({ force: true });
    console.log('✅ Modelos sincronizados.');

    // Datos de prueba
    console.log('🔄 Creando datos de prueba...');
    
    const role = await db.role.create({
      name: "admin"
    });
    console.log('✅ Rol creado:', role.toJSON());

    const user = await db.user.create({
      username: "admin",
      email: "admin@test.com",
      password: "123456"
    });
    console.log('✅ Usuario creado:', user.toJSON());

    const tipoMed = await db.tipomedic.create({
      nombre: "Analgésico",
      descripcion: "Para el dolor"
    });
    console.log('✅ Tipo medicamento creado:', tipoMed.toJSON());

    const especialidad = await db.especialidad.create({
      nombre: "Cardiología",
      descripcion: "Especialidad del corazón"
    });
    console.log('✅ Especialidad creada:', especialidad.toJSON());

    const medicamento = await db.medicamento.create({
      nombre: "Paracetamol",
      descripcion: "Medicamento para el dolor",
      precio: 10.50,
      stock: 100,
      CodTipoMed: tipoMed.CodTipoMed,
      CodEspec: especialidad.CodEspec
    });
    console.log('✅ Medicamento creado:', medicamento.toJSON());

  } catch (error) {
    console.error('❌ Error de conexión:', {
      message: error.message,
      name: error.name,
      code: error.original?.code,
      detail: error.original?.detail,
      original: error.original
    });
  } finally {
    if (db.sequelize) {
      try {
        await db.sequelize.close();
        console.log('✅ Conexión cerrada correctamente');
      } catch (err) {
        console.error('❌ Error al cerrar la conexión:', err.message);
      }
    }
  }
}

// Configurar variables de entorno
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
process.env.PGSSLMODE = 'no-verify';

// Ejecutar test
testConnection();