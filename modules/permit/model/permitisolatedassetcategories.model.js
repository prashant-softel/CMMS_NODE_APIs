import { DataTypes } from "sequelize";
import connection from "../../../utility/connection.js";

const permitisolatedassetcategories = connection.define("PermitIsolatedAssetCategories", {
    permitId: DataTypes.INTEGER,
    assetCategoryId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    normalisedStatus: DataTypes.INTEGER,
    normalisedDate: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    updatedBy:DataTypes.INTEGER
});

export default permitisolatedassetcategories;