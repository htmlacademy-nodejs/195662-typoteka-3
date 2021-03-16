'use strict';

class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    const categories = new Set(this._articles.map((item) => item.categories).flat());
    return [...categories];
  }
}

module.exports = CategoryService;
