const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkRole = require('../middleware/check-role');

const QuestionsController = require('../controllers/questions');

// Handle incoming GET requests to /orders
router.get("/", checkRole, QuestionsController.questions_get_all);

router.post("/", checkAuth, checkRole, QuestionsController.questions_create_question);

router.delete("/:_id", checkAuth, checkRole, QuestionsController.questions_delete_question);

//router.get("/:orderId", checkAuth, OrdersController.orders_get_order);


module.exports = router;
