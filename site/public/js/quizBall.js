var fkUsuario = sessionStorage.ID_USUARIO;
    
var acertos = 0
var pontos = 0
var cont = 1

// vetor com as respostas corretas
var certas = [1, 2, 2, 4, 3]

// vetor com resposta do usuario
var respostaUsuario = []

// função que recebe numero da pergunta e resposta escolhida
function resposta(numPergunta, selecionada) {
    // guardar resposta escolhida
    respostaUsuario[numPergunta] = selecionada.value

    id = "q" + numPergunta
}

// função para comparar os vetores para quantas estão certas
function corrigir() {

    for (let i = 0; i < certas.length; i++) {
        if (certas[i] == respostaUsuario[i]) {
            acertos++
            pontos += 10
        }
    }

    document.getElementById("resultado").innerHTML = `<br> <br> <br> Você acertou ${acertos} de 5 e fez ${pontos} pontos`

    console.log(pontos)
    console.log(acertos)

    card5.style.display = 'none'
    cardResultado.style.display = 'block'

    registrarPontos(pontos)
    obterDadosGraficos()
}

// função passar card
function proxima() {

    for (let i = 1; i <= 5; i++) {

        if (cont == 1) {
            card1.style.display = 'none'
            card2.style.display = 'block'
            cont++
            break;
        }
        if (cont == 2) {
            card2.style.display = 'none'
            card3.style.display = 'block'
            cont++
            break;
        }
        if (cont == 3) {
            card3.style.display = 'none'
            card4.style.display = 'block'
            cont++
            break;
        }
        if (cont == 4) {
            card4.style.display = 'none'
            card5.style.display = 'block'
            cont++
            break;
        }
      
    }
}


// API 
// registrando os pontos
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
    acertosServer: acertos,
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

// buscar pontos em string
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



// graficos 

// // //   graficos

function grafico() {
    
    cardResultado.style.display = 'none'
    cardRanking.style.display = 'block'

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


}

