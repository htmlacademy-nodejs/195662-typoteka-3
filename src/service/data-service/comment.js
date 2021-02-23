'use strict';

class CommentService {
  findAll(article) {
    return article.comments;
  }
  remove(article, commentId) {
    const comment = article.comments.find((item) => item.id === commentId);

    if (!comment) {
      return null;
    }

    article.comments = article.comments.filter((item) => item.id !== commentId);

    return comment;
  }
}

module.exports = CommentService;
