const { sequelize, DataTypes, Model } = require("sequelize");
class Comment extends Model {}

Comment.init({
  userId: DataTypes.INTEGER,
  content: DataTypes.TEXT,
  date: DataTypes.DATE,
  postId: DataTypes.INTEGER,
  sequelize,
  ModelName: "PostLike",
});
