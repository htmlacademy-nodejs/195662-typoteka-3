"use strict";

const {DataTypes, Model} = require(`sequelize`);
const Aliase = require(`./aliase`);

class Comment extends Model {}

module.exports = class CommentModel {
  constructor(sequelize) {
    this._sequelizeInstance = sequelize;
    this._model = Comment;
  }
  init() {
    this._model.init({
      text: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize: this._sequelizeInstance,
      modelName: `Comment`,
      tableName: `comments`
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
