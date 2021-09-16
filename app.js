const express = require("express");
const app = express();
const cors = require("cors")
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const profilRoutes = require("./routes/profil");
const commentRoutes = require("./routes/comment");
const swaggerJsdoc = require("swagger-jsdoc");
const ui = require("swagger-ui-express");
const path = require("path");
const helmet = require("helmet")
const bodyParser = require("body-parser");
require("dotenv").config()


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Groupomania Api",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          name: 'authorization',
          in: "header",
          bearerFormat: "JWT"
        },
      }
    },
    security: [ { jwt: [] } ],
  },
  apis: [path.join(__dirname, "./swagger.yaml")], // files containing annotations as above
};
const openapiSpecification = swaggerJsdoc(options);

app.use(cors())
app.use(helmet())
app.use(bodyParser.json());
app.use("/api-docs", ui.serve);
app.get("/api-docs", ui.setup(openapiSpecification));
app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts",commentRoutes)
app.use("/api/profil", profilRoutes);

module.exports = app;
