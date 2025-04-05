const config = require("config");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config.db;
  const connection = await mysql.createConnection({
    "in-mum-web1188.main-hosting.eu",
    3306,
    "u114316720_vantageadmin,
    "M*]/CBp0",
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`u114316720_vantage\`;`);

  const sequelize = new Sequelize("u114316720_vantage", "u114316720_vantageadmin", "M*]/CBp0", {
    host: "in-mum-web1188.main-hosting.eu",
    port: 3306,
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
