'use strict';

const {Router} = require(`express`);
const {DateTime} = require(`luxon`);

const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);
const UPLOAD_DIR = `../upload/img/`;
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const api = require(`../api`).getAPI();
const articlesRouter = new Router();

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});
const upload = multer({storage});

articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/publications-by-category`));

articlesRouter.get(`/add`, async (req, res) => {
  const {error} = req.query;
  const categories = await api.getCategories();
  const date = DateTime.now().toFormat(`dd.MM.yyyy`);
  res.render(`articles/post-add`, {date, categories, error});
});
articlesRouter.post(
    `/add`,
    upload.single(`photo`),
    async (req, res) => {
      const {body} = req;
      const articleData = {
        title: body.title,
        categories: body.categories,
        date: DateTime.fromFormat(body.date, `dd.MM.yyyy`).toFormat(`yyyy-MM-dd`),
        announce: body.announce,
        text: body.text,
      };
      try {
        await api.createArticle(articleData);
        res.redirect(`/my`);
      } catch (error) {
        res.redirect(`/articles/add?error=${encodeURIComponent(error.response.data)}`);
      }
    }
);
articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post`));
articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const {error} = req.query;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories()
  ]);
  article.date = DateTime.fromISO(article.date).toFormat(`dd.MM.yyyy`);
  res.render(`articles/post-edit`, {id, article, categories, error});
});
articlesRouter.post(
    `/edit/:id`,
    upload.single(`photo`),
    async (req, res) => {
      const {body} = req;
      const {id} = req.params;
      const articleData = {
        title: body.title,
        categories: body.categories,
        date: DateTime.fromFormat(body.date, `dd.MM.yyyy`).toFormat(`yyyy-MM-dd`),
        announce: body.announce,
        text: body.text,
      };
      try {
        await api.updateArticle(id, articleData);
        res.redirect(`/my`);
      } catch (error) {
        res.redirect(`/articles/edit/${id}?error=${encodeURIComponent(error.response.data)}`);
      }
    }
);

module.exports = articlesRouter;
