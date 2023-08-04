import { Sequelize } from "sequelize";
import 'dotenv/config';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'db_bootcamp',
});

sequelize.options.logging = (query) => {

};
