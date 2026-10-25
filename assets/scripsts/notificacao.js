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

if (btnMarcarTodas) {
    btnMarcarTodas.addEventListener('click', () => {
        notificacoes.forEach((notificacao) => {
            notificacao.classList.remove('nao-lida');
        });
    });
}

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


document.querySelectorAll("header .pesquisa").forEach((pesquisa) => {
    const campo = pesquisa.querySelector('input[type="search"]');
    const botaoBuscar = pesquisa.querySelector(".buscar");
    const botaoFechar = pesquisa.querySelector(".fechar-pesquisa");

    if (!campo || !botaoBuscar || !botaoFechar) return;

    botaoBuscar.addEventListener("click", () => {
        if (window.innerWidth > 768) {
            if (campo.value.trim()) {
                pesquisa.closest("form")?.requestSubmit();
            } else {
                campo.focus();
            }
            return;
        }

        if (!pesquisa.classList.contains("ativa")) {
            pesquisa.classList.add("ativa");
            campo.focus();
        } else if (campo.value.trim()) {
            pesquisa.closest("form")?.requestSubmit();
        } else {
            campo.focus();
        }
    });

    botaoFechar.addEventListener("click", () => {
        pesquisa.classList.remove("ativa");
        campo.value = "";
    });

    campo.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            pesquisa.classList.remove("ativa");
            campo.blur();
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const grupo = document.querySelector(".grupo-inscricoes");
    const lista = document.querySelector("#listaInscricoesMenu");
    const botao = document.querySelector("#btnVerInscricoes");

    if (!grupo || !lista || !botao) return;

    const LIMITE_INICIAL = 10;

    // Organiza os canais alfabeticamente.
    function ordenarCanais() {
        const canais = [
            ...lista.querySelectorAll(".item-inscrito")
        ];

        canais.sort((a, b) => {
            const nomeA = a.querySelector("span")?.textContent.trim() || "";
            const nomeB = b.querySelector("span")?.textContent.trim() || "";

            return nomeA.localeCompare(nomeB, "pt-BR", {
                sensitivity: "base"
            });
        });

        canais.forEach(canal => lista.appendChild(canal));

        return canais;
    }

    const canais = ordenarCanais();

    function atualizarLista() {
        const expandido = grupo.classList.contains("expandido");
        const temMaisCanais = canais.length > LIMITE_INICIAL;

        // O botão só existe quando há mais de 10 canais.
        botao.hidden = !temMaisCanais;

        // Atualiza o texto e o estado acessível do botão.
        const texto = botao.querySelector("span");

        if (texto) {
            texto.textContent = expandido ? "Ver menos" : "Ver mais";
        }

        botao.setAttribute("aria-expanded", String(expandido));

        canais.forEach((canal, indice) => {
    canal.hidden = !expandido && indice >= LIMITE_INICIAL;
});

lista.classList.toggle("lista-expandida", expandido);

// Ao expandir, a lista começa do início.
if (expandido) {
    lista.scrollTop = 0;
}
    }

    botao.addEventListener("click", () => {
        grupo.classList.toggle("expandido");
        atualizarLista();
    });

    atualizarLista();
});