const botaoUsuario =
    document.querySelector('.btn-user-painel');

if (botaoUsuario) {

    const painel =
        document.createElement('div');

    painel.classList.add('painel-usuario');

    painel.innerHTML = `

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


        <div class="lista-painel-usuario">


            <a
                href="/assets/paginas-segundarias/canal.html"
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


            <a
                href="/assets/paginas-segundarias/configuracoes.html"
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


            <a
                href="/assets/paginas-segundarias/configuracoes.html"
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


        <div class="rodape-painel-usuario">

            <button
                class="btn-conta-usuario"
                id="btnContaUsuario"
            >

                <i class="bi bi-box-arrow-right"></i>

                <span>
                    Sair
                </span>

            </button>

        </div>

    `;

    document.body.appendChild(painel);


    /* ============================= */
    /* ABRIR / FECHAR */
    /* ============================= */

    botaoUsuario.addEventListener(
        'click',
        (evento) => {

            evento.preventDefault();
            evento.stopPropagation();

            painel.classList.toggle('aberto');

        }
    );


    painel.addEventListener(
        'click',
        (evento) => {

            evento.stopPropagation();

        }
    );


    document.addEventListener(
        'click',
        () => {

            painel.classList.remove('aberto');

        }
    );


    /* ============================= */
    /* MODO RESTRITO */
    /* ============================= */

    const modoRestrito =
        painel.querySelector('#modoRestrito');

    modoRestrito.addEventListener(
        'change',
        () => {

            console.log(
                'Modo restrito:',
                modoRestrito.checked
            );

        }
    );


    /* ============================= */
    /* SAIR */
    /* ============================= */

    const btnConta =
        painel.querySelector('#btnContaUsuario');

    btnConta.addEventListener(
        'click',
        () => {

            console.log(
                'Encerrar sessão'
            );

        }
    );

}