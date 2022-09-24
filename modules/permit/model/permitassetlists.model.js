import { DataTypes } from "sequelize";
import connection from "../../../utility/connection.js";

const permitassetlists = connection.define("PermitAssetLists", {
    ptwId: DataTypes.INTEGER,
    assetId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
});

export default permitassetlists;