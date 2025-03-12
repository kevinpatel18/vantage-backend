const config = require("config");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config.db;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  const sequelize = new Sequelize(database, user, password, {
    host: host,
    port: port,
    dialect: "mysql",
    logging: false,
    maxConcurrentQueries: 100,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: { maxConnections: 5, maxIdleTime: 30 },
    language: "en",
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  // Import models
  db.userDetails = require("../models/userDetailsModel")(sequelize);
  db.course = require("../models/courseModel")(sequelize);
  db.contact = require("../models/contactModel")(sequelize);
  db.registerUser = require("../models/registerModel")(sequelize);
  db.testimonials = require("../models/testimonialsModel")(sequelize);
  db.useCase = require("../models/useCaseModel")(sequelize);
  db.gallery = require("../models/galleryModel")(sequelize);

  // Sync models with database
  try {
    await sequelize.sync();
  } catch (err) {
    console.error("Database synchronization error:", err);
  }
}
