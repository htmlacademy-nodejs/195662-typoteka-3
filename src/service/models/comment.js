"use strict";

const {DataTypes} = require(`sequelize`);
const Aliase = require(`./aliase`);

module.exports = class CommentModel {
  constructor(sequelize) {
    this._sequelizeInstance = sequelize;
    this._model = sequelize.define(`Comment`, {
      text: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: Aliase.COMMENTS,
      underscored: true,
    });
  }
  defineAssociations() {
    this._model.belongsTo(this._sequelizeInstance.models.User, {
      as: Aliase.USERS,
      foreignKey: `userId`,
    });
    this._model.belongsTo(this._sequelizeInstance.models.Article, {
      as: Aliase.ARTICLES,
      foreignKey: `articleId`,
    });
  }
  getModel() {
    return this._model;
  }
};
