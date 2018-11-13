const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ScoreController = require('../controllers/scores');

router.post("/", checkAuth, ScoreController.score_add_score);

 router.get("/", ScoreController.scores_get_all);

 router.get("/user", ScoreController.scores_getUser_score);
//
// router.patch("/:productId", checkAuth, ProductsController.products_update_product);
//
// router.delete("/:productId", checkAuth, ProductsController.products_delete);

module.exports = router;
