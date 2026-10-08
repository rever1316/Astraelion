/* ========================================= */
/* ASTRAELION — PAINEL GLOBAL DO USUÁRIO */
/* ========================================= */

const botaoUsuario =
    document.querySelector('.btn-user-painel');


if (botaoUsuario) {

    /* ========================================= */
    /* CRIAÇÃO DO PAINEL */
    /* ========================================= */

    const painel =
        document.createElement('div');

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

            <a
                href="/assets/paginas-secundarias/canal.html"
                class="item-painel-usuario"
            >

                <i class="bi bi-person-circle icone-item-usuario"></i>

                <div class="info-item-usuario">

                    <strong>
                        Meu perfil
                    </strong>

                    <span>
                        Acessar seu canal
                    </span>

                </div>

                <i class="bi bi-chevron-right seta-item-usuario"></i>

            </a>


            <!-- CONTA -->

            <a
                href="/assets/paginas-secundarias/configuracoes.html"
                class="item-painel-usuario"
            >

                <i class="bi bi-person-gear icone-item-usuario"></i>

                <div class="info-item-usuario">

                    <strong>
                        Conta
                    </strong>

                    <span>
                        Gerenciar sua conta
                    </span>

                </div>

                <i class="bi bi-chevron-right seta-item-usuario"></i>

            </a>


            <div class="separador-painel-usuario"></div>


            <!-- CONFIGURAÇÕES -->

            <a
                href="/assets/paginas-secundarias/configuracoes.html"
                class="item-painel-usuario"
            >

                <i class="bi bi-gear icone-item-usuario"></i>

                <div class="info-item-usuario">

                    <strong>
                        Configurações
                    </strong>

                    <span>
                        Personalizar sua experiência
                    </span>

                </div>

                <i class="bi bi-chevron-right seta-item-usuario"></i>

            </a>


            <!-- ================================= -->
            <!-- ATALHOS DE TECLADO -->
            <!-- ================================= -->

            <button
                class="item-painel-usuario btn-atalhos-usuario"
                id="btnAtalhosUsuario"
                type="button"
            >

                <i class="bi bi-keyboard icone-item-usuario"></i>

                <div class="info-item-usuario">

                    <strong>
                        Atalhos de teclado
                    </strong>

                    <span>
                        Navegue pelo Astraelion usando o teclado
                    </span>

                </div>

                <i class="bi bi-chevron-right seta-item-usuario"></i>

            </button>


            <!-- ================================= -->
            <!-- PAINEL DE ATALHOS -->
            <!-- ================================= -->

            <div
                class="painel-atalhos-usuario"
                id="painelAtalhosUsuario"
            >

                <div class="cabecalho-atalhos">

                    <button
                        class="btn-voltar-atalhos"
                        id="btnVoltarAtalhos"
                        type="button"
                    >

                        <i class="bi bi-arrow-left"></i>

                    </button>


                    <div>

                        <strong>
                            Atalhos de teclado
                        </strong>

                        <span>
                            Navegue pelo Astraelion usando o teclado
                        </span>

                    </div>

                </div>


                <div class="conteudo-atalhos">


                    <!-- NAVEGAÇÃO -->

                    <div class="grupo-atalhos">

                        <span class="titulo-grupo-atalhos">
                            Navegação
                        </span>


                        <div class="atalho-item">

                            <span>
                                Início
                            </span>

                            <kbd>
                                Alt + H
                            </kbd>

                        </div>


                        <div class="atalho-item">

                            <span>
                                Pesquisa
                            </span>

                            <kbd>
                                Alt + S
                            </kbd>

                        </div>


                        <div class="atalho-item">

                            <span>
                                Galáxias
                            </span>

                            <kbd>
                                Alt + G
                            </kbd>

                        </div>


                        <div class="atalho-item">

                            <span>
                                Notificações
                            </span>

                            <kbd>
                                Alt + N
                            </kbd>

                        </div>


                        <div class="atalho-item">

                            <span>
                                Canal
                            </span>

                            <kbd>
                                Alt + C
                            </kbd>

                        </div>


                        <div class="atalho-item">

                            <span>
                                Inscrições
                            </span>

                            <kbd>
                                Alt + I
                            </kbd>

                        </div>

                    </div>


                    <!-- PLAYER -->

                    <div class="grupo-atalhos">

                        <span class="titulo-grupo-atalhos">
                            Player
                        </span>


                        <div class="atalho-item">

                            <span>
                                Reproduzir / Pausar
                            </span>

                            <kbd>
                                Espaço / K
                            </kbd>

                        </div>


                        <div class="atalho-item">

                            <span>
                                Voltar / Avançar
                            </span>

                            <kbd>
                                ← →
                            </kbd>

                        </div>


                        <div class="atalho-item">

                            <span>
                                Volume
                            </span>

                            <kbd>
                                ↑ ↓
                            </kbd>

                        </div>


                        <div class="atalho-item">

                            <span>
                                Silenciar
                            </span>

                            <kbd>
                                M
                            </kbd>

                        </div>


                        <div class="atalho-item">

                            <span>
                                Tela cheia
                            </span>

                            <kbd>
                                F
                            </kbd>

                        </div>


                        <div class="atalho-item">

                            <span>
                                Avanço rápido
                            </span>

                            <kbd>
                                0 – 9
                            </kbd>

                        </div>

                    </div>


                    <!-- SISTEMA -->

                    <div class="grupo-atalhos">

                        <span class="titulo-grupo-atalhos">
                            Sistema
                        </span>


                        <div class="atalho-item">

                            <span>
                                Abrir atalhos
                            </span>

                            <kbd>
                                ?
                            </kbd>

                        </div>


                        <div class="atalho-item">

                            <span>
                                Fechar painel
                            </span>

                            <kbd>
                                Esc
                            </kbd>

                        </div>

                    </div>


                </div>

            </div>


            <!-- ================================= -->
            <!-- MODO RESTRITO -->
            <!-- ================================= -->

            <div class="privacidade-painel-usuario">

                <i class="bi bi-shield-lock icone-item-usuario"></i>

                <div class="info-privacidade">

                    <strong>
                        Modo restrito
                    </strong>

                    <span>
                        Limitar conteúdo sensível
                    </span>

                </div>


                <label class="switch-restrito">

                    <input
                        type="checkbox"
                        id="modoRestrito"
                    >

                    <span class="slider-restrito"></span>

                </label>

            </div>


        </div>


        <!-- ================================= -->
        <!-- RODAPÉ -->
        <!-- ================================= -->

        <div class="rodape-painel-usuario">

            <button
                class="btn-conta-usuario"
                id="btnContaUsuario"
                type="button"
            >

                <i class="bi bi-box-arrow-right"></i>

                <span>
                    Sair
                </span>

            </button>

        </div>

    `;


    document.body.appendChild(painel);


    /* ========================================= */
    /* ELEMENTOS DO PAINEL */
    /* ========================================= */

    const painelAtalhosUsuario =
        painel.querySelector('#painelAtalhosUsuario');


    /* ========================================= */
    /* SEPARAR POP-UP DE ATALHOS */
    /* ========================================= */

    if (painelAtalhosUsuario) {
        document.body.appendChild(painelAtalhosUsuario);
    }

    /* ========================================= */
    /* IMPEDIR FECHAMENTO AO CLICAR NO POP-UP */
    /* ========================================= */

    painelAtalhosUsuario.addEventListener(
        'click',
        (evento) => {

            evento.stopPropagation();

        }
    );


    /* ========================================= */
    /* ABRIR / FECHAR PAINEL DO USUÁRIO */
    /* ========================================= */

    botaoUsuario.addEventListener(
        'click',
        (evento) => {

            evento.preventDefault();
            evento.stopPropagation();

            painel.classList.toggle('aberto');

        }
    );


    /* ========================================= */
    /* IMPEDIR FECHAMENTO AO CLICAR NO PAINEL */
    /* ========================================= */

    painel.addEventListener(
        'click',
        (evento) => {

            evento.stopPropagation();

        }
    );


    /* ========================================= */
    /* FECHAR AO CLICAR FORA */
    /* ========================================= */

    document.addEventListener(
        'click',
        () => {

            painel.classList.remove('aberto');

            fecharPainelAtalhos();

        }
    );


    /* ========================================= */
    /* ABRIR PAINEL DE ATALHOS */
    /* ========================================= */

    btnAtalhosUsuario.addEventListener(
        'click',
        (evento) => {

            evento.preventDefault();
            evento.stopPropagation();

            abrirPainelAtalhos();

        }
    );


    /* ========================================= */
    /* FECHAR PAINEL DE ATALHOS */
    /* ========================================= */

    btnVoltarAtalhos.addEventListener(
        'click',
        (evento) => {

            evento.preventDefault();
            evento.stopPropagation();

            fecharPainelAtalhos();

        }
    );


    function abrirPainelAtalhos() {

        painel.classList.remove('aberto');

        painelAtalhosUsuario.classList.add('aberto');

    }


    function fecharPainelAtalhos() {

        painelAtalhosUsuario.classList.remove('aberto');

    }


    /* ========================================= */
    /* MODO RESTRITO */
    /* ========================================= */

    modoRestrito.addEventListener(
        'change',
        () => {

            console.log(
                'Modo restrito:',
                modoRestrito.checked
            );

        }
    );


    /* ========================================= */
    /* SAIR */
    /* ========================================= */

    btnConta.addEventListener(
        'click',
        () => {

            console.log(
                'Encerrar sessão'
            );

        }
    );


    /* ========================================= */
    /* ATALHOS GLOBAIS */
    /* ========================================= */

    const atalhos = {

        inicio: {
            tecla: 'h',
            alt: true,
            caminho: '/index.html'
        },

        pesquisa: {
            tecla: 's',
            alt: true,
            caminho: '/assets/paginas-secundarias/search.html'
        },

        galaxias: {
            tecla: 'g',
            alt: true,
            caminho: '/assets/paginas-secundarias/galaxia.html'
        },

        notificacoes: {
            tecla: 'n',
            alt: true,
            caminho: '/assets/paginas-secundarias/notifications.html'
        },

        canal: {
            tecla: 'c',
            alt: true,
            caminho: '/assets/paginas-secundarias/canal.html'
        },

        inscricoes: {
            tecla: 'i',
            alt: true
        }

    };


    /* ========================================= */
    /* VERIFICAR CAMPO DE TEXTO */
    /* ========================================= */

    function elementoDigitacaoAtivo() {

        const elemento =
            document.activeElement;


        if (!elemento) {
            return false;
        }


        const tag =
            elemento.tagName.toLowerCase();


        return (

            tag === 'input' ||

            tag === 'textarea' ||

            tag === 'select' ||

            elemento.isContentEditable

        );

    }


    /* ========================================= */
    /* NAVEGAÇÃO */
    /* ========================================= */

    function navegar(caminho) {

        if (!caminho) {
            return;
        }


        window.location.href =
            caminho;

    }


    /* ========================================= */
    /* TECLADO GLOBAL */
    /* ========================================= */

    document.addEventListener(
        'keydown',
        (evento) => {

            /*
             * Não interferir enquanto
             * o usuário estiver digitando.
             */

            if (elementoDigitacaoAtivo()) {
                return;
            }


            const tecla =
                evento.key.toLowerCase();


            /* ============================= */
            /* ALT + H — INÍCIO */
            /* ============================= */

            if (
                evento.altKey &&
                tecla === atalhos.inicio.tecla
            ) {

                evento.preventDefault();

                navegar(
                    atalhos.inicio.caminho
                );

                return;

            }


            /* ============================= */
            /* ALT + S — PESQUISA */
            /* ============================= */

            if (
                evento.altKey &&
                tecla === atalhos.pesquisa.tecla
            ) {

                evento.preventDefault();

                navegar(
                    atalhos.pesquisa.caminho
                );

                return;

            }


            /* ============================= */
            /* ALT + G — GALÁXIAS */
            /* ============================= */

            if (
                evento.altKey &&
                tecla === atalhos.galaxias.tecla
            ) {

                evento.preventDefault();

                navegar(
                    atalhos.galaxias.caminho
                );

                return;

            }


            /* ============================= */
            /* ALT + N — NOTIFICAÇÕES */
            /* ============================= */

            if (
                evento.altKey &&
                tecla === atalhos.notificacoes.tecla
            ) {

                evento.preventDefault();

                navegar(
                    atalhos.notificacoes.caminho
                );

                return;

            }


            /* ============================= */
            /* ALT + C — CANAL */
            /* ============================= */

            if (
                evento.altKey &&
                tecla === atalhos.canal.tecla
            ) {

                evento.preventDefault();

                navegar(
                    atalhos.canal.caminho
                );

                return;

            }


            /* ============================= */
            /* ESC — FECHAR */
            /* ============================= */

            if (
                tecla === 'escape'
            ) {

                fecharPainelAtalhos();

                painel.classList.remove('aberto');

                return;

            }


            /* ============================= */
            /* ? — ABRIR ATALHOS */
            /* ============================= */

            if (
                tecla === '?' ||
                (
                    evento.shiftKey &&
                    tecla === '/'
                )
            ) {

                evento.preventDefault();

                abrirPainelAtalhos();

                return;

            }

        }
    );

}