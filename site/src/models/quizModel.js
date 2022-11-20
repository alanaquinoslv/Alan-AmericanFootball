var database = require("../database/config")

function quiz(id, acertos, pontos) {
    console.log("NO MODEL")
    var instrucao = `insert into quiz (fkUsuario, acertos, pontos) values (${id}, ${acertos}, ${pontos})`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
    
}

module.exports = {
    quiz
}