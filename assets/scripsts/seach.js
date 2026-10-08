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


const parametros =
    new URLSearchParams(window.location.search);

const termoBusca =
    parametros.get('q');

const dadosBusca = [

    // MISSÕES
    {
        tipo: "missao",
        titulo: "Explorando um novo universo",
        canal: "Astraelion",
        usuario: "@astraelion",
        visualizacoes: "12 mil visualizações",
        tempo: "há 2 dias",
        duracao: "12:45",
        imagem: "../img/thumb1.jpg"
    },

    {
        tipo: "missao",
        titulo: "A jornada começa aqui",
        canal: "Astraelion",
        usuario: "@astraelion",
        visualizacoes: "8,4 mil visualizações",
        tempo: "há 4 dias",
        duracao: "08:32",
        imagem: "../img/thumb2.jpg"
    },

    // CANAIS
    {
        tipo: "canal",
        nome: "Mine Lands",
        usuario: "@mine",
        inscritos: "24 mil inscritos",
        imagem: "../img/avatar1.jpg"
    },

    {
        tipo: "canal",
        nome: "Universo Gamer",
        usuario: "@universogamer",
        inscritos: "12 mil inscritos",
        imagem: "../img/avatar2.jpg"
    },

    // FENDAS
    {
        tipo: "fenda",
        titulo: "O que existe além da fenda?",
        canal: "Astraelion",
        usuario: "@astraelion",
        visualizacoes: "5,2 mil visualizações",
        tempo: "há 1 dia",
        imagem: "../img/fenda1.jpg"
    },

    {
        tipo: "fenda",
        titulo: "Uma dimensão desconhecida",
        canal: "Astraelion",
        usuario: "@astraelion",
        visualizacoes: "3,8 mil visualizações",
        tempo: "há 3 dias",
        imagem: "../img/fenda2.jpg"
    },

    // GALÁXIAS
    {
        tipo: "galaxia",
        titulo: "Galáxia Astra",
        descricao: "Uma nova jornada começa em uma região desconhecida.",
        quantidade: "20 missões",
        imagem: "../img/galaxia1.jpg"
    }

];

function renderizarResultados(dados) {
    const container = document.getElementById('resultadosBusca');
    container.innerHTML = '';

    const fendas = dados.filter(item => item.tipo === 'fenda');
    const outrosItens = dados.filter(item => item.tipo !== 'fenda');

    // Se não houver fendas nos dados filtrados, remove a classe de grade imediatamente
    if (fendas.length > 0) {
        container.classList.add('grade-fendas');
    } else {
        container.classList.remove('grade-fendas');
    }

    // Renderiza fendas...
    fendas.forEach((item) => {
        const resultado = document.createElement('article');
        resultado.classList.add('resultado-fenda', 'item-grade-fenda');
        resultado.dataset.tipo = item.tipo;
        resultado.innerHTML = `
            <div class="thumb-resultado fenda-resultado">
                <img src="${item.imagem}" alt="${item.titulo}">
            </div>
            <div class="info-resultado-video">
                <h2>${item.titulo}</h2>
                <div class="canal-resultado-video">
                    <span>${item.canal}</span>
                    <span>${item.usuario}</span>
                </div>
                <p class="meta-resultado-video">${item.visualizacoes} • ${item.tempo}</p>
            </div>
            <div class="menu-resultado">
                <button class="btn-menu-resultado">
                    <i class="bi bi-three-dots-vertical"></i>
                </button>
            </div>
        `;
        container.appendChild(resultado);
    });

    // Renderiza os demais itens (Canais, Missões, Galáxias)
    outrosItens.forEach((item) => {
        const resultado = document.createElement('article');
        resultado.dataset.tipo = item.tipo;

        if (item.tipo === 'canal') {
            resultado.classList.add('resultado-video', 'resultado-canal-card');
            resultado.innerHTML = `
                <div class="avatar-resultado-canal">
                    <img src="${item.imagem}" alt="${item.nome}">
                </div>
                <div class="info-resultado-video">
                    <h2>${item.nome}</h2>
                    <div class="canal-resultado-video">
                        <span>${item.usuario}</span>
                    </div>
                    <p class="meta-resultado-video">${item.inscritos}</p>
                </div>
                <div class="menu-resultado">
                    <button class="btn-menu-resultado">
                        <i class="bi bi-three-dots-vertical"></i>
                    </button>
                </div>
            `;
        } 
        else if (item.tipo === 'missao') {
            resultado.classList.add('resultado-video');
            resultado.innerHTML = `
                <div class="thumb-resultado">
                    <img src="${item.imagem}" alt="${item.titulo}">
                    <span class="duracao-resultado">${item.duracao}</span>
                </div>
                <div class="info-resultado-video">
                    <h2>${item.titulo}</h2>
                    <div class="canal-resultado-video">
                        <span>${item.canal}</span>
                        <span>${item.usuario}</span>
                    </div>
                    <p class="meta-resultado-video">${item.visualizacoes} • ${item.tempo}</p>
                </div>
                <div class="menu-resultado">
                    <button class="btn-menu-resultado">
                        <i class="bi bi-three-dots-vertical"></i>
                    </button>
                </div>
            `;
        } 
        else if (item.tipo === 'galaxia') {
            resultado.classList.add('resultado-galaxia');
            resultado.innerHTML = `
                <div class="thumb-resultado-galaxia">
                    <img src="${item.imagem}" alt="${item.titulo}">
                </div>
                <div class="info-resultado-galaxia">
                    <h2>${item.titulo}</h2>
                    <p>${item.descricao}</p>
                    <span>${item.quantidade}</span>
                </div>
                <div class="menu-resultado">
                    <button class="btn-menu-resultado">
                        <i class="bi bi-three-dots-vertical"></i>
                    </button>
                </div>
            `;
        }

        container.appendChild(resultado);
    });
}

function filtrarResultados(termo) {

    if (!termo) {
        return dadosBusca;
    }

    const busca = termo.toLowerCase().trim();

    return dadosBusca.filter((item) => {

        const titulo = item.titulo?.toLowerCase() || '';
        const canal = item.canal?.toLowerCase() || '';
        const usuario = item.usuario?.toLowerCase() || '';
        const nome = item.nome?.toLowerCase() || '';
        const descricao = item.descricao?.toLowerCase() || '';

        return (
            titulo.includes(busca) ||
            canal.includes(busca) ||
            usuario.includes(busca) ||
            nome.includes(busca) ||
            descricao.includes(busca)
        );

    });
}

const resultadosEncontrados = filtrarResultados(termoBusca);

renderizarResultados(resultadosEncontrados);

const elementoTermo =
    document.getElementById('termo-busca');




if (termoBusca) {

    elementoTermo.textContent =
        `"${termoBusca}"`;

} else {

    elementoTermo.textContent =
        '"Explore algo novo"';

}

const menuFlutuante = document.getElementById('menu-flutuante');
let botaoAtivo = null;

document.addEventListener('click', function (event) {
    const botaoClicado = event.target.closest('.menu-resultado');

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


const filtros = document.querySelectorAll('.filtro');

filtros.forEach((filtro) => {
    filtro.addEventListener('click', () => {
        // Remove a classe 'active' de todos os filtros e adiciona no clicado
        filtros.forEach((item) => item.classList.remove('active'));
        filtro.classList.add('active');

        const tipoFiltro = filtro.dataset.tipo; // ex: 'todos', 'fenda', 'galaxia', 'missao', 'canal'

        let dadosFiltrados;

        if (tipoFiltro === 'todos') {
            dadosFiltrados = dadosBusca;
        } else {
            dadosFiltrados = dadosBusca.filter((item) => item.tipo === tipoFiltro);
        }

        const container = document.getElementById('resultadosBusca');
        container.innerHTML = '';

        // CONTROLAR A CLASSE DA GRADE: Apenas se o filtro for estritamente 'fenda'
        if (tipoFiltro === 'fenda') {
            container.classList.add('grade-fendas');
        } else {
            container.classList.remove('grade-fendas');
        }

        // Se for o filtro "Todos", usamos a função normal de renderização que já sabe lidar com todos os tipos
        if (tipoFiltro === 'todos') {
            renderizarResultados(dadosBusca);
            return;
        }

        // Renderiza os itens filtrados individualmente no formato correto de lista/linha
        dadosFiltrados.forEach((item) => {
            const resultado = document.createElement('article');
            resultado.dataset.tipo = item.tipo;

            if (item.tipo === 'canal') {
                resultado.classList.add('resultado-video', 'resultado-canal-card');
                resultado.innerHTML = `
                    <div class="avatar-resultado-canal">
                        <img src="${item.imagem}" alt="${item.nome}">
                    </div>
                    <div class="info-resultado-video">
                        <h2>${item.nome}</h2>
                        <div class="canal-resultado-video">
                            <span>${item.usuario}</span>
                        </div>
                        <p class="meta-resultado-video">${item.inscritos}</p>
                    </div>
                    <div class="menu-resultado">
                        <button class="btn-menu-resultado">
                            <i class="bi bi-three-dots-vertical"></i>
                        </button>
                    </div>
                `;
            } 
            else if (item.tipo === 'missao') {
                resultado.classList.add('resultado-video');
                resultado.innerHTML = `
                    <div class="thumb-resultado">
                        <img src="${item.imagem}" alt="${item.titulo}">
                        <span class="duracao-resultado">${item.duracao}</span>
                    </div>
                    <div class="info-resultado-video">
                        <h2>${item.titulo}</h2>
                        <div class="canal-resultado-video">
                            <span>${item.canal}</span>
                            <span>${item.usuario}</span>
                        </div>
                        <p class="meta-resultado-video">${item.visualizacoes} • ${item.tempo}</p>
                    </div>
                    <div class="menu-resultado">
                        <button class="btn-menu-resultado">
                            <i class="bi bi-three-dots-vertical"></i>
                        </button>
                    </div>
                `;
            } 
            else if (item.tipo === 'galaxia') {
                resultado.classList.add('resultado-galaxia');
                resultado.innerHTML = `
                    <div class="thumb-resultado-galaxia">
                        <img src="${item.imagem}" alt="${item.titulo}">
                    </div>
                    <div class="info-resultado-galaxia">
                        <h2>${item.titulo}</h2>
                        <p>${item.descricao}</p>
                        <span>${item.quantidade}</span>
                    </div>
                    <div class="menu-resultado">
                        <button class="btn-menu-resultado">
                            <i class="bi bi-three-dots-vertical"></i>
                        </button>
                    </div>
                `;
            }
            else if (item.tipo === 'fenda') {
                resultado.classList.add('resultado-fenda', 'item-grade-fenda');
                resultado.innerHTML = `
                    <div class="thumb-resultado fenda-resultado">
                        <img src="${item.imagem}" alt="${item.titulo}">
                    </div>
                    <div class="info-resultado-video">
                        <h2>${item.titulo}</h2>
                        <div class="canal-resultado-video">
                            <span>${item.canal}</span>
                            <span>${item.usuario}</span>
                        </div>
                        <p class="meta-resultado-video">${item.visualizacoes} • ${item.tempo}</p>
                    </div>
                    <div class="menu-resultado">
                        <button class="btn-menu-resultado">
                            <i class="bi bi-three-dots-vertical"></i>
                        </button>
                    </div>
                `;
            }

            container.appendChild(resultado);
        });
    });
});
