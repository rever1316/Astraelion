
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

const filtrosHistorico =
    document.querySelectorAll('.filtro-historico');

const gruposHistorico =
    document.querySelectorAll('.grupo-historico');


filtrosHistorico.forEach((filtro) => {

    filtro.addEventListener('click', () => {

        // Troca o botão ativo
        filtrosHistorico.forEach((item) => {
            item.classList.remove('active');
        });

        filtro.classList.add('active');


        const tipo =
            filtro.dataset.filtro;


        // Analisa cada período
        gruposHistorico.forEach((grupo) => {

            const episodios =
                grupo.querySelectorAll('.episodio-historico');

            let algumVisivel = false;


            // Filtra os episódios
            episodios.forEach((episodio) => {

                if (
                    tipo === 'todos' ||
                    episodio.dataset.tipo === tipo
                ) {

                    episodio.style.display = '';
                    algumVisivel = true;

                } else {

                    episodio.style.display = 'none';

                }

            });


            // Esconde o período se estiver vazio
            if (algumVisivel) {
                grupo.style.display = '';
            } else {
                grupo.style.display = 'none';
            }

        });

    });

});

const menusHistorico =
    document.querySelectorAll('.menu-historico');


menusHistorico.forEach((botao) => {

    botao.addEventListener('click', (evento) => {

        evento.stopPropagation();


        // Fecha qualquer outro menu aberto
        document
            .querySelectorAll('.menu-historico-opcoes')
            .forEach((menu) => {
                menu.remove();
            });


        // Encontra o episódio correspondente
        const episodio =
            botao.closest('.episodio-historico');


        // Cria o menu
        const menu =
            document.createElement('div');

        menu.classList.add(
            'menu-historico-opcoes'
        );


        menu.innerHTML = `

            <button class="assistir-historico">

                <i class="bi bi-play-fill"></i>

                Assistir novamente

            </button>


            <button class="salvar-historico">

                <i class="bi bi-plus-square"></i>

                Salvar em uma playlist

            </button>


            <div class="separador-menu"></div>


            <button class="remover-historico">

                <i class="bi bi-trash3"></i>

                Remover do histórico

            </button>

        `;


        // Coloca o menu dentro do episódio
        episodio.appendChild(menu);


        // Assistir novamente
        menu
            .querySelector('.assistir-historico')
            .addEventListener('click', () => {

                const link =
                    episodio.querySelector(
                        '.thumbnail-historico'
                    );

                if (link) {
                    window.location.href =
                        link.href;
                }

            });


        // Salvar em playlist
        menu
            .querySelector('.salvar-historico')
            .addEventListener('click', () => {

                console.log(
                    'Abrir seleção de playlist'
                );

            });


        // Remover do histórico
        menu
            .querySelector('.remover-historico')
            .addEventListener('click', () => {

                episodio.remove();

            });

    });

});


// Fecha o menu ao clicar fora
document.addEventListener('click', () => {

    document
        .querySelectorAll('.menu-historico-opcoes')
        .forEach((menu) => {

            menu.remove();

        });

});

const btnLimparHistorico =
    document.querySelector('.limpar-historico');

if (btnLimparHistorico) {

    // Cria o modal
    const modal =
        document.createElement('div');

    modal.classList.add('modal-historico');

    modal.innerHTML = `

        <div class="caixa-modal-historico">

            <div class="icone-modal-historico">
                <i class="bi bi-trash3"></i>
            </div>

            <h2>
                Limpar histórico?
            </h2>

            <p>
                Tem certeza que deseja apagar
                todos os seus registros de exploração?
                Essa ação não poderá ser desfeita.
            </p>

            <div class="acoes-modal-historico">

                <button class="cancelar-modal-historico">
                    Cancelar
                </button>

                <button class="confirmar-modal-historico">
                    Limpar histórico
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(modal);


    // Abrir modal
    btnLimparHistorico.addEventListener(
        'click',
        () => {

            modal.classList.add('aberto');

        }
    );


    // Cancelar
    modal
        .querySelector('.cancelar-modal-historico')
        .addEventListener('click', () => {

            modal.classList.remove('aberto');

        });


    // Confirmar
    modal
    .querySelector('.confirmar-modal-historico')
    .addEventListener('click', () => {

        // Fecha o modal
        modal.classList.remove('aberto');


        // Anima os episódios
        const episodios =
            document.querySelectorAll('.episodio-historico');

        episodios.forEach((episodio) => {

            episodio.classList.add('removendo');

        });


        // Depois remove os grupos
        setTimeout(() => {

            document
                .querySelectorAll('.grupo-historico')
                .forEach((grupo) => {

                    grupo.classList.add('removendo');

                });


            setTimeout(() => {

                document
                    .querySelectorAll('.grupo-historico')
                    .forEach((grupo) => {

                        grupo.remove();

                    });

            }, 350);

        }, 200);

    });


    // Clicar fora da caixa fecha
    modal.addEventListener('click', (evento) => {

        if (evento.target === modal) {

            modal.classList.remove('aberto');

        }

    });

}