// app/config/db.config.js
export default {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "postgres",
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 3,
    min: 0,
    acquire: 60000,
    idle: 30000
  },
  logging: process.env.NODE_ENV !== 'production'
};
