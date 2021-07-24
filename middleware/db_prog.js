const Sequelize = require("sequelize");

module.exports = new Sequelize("groupomania", "root", {
  host: "localhost",
  user: "root",
  dialect: "mysql",
  database: "alead",
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
