'use strict';

const Joi = require(`joi`);
const {HttpCode} = require(`../../constants`);

const schema = Joi.object({
  text: Joi.string().required(),
});

module.exports = (req, res, next) => {
  const newComment = req.body;
  const {error} = schema.validate(newComment, {abortEarly: false});

  if (error) {
    return res.status(HttpCode.BAD_REQUEST).send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};
