'use strict';

const {HttpCode} = require(`../../constants`);

const requiredFields = [`text`];

module.exports = (req, res, next) => {
  const newComment = req.body;
  const fields = Object.keys(newComment);
  const fieldsExists = requiredFields.every((field) => fields.includes(field));

  if (!fieldsExists) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};
