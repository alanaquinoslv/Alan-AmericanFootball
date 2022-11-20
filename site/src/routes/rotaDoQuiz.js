var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/quizCadastrar", function (req, res) {
    quizController.quiz(req, res);
})

module.exports = router;