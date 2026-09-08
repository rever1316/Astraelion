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