import { DataTypes } from "sequelize";
import connection from "../../../utility/connection.js";

const permitsafetyquestions = connection.define("PermitSafetyQuestions", {
    permitId: DataTypes.INTEGER,
    safetyMeasureValue: DataTypes.STRING,
    safetyMeasureId: DataTypes.INTEGER
},
    {
        timestamps: false
    }
);

export default permitsafetyquestions;