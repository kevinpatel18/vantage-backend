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
    description: {
      type: DataTypes.TEXT("long"),
      required: true,
    },
    aboutCourses: {
      type: DataTypes.TEXT("long"),
      required: true,
    },
    keyFeatures: {
      type: DataTypes.TEXT("long"),
      required: true,
    },
    courseObjective: {
      type: DataTypes.TEXT("long"),
      required: true,
    },
    otherDetails: {
      type: DataTypes.TEXT("long"),
      required: true,
    },
    images: {
      type: DataTypes.STRING,
      required: true,
    },
    durations: {
      type: DataTypes.STRING,
      required: true,
    },
    syllabus: {
      type: DataTypes.STRING,
      required: true,
    },
    skillLevel: {
      type: DataTypes.STRING,
      required: true,
    },
    class: {
      type: DataTypes.STRING,
      required: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      required: true,
    },
  };

  const Course = sequelize.define("course", attributes, {
    freezeTableName: true,
  });

  return Course;
}

module.exports = model;
