var pular = document.getElementById('pular');
var pontos = document.getElementById('pontos');
var totalPontos = document.getElementById('totalPontos');
var cntgRegressiva = document.getElementById('cntgRegressiva');
var contador = 0;
var cntgPontos = 0;
var duracao = 0;
var qaSet = document.querySelectorAll('.qa_set');
var qaAnsRow = document.querySelectorAll('.qa_set .qa_ans_row input');

pular.addEventListener('click', function() {
    step()
})

qaAnsRow.forEach(function (element, index) {
    qaAnsRowSingle.addEventListener('click', function() {
        setTimeout (function()) {
            step();
        },500)
        var valid = this.getAttribute ("valid");
        if (valid == "valid") {
            cntgPontos +=20;
            pontos.innerHTML = cntgPontos;
            totalPontos.innerHTML = cntgPontos
        }
        else {
            cntgPontos -=20;
            pontos.innerHTML = cntgPontos;
            totalPontos.innerHTML = cntgPontos 
        }
    })

});

function step() {
    contador +=1;
    for (var i = 0; i < qaSet.length; i++) {
       qaSet[i].className='qa_set';
    }
    qaSet[contador].className= 'qa_set active'
    if (contador == 4) {
        pular.style.display = 'none'
    }
}