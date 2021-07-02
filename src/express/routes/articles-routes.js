'use strict';

const {Router} = require(`express`);

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

articlesRouter.post(`/add`,
    upload.single(`photo`),
    async (req, res) => {
      const {body} = req;
      const articleData = {
        title: body.title,
        categories: body.categories,
        date: body.date,
        announce: body.announce,
      };
      try {
        await api.createArticle(articleData);
        res.redirect(`/my`);
      } catch (e) {
        res.redirect(`back`);
      }
    }
);
articlesRouter.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();
  res.render(`articles/post-add`, {categories});
});
articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post`));
articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories()
  ]);
  res.render(`articles/post-edit`, {article, categories});
});


module.exports = articlesRouter;
