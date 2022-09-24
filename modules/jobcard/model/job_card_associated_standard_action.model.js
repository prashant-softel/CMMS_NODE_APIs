import { DataTypes } from "sequelize";
import connection from "../utility/connection.js";

const jobCardAssociatedStandardAction = connection.define(
  "jobCardAssociatedStandardActions",
  {
    jcId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    standardActionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    otherStandardActionName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

jobCardAssociatedStandardAction.sync().then(() => {
  console.log("Job Card Standard Action Created!");
});

export default jobCardAssociatedStandardAction;
