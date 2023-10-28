const ArticleController = require("../controllers/articleController");

const router = require("express").Router();

router.get("/", ArticleController.getArticles);
router.get("/:id", ArticleController.getArticle);
router.post("/", ArticleController.createArticle);
router.put("/:id", ArticleController.updateArticle);
router.delete("/:id", ArticleController.deleteArticle);
