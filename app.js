const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post")
const swaggerJsdoc = require("swagger-jsdoc");
const ui = require("swagger-ui-express");
const path = require("path");
const bodyParser = require("body-parser")
require("dotenv").config()

const db = require("./db_prog");
const { ConnectionError } = require("sequelize/types");
const User = require("./models/user");
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
app.use("/api/auth",userRoutes);
app.use("/api/post", postRoutes, (req,res)=> {

});

// app.use('/groupomania/user',  userRoutes) 
// app.use('/groupomania/profile', profileRoutes)
// app.use('/groupomania/post',  postRoutes)
// app.use('/groupomania/comment',  commentRoutes)
// app.use('/groupomania/likePost',  likePostRoutes)
// app.use('/groupomania/likeComment' , likeCommentRoutes)
module.exports = app;
