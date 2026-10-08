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