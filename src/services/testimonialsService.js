const db = require("../db/sequelizeClient");
const { Op } = require("sequelize");

async function register(data, user) {
  const newData = {
    name: data.name,
    rating: data.rating,
    designation: data.designation,
    companyName: data.companyName,
    review: data.review,
    isDeleted: false,
  };

  return await db.testimonials.create(newData);
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

  const list = await db.testimonials.findAndCountAll(sqlQuery);

  if (list) {
    return list;
  }
}

async function update(data, id, user) {
  let checkTestimonial = await db.testimonials.findOne({
    where: { id: id },
  });
  if (checkTestimonial) {
    const newData = {
      name: data.name,
      rating: data.rating,
      designation: data.designation,
      companyName: data.companyName,
      review: data.review,
    };

    await db.testimonials.update(newData, {
      where: { id: id },
    });
  }
}

async function soft_delete(id, user) {
  if (
    await db.testimonials.findOne({
      where: { id: id },
    })
  ) {
    const newData = {
      isDeleted: true,
    };

    await db.testimonials.update(newData, {
      where: { id: id },
    });
  } else {
    throw new Error("Contact does not exists");
  }
}

module.exports = { register, list, update, soft_delete };
