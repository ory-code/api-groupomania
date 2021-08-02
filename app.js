const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const swaggerJsdoc = require("swagger-jsdoc");
const ui = require("swagger-ui-express");
const path = require("path");
const bodyParser = require("body-parser")
const { Sequelize } = require("sequelize");

const db = require("./db_prog");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Groupomania Api",
      version: "1.0.0",
    },
  },
  apis: [path.join(__dirname, "./swagger.yaml")], // files containing annotations as above
};
const openapiSpecification = swaggerJsdoc(options);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(bodyParser.json())
app.use("/api-docs", ui.serve);
app.get("/api-docs", ui.setup(openapiSpecification));
app.use("/api/auth", userRoutes);

// app.get("/api-docs.json", (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   res.send(openapiSpecification);
// });
module.exports = app;
