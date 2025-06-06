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
    groupSize: data.groupSize,
    softwareProvided: data.softwareProvided,
    status: data.status,
    isDeleted: false,
  };

  if (file) {
    let url = await getIpfsCid(file.filename);
    console.log("url: ", url);

    newData.images = url;
  }
  console.log("newData: ", newData);
  return await db.course.create(newData);
}

async function list(user, size, page) {
  let limit = parseInt(size);
  let offset = parseInt(page);
  const sqlQuery = {
    where: { isDeleted: false, status: true },
    order: [["updatedAt", "DESC"]],
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
async function adminList(user, size, page) {
  let limit = parseInt(size);
  let offset = parseInt(page);
  const sqlQuery = {
    where: { isDeleted: false },
    order: [["updatedAt", "DESC"]],
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
async function listbyid(user, id) {
  const sqlQuery = {
    where: { isDeleted: false, id: id },
    order: [["updatedAt", "DESC"]],
  };

  console.log("sqlQuery: ", sqlQuery);
  const list = await db.course.findOne(sqlQuery);

  if (list) {
    return list;
  } else {
    throw new Error("Course details are not found!");
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
      groupSize: data.groupSize,
      status: data.status,
      softwareProvided: data.softwareProvided,
    };

    if (file) {
      let url = await getIpfsCid(file.filename);

      newData.images = url;
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

async function duplicate(id, user) {
  // Find the original course
  const originalCourse = await db.course.findOne({
    where: { id: id, isDeleted: false }
  });

  if (!originalCourse) {
    throw new Error("Course not found");
  }

  // Create new data object from original course
  const duplicateData = {
    name: `${originalCourse.name} (Copy)`,
    description: originalCourse.description,
    aboutCourses: originalCourse.aboutCourses,
    keyFeatures: originalCourse.keyFeatures,
    courseObjective: originalCourse.courseObjective,
    otherDetails: originalCourse.otherDetails,
    durations: originalCourse.durations,
    syllabus: originalCourse.syllabus,
    skillLevel: originalCourse.skillLevel,
    class: originalCourse.class,
    groupSize: originalCourse.groupSize,
    softwareProvided: originalCourse.softwareProvided,
    status: originalCourse.status,
    isDeleted: false,
    images: originalCourse.images
  };

  // Create the duplicate course
  return await db.course.create(duplicateData);
}

module.exports = { register, list, update, soft_delete, listbyid, adminList, duplicate };
