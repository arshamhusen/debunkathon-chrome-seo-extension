const ArticleProvider = require("../providers/articleProvider");

const ArticleController = {
  // check if article exists
  articleCheck: async (req, res) => {
    const article = await ArticleProvider.getArticleByTitle(req.body.title);
    if (article) {
      res.status(409).send("Article already exists");
      return;
    } else {
      return;
    }
  },
};
