import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstname: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    }
}, {
    tableName: 'users',
    timestamps: true,
});



export {
    User
}
