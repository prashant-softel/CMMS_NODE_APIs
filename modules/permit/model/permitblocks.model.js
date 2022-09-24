import { DataTypes } from "sequelize";
import connection from "../../../utility/connection.js";

const permitblocks = connection.define("PermitBlocks", {
    ptw_id: DataTypes.INTEGER,
    block_id: DataTypes.INTEGER
},
    {
        timestamps: false
    }

);

export default permitblocks;