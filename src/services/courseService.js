const db = require("../db/sequelizeClient");
const { Op } = require("sequelize");
const { getIpfsCid } = require("../utils/upload");

function getCloudinaryImageUrl(publicId, format = "jpg") {
  const cloudName = "db9u3vdhh";
  return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.${format}`;
}

async function register(data, file, user) {
  if (
    await db.course.findOne({
      where: {
        name: data.name,
      },
    })
  ) {
    throw new Error("Course Name already exists");
  }

  const newData = {
    name: data.name,
    description: data.description,
    aboutCourses: data.aboutCourses,
    keyFeatures: data.keyFeatures,
    courseObjective: data.courseObjective,
    otherDetails: data.otherDetails,
    durations: data.durations,
    syllabus: data.syllabus,
    skillLevel: data.skillLevel,
    class: data.class,
    isDeleted: false,
  };

  if (file) {
    let url = await getIpfsCid(file.filename);

    newData.image = url;
  }
  return await db.course.create(newData);
}

async function list(user, size, page) {
  console.log("categoryId: ", categoryId);
  let limit = parseInt(size);
  let offset = parseInt(page);
  const sqlQuery = {
    where: { isDeleted: false },
    order: [["updatedAt", "DESC"]],
    include: [
      {
        model: db.category,
        as: "category",
      },
    ],
  };

  if (limit) {
    sqlQuery.limit = limit;
    sqlQuery.offset = offset;
  }

  console.log("sqlQuery: ", sqlQuery);
  const list = await db.course.findAndCountAll(sqlQuery);

  if (list) {
    return list;
  }
}

async function update(data, id, file, user) {
  let checkTour = await db.course.findOne({
    where: { id: id },
  });
  if (checkTour) {
    if (checkTour.name !== data.name) {
      if (
        await db.course.findOne({
          where: { name: data.name, isDeleted: false },
        })
      ) {
        throw new Error("Course Name already exists");
      }
    }

    const newData = {
      name: data.name,
      description: data.description,
      aboutCourses: data.aboutCourses,
      keyFeatures: data.keyFeatures,
      courseObjective: data.courseObjective,
      otherDetails: data.otherDetails,
      durations: data.durations,
      syllabus: data.syllabus,
      skillLevel: data.skillLevel,
      class: data.class,
      isDeleted: false,
    };

    if (file) {
      let url = await getIpfsCid(file.filename);

      newData.image = url;
    }

    await db.course.update(newData, {
      where: { id: id },
    });
  }
}

async function soft_delete(id, user) {
  if (
    await db.course.findOne({
      where: { id: id },
    })
  ) {
    const newData = {
      isDeleted: true,
    };

    await db.course.update(newData, {
      where: { id: id },
    });
  } else {
    throw new Error("Course does not exists");
  }
}

module.exports = { register, list, update, soft_delete };
