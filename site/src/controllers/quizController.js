var quizModel = require('../models/quizModel.js');

function quiz(req, res) { 
    var acertos = req.body.acertos;
    var pontos = req.body.pontos;
    var idUsuario = req.body.idUsuario;

    quizModel.quiz(idUsuario, acertos, pontos)
    .then(
        function(resultado) {      
            res.json(resultado);
            
    }
    ).catch(function(erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);

        res.status(500).json(erro.sqlMessage);
    });

}

module.exports = {
    quiz
}