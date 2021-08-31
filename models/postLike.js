const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_prog");
class PostLike extends Model {}

PostLike.init(
  {
    postid: DataTypes.INTEGER,
    liketype: DataTypes.ENUM(1, -1),
    userid: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "Postlike",
    timestamps: false,
  }
);

module.exports = PostLike;
