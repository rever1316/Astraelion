var MenuItem = document.querySelectorAll('aside.menu-lateral a')

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
const INICIAR_RECOLHIDO = true; 

document.addEventListener("DOMContentLoaded", () => {
    const btnExpandir = document.querySelector('.btn-menu');
    const aside = document.querySelector('aside.menu-lateral');
    const main = document.querySelector('main.watch-container');

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


const btnDescricao = document.querySelector('.btn-descricao');
const descricao = document.querySelector('.descricao');

btnDescricao.addEventListener('click', () => {

    descricao.classList.toggle('aberta');

    if (descricao.classList.contains('aberta')) {
        btnDescricao.textContent = 'Mostrar menos';
    } else {
        btnDescricao.textContent = 'Mostrar mais';
    }

});


const tituloVideo = document.querySelector('.titulo-video');
const btnTitulo = document.querySelector('.btn-titulo');

function verificarTitulo() {

    const limite = tituloVideo.scrollHeight > tituloVideo.clientHeight;

    if (limite) {
        btnTitulo.style.display = 'block';
    } else {
        btnTitulo.style.display = 'none';
    }
}

btnTitulo.addEventListener('click', function () {

    tituloVideo.classList.toggle('aberto');

    if (tituloVideo.classList.contains('aberto')) {
        btnTitulo.textContent = 'Mostrar menos';
    } else {
        btnTitulo.textContent = 'Mostrar mais';
    }

});

verificarTitulo();

window.addEventListener('resize', verificarTitulo);

const comentarios = document.querySelectorAll('.comentario');

comentarios.forEach((comentario) => {

    const texto = comentario.querySelector('.texto-comentario');
    const botao = comentario.querySelector('.btn-mostrar-comentario');

    if (!texto || !botao) return;

    function verificarTamanho() {

        if (texto.scrollHeight > texto.clientHeight) {
            botao.style.display = 'block';
        } else {
            botao.style.display = 'none';
        }
    }

    botao.addEventListener('click', () => {

        texto.classList.toggle('aberto');

        if (texto.classList.contains('aberto')) {
            botao.textContent = 'Mostrar menos';
        } else {
            botao.textContent = 'Mostrar mais';
        }

    });

    verificarTamanho();

});