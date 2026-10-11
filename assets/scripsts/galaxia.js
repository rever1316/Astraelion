


const episodiosGalaxia =
    document.querySelectorAll('.video-galaxia');

const btnVerMaisGalaxia =
    document.getElementById('btnVerMaisGalaxia');

const limiteInicialGalaxia = 20;

const quantidadePorCliqueGalaxia = 20;

let episodiosVisiveis = limiteInicialGalaxia;


// Esconde os episódios depois dos 20 primeiros

episodiosGalaxia.forEach((episodio, index) => {

    if (index >= limiteInicialGalaxia) {

        episodio.style.display = 'none';

    }

});


// Se tiver 20 ou menos,
// não precisa mostrar o botão.

if (episodiosGalaxia.length <= limiteInicialGalaxia) {

    btnVerMaisGalaxia.style.display = 'none';

}


// Ver mais

btnVerMaisGalaxia.addEventListener('click', () => {

    const novoLimite =
        episodiosVisiveis +
        quantidadePorCliqueGalaxia;


    episodiosGalaxia.forEach((episodio, index) => {

        if (
            index >= episodiosVisiveis &&
            index < novoLimite
        ) {

            episodio.style.display = 'grid';

        }

    });


    episodiosVisiveis = novoLimite;


    // Acabaram os episódios

    if (
        episodiosVisiveis >=
        episodiosGalaxia.length
    ) {

        btnVerMaisGalaxia.style.display = 'none';

    }

});

var MenuItem = document.querySelectorAll('aside a');

function selectLink(){
    MenuItem.forEach((item) =>
        item.classList.remove('active')
    );
    this.classList.add('active');
}

MenuItem.forEach((item) =>
    item.addEventListener('click', selectLink)
);

// Configuração do tamanho padrão ao carregar a página
const INICIAR_RECOLHIDO = false; 

document.addEventListener("DOMContentLoaded", () => {
    // 1. Seletor corrigido para bater com <button class="btn-menu">
    const btnExpandir = document.querySelector('.btn-menu');
    const aside = document.querySelector('aside');
    
    // 2. Tenta pegar a tag <main> ou a div .fendas-container
    const mainContent = document.querySelector('main') || document.querySelector('.fendas-container');

    if (!btnExpandir || !aside) return;

    // Define o estado inicial com base na configuração
    if (INICIAR_RECOLHIDO) {
        aside.classList.add('recolhido');
        if (mainContent) mainContent.classList.add('recolhido');
    }

    // Evento de clique no botão do menu
    btnExpandir.addEventListener('click', () => {
        aside.classList.toggle('recolhido');
        if (mainContent) mainContent.classList.toggle('recolhido');
    });
});


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
