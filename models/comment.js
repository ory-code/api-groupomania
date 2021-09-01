const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_prog");
class Comment extends Model {}

Comment.init(
  {
    userid: DataTypes.INTEGER,
    postid: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    date: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "Comment",
    timestamps: false,
  }
);

module.exports = Comment;
