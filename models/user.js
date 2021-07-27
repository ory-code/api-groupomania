const { sequelize, DataTypes, Model } = require("sequelize");
class User extends Model{}
User.init(
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: DataTypes.STRING,
    firstname: DataTypes.STRING,
    password: DataTypes.STRING,
    sexe: DataTypes.ENUM,
  },
  {
    sequelize,
    modelName: "User",
  }
);
return User;


