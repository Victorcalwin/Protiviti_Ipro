module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "iproedge",
  dialect: "mysql",
  pool: {
    max: 2000,
    min: 5,
    acquire: 30000,
    idle: 10000
  }
};
