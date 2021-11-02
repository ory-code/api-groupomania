const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_prog");
const User = require("./user")
class Comment extends Model {}

Comment.init(
  {
    PostId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    date: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "Comment",
    timestamps: false,
  }
);
Comment.User = Comment.belongsTo(User)
module.exports = Comment;
