'use strict';

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const initDatabase = require(`../lib/init-db`);
const Aliase = require(`../models/aliase`);
const {getLogger} = require(`../lib/logger`);
const {readContent, getRandomInt, shuffle} = require(`../../utils`);
const {FileExtension} = require(`../../constants`);

const FILE_USERS_PATH = `./data/users.json`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const MAX_COMMENTS = 10;
const DEFAULT_COUNT = 1;


const logger = getLogger({name: `api`});

const generateDate = () => {
  const to = new Date();
  const from = new Date();
  from.setMonth(to.getMonth() - 3);
  return new Date(from.getTime() + Math.random() * (to - from));
};

const generateComments = (count, articleId, userCount, comments) => (
  Array(count).fill({}).map(() => ({
    articleId,
    userId: getRandomInt(1, userCount),
    text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `),
  }))
);

const generatePicture = (number) => (`image0${number}.jpg`);

const generateCategories = (categoriesCount) => {
  const categories = new Set(Array(getRandomInt(1, 4)).fill(0).map(() => getRandomInt(1, categoriesCount)));
  return Array.from(categories);
};

const generateArticles = (count, usersCount, titles, categoriesCount, sentences, comments) => {
  return Array(count).fill({}).map((_, index) => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: generatePicture(getRandomInt(1, 3)),
    announce: shuffle(sentences).slice(0, getRandomInt(1, 5)).join(` `),
    text: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `),
    userId: getRandomInt(1, usersCount),
    date: generateDate(),
    categories: generateCategories(categoriesCount),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), index + 1, usersCount, comments),
  }));
};

module.exports = {
  name: `--filldb`,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (error) {
      logger.error(`An error occured: ${error.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);

    const users = await readContent(FILE_USERS_PATH, FileExtension.JSON);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const titlesSource = await readContent(FILE_TITLES_PATH);
    const sentencesSource = await readContent(FILE_SENTENCES_PATH);
    const commentsSource = await readContent(FILE_COMMENTS_PATH);

    const [count] = args;
    const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const generateArticlesParams = [
      countArticles,
      users.length,
      titlesSource,
      categories.length,
      sentencesSource,
      commentsSource,
    ];
    const articles = generateArticles(...generateArticlesParams);

    return initDatabase(sequelize, {users, categories, articles});
  }
};
