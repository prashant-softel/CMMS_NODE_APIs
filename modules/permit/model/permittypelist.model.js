import { DataTypes } from "sequelize";
import connection from "../../../utility/connection.js";

const permittypelists = connection.define("PermitTypeList", {
    title: DataTypes.STRING,
    discription: DataTypes.STRING,
    status: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedBy: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    facilityId: DataTypes.INTEGER

});

export default permittypelists;