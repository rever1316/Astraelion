
var MenuItem = document.querySelectorAll('aside a');

function selectLink() {
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


/* =====================================
   CURTIDAS DOS COMENTÁRIOS E RESPOSTAS
===================================== */

document.addEventListener('click', (event) => {
    const botao = event.target.closest('.btn-curtir');

    if (!botao) return;

    const icone = botao.querySelector('i');
    const contador = botao.querySelector('.qtd-curtidas');

    if (!icone || !contador) return;

    const estaCurtido = botao.classList.toggle('active');

    if (estaCurtido) {
        icone.classList.remove('bi-heart');
        icone.classList.add('bi-heart-fill');
    } else {
        icone.classList.remove('bi-heart-fill');
        icone.classList.add('bi-heart');
    }

    const quantidadeAtual = Number(contador.textContent.trim());

    if (!Number.isFinite(quantidadeAtual)) return;

    contador.textContent = Math.max(
        0,
        quantidadeAtual + (estaCurtido ? 1 : -1)
    );
});




/* Controles dos painéis */
const painelComentarios = document.querySelector('#painelComentarios');
const painelInformacoes = document.querySelector('#painelInformacoes');
const fecharComentarios = document.querySelector('#fecharComentarios');
const fecharInformacoes = document.querySelector('#fecharInformacoes');


/* Abrir informações de qualquer Fenda */
document.querySelectorAll('.btn-abrir-informacoes').forEach((btn) => {
    btn.addEventListener('click', () => {
        if (painelComentarios) {
            painelComentarios.classList.remove('aberto');
        }

        if (painelInformacoes) {
            painelInformacoes.classList.add('aberto');
        }
    });
});

/* Abrir comentários de qualquer Fenda */
document.querySelectorAll('.btn-abrir-comentarios').forEach((btn) => {
    btn.addEventListener('click', () => {
        const painelComentarios = document.querySelector('#painelComentarios');
        const painelInformacoes = document.querySelector('#painelInformacoes');

        if (painelInformacoes) {
            painelInformacoes.classList.remove('aberto');
        }

        if (painelComentarios) {
            painelComentarios.classList.add('aberto');
        }
    });
});


/* Fechar comentários */
if (fecharComentarios && painelComentarios) {
    fecharComentarios.addEventListener('click', () => {
        painelComentarios.classList.remove('aberto');
    });
}

/* Fechar informações */
if (fecharInformacoes && painelInformacoes) {
    fecharInformacoes.addEventListener('click', () => {
        painelInformacoes.classList.remove('aberto');
    });
}

/* Fechar painéis ao clicar no fundo */
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

// Guarda o comentário que receberá a resposta
let comentarioRespondido = null;


/* ATIVAR MODO DE RESPOSTA — inclui mensagens novas */

/* RESPOSTAS EM QUALQUER NÍVEL */
document.addEventListener('click', (event) => {
    const botao = event.target.closest('.btn-responder');
    if (!botao) return;

    const comentario = botao.closest('.comentario');
    if (!comentario) return;

    const usuario = botao.dataset.usuario || 'Usuário';

    comentarioRespondido = comentario;

    if (indicadorResposta && nomeUsuarioResposta) {
        nomeUsuarioResposta.textContent = `@${usuario}`;
        indicadorResposta.style.display = 'flex';
    }
});




// CANCELAR RESPOSTA

if (cancelarResposta) {
    cancelarResposta.addEventListener('click', () => {
        if (indicadorResposta) {
            indicadorResposta.style.display = 'none';
        }

        comentarioRespondido = null;
    });
}



/* =====================================
   PUBLICAR NOVOS COMENTÁRIOS
===================================== */

const formularioComentario = document.querySelector('.campo-comentario');
const listaComentarios = document.querySelector('.lista-comentarios');
const textoComentario = document.querySelector('#textoComentario');

if (formularioComentario && listaComentarios && textoComentario) {
    formularioComentario.addEventListener('submit', (event) => {
        event.preventDefault();

        const texto = textoComentario.value.trim();

        // Não publica comentários vazios
        if (!texto) return;


        const novaMensagem = document.createElement('div');
        novaMensagem.classList.add('comentario');

        const avatar = document.createElement('div');
        avatar.classList.add('comentario-avatar');

        const icone = document.createElement('i');
        icone.classList.add('bi', 'bi-person-fill');
        avatar.appendChild(icone);

        const conteudo = document.createElement('div');
        conteudo.classList.add('comentario-conteudo');

        const topo = document.createElement('div');
        topo.classList.add('comentario-topo');

        const autor = document.createElement('strong');
        autor.classList.add('autor-nome');
        autor.textContent = 'Você';

        const tempo = document.createElement('span');
        tempo.classList.add('comentario-tempo');
        tempo.textContent = 'agora';

        topo.append(autor, tempo);

        const paragrafo = document.createElement('p');
        paragrafo.textContent = texto;


        /* Ações da nova mensagem */
        const acoes = document.createElement('div');
        acoes.classList.add('comentario-acoes');

        /* Botão de curtir */
        const botaoCurtir = document.createElement('button');
        botaoCurtir.type = 'button';
        botaoCurtir.classList.add('btn-acao', 'btn-curtir');

        botaoCurtir.innerHTML = `
    <i class="bi bi-heart"></i>
    <span class="qtd-curtidas">0</span>
`;

        /* Botão de responder */
        const botaoResponder = document.createElement('button');
        botaoResponder.type = 'button';
        botaoResponder.classList.add('btn-acao', 'btn-responder');
        botaoResponder.dataset.usuario = 'Você';

        botaoResponder.innerHTML = `
    <i class="bi bi-reply-fill"></i>
    <span>Responder</span>
`;

        acoes.append(botaoCurtir, botaoResponder);


        // Se houver um comentário selecionado, cria uma resposta
        if (comentarioRespondido) {
            const mencao = document.createElement('span');
            mencao.classList.add('mencao-resposta');
            mencao.textContent = nomeUsuarioResposta.textContent + ' ';

            paragrafo.prepend(mencao);

            let thread = comentarioRespondido.querySelector('.respostas-thread');

            // Cria a área de respostas caso ainda não exista
            if (!thread) {
                thread = document.createElement('div');
                thread.classList.add('respostas-thread');
                comentarioRespondido.querySelector('.comentario-conteudo').appendChild(thread);
            }

            conteudo.append(topo, paragrafo, acoes);
            novaMensagem.append(avatar, conteudo);
            novaMensagem.classList.add('comentario-resposta');

            thread.appendChild(novaMensagem);

            // Sai do modo de resposta
            comentarioRespondido = null;

            if (indicadorResposta) {
                indicadorResposta.style.display = 'none';
            }
        } else {
            // Comentário normal
            conteudo.append(topo, paragrafo, acoes);
            novaMensagem.append(avatar, conteudo);
            listaComentarios.prepend(novaMensagem);
        }

        // Limpa o campo
        textoComentario.value = '';

        /* ================================
   EXPANDIR / RECOLHER DESCRIÇÃO
================================ */
        const descricaoContainer = document.querySelector('#descricaoContainer');
        const btnExpandirDescricao = document.querySelector('#btnExpandirDescricao');

        if (descricaoContainer && btnExpandirDescricao) {
            // Verifica se a descrição é maior que o limite visual de 3 linhas
            const precisaExpandir =
                descricaoContainer.scrollHeight > descricaoContainer.clientHeight;

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
    })
}