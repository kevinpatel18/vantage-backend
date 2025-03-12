const db = require("../db/sequelizeClient");
const { Op } = require("sequelize");

async function register(data, user) {
  const newData = {
    name: data.name,
    email: data.email,
    phoneNo: data.phoneNo,
    subject: data.subject,
    message: data.message,
    isDeleted: false,
  };

  return await db.contact.create(newData);
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

  const list = await db.contact.findAndCountAll(sqlQuery);

  if (list) {
    return list;
  }
}

async function soft_delete(id, user) {
  if (
    await db.contact.findOne({
      where: { id: id },
    })
  ) {
    const newData = {
      isDeleted: true,
    };

    await db.contact.update(newData, {
      where: { id: id },
    });
  } else {
    throw new Error("Contact does not exists");
  }
}

module.exports = { register, list, soft_delete };
