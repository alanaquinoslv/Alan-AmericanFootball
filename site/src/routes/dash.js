var express = require("express");
const { route } = require(".");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.get ("/listar", function (req, res) {
    dashController.listar(req, res);
}) 

module.exports = router