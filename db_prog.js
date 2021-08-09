// const { db } = require("sequelize");
const {Sequelize} = require("sequelize")
//const sequelize = new Sequelize('sqlite::memory:');

const sequelize = new Sequelize("HGTqRcz18w", "HGTqRcz18w","hc5kdhXUf6", {
  host: "remotemysql.com",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
module.exports = sequelize;
