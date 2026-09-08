
var MenuItem = document.querySelectorAll('aside a')

function selectLink(){
    MenuItem.forEach((item)=>
        item.classList.remove('active')
    )
    this.classList.add('active')
}

MenuItem.forEach((item)=>
item.addEventListener('click', selectLink)
)

// Configuração do tamanho padrão ao carregar a página (true = recolhido por padrão, false = expandido por padrão)
const INICIAR_RECOLHIDO = false; 

document.addEventListener("DOMContentLoaded", () => {
    const btnExpandir = document.querySelector('.expandir');
    const aside = document.querySelector('aside');
    const main = document.querySelector('main');

    // Define o estado inicial com base na configuração
    if (INICIAR_RECOLHIDO) {
        aside.classList.add('recolhido');
        main.classList.add('recolhido');
    }

    // Evento de clique no botão do menu
    btnExpandir.addEventListener('click', () => {
        // Alterna a classe 'recolhido' no menu e no main
        aside.classList.toggle('recolhido');
        main.classList.toggle('recolhido');
    });
});




const categorias = document.querySelectorAll('.categoria');
const trilhoAbas = document.querySelector('.abas-trilho');

categorias.forEach((categoria) => {

    categoria.addEventListener('click', () => {

        // Remove o active de todas as abas
        categorias.forEach((item) => {
            item.classList.remove('active');
        });

        // Ativa a aba clicada
        categoria.classList.add('active');

        // Descobre qual aba foi clicada
        const aba = Number(categoria.dataset.aba);

        // Move o conteúdo
        trilhoAbas.style.transform =
            `translateX(-${aba * 25}%)`;

    });

});

const videos = document.querySelectorAll('.card-missao');
const btnVerMais = document.getElementById('btnVerMais');

const limiteInicial = 20;
const quantidadePorClique = 20;

let videosVisiveis = limiteInicial;


// Esconde os vídeos depois dos 20 primeiros

videos.forEach((video, index) => {

    if (index >= limiteInicial) {
        video.style.display = 'none';
    }

});


// Se não tiver mais de 20 vídeos,
// o botão não precisa aparecer.

if (videos.length <= limiteInicial) {

    btnVerMais.style.display = 'none';

}


btnVerMais.addEventListener('click', () => {

    const novoLimite =
        videosVisiveis + quantidadePorClique;


    videos.forEach((video, index) => {

        if (
            index >= videosVisiveis &&
            index < novoLimite
        ) {

            video.style.display = 'block';

        }

    });


    videosVisiveis = novoLimite;


    // Acabaram os vídeos

    if (videosVisiveis >= videos.length) {

        btnVerMais.style.display = 'none';

    }

});

const fendas = document.querySelectorAll('.card-fenda');
const btnVerMaisFendas = document.querySelector('.btn-ver-mais-fendas');

const fendasPorLinha = 6;
const linhasIniciais = 2;
const quantidadeInicial = fendasPorLinha * linhasIniciais;

const linhasPorClique = 2;
const quantidadePorCliqueFendas = fendasPorLinha * linhasPorClique;

let fendasVisiveis = quantidadeInicial;


// Esconde as Fendas depois das duas primeiras linhas
fendas.forEach((fenda, index) => {
    if (index >= quantidadeInicial) {
        fenda.style.display = 'none';
    }
});


// Se tiver 12 ou menos, não mostra o botão
if (fendas.length <= quantidadeInicial) {
    btnVerMaisFendas.style.display = 'none';
}


// Ver mais
btnVerMaisFendas.addEventListener('click', () => {

    const novoLimite = fendasVisiveis + quantidadePorCliqueFendas;

    fendas.forEach((fenda, index) => {

        if (
            index >= fendasVisiveis &&
            index < novoLimite
        ) {
            fenda.style.display = 'block';
        }

    });

    fendasVisiveis = novoLimite;


    // Esconde o botão quando não houver mais Fendas
    if (fendasVisiveis >= fendas.length) {
        btnVerMaisFendas.style.display = 'none';
    }

});