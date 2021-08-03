const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_prog");
class Post extends Model {}
Post.init(
  {
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    img: DataTypes.STRING,
    date: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "Post",
    timestamps: false,
  }
);

module.exports = Post;
