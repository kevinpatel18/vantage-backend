const db = require("../db/sequelizeClient");
const { Op } = require("sequelize");

async function register(data, user) {
  const newData = {
    title: data.title,
    isDeleted: false,
  };

  return await db.event.create(newData);
}

async function list(user, size, page) {
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

  console.log("size: ", size);
  const list = await db.event.findAndCountAll(sqlQuery);

  if (list) {
    return list;
  }
}

async function update(data, id, user) {
  let checkTestimonial = await db.event.findOne({
    where: { id: id },
  });
  if (checkTestimonial) {
    const newData = {
      title: data.title,
    };

    await db.event.update(newData, {
      where: { id: id },
    });
  }
}

async function soft_delete(id, user) {
  if (
    await db.event.findOne({
      where: { id: id },
    })
  ) {
    const newData = {
      isDeleted: true,
    };

    await db.event.update(newData, {
      where: { id: id },
    });
  } else {
    throw new Error("Contact does not exists");
  }
}

module.exports = { register, list, update, soft_delete };
