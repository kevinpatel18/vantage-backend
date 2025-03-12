const { DataTypes } = require("sequelize");

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      required: true,
    },
    lastName: {
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
    city: {
      type: DataTypes.STRING,
      required: true,
    },
    phoneNo: {
      type: DataTypes.STRING,
      required: true,
    },
    courseId: {
      type: DataTypes.INTEGER,
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

  const RegisterUser = sequelize.define("register-user", attributes, {
    freezeTableName: true,
  });

  RegisterUser.belongsTo(sequelize.models.course, {
    foreignKey: "courseId",
    as: "course",
  });

  return RegisterUser;
}

module.exports = model;
