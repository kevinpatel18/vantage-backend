const db = require("../db/sequelizeClient");
const { Op } = require("sequelize");

async function register(data, user) {
  if (
    await db.registerUser.findOne({
      where: {
        phoneNo: data.phoneNo,
        courseId: data.courseId,
      },
    })
  ) {
    throw new Error("You already register this course.");
  }

  const newData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    city: data.city,
    phoneNo: data.phoneNo,
    courseId: data.courseId,
    isDeleted: false,
  };

  return await db.registerUser.create(newData);
}

async function list(user, size, page) {
  let limit = parseInt(size);
  let offset = parseInt(page);
  const sqlQuery = {
    where: { isDeleted: false },
    order: [["updatedAt", "DESC"]],
    include: [
      {
        model: db.course,
        as: "course",
        required: false,
      },
    ],
  };

  if (limit) {
    sqlQuery.limit = limit;
    sqlQuery.offset = offset;
  }

  const list = await db.registerUser.findAndCountAll(sqlQuery);

  if (list) {
    return list;
  }
}

async function soft_delete(id, user) {
  if (
    await db.registerUser.findOne({
      where: { id: id },
    })
  ) {
    const newData = {
      isDeleted: true,
    };

    await db.registerUser.update(newData, {
      where: { id: id },
    });
  } else {
    throw new Error("Register User does not exists");
  }
}

module.exports = { register, list, soft_delete };
