'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

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

  create(article, comment) {
    const newComment = comment;
    newComment.id = nanoid(MAX_ID_LENGTH);

    article.comments.push(newComment);

    return newComment;
  }
}

module.exports = CommentService;
