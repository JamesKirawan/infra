import Sequelize from "sequelize";

const db = new Sequelize("ecommerce", "admin", "admin", {
  host: "db",
  port: 3306,
  dialect: "mysql",
});

export default db;
