const { DataTypes } = require("sequelize");

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
    },
    phoneNo: {
      type: DataTypes.STRING,
      required: true,
    },
    subject: {
      type: DataTypes.STRING,
      required: true,
    },
    message: {
      type: DataTypes.TEXT("long"),
      required: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      required: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      required: true,
    },
    updatedBy: {
      type: DataTypes.STRING,
      required: true,
    },
  };

  return sequelize.define("contact", attributes, {
    freezeTableName: true,
  });
}

module.exports = model;
