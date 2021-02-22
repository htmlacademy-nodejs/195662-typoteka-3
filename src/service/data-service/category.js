'use strict';

class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return new Set(this._articles.map((article) => article.category).flat());
  }
}

module.exports = CategoryService;
