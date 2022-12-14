export default (connection, DataTypes) => {
  return connection.define("Users", {
    loginId: DataTypes.STRING,
    password: DataTypes.STRING,
    secondaryEmail: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthday: DataTypes.STRING,
    gender: DataTypes.STRING,
    mobileNumber: DataTypes.INTEGER,
    bloodGroup: DataTypes.STRING,
    landlineNumber: DataTypes.STRING,
    photoId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    signatureId: DataTypes.INTEGER,
    isEmployee: DataTypes.INTEGER,
    address: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    updatedBy: DataTypes.INTEGER,
  });
};
