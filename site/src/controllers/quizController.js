// var quizModel = require('../models/quizModel.js');

// function quiz(req, res) { 
//     var acertos = req.body.acertos;
//     var pontos = req.body.pontos;
//     var idUsuario = req.body.idUsuario;

//     quizModel.quiz(idUsuario, acertos, pontos)
//     .then(
//         function(resultado) {      
//             res.json(resultado);
            
//     }
//     ).catch(function(erro) {
//         console.log(erro);
//         console.log("Houve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);

//         res.status(500).json(erro.sqlMessage);
//     });

// }

// module.exports = {
//     quiz
// }


var quizModel = require("../models/quizModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA quizController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    quizModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// function entrar(req, res) {
//     var acertos = req.body.acertosServer;
//     var score = req.body.scoreServer;
        
//         usuarioModel.entrar(acertos, score)
//             .then(
//                 function (resultado) {
//                     console.log(`\nResultados encontrados: ${resultado.length}`);
//                     console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

//                     if (resultado.length == 1) {
//                         console.log(resultado);
//                         res.json(resultado[0]);
//                     } else if (resultado.length == 0) {
//                         res.status(403).send("Email e/ou senha inválido(s)");
//                     } else {
//                         res.status(403).send("Mais de um usuário com o mesmo login e senha!");
//                     }
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var acertos = req.body.acertosServer;
    var score = req.body.scoreServer;

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        quizModel.cadastrar(acertos, pontos)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

module.exports = {
    cadastrar,
    listar,
    testar
}
