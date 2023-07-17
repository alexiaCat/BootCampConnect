import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

const User = sequelize.define('User', {
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
    tableName: 'users'
});

export {
    User
}
