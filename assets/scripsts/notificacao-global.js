const botaoNotificacao =
    document.querySelector('.btn-notificacao');
    

if (botaoNotificacao) {

    const painel =
        document.createElement('div');

    painel.classList.add('painel-notificacoes');


    painel.innerHTML = `


        <div class="cabecalho-painel-notificacoes">

            <h2>
                Notificações
            </h2>

            <a
                href="/assets/paginas-segundarias/notificacao.html"
                class="ver-todas-notificacoes"
            >
                Ver todas
            </a>

        </div>


        <div class="lista-painel-notificacoes">

            <a
                href="/assets/paginas-segundarias/watch.html"
                class="item-painel-notificacao nao-lida"
            >

                <div class="icone-painel-notificacao">
                    <i class="bi bi-heart-fill"></i>
                </div>

                <div class="conteudo-painel-notificacao">

                    <p>
                        <strong>Canal Astraelion</strong>
                        curtiu sua Missão.
                    </p>

                    <span>
                        Explorando um novo universo
                    </span>

                    <small>
                        há 10 minutos
                    </small>

                </div>

            </a>


            <a
                href="/assets/paginas-segundarias/canal.html"
                class="item-painel-notificacao nao-lida"
            >

                <div class="icone-painel-notificacao">
                    <i class="bi bi-person-plus-fill"></i>
                </div>

                <div class="conteudo-painel-notificacao">

                    <p>
                        <strong>Explorador X</strong>
                        embarcou no seu canal.
                    </p>

                    <small>
                        há 1 hora
                    </small>

                </div>

            </a>


            <a
                href="/assets/paginas-segundarias/watch.html"
                class="item-painel-notificacao"
            >

                <div class="icone-painel-notificacao">
                    <i class="bi bi-chat-left-fill"></i>
                </div>

                <div class="conteudo-painel-notificacao">

                    <p>
                        <strong>Explorador Y</strong>
                        comentou na sua Missão.
                    </p>

                    <span>
                        "Essa descoberta foi incrível!"
                    </span>

                    <small>
                        há 3 horas
                    </small>

                </div>

            </a>

        </div>


        <div class="rodape-painel-notificacoes">

            <button class="marcar-todas-painel">
                <i class="bi bi-check2-all"></i>
                Marcar todas como lidas
            </button>

        </div>

    `;


    document.body.appendChild(painel);


    botaoNotificacao.addEventListener(
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

}