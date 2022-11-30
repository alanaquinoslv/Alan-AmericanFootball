window.onscroll = function () {
    scroll()
}

// exibe botao quando ativar scroll
function scroll() {
    var btn = document.getElementById("btnTop");

    if (document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    }
    else {
        btn.style.display = "none";
    }
}

// funcao ir ao topo
function voltarAoTopo() {
    document.documentElement.scrollTop = 0;

}