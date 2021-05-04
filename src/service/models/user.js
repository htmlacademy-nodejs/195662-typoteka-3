"use strict";

const {DataTypes, Model} = require(`sequelize`);

class User extends Model {}

const define = (sequelize) => User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: `User`,
  tableName: `users`
});

module.exports = define;
