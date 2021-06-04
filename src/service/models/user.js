"use strict";

const {DataTypes, Model} = require(`sequelize`);

// const sequelize = require(`../lib/sequelize`);
const Aliase = require(`./aliase`);

class User extends Model {}

module.exports = class UserModel {
  init(sequelize) {
    User.init({
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
  }
  defineAssociations(sequelize) {
    User.hasMany(sequelize.models.Article, {
      as: Aliase.ARTICLES,
      foreignKey: `userId`,
    });
    User.hasMany(sequelize.models.Comment, {
      as: Aliase.COMMENTS,
      foreignKey: `userId`,
    });
  }
  getModel() {
    return User;
  }
};
