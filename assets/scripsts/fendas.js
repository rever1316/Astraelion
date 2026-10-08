
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

/* ===================================================
   CURTIR E AÇÕES EM MULTÍPLAS FENDAS (DELEGAÇÃO/CLASSES)
=================================================== */

// 1. Curtir (funciona em todas as Fendas)
document.querySelectorAll('.acao-curtir').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('ativo');
        const icone = btn.querySelector('i');
        
        if (btn.classList.contains('ativo')) {
            icone.classList.remove('bi-heart');
            icone.classList.add('bi-heart-fill');
        } else {
            icone.classList.remove('bi-heart-fill');
            icone.classList.add('bi-heart');
        }
    });
});

// 2. Abrir comentários específicos da Fenda ativa
document.querySelectorAll('.btn-abrir-comentarios').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const fendaAtual = e.target.closest('.fenda-experiencia');
        const painelComentarios = document.querySelector('#painelComentarios');
        
        // Aqui você pode carregar os comentários específicos da Fenda atual se necessário
        painelComentarios.classList.add('aberto');
    });
});

/* ================================
   2. CONTROLE DOS PAINÉIS (OVERLAYS)
================================ */
const painelComentarios = document.querySelector('#painelComentarios');
const painelInformacoes = document.querySelector('#painelInformacoes');

const botaoComentarios = document.querySelector('#abrirComentarios');
const botaoInformacoes = document.querySelector('#abrirInformacoes');

const fecharComentarios = document.querySelector('#fecharComentarios');
const fecharInformacoes = document.querySelector('#fecharInformacoes');

// ABRIR COMENTÁRIOS
if (botaoComentarios) {
    botaoComentarios.addEventListener('click', () => {
        painelInformacoes.classList.remove('aberto');
        painelComentarios.classList.add('aberto');
    });
}

// FECHAR COMENTÁRIOS
if (fecharComentarios) {
    fecharComentarios.addEventListener('click', () => {
        painelComentarios.classList.remove('aberto');
    });
}

// ABRIR INFORMAÇÕES
if (botaoInformacoes) {
    botaoInformacoes.addEventListener('click', () => {
        painelComentarios.classList.remove('aberto');
        painelInformacoes.classList.add('aberto');
    });
}

// FECHAR INFORMAÇÕES
if (fecharInformacoes) {
    fecharInformacoes.addEventListener('click', () => {
        painelInformacoes.classList.remove('aberto');
    });
}

// FECHAR AO CLICAR NO OVERLAY (FORA DO CONTEÚDO)
window.addEventListener('click', (event) => {
    if (event.target === painelComentarios) {
        painelComentarios.classList.remove('aberto');
    }
    if (event.target === painelInformacoes) {
        painelInformacoes.classList.remove('aberto');
    }
});

/* ================================
   3. AÇÕES DOS COMENTÁRIOS (RESPONDER E CURTIR)
================================ */
const botoesResponder = document.querySelectorAll('.btn-responder');
const indicadorResposta = document.querySelector('#indicadorResposta');
const nomeUsuarioResposta = document.querySelector('#nomeUsuarioResposta');
const cancelarResposta = document.querySelector('#cancelarResposta');

// ATIVAR MODO DE RESPOSTA
botoesResponder.forEach((botao) => {
    botao.addEventListener('click', () => {
        const usuario = botao.getAttribute('data-usuario');
        if (indicadorResposta && nomeUsuarioResposta) {
            nomeUsuarioResposta.textContent = `@${usuario}`;
            indicadorResposta.style.display = 'flex';
        }
    });
});

// CANCELAR RESPOSTA
if (cancelarResposta) {
    cancelarResposta.addEventListener('click', () => {
        indicadorResposta.style.display = 'none';
    });
}

/* ================================
   EXPANDIR / RECOLHER DESCRIÇÃO
================================ */
const descricaoContainer = document.querySelector('#descricaoContainer');
const btnExpandirDescricao = document.querySelector('#btnExpandirDescricao');

if (descricaoContainer && btnExpandirDescricao) {
    // Verifica se a descrição é maior que o limite visual de 3 linhas
    const precisaExpandir = descricaoContainer.scrollHeight > descricaoContainer.clientHeight;

    if (precisaExpandir) {
        btnExpandirDescricao.style.display = 'inline-block';

        btnExpandirDescricao.addEventListener('click', () => {
            const estaLimitada = descricaoContainer.classList.contains('limitada');

            if (estaLimitada) {
                descricaoContainer.classList.remove('limitada');
                btnExpandirDescricao.textContent = 'Mostrar menos';
            } else {
                descricaoContainer.classList.add('limitada');
                btnExpandirDescricao.textContent = 'Mostrar mais';
            }
        });
    } else {
        // Se o texto for curto, esconde o botão
        btnExpandirDescricao.style.display = 'none';
    }
}