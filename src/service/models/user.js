"use strict";

const {DataTypes, Model} = require(`sequelize`);
const Aliase = require(`./aliase`);

class User extends Model {}

module.exports = class UserModel {
  constructor(sequelize) {
    this._sequelizeInstance = sequelize;
    this._model = User;
  }
  init() {
    this._model.init({
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
      sequelize: this._sequelizeInstance,
      modelName: `User`,
      tableName: `users`
    });
  }
  defineAssociations() {
    this._model.hasMany(this._sequelizeInstance.models.Article, {
      as: Aliase.ARTICLES,
      foreignKey: `userId`,
    });
    this._model.hasMany(this._sequelizeInstance.models.Comment, {
      as: Aliase.COMMENTS,
      foreignKey: `userId`,
    });
  }
  getModel() {
    return this._model;
  }
};
