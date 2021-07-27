const { sequelize, DataTypes, Model } = require("sequelize");
class PostLike extends Model {}

PostLike.init({
  postId: DataTypes.INTEGER,
  likeType: DataTypes.ENUM,
  userId: DataTypes.INTEGER,
  sequelize,
  ModelName: "PostLike",
});
