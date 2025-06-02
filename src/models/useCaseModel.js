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
    processName: {
      type: DataTypes.STRING,
      required: true,
    },
    description: {
      type: DataTypes.TEXT("long"),
      required: true,
    },
    filePath: {
      type: DataTypes.STRING,
      required: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      required: true,
    },
    isActive: {
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

  const useCase = sequelize.define("use-case", attributes, {
    freezeTableName: true,
  });

  return useCase;
}

module.exports = model;
