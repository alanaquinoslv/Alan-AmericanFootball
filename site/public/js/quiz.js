// resposta acertada
var numCorrect = 0;
// pontos
var pontos = 0

var fkUsuario = sessionStorage.ID_USUARIO;


// vetor com questoes e alternativas
var myQuestions = [
    {
        question: "Quantos pontos vale o touchdown?",
        answers: {
            a: '6 pontos',
            b: '3 pontos',
            c: '5 pontos',
            d: '7 pontos',
        },
        // resposta correta para correção
        correctAnswer: 'a'
    },
    {
        question: "Qual o nome do jogador que lança a bola?",
        answers: {
            a: 'FullBack',
            b: 'QuarterBack',
            c: 'DefensiveBack',
            d: 'LineBacker',
        },
        // resposta correta para correção
        correctAnswer: 'b'
    },
    {
        question: "Formação defensiva que faz analogia à guerra:",
        answers: {
            a: 'Sneak',
            b: 'Mike',
            c: 'Shotgun',
            d: 'Blitz',
        },
        // resposta correta para correção
        correctAnswer: 'd'
    },
    {
        question: "O que é o punt?",
        answers: {
            a: '"Gol contra"',
            b: 'Perda da bola',
            c: 'Recuo',
            d: 'Roubo de bola',
        },
        // resposta correta para correção
        correctAnswer: 'c'
    },
    {
        question: "Qual brasileiro jogou uma partida de temporada regular na NFL?",
        answers: {
            a: 'Cairo Santos',
            b: 'Breno Giacomini',
            c: 'Durval Queiroz',
            d: 'Maikon Bonani',
        },
        // resposta correta para correção
        correctAnswer: 'a'
    }
];

// pega informação do html
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var rankingButton = document.getElementById('ranking');

// gerando função
generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {

    function showQuestions(questions, quizContainer) {
        // armazenando saída e respostas

        var output = [];
        var answers;

        // lê as respostas e passa parametros para gerar a função quiz
        for (var i = 0; i < questions.length; i++) {
            //inicia index e fala posição da lista e no fim passa para a proxima

            // resposta fica em lista e reseta toda hora quando passa pra questao
            answers = [];

            // para cada resposta na questão -- add letra na resposta da questão que estiver no ocorrência
            for (letter in questions[i].answers) {
                //add resposta em cada posição do loop
                // pega respostas e escreve com radio para html
                answers.push(
                    '<label class="label">'
                    // passa o valor da letra de resposta
                    + '<input type="radio" name="question' + i + '" value="' + letter + '">'
                    + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add resposta na lista de output -- div questao e resposta -- armazena no html e repete laço
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // todo output colocado no html
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer) {


        var answerContainers = quizContainer.querySelectorAll('.answers'); //todas as respostas

        // resposta marcada
        var userAnswer = '';

        for (var i = 0; i < questions.length; i++) {
            //mostra resposta pelo queryselector
            // deixa de ser nulo e vira a letra marcada
            userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

            //compara resposta
            if (userAnswer === questions[i].correctAnswer) {
                // se resposta marcada for correta aumenta numero de acerto

                numCorrect++;
                pontos += 10


                answerContainers[i].style.color = 'rgb(75, 250, 32)';
            }

            else {

                answerContainers[i].style.color = 'rgb(255, 0, 0)';
            }
        }


        resultsContainer.innerHTML = 'Você acertou ' + numCorrect + ' de ' + questions.length + '<br> ' + ' Pontos: ' + pontos;
        registrarPontos(pontos)
        // buscarPontos()
        // buscarRanking()
        // plotarRanking()
        obterDadosGraficos()

    }


    showQuestions(questions, quizContainer);

    // mostra resultado quando clicka
    submitButton.onclick = function () {
        showResults(questions, quizContainer, resultsContainer);

        var comentario = window.prompt('Antes de mostrar o resultado, o que você achou do esporte?')
        console.log(comentario)
        registrarComentario(comentario)
    }
}

function registrarPontos(pontos) {

    // Enviando o valor da nova input
    fetch("/usuarios/registrarPontos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            acertosServer: numCorrect,
            pontosServer: pontos,
            fkUsuarioServer: fkUsuario,

        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        // finalizarAguardar();
    });

    return false;
}

function registrarComentario(comentario) {

    // Enviando o valor da nova input
    fetch("/usuarios/registrarComentario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            comentarioServer: comentario,
            fkUsuarioServer: fkUsuario
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        // finalizarAguardar();
    });

    return false;
}

// function buscarPontos() {
//     //aguardar();
//     fetch(`/avisos/buscarPontos/${fkUsuario}`).then(function (resposta) {
//         if (resposta.ok) {
//             if (resposta.status == 204) {
//                 var feed = document.getElementById("metrica");
//                 var mensagem = document.createElement("span");
//                 mensagem.innerHTML = "Nenhum resultado encontrado."
//                 feed.appendChild(mensagem);
//                 throw "Nenhum resultado encontrado!!";
//             }

//             resposta.json().then(function (resposta) {
//                 console.log("Dados recebidos: ", JSON.stringify(resposta));

//                 var feed = document.getElementById("metrica");
//                 feed.innerHTML = ''
//                 var titulo = ''

//                 var cont = 0

//                 for (let i = 0; i < resposta.length; i++) {
//                     cont++
//                     var publicacao = resposta[i];
//                     console.log(resposta)
//                     // criando e manipulando elementos do HTML via JavaScript
//                     var divPublicacao = document.createElement("div");

//                     feed.innerHTML += `${cont}º - Nome: ${publicacao.nome} - Pontuação: ${publicacao.pontos} <br>`

//                 }

//                 console.log(publicacao.pontos)


//             });
//         } else {
//             throw ('Houve um erro na API!');
//         }
//     }).catch(function (resposta) {
//         console.error(resposta);
//     });
// }

// modal
const modal = document.querySelector('.modal-container')

function openModal() {
    modal.classList.add('active')
}

function closeModal() {
    modal.classList.remove('active')
}


// // //   graficos

let proximaAtualizacao;

window.onload = obterDadosGraficos();

function obterDadosGraficos() {
    obterDadosGrafico(fkUsuario)
}

verificar_autenticacao();


function exibirAquario(fkUsuario) {
    let todosOsGraficos = document.getElementById("metrica")

    for (i = 1; i <= todosOsGraficos.childElementCount; i++) {
        // exibindo - ou não - o gráfico
        let elementoAtual = document.getElementById(`metrica${i}`)
        if (elementoAtual.classList.contains("display-block")) {
            elementoAtual.classList.remove("display-block")
        }
        elementoAtual.classList.add("display-none")

        // alterando estilo do botão
        let btnAtual = document.getElementById(`btnAquario${i}`)
        if (btnAtual.classList.contains("btn-pink")) {
            btnAtual.classList.remove("btn-pink")
        }
        btnAtual.classList.add("btn-white")
    }

    // exibindo - ou não - o gráfico
    let graficoExibir = document.getElementById(`metrica${fkUsuario}`)
    graficoExibir.classList.remove("display-none")
    graficoExibir.classList.add("display-block")

    // alterando estilo do botão
    let btnExibir = document.getElementById(`btnAquario${fkUsuario}`)
    btnExibir.classList.remove("btn-white")
    btnExibir.classList.add("btn-pink")
}

function obterDadosGrafico(fkUsuario) {


    fetch(`/medidas/ultimas/${fkUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta, fkUsuario);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGrafico(resposta, fkUsuario) {

    let labels = [];

    let dados = {
        labels: labels,
        datasets: [
        {
            label: 'Pontuação',
            data: [],
            fill: true,
            backgroundColor: 'rgb(253, 44, 44)',
            tension: 0.1
        }]
    };

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.datasets[0].data.push(registro.pontos);
        labels.push(registro.nome);

    }

    const config = {
        type: 'bar',
        data: dados,
        options: { responsive: true, maintainAspectRatio: false }
    };

    let myChart = new Chart(
        document.getElementById(`myChartCanvas`),
        config
    );

}

function atualizarGrafico(fkUsuario, dados, myChart) {

    fetch(`/medidas/tempo-real/${fkUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);

                let avisoCaptura = document.getElementById(`avisoCaptura${fkUsuario}`)
                avisoCaptura.innerHTML = ""



                // tirando e colocando valores no gráfico
                dados.labels.shift(); // apagar o primeiro
                dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                dados.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

                dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                myChart.update();


                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(fkUsuario, dados, myChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(fkUsuario, dados, myChart), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}