
document.addEventListener("DOMContentLoaded", () => {
    const grupo = document.querySelector(".grupo-inscricoes");
    const botao = document.querySelector("#btnVerInscricoes");
    const lista = document.querySelector("#listaInscricoesMenu");

    if (!grupo || !botao || !lista) return;

    const canais = [...lista.querySelectorAll(".item-inscrito")];

    // Limita a lista lateral aos primeiros 25 canais.
    canais.slice(25).forEach(canal => canal.remove());

    function atualizarBotao() {
        const expandido = grupo.classList.contains("expandido");
        const texto = botao.querySelector("span");

        if (texto) {
            texto.textContent = expandido ? "Ver menos" : "Ver mais";
        }

        botao.setAttribute("aria-expanded", String(expandido));

        // Não mostra o botão quando existem 6 canais ou menos.
        botao.hidden = canais.length <= 6;
    }

    botao.addEventListener("click", () => {
        grupo.classList.toggle("expandido");
        atualizarBotao();
    });

    atualizarBotao();
});
