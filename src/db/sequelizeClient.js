const config = require("config");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  // Destructure database config from config file
  const { host, port, user, password, database } = config.db;

  // Create the database if it doesn't exist
  const connection = await mysql.createConnection({
    host: "in-mum-web1188.main-hosting.eu",
    port: 3306,
    user: "u114316720_vantageadmin",
    password: "M*]/CBp0",
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`u114316720_vantage\`;`);
  await connection.end();

  // Connect to Sequelize ORM
  const sequelize = new Sequelize("u114316720_vantage", "u114316720_vantageadmin", "M*]/CBp0", {
    host: "in-mum-web1188.main-hosting.eu",
    port: 3306,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });

  // Attach Sequelize instance and library to `db` object
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
  db.brand = require("../models/brandModel")(sequelize);
  db.event = require("../models/eventModel")(sequelize);

  // Sync models with DB
  try {
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error("Database synchronization error:", err);
  }
}
