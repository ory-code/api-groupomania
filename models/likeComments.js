const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_prog");
class LikeComments extends Model {}
LikeComments.init(
  {
    liketype: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "LikeComments",
    Timestamps: false,
  }
);

module.exports = LikeComments;
