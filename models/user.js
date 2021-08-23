const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_prog");
class User extends Model {}
User.init(
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: DataTypes.STRING,
    firstname: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "User",
    timestamps: false
  }
);

module.exports = User;
