import { Sequelize } from "sequelize";
import "dotenv/config";

import mysql2 from "mysql2";


const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: mysql2,
    logging: false
  },
);


export default db;