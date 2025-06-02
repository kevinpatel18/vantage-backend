const { DataTypes } = require("sequelize");

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      required: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    },
    firstName: {
      type: DataTypes.STRING,
      required: true,
    },
    lastName: {
      type: DataTypes.STRING,
      required: true,
    },
    role: {
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
    address: {
      type: DataTypes.STRING,
      required: true,
    },
    city: {
      type: DataTypes.STRING,
      required: true,
    },
    state: {
      type: DataTypes.STRING,
      required: true,
    },
    postalCode: {
      type: DataTypes.STRING,
      required: true,
    },
    aboutUs: {
      type: DataTypes.TEXT("long"),
      required: true,
    },
    winningAward: {
      type: DataTypes.STRING,
      required: true,
    },
    completedProject: {
      type: DataTypes.STRING,
      required: true,
    },
    clientReview: {
      type: DataTypes.STRING,
      required: true,
    },
    teamMember: {
      type: DataTypes.STRING,
      required: true,
    },
    facebookLink: {
      type: DataTypes.STRING,
      required: true,
    },
    twitterLink: {
      type: DataTypes.STRING,
      required: true,
    },
    linkedinLink: {
      type: DataTypes.STRING,
      required: true,
    },
    instagramLink: {
      type: DataTypes.STRING,
      required: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
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

  return sequelize.define("user_details", attributes, {
    freezeTableName: true,
  });
}

module.exports = model;