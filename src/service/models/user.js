"use strict";

const {DataTypes} = require(`sequelize`);
const Aliase = require(`./aliase`);

module.exports = class UserModel {
  constructor(sequelize) {
    this._sequelizeInstance = sequelize;
    this._model = sequelize.define(`User`, {
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
      tableName: Aliase.USERS,
      underscored: true,
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
