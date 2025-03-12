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
    rating: {
      type: DataTypes.STRING,
      required: true,
    },
    designation: {
      type: DataTypes.STRING,
      required: true,
    },
    companyName: {
      type: DataTypes.STRING,
      required: true,
    },
    review: {
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

  return sequelize.define("testimonials", attributes, {
    freezeTableName: true,
  });
}

module.exports = model;
