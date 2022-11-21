// resposta acertada
var numCorrect = 0;
// pontos
var pontos = 0

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

// gerando função
generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {

    function showQuestions(questions, quizContainer) {
        // armazenando saída e respostas

        var output = [];
        var answers;

        // para cada questão -- fala qual posição do vetor esta
        for (var i = 0; i < questions.length; i++) {

            // resetar respostas para colocar no output
            answers = [];

            // para cada resposta na questão -- add letra na resposta da questão que estiver no ocorrência
            for (letter in questions[i].answers) {

                // radio para html
                answers.push(
                    '<label class="label">'
                    // passa o valor da letra de resposta
                    + '<input type="radio" name="question' + i + '" value="' + letter + '">'
                    //	+ letter + ')
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

            // deixa de ser nulo e vira a letra marcada
            userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;



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
    }


    showQuestions(questions, quizContainer);

    // mostra resultado quando clicka
    submitButton.onclick = function () {
        showResults(questions, quizContainer, resultsContainer);
        var comentario = window.prompt('Antes de mostrar o resultado, o que você achou do esporte?')
        console.log(comentario)
    }
}

function registrarPontos(pontos) {
    var fkUsuario = sessionStorage.ID_USUARIO;

    // Enviando o valor da nova input
    fetch("/usuarios/registrarPontos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
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
