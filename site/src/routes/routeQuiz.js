// var express = require("express");
// var router = express.Router();

// var quizController = require("../controllers/quizController");

// router.post("/quizCadastrar", function (req, res) {
//     quizController.quiz(req, res);
// })

// module.exports = router;

var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.get("/", function (req, res) {
    quizController.testar(req, res);
});

router.get("/listar", function (req, res) {
    quizController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    quizController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    quizController.entrar(req, res);
});

module.exports = router;