const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const swaggerJsdoc = require("swagger-jsdoc");
const ui = require("swagger-ui-express");
const path = require ("path")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
  },
  apis: [path.join(__dirname,"./swagger.yaml")], // files containing annotations as above
};
const openapiSpecification = swaggerJsdoc(options);

app.use("/api-docs", ui.serve);
app.get("/api-docs", ui.setup(openapiSpecification));
app.use("/api/user", userRoutes)
// app.get("/api-docs.json", (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   res.send(openapiSpecification);
// });
module.exports = app;
