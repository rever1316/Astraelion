/*Backgroud seletor*/

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

const filtrosNotificacao =
    document.querySelectorAll('.filtro-notificacao');

const notificacoes =
    document.querySelectorAll('.notificacao');


filtrosNotificacao.forEach((filtro) => {

    filtro.addEventListener('click', () => {

        filtrosNotificacao.forEach((item) => {
            item.classList.remove('active');
        });

        filtro.classList.add('active');

        const tipo =
            filtro.dataset.filtro;


        notificacoes.forEach((notificacao) => {

            if (
                tipo === 'todas' ||
                notificacao.dataset.tipo === tipo
            ) {
                notificacao.style.display = '';
            } else {
                notificacao.style.display = 'none';
            }

        });

    });

});

const btnMarcarTodas =
    document.querySelector('.marcar-todas');


btnMarcarTodas.addEventListener('click', () => {

    notificacoes.forEach((notificacao) => {
        notificacao.classList.remove('nao-lida');
    });

});

const menusNotificacao =
    document.querySelectorAll('.menu-notificacao');


menusNotificacao.forEach((botao) => {

    botao.addEventListener('click', (evento) => {

        evento.stopPropagation();

        // Fecha outros menus
        document
            .querySelectorAll('.menu-notificacao-opcoes')
            .forEach((menu) => {
                menu.remove();
            });


        const notificacao =
            botao.closest('.notificacao');


        const menu =
            document.createElement('div');

        menu.classList.add(
            'menu-notificacao-opcoes'
        );


        menu.innerHTML = `
            <button class="marcar-notificacao">
                <i class="bi bi-check2"></i>
                Marcar como lida
            </button>

            <button class="excluir-notificacao">
                <i class="bi bi-trash3"></i>
                Remover notificação
            </button>
        `;


        notificacao.appendChild(menu);


        // Marcar como lida
        menu
            .querySelector('.marcar-notificacao')
            .addEventListener('click', () => {

                notificacao.classList.remove(
                    'nao-lida'
                );

                menu.remove();

            });


        // Remover notificação
        menu
            .querySelector('.excluir-notificacao')
            .addEventListener('click', () => {

                notificacao.remove();

            });

    });

});

document.addEventListener('click', () => {

    document
        .querySelectorAll('.menu-notificacao-opcoes')
        .forEach((menu) => {
            menu.remove();
        });

});