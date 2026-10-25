/* ========================================= */
/* ASTRAELION — PAINEL GLOBAL DO USUÁRIO     */
/* ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* Seleciona o botão de perfil do desktop e também o botão do menu mobile específico */
    const botoesPerfil = document.querySelectorAll('.btn-user-painel, .item-menu-mobile');

    if (botoesPerfil.length === 0) return;

    /* ========================================= */
    /* CRIAÇÃO DO PAINEL                         */
    /* ========================================= */

    const painel = document.createElement('div');
    painel.classList.add('painel-usuario');

    painel.innerHTML = `
        <!-- ================================= -->
        <!-- CABEÇALHO -->
        <!-- ================================= -->
        <div class="cabecalho-painel-usuario">
            <img
                src="/assets/img/logo.ico"
                alt="Avatar do canal"
                class="avatar-painel-usuario"
            >
            <div class="info-painel-usuario">
                <strong class="nome-painel-usuario">
                    Astraelion Explorers
                </strong>
                <span class="arroba-painel-usuario">
                    @astraelionexplorers
                </span>
                <span class="status-painel-usuario">
                    Conta conectada
                </span>
            </div>
        </div>

        <!-- ================================= -->
        <!-- LISTA PRINCIPAL -->
        <!-- ================================= -->
        <div class="lista-painel-usuario">

            <!-- MEU PERFIL -->
            <a href="/assets/paginas-segundarias/canal.html" class="item-painel-usuario">
                <i class="bi bi-person-circle icone-item-usuario"></i>
                <div class="info-item-usuario">
                    <strong>Meu perfil</strong>
                    <span>Acessar seu canal</span>
                </div>
                <i class="bi bi-chevron-right seta-item-usuario"></i>
            </a>

            <!-- CONTA -->
            <a href="/assets/paginas-segundarias/configuracoes.html" class="item-painel-usuario">
                <i class="bi bi-person-gear icone-item-usuario"></i>
                <div class="info-item-usuario">
                    <strong>Conta</strong>
                    <span>Gerenciar sua conta</span>
                </div>
                <i class="bi bi-chevron-right seta-item-usuario"></i>
            </a>

            <div class="separador-painel-usuario"></div>

            <!-- CONFIGURAÇÕES -->
            <a href="/assets/paginas-segundarias/configuracoes.html" class="item-painel-usuario">
                <i class="bi bi-gear icone-item-usuario"></i>
                <div class="info-item-usuario">
                    <strong>Configurações</strong>
                    <span>Personalizar sua experiência</span>
                </div>
                <i class="bi bi-chevron-right seta-item-usuario"></i>
            </a>

            <!-- ATALHOS DE TECLADO -->
            <button class="item-painel-usuario btn-atalhos-usuario" id="btnAtalhosUsuario" type="button">
                <i class="bi bi-keyboard icone-item-usuario"></i>
                <div class="info-item-usuario">
                    <strong>Atalhos de teclado</strong>
                    <span>Navegue pelo Astraelion usando o teclado</span>
                </div>
                <i class="bi bi-chevron-right seta-item-usuario"></i>
            </button>

            <!-- MODO RESTRITO -->
            <div class="privacidade-painel-usuario">
                <i class="bi bi-shield-lock icone-item-usuario"></i>
                <div class="info-privacidade">
                    <strong>Modo restrito</strong>
                    <span>Limitar conteúdo sensível</span>
                </div>
                <label class="switch-restrito">
                    <input type="checkbox" id="modoRestrito">
                    <span class="slider-restrito"></span>
                </label>
            </div>

        </div>

        <!-- ================================= -->
        <!-- RODAPÉ -->
        <!-- ================================= -->
        <div class="rodape-painel-usuario">
            <button class="btn-conta-usuario" id="btnContaUsuario" type="button">
                <i class="bi bi-box-arrow-right"></i>
                <span>Sair</span>
            </button>
        </div>
    `;

    document.body.appendChild(painel);

    /* ========================================= */
    /* PAINEL DE ATALHOS DE TECLADO              */
    /* ========================================= */

    const painelAtalhosUsuario = document.createElement('div');
    painelAtalhosUsuario.classList.add('painel-atalhos-usuario');
    painelAtalhosUsuario.id = 'painelAtalhosUsuario';

    painelAtalhosUsuario.innerHTML = `
        <div class="cabecalho-atalhos">
            <button class="btn-voltar-atalhos" id="btnVoltarAtalhos" type="button">
                <i class="bi bi-arrow-left"></i>
            </button>
            <div>
                <strong>Atalhos de teclado</strong>
                <span>Navegue pelo Astraelion usando o teclado</span>
            </div>
        </div>

        <div class="conteudo-atalhos">
            <div class="grupo-atalhos">
                <span class="titulo-grupo-atalhos">Navegação</span>
                <div class="atalho-item"><span>Início</span><kbd>Alt + H</kbd></div>
                <div class="atalho-item"><span>Pesquisa</span><kbd>Alt + S</kbd></div>
                <div class="atalho-item"><span>Galáxias</span><kbd>Alt + G</kbd></div>
                <div class="atalho-item"><span>Notificações</span><kbd>Alt + N</kbd></div>
                <div class="atalho-item"><span>Canal</span><kbd>Alt + C</kbd></div>
            </div>

            <div class="grupo-atalhos">
                <span class="titulo-grupo-atalhos">Player</span>
                <div class="atalho-item"><span>Reproduzir / Pausar</span><kbd>Espaço / K</kbd></div>
                <div class="atalho-item"><span>Voltar / Avançar</span><kbd>← →</kbd></div>
                <div class="atalho-item"><span>Volume</span><kbd>↑ ↓</kbd></div>
                <div class="atalho-item"><span>Silenciar</span><kbd>M</kbd></div>
                <div class="atalho-item"><span>Tela cheia</span><kbd>F</kbd></div>
            </div>

            <div class="grupo-atalhos">
                <span class="titulo-grupo-atalhos">Sistema</span>
                <div class="atalho-item"><span>Abrir atalhos</span><kbd>?</kbd></div>
                <div class="atalho-item"><span>Fechar painel</span><kbd>Esc</kbd></div>
            </div>
        </div>
    `;

    document.body.appendChild(painelAtalhosUsuario);

    /* ========================================= */
    /* CONTROLE DE EVENTOS                       */
    /* ========================================= */

    botoesPerfil.forEach(btn => {
        btn.addEventListener('click', (evento) => {
            // Verifica se o botão mobile é o de Perfil (checa se tem o ícone de pessoa ou texto Perfil)
            if (btn.classList.contains('item-menu-mobile')) {
                const span = btn.querySelector('span');
                if (span && span.textContent.trim() !== 'Perfil') {
                    return; // Se for outro item do menu mobile, deixa o link funcionar normalmente
                }
            }

            evento.preventDefault();
            evento.stopPropagation();
            painel.classList.toggle('aberto');
        });
    });

    painel.addEventListener('click', (evento) => evento.stopPropagation());
    painelAtalhosUsuario.addEventListener('click', (evento) => evento.stopPropagation());

    document.addEventListener('click', () => {
        painel.classList.remove('aberto');
        fecharPainelAtalhos();
    });

    const btnAtalhosUsuario = painel.querySelector('#btnAtalhosUsuario');
    const btnVoltarAtalhos = painelAtalhosUsuario.querySelector('#btnVoltarAtalhos');

    if (btnAtalhosUsuario) {
        btnAtalhosUsuario.addEventListener('click', (evento) => {
            evento.preventDefault();
            evento.stopPropagation();
            abrirPainelAtalhos();
        });
    }

    if (btnVoltarAtalhos) {
        btnVoltarAtalhos.addEventListener('click', (evento) => {
            evento.preventDefault();
            evento.stopPropagation();
            fecharPainelAtalhos();
        });
    }

    function abrirPainelAtalhos() {
        painel.classList.remove('aberto');
        painelAtalhosUsuario.classList.add('aberto');
    }

    function fecharPainelAtalhos() {
        painelAtalhosUsuario.classList.remove('aberto');
    }

    /* ========================================= */
    /* MODO RESTRITO                             */
    /* ========================================= */

    const modoRestrito = painel.querySelector('#modoRestrito');
    const modoRestritoAtivo = localStorage.getItem('astraelion_modo_restrito') === 'true';

    if (modoRestrito) {
        modoRestrito.checked = modoRestritoAtivo;
        aplicarFiltroModoRestrito(modoRestritoAtivo);

        modoRestrito.addEventListener('change', () => {
            const ativo = modoRestrito.checked;
            localStorage.setItem('astraelion_modo_restrito', ativo);
            aplicarFiltroModoRestrito(ativo);
        });
    }

    function aplicarFiltroModoRestrito(restringir) {
        const cardsVideos = document.querySelectorAll('.card-video');
        cardsVideos.forEach(card => {
            const idadeCard = card.getAttribute('data-idade') || 'livre';
            if (restringir && idadeCard !== 'livre') {
                card.style.display = 'none';
            } else {
                card.style.display = '';
            }
        });
    }

    /* ========================================= */
    /* SAIR                                      */
    /* ========================================= */

    const btnConta = painel.querySelector('#btnContaUsuario');
    if (btnConta) {
        btnConta.addEventListener('click', () => {
            console.log('Encerrar sessão');
        });
    }

    /* ========================================= */
    /* ATALHOS DE TECLADO GLOBAIS                */
    /* ========================================= */

    function elementoDigitacaoAtivo() {
        const el = document.activeElement;
        if (!el) return false;
        const tag = el.tagName.toLowerCase();
        return (tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable);
    }

    function navegar(caminho) {
        if (caminho) window.location.href = caminho;
    }

    document.addEventListener('keydown', (evento) => {
        if (elementoDigitacaoAtivo()) return;

        const tecla = evento.key.toLowerCase();

        if (evento.altKey && tecla === 'h') { evento.preventDefault(); navegar('/index.html'); }
        if (evento.altKey && tecla === 's') { evento.preventDefault(); navegar('/assets/paginas-segundarias/seach.html'); }
        if (evento.altKey && tecla === 'g') { evento.preventDefault(); navegar('/assets/paginas-segundarias/galaxias.html'); }
        if (evento.altKey && tecla === 'n') { evento.preventDefault(); navegar('/assets/paginas-segundarias/notificacao.html'); }
        if (evento.altKey && tecla === 'c') { evento.preventDefault(); navegar('/assets/paginas-segundarias/canal.html'); }

        if (tecla === 'escape') {
            fecharPainelAtalhos();
            painel.classList.remove('aberto');
        }

        if (tecla === '?' || (evento.shiftKey && tecla === '/')) {
            evento.preventDefault();
            abrirPainelAtalhos();
        }
    });
});