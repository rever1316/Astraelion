/*Backgroud seletor*/

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
const videos = [
    {
        titulo: "Explorando um novo universo",
        canal: "Canal Astraelion",
        views: "12 mil",
        duracao: "12:34"
    },

    {
        titulo: "A história por trás das estrelas",
        canal: "Cosmos Channel",
        views: "8,4 mil",
        duracao: "08:21"
    }
];


const menuFlutuante = document.getElementById('menu-flutuante');
let botaoAtivo = null;

document.addEventListener('click', function(event) {
    const botaoClicado = event.target.closest('.mais-opcoes');

    if (botaoClicado) {
        event.stopPropagation();

        if (botaoAtivo === botaoClicado && menuFlutuante.style.display === 'block') {
            menuFlutuante.style.display = 'none';
            botaoAtivo = null;
            return;
        }

        botaoAtivo = botaoClicado;
        const rect = botaoClicado.getBoundingClientRect();
        
        const larguraMenu = 210; 
        const alturaMenu = 150;  
        
        let topPos = rect.bottom + 4; 
        if (topPos + alturaMenu > window.innerHeight) {
            topPos = rect.top - alturaMenu - 4;
        }

        // Alinhamento inteligente pela direita do botão (evita que vá para fora à esquerda)
        let leftPos = rect.right - larguraMenu;

        // Se a posição calculada ficar negativa (muito colado na esquerda), alinha pela esquerda do botão
        if (leftPos < 10) {
            leftPos = rect.left;
        }

        // Se ultrapassar a largura da janela pela direita, força ficar dentro da tela
        if (leftPos + larguraMenu > window.innerWidth - 10) {
            leftPos = window.innerWidth - larguraMenu - 10;
        }

        menuFlutuante.style.position = 'fixed';
        menuFlutuante.style.top = `${topPos}px`;
        menuFlutuante.style.left = `${leftPos}px`;
        menuFlutuante.style.display = 'block';

    } else {
        if (!menuFlutuante.contains(event.target)) {
            menuFlutuante.style.display = 'none';
            botaoAtivo = null;
        }
    }
});


/* ========================================
   PESQUISA EXPANSÍVEL — CELULARES
======================================== */

const pesquisa = document.querySelector('.pesquisa');
const inputPesquisa = document.querySelector('#inputPesquisa');
const btnBuscar = document.querySelector('.pesquisa .buscar');
const btnFecharPesquisa = document.querySelector('.fechar-pesquisa');

if (pesquisa && inputPesquisa && btnBuscar && btnFecharPesquisa) {

    function abrirPesquisa() {
        if (window.innerWidth > 768) return;

        pesquisa.classList.add('ativa');
        inputPesquisa.focus();
    }

    function fecharPesquisa() {
        pesquisa.classList.remove('ativa');
        inputPesquisa.value = '';
        inputPesquisa.blur();
    }

    btnBuscar.addEventListener('click', () => {
        if (window.innerWidth <= 768 && !pesquisa.classList.contains('ativa')) {
            abrirPesquisa();
            return;
        }

        // Ação de pesquisa será conectada ao sistema de busca existente.
        if (inputPesquisa.value.trim()) {
            inputPesquisa.dispatchEvent(
                new KeyboardEvent('keydown', {
                    key: 'Enter',
                    bubbles: true
                })
            );
        }
    });

    btnFecharPesquisa.addEventListener('click', fecharPesquisa);

    inputPesquisa.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            fecharPesquisa();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            pesquisa.classList.remove('ativa');
        }
    });
}


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


