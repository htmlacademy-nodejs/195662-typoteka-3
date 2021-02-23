'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((article) => article.id === id);
  }

  create(article) {
    const newArticle = article;

    newArticle.id = nanoid(MAX_ID_LENGTH);
    newArticle.comments = [];

    this._articles.push(newArticle);

    return newArticle;
  }
}

module.exports = ArticleService;
