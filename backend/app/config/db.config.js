// app/config/db.config.js
export default {
  HOST: process.env.DB_HOST || "dpg-d0j39fp5pdvs73ekpelg-a.oregon-postgres.render.com",
  USER: process.env.DB_USER || "db_farmacia_mtvc_user",
  PASSWORD: process.env.DB_PASSWORD || "lzQJ3mGFGnRTazffhkiS5yVsVeb7VD5R",
  DB: process.env.DB_NAME || "db_farmacia_mtvc",
  dialect: "postgres",
  port: process.env.DB_PORT || 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    keepAlive: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000
  },
  logging: false
};
