'use strict';

const Joi = require(`joi`);
const {HttpCode} = require(`../../constants`);

const requiredFields = [
  `title`,
  `date`,
  `categories`,
  `announce`,
];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const fields = Object.keys(newArticle);
  const fieldsExists = requiredFields.every((field) => fields.includes(field));

  if (!fieldsExists) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};
