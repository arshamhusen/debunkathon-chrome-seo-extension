const { Article } = require("../models");
const { Op } = require("sequelize");

const ArticleProvider = {
  getArticles: async () => {
    return await Article.findAll();
  },
  getArticle: async (id) => {
    return await Article.findByPk(id);
  },
  getArticleByTitle: async (title) => {
    return await Article.findOne({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    });
  },
  createArticle: async (Article) => {
    return await Article.create(Article);
  },
  updateArticle: async (id, Article) => {
    return await Article.update(Article, {
      where: {
        id: id,
      },
    });
  },
  deleteArticle: async (id) => {
    return await Article.destroy({
      where: {
        id: id,
      },
    });
  },
};

module.exports = ArticleProvider;
