export default (connection, DataTypes) => {
  return connection.define("JobWorkType", {
    equipmentCategoryId: DataTypes.INTEGER,
    workTypeName: DataTypes.STRING,
    status: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    updatedBy: DataTypes.INTEGER,
  });
};
