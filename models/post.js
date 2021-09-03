const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_prog");
class Post extends Model {}
Post.init(
  {
    userid: DataTypes.INTEGER,
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
