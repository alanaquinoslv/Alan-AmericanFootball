function simular() {

    if (input_nome.value == '') {
        alert('Insira um nome')
    }
    else {
        div_msg.innerHTML = ''
        input_nome.value == ''

        var timeUsuario = input_nome.value
        var NumUsuario = Math.random()
        var NumCPU = Math.random()
        var pontosUsuario = NumUsuario
        var pontosCPU = NumCPU

        if ((pontosUsuario * 40).toFixed(0) > (pontosCPU * 40).toFixed(0)) {
            div_msg.innerHTML = `O ${timeUsuario} venceu de ${(pontosUsuario * 40).toFixed(0)} x ${(pontosCPU * 40).toFixed(0)} <br> <br> <img src="https://i.pinimg.com/originals/11/45/6b/11456bcecec0fcd21f793b12b93add7d.gif" alt="victory" style="width: 500px;" "border-radius: 3px;">`
        }

        if ((pontosCPU * 40).toFixed(0) > (pontosUsuario * 40).toFixed(0)) {
            div_msg.innerHTML = `O ${timeUsuario} perdeu de ${(pontosCPU * 40).toFixed(0)} x ${(pontosUsuario * 40).toFixed(0)} <br> <br> <img src="https://media.tenor.com/JOwH28-qWHYAAAAC/bears-bear-still-suck.gif" alt="victory" style="width: 500px;" "border-radius: 3px;">`
        }

        if ((pontosCPU * 40).toFixed(0) == (pontosUsuario * 40).toFixed(0)) {
            div_msg.innerHTML = `Empate :| em  ${(pontosCPU * 40).toFixed(0)} x ${(pontosUsuario * 40).toFixed(0)} <br> <br> <img src="https://pbs.twimg.com/media/DDgnsQjXcAA2Ir2.jpg" alt="victory" style="width: 500px;" "border-radius: 3px;">`
        }

    }

}