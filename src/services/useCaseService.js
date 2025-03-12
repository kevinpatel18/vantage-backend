const db = require("../db/sequelizeClient");
const { Op } = require("sequelize");
const { getIpfsCid } = require("../utils/upload");

async function register(data, file, user) {
  if (
    await db.useCase.findOne({
      where: {
        phoneNo: data.phoneNo,
      },
    })
  ) {
    throw new Error("You already upload this useCase.");
  }
  const newData = {
    name: data.name,
    email: data.email,
    phoneNo: data.phoneNo,
    processName: data.processName,
    description: data.description,
    isDeleted: false,
  };
  if (file) {
    let url = await getIpfsCid(file.filename);
    console.log("url: ", url);

    newData.filePath = url;
  }
  return await db.useCase.create(newData);
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

  const list = await db.useCase.findAndCountAll(sqlQuery);

  if (list) {
    return list;
  }
}

async function soft_delete(id, user) {
  if (
    await db.useCase.findOne({
      where: { id: id },
    })
  ) {
    const newData = {
      isDeleted: true,
    };

    await db.useCase.update(newData, {
      where: { id: id },
    });
  } else {
    throw new Error("Contact does not exists");
  }
}

module.exports = { register, list, soft_delete };
