const { sequelize, DataTypes, Model } = require("sequelize");


class Post extends Model {}

Post.init({
  title: DataTypes.STRING,
  text: DataTypes.TEXT,
  img: DataTypes.STRING,
  like: DataTypes.INTEGER,
  dislike: DataTypes.INTEGER,
  date: DataTypes.DATE,
  sequelize,
  ModelName: "Post",
});

return post;