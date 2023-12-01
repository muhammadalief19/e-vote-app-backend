import { Sequelize } from "sequelize";

const db = new Sequelize("db_e_vote", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
