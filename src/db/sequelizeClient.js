const config = require("config");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  try {
    // Destructure database config from config file
    const { host, port, user, password, database } = config.db;

    console.log("Attempting to connect to database with config:", {
      host,
      port,
      user,
      database,
    });

    // Create the database if it doesn't exist
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });

    console.log(
      "Initial connection successful, creating database if not exists..."
    );
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end();
    console.log("Database creation/verification complete");

    // Connect to Sequelize ORM
    const sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect: "mysql",
      logging: console.log, // Enable logging temporarily
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });

    console.log("Attempting to authenticate with Sequelize...");
    // Test the connection
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Attach Sequelize instance and library to `db` object
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    // Import models
    console.log("Loading models...");
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
    console.log("Syncing models with database...");
    await sequelize.sync({ alter: true }).catch((err) => {
      console.error("Error syncing models:", err);
    });    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error("Database initialization error:", err);
    console.error("Error details:", {
      name: err.name,
      message: err.message,
      code: err.code,
      errno: err.errno,
      sqlState: err.sqlState,
      sqlMessage: err.sqlMessage,
    });
    throw err;
  }
}
