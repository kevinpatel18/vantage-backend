const db = require("../db/sequelizeClient");
const { Op } = require("sequelize");
const { getIpfsCid } = require("../utils/upload");

async function register(data, file, user) {
  const newData = {
    title: data.title,
    isDeleted: false,
  };
  if (file) {
    let url = await getIpfsCid(file.filename);
    newData.image = url;
  }

  return await db.gallery.create(newData);
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
  
  console.log('size: ', size);
  const list = await db.gallery.findAndCountAll(sqlQuery);

  if (list) {
    return list;
  }
}

async function update(data, id, file, user) {
  let checkTestimonial = await db.gallery.findOne({
    where: { id: id },
  });
  if (checkTestimonial) {
    const newData = {
      title: data.title,
    };

    if (file) {
      let url = await getIpfsCid(file.filename);
      newData.image = url;
    }
    await db.gallery.update(newData, {
      where: { id: id },
    });
  }
}

async function soft_delete(id, user) {
  if (
    await db.gallery.findOne({
      where: { id: id },
    })
  ) {
    const newData = {
      isDeleted: true,
    };

    await db.gallery.update(newData, {
      where: { id: id },
    });
  } else {
    throw new Error("Contact does not exists");
  }
}

module.exports = { register, list, update, soft_delete };
