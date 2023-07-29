import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";


const Bootcamp = sequelize.define('Bootcamp', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    cue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 5,
            max: 20, // con 10 no funciona
        },
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false,
    }
}, {
    tableName: 'bootcamps',
    timestamps: true,
});




export {
    Bootcamp
}
