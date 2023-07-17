import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

const Bootcamp = sequelize.define('Bootcamp', {
    title: {
        type: DataTypes.STRING(200),
        allowNull: false, 
    },
    cue: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        validate: {
            isInt: true, 
            min: 5, 
            max: 10,
        },
    },
    description: {
        type: DataTypes.STRING(500), 
        allowNull: false, 
    }
}, {
    tableName: 'bootcamps'
});

export {
    Bootcamp
}
