export default (connection, DataTypes) => {
  return connection.define("Facility", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    customerId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    operatorId: DataTypes.INTEGER,
    isBlock: DataTypes.INTEGER,
    parentId: DataTypes.INTEGER,
    city: DataTypes.INTEGER,
    state: DataTypes.INTEGER,
    country: DataTypes.INTEGER,
    zipCode: DataTypes.INTEGER,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    status: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER,
    timezone: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    updatedBy: DataTypes.INTEGER,
  });
};
