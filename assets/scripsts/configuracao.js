/* ========================================== */
/* EXPANSÃO DAS CATEGORIAS */
/* ========================================== */

function iniciarCategoriasConfiguracao() {

    const cabecalhosCategorias =
        document.querySelectorAll(
            '.cabecalho-item-configuracao'
        );


    cabecalhosCategorias.forEach((cabecalho) => {

        cabecalho.addEventListener('click', () => {

            const categoria =
                cabecalho.closest(
                    '.item-configuracao'
                );


            if (!categoria) {
                return;
            }


            /* Fecha as outras categorias */

            document
                .querySelectorAll(
                    '.item-configuracao.aberto'
                )
                .forEach((categoriaAberta) => {

                    if (
                        categoriaAberta !== categoria
                    ) {
                        categoriaAberta
                            .classList
                            .remove('aberto');
                    }

                });


            /* Abre / fecha a categoria */

            categoria.classList.toggle('aberto');

        });

    });

}


/* ========================================== */
/* INICIALIZAÇÃO DAS CATEGORIAS */
/* ========================================== */

iniciarCategoriasConfiguracao();


/* ========================================== */
/* EDITAR NOME DA CONTA */
/* ========================================== */

function iniciarEdicaoNomeConta() {

    const botaoEditarNome =
        document.getElementById(
            'editarNomeConta'
        );

    const nomeContaAtual =
        document.getElementById(
            'nomeContaAtual'
        );


    if (
        !botaoEditarNome ||
        !nomeContaAtual
    ) {
        return;
    }


    botaoEditarNome.addEventListener(
        'click',
        (evento) => {

            /*
             * Impede que o clique continue
             * subindo pela estrutura da página.
             */

            evento.preventDefault();
            evento.stopPropagation();


            abrirModalNomeConta(
                nomeContaAtual
            );

        }
    );

}


/* ========================================== */
/* INICIALIZAÇÃO DA EDIÇÃO */
/* ========================================== */

iniciarEdicaoNomeConta();


/* ========================================== */
/* ABRIR MODAL */
/* ========================================== */

function abrirModalNomeConta(
    elementoNome
) {

    const modalExistente =
        document.querySelector(
            '.modal-configuracao'
        );


    if (modalExistente) {
        return;
    }


    const nomeAtual =
        elementoNome.textContent.trim();


    const modal =
        document.createElement('div');


    modal.classList.add(
        'modal-configuracao'
    );


    modal.innerHTML = `

        <div class="caixa-modal-configuracao">

            <div class="icone-modal-configuracao">

                <i class="bi bi-person-circle"></i>

            </div>


            <h2>
                Alterar nome da conta
            </h2>


            <p>
                Escolha o nome que será utilizado
                para identificar sua conta.
            </p>


            <div class="campo-modal-configuracao">

                <label for="novoNomeConta">
                    Nome da conta
                </label>

                <input
                    type="text"
                    id="novoNomeConta"
                    value="${nomeAtual}"
                    maxlength="50"
                    autocomplete="off"
                >

                <span class="contador-configuracao">0 / 50</span>

            </div>


            <div class="acoes-modal-configuracao">

                <button
                    type="button"
                    class="cancelar-modal-configuracao"
                >
                    Cancelar
                </button>


                <button
                    type="button"
                    class="salvar-modal-configuracao"
                >
                    Salvar
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    /* Animação */

    requestAnimationFrame(() => {

        modal.classList.add('aberto');

    });


    const campoNome =
        modal.querySelector(
            '#novoNomeConta'
        );


    const contador =
        modal.querySelector(
            '.contador-configuracao'
        );


    /* ====================================== */
    /* CONTADOR */
    /* ====================================== */

    atualizarContadorNome(
        campoNome,
        contador
    );


    campoNome.focus();
    campoNome.select();


    campoNome.addEventListener(
        'input',
        () => {

            atualizarContadorNome(
                campoNome,
                contador
            );

            campoNome.classList.remove(
                'campo-invalido'
            );

        }
    );


    /* ====================================== */
    /* CANCELAR */
    /* ====================================== */

    modal
        .querySelector(
            '.cancelar-modal-configuracao'
        )
        .addEventListener(
            'click',
            () => {

                fecharModalConfiguracao(
                    modal
                );

            }
        );


    /* ====================================== */
    /* SALVAR */
    /* ====================================== */

    modal
        .querySelector(
            '.salvar-modal-configuracao'
        )
        .addEventListener(
            'click',
            () => {

                const novoNome =
                    campoNome.value.trim();


                if (novoNome === '') {

                    campoNome.classList.add(
                        'campo-invalido'
                    );

                    campoNome.focus();

                    return;

                }


                /*
                 * Atualiza o nome mostrado
                 * na configuração.
                 */

                elementoNome.textContent =
                    novoNome;


                fecharModalConfiguracao(
                    modal
                );

            }
        );


    /* ====================================== */
    /* CLIQUE FORA DO MODAL */
    /* ====================================== */

    modal.addEventListener(
        'click',
        (evento) => {

            if (
                evento.target === modal
            ) {

                fecharModalConfiguracao(
                    modal
                );

            }

        }
    );


    /* ====================================== */
    /* ESC */
    /* ====================================== */

    modal.addEventListener(
        'keydown',
        (evento) => {

            if (
                evento.key === 'Escape'
            ) {

                fecharModalConfiguracao(
                    modal
                );

            }

        }
    );

}


/* ========================================== */
/* CONTADOR */
/* ========================================== */

function atualizarContadorNome(
    campo,
    contador
) {

    contador.textContent =
        `${campo.value.length} / 50`;

}


/* ========================================== */
/* FECHAR MODAL */
/* ========================================== */

function fecharModalConfiguracao(
    modal
) {

    modal.classList.remove(
        'aberto'
    );


    setTimeout(() => {

        modal.remove();

    }, 250);

}

/* ========================================== */
/* EDITAR E-MAIL DA CONTA */
/* ========================================== */

function iniciarEdicaoEmailConta() {

    const botaoEditarEmail =
        document.getElementById(
            'editarEmailConta'
        );

    const emailContaAtual =
        document.getElementById(
            'emailContaAtual'
        );


    if (
        !botaoEditarEmail ||
        !emailContaAtual
    ) {
        return;
    }


    botaoEditarEmail.addEventListener(
        'click',
        (evento) => {

            evento.preventDefault();
            evento.stopPropagation();

            abrirModalEmailConta(
                emailContaAtual
            );

        }
    );

}


/* ========================================== */
/* INICIALIZAÇÃO */
/* ========================================== */

iniciarEdicaoEmailConta();


/* ========================================== */
/* ABRIR MODAL DE E-MAIL */
/* ========================================== */

function abrirModalEmailConta(
    elementoEmail
) {

    const modalExistente =
        document.querySelector(
            '.modal-configuracao'
        );


    if (modalExistente) {
        return;
    }


    const emailAtual =
        elementoEmail.textContent.trim();


    const modal =
        document.createElement('div');


    modal.classList.add(
        'modal-configuracao'
    );


    modal.innerHTML = `

        <div class="caixa-modal-configuracao">

            <div class="icone-modal-configuracao">

                <i class="bi bi-envelope"></i>

            </div>


            <h2>
                Alterar e-mail
            </h2>


            <p>
                Informe o novo endereço de e-mail
                vinculado à sua conta.
            </p>


            <div class="campo-modal-configuracao">

                <label for="novoEmailConta">
                    Novo e-mail
                </label>

                <input
                    type="email"
                    id="novoEmailConta"
                    value="${emailAtual}"
                    maxlength="100"
                    autocomplete="off"
                >

            </div>


            <div class="acoes-modal-configuracao">

                <button
                    type="button"
                    class="cancelar-modal-configuracao"
                >
                    Cancelar
                </button>


                <button
                    type="button"
                    class="salvar-modal-configuracao"
                >
                    Salvar
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    /* ====================================== */
    /* ANIMAÇÃO */
    /* ====================================== */

    requestAnimationFrame(() => {

        modal.classList.add('aberto');

    });


    const campoEmail =
        modal.querySelector(
            '#novoEmailConta'
        );


    /* ====================================== */
    /* FOCO */
    /* ====================================== */

    campoEmail.focus();
    campoEmail.select();


    /* ====================================== */
    /* CANCELAR */
    /* ====================================== */

    modal
        .querySelector(
            '.cancelar-modal-configuracao'
        )
        .addEventListener(
            'click',
            () => {

                fecharModalConfiguracao(
                    modal
                );

            }
        );


    /* ====================================== */
    /* SALVAR */
    /* ====================================== */

    modal
        .querySelector(
            '.salvar-modal-configuracao'
        )
        .addEventListener(
            'click',
            () => {

                const novoEmail =
                    campoEmail.value.trim();


                if (
                    !validarEmail(
                        novoEmail
                    )
                ) {

                    campoEmail.classList.add(
                        'campo-invalido'
                    );

                    campoEmail.focus();

                    return;

                }


                elementoEmail.textContent =
                    novoEmail;


                fecharModalConfiguracao(
                    modal
                );

            }
        );


    /* ====================================== */
    /* CLIQUE FORA */
    /* ====================================== */

    modal.addEventListener(
        'click',
        (evento) => {

            if (
                evento.target === modal
            ) {

                fecharModalConfiguracao(
                    modal
                );

            }

        }
    );


    /* ====================================== */
    /* ESC */
    /* ====================================== */

    modal.addEventListener(
        'keydown',
        (evento) => {

            if (
                evento.key === 'Escape'
            ) {

                fecharModalConfiguracao(
                    modal
                );

            }

        }
    );

}


/* ========================================== */
/* VALIDAR E-MAIL */
/* ========================================== */

function validarEmail(email) {

    const estruturaEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return estruturaEmail.test(email);

}

/* ========================================== */
/* VERIFICAÇÃO EM DUAS ETAPAS */
/* ========================================== */

function iniciarVerificacaoDuasEtapas() {

    const botao =
        document.getElementById(
            'configurarVerificacao'
        );

    if (!botao) {
        return;
    }

    botao.addEventListener(
        'click',
        (evento) => {

            evento.preventDefault();
            evento.stopPropagation();

            abrirModalVerificacao();

        }
    );

}


/* ========================================== */
/* MODAL DE CONFIGURAÇÃO */
/* ========================================== */

function abrirModalVerificacao() {

    const modalExistente =
        document.querySelector(
            '.modal-configuracao'
        );

    if (modalExistente) {
        return;
    }


    const modal =
        document.createElement('div');

    modal.classList.add(
        'modal-configuracao'
    );


    modal.innerHTML = `

        <div class="caixa-modal-configuracao">

            <div class="icone-modal-configuracao">

                <i class="bi bi-shield-lock"></i>

            </div>


            <h2>
                Verificação em duas etapas
            </h2>


            <p>
                Proteja sua conta adicionando uma
                segunda etapa de verificação ao
                entrar no Astraelion.
            </p>


            <div class="aviso-seguranca-configuracao">

                <i class="bi bi-shield-check"></i>

                <span>
                    Essa configuração adicionará
                    uma camada extra de segurança
                    à sua conta.
                </span>

            </div>


            <div class="acoes-modal-configuracao">

                <button
                    type="button"
                    class="cancelar-modal-configuracao"
                >
                    Agora não
                </button>


                <button
                    type="button"
                    class="salvar-modal-configuracao"
                    id="ativarVerificacao"
                >
                    Ativar
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    requestAnimationFrame(() => {

        modal.classList.add('aberto');

    });


    /* ====================================== */
    /* CANCELAR */
    /* ====================================== */

    modal
        .querySelector(
            '.cancelar-modal-configuracao'
        )
        .addEventListener(
            'click',
            () => {

                fecharModalConfiguracao(
                    modal
                );

            }
        );


    /* ====================================== */
    /* ATIVAR */
    /* ====================================== */

    modal
        .querySelector(
            '#ativarVerificacao'
        )
        .addEventListener(
            'click',
            () => {

                ativarVerificacao();

                fecharModalConfiguracao(
                    modal
                );

            }
        );


    /* ====================================== */
    /* CLIQUE FORA */
    /* ====================================== */

    modal.addEventListener(
        'click',
        (evento) => {

            if (
                evento.target === modal
            ) {

                fecharModalConfiguracao(
                    modal
                );

            }

        }
    );

}


/* ========================================== */
/* ATIVAR */
/* ========================================== */

function ativarVerificacao() {

    const status =
        document.getElementById(
            'statusVerificacao'
        );

    const botao =
        document.getElementById(
            'configurarVerificacao'
        );


    if (!status || !botao) {
        return;
    }


    status.textContent =
        'Ativada';

    status.classList.remove(
        'desativado'
    );

    status.classList.add(
        'ativado'
    );


    botao.textContent =
        'Gerenciar';

}


/* ========================================== */
/* INICIALIZAÇÃO */
/* ========================================== */

iniciarVerificacaoDuasEtapas();

/* ========================================== */
/* EDITAR NOME DO CANAL */
/* ========================================== */

function iniciarEdicaoNomeCanal() {

    const botaoEditar =
        document.getElementById(
            'editarNomeCanal'
        );

    const nomeCanal =
        document.getElementById(
            'nomeCanalAtual'
        );


    if (!botaoEditar || !nomeCanal) {
        return;
    }


    botaoEditar.addEventListener(
        'click',
        (evento) => {

            evento.preventDefault();
            evento.stopPropagation();

            abrirModalNomeCanal(
                nomeCanal
            );

        }
    );

}


/* ========================================== */
/* INICIALIZAÇÃO */
/* ========================================== */

iniciarEdicaoNomeCanal();

/* ========================================== */
/* EDITAR @USUÁRIO DO CANAL */
/* ========================================== */

function iniciarEdicaoUsuarioCanal() {

    const botaoEditar =
        document.getElementById(
            'editarUsuarioCanal'
        );

    if (!botaoEditar) {
        return;
    }

    botaoEditar.addEventListener(
        'click',
        (evento) => {

            evento.preventDefault();
            evento.stopPropagation();

            abrirModalUsuarioCanal();

        }
    );

}

iniciarEdicaoUsuarioCanal();

/* ========================================== */
/* ABRIR MODAL DO @USUÁRIO */
/* ========================================== */

function abrirModalUsuarioCanal() {

    const modalExistente =
        document.querySelector(
            '.modal-configuracao'
        );


    if (modalExistente) {
        return;
    }

    const usuarioCanalAtual =
        document.getElementById(
            'usuarioCanalAtual'
        );

    const modal =
        document.createElement('div');

    modal.classList.add(
        'modal-configuracao'
    );

    modal.innerHTML = `

    <div class="caixa-modal-configuracao">

        <div class="icone-modal-configuracao">

            <i class="bi bi-at"></i>

        </div>

        <h2>
            Alterar @usuário
        </h2>

        <p>
            Escolha o identificador público
            que será utilizado no seu canal.
        </p>

        <div class="campo-modal-configuracao">

            <label for="novoUsuarioCanal">
                @usuário
            </label>

            <input
                type="text"
                id="novoUsuarioCanal"
                value="@astraelion"
                maxlength="30"
                autocomplete="off"
            >

            <span class="contador-configuracao">
                0 / 30
            </span>

        </div>

        <div class="acoes-modal-configuracao">

            <button
                type="button"
                class="cancelar-modal-configuracao"
            >
                Cancelar
            </button>

            <button
                type="button"
                class="salvar-modal-configuracao"
                id="salvarUsuarioCanal"
            >
                Salvar
            </button>

        </div>

    </div>

`;

    document.body.appendChild(modal);

    requestAnimationFrame(() => {

        modal.classList.add('aberto');

    });

    const campoUsuario =
        modal.querySelector(
            '#novoUsuarioCanal'
        );

    const contador =
        modal.querySelector(
            '.contador-configuracao'
        );

    contador.textContent =
        `${campoUsuario.value.length} / 30`;

    campoUsuario.focus();
    campoUsuario.select();

    campoUsuario.addEventListener(
        'input',
        () => {

            contador.textContent =
                `${campoUsuario.value.length} / 30`;

            campoUsuario.classList.remove(
                'campo-invalido'
            );

        }
    );

    modal.querySelector(
        '.cancelar-modal-configuracao'
    ).addEventListener(
        'click',
        () => {

            fecharModalConfiguracao(modal);

        }
    );

    modal.querySelector(
        '#salvarUsuarioCanal'
    ).addEventListener(
        'click',
        () => {

            const novoUsuario =
                campoUsuario.value.trim();

            if (novoUsuario === '') {

                campoUsuario.classList.add(
                    'campo-invalido'
                );

                campoUsuario.focus();

                return;
            }

            usuarioCanalAtual.textContent =
                novoUsuario;

            fecharModalConfiguracao(modal);

        }
    );

    modal.addEventListener(
        'click',
        (evento) => {

            if (evento.target === modal) {

                fecharModalConfiguracao(modal);

            }

        }
    );

    modal.addEventListener(
        'keydown',
        (evento) => {

            if (evento.key === 'Escape') {

                fecharModalConfiguracao(modal);

            }

        }
    );

}

/* ========================================== */
/* ABRIR MODAL */
/* ========================================== */

function abrirModalNomeCanal(
    elementoNome
) {

    const modalExistente =
        document.querySelector(
            '.modal-configuracao'
        );


    if (modalExistente) {
        return;
    }


    const nomeAtual =
        elementoNome.textContent.trim();


    const modal =
        document.createElement('div');

    modal.classList.add(
        'modal-configuracao'
    );


    modal.innerHTML = `

        <div class="caixa-modal-configuracao">

            <div class="icone-modal-configuracao">

                <i class="bi bi-broadcast"></i>

            </div>


            <h2>
                Alterar nome do canal
            </h2>


            <p>
                Escolha o nome público que será
                exibido no seu canal.
            </p>


            <div class="campo-modal-configuracao">

                <label for="novoNomeCanal">
                    Nome do canal
                </label>

                <input
                    type="text"
                    id="novoNomeCanal"
                    value="${nomeAtual}"
                    maxlength="50"
                    autocomplete="off"
                >

                <span class="contador-configuracao">0 / 50</span>

            </div>


            <div class="acoes-modal-configuracao">

                <button
                    type="button"
                    class="cancelar-modal-configuracao"
                >
                    Cancelar
                </button>


                <button
                    type="button"
                    class="salvar-modal-configuracao"
                    id="salvarNomeCanal"
                >
                    Salvar
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    requestAnimationFrame(() => {

        modal.classList.add('aberto');

    });


    const campoNome =
        modal.querySelector(
            '#novoNomeCanal'
        );


    const contador =
        modal.querySelector(
            '.contador-configuracao'
        );


    /* ====================================== */
    /* CONTADOR */
    /* ====================================== */

    atualizarContadorNomeCanal(
        campoNome,
        contador
    );


    campoNome.focus();
    campoNome.select();


    campoNome.addEventListener(
        'input',
        () => {

            atualizarContadorNomeCanal(
                campoNome,
                contador
            );

            campoNome.classList.remove(
                'campo-invalido'
            );

        }
    );


    /* ====================================== */
    /* CANCELAR */
    /* ====================================== */

    modal
        .querySelector(
            '.cancelar-modal-configuracao'
        )
        .addEventListener(
            'click',
            () => {

                fecharModalConfiguracao(
                    modal
                );

            }
        );


    /* ====================================== */
    /* SALVAR */
    /* ====================================== */

    modal
        .querySelector(
            '#salvarNomeCanal'
        )
        .addEventListener(
            'click',
            () => {

                const novoNome =
                    campoNome.value.trim();


                if (novoNome === '') {

                    campoNome.classList.add(
                        'campo-invalido'
                    );

                    campoNome.focus();

                    return;

                }


                elementoNome.textContent =
                    novoNome;


                fecharModalConfiguracao(
                    modal
                );

            }
        );


    /* ====================================== */
    /* CLIQUE FORA */
    /* ====================================== */

    modal.addEventListener(
        'click',
        (evento) => {

            if (
                evento.target === modal
            ) {

                fecharModalConfiguracao(
                    modal
                );

            }

        }
    );


    /* ====================================== */
    /* ESC */
    /* ====================================== */

    modal.addEventListener(
        'keydown',
        (evento) => {

            if (
                evento.key === 'Escape'
            ) {

                fecharModalConfiguracao(
                    modal
                );

            }

        }
    );

}


/* ========================================== */
/* CONTADOR */
/* ========================================== */

function atualizarContadorNomeCanal(
    campo,
    contador
) {

    contador.textContent =
        `${campo.value.length} / 50`;

}

/* ========================================== */
/* CONFIGURAR NOTIFICAÇÃO - ATIVIDADE */
/* ========================================== */

function iniciarNotificacaoAtividade() {

    const botao =
        document.getElementById(
            'configurarNotificacaoAtividade'
        );

    if (!botao) {
        return;
    }

    botao.addEventListener(
        'click',
        (evento) => {

            evento.preventDefault();
            evento.stopPropagation();

            abrirModalNotificacaoAtividade();

        }
    );

}

iniciarNotificacaoAtividade();

/* ========================================== */
/* MODAL DE NOTIFICAÇÃO - ATIVIDADE */
/* ========================================== */

function abrirModalNotificacaoAtividade() {

    const modalExistente =
        document.querySelector(
            '.modal-configuracao'
        );

    if (modalExistente) {
        return;
    }

    const modal =
        document.createElement('div');

    modal.classList.add(
        'modal-configuracao'
    );

    modal.innerHTML = `

        <div class="caixa-modal-configuracao">

            <div class="icone-modal-configuracao">

                <i class="bi bi-bell"></i>

            </div>

            <h2>
                Notificações de atividade
            </h2>

            <p>
                Receba notificações sobre atividades
                relacionadas à sua conta.
            </p>

            <div class="aviso-seguranca-configuracao">

                <i class="bi bi-info-circle"></i>

                <span>
                    Você poderá alterar essa preferência
                    novamente quando quiser.
                </span>

            </div>

            <div class="acoes-modal-configuracao">

                <button
                    type="button"
                    class="cancelar-modal-configuracao"
                >
                    Cancelar
                </button>

                <button
                    type="button"
                    class="salvar-modal-configuracao"
                    id="salvarNotificacaoAtividade"
                >
                    Desativar
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(modal);

    requestAnimationFrame(() => {

        modal.classList.add('aberto');

    });

    modal.querySelector(
        '.cancelar-modal-configuracao'
    ).addEventListener(
        'click',
        () => {

            fecharModalConfiguracao(modal);

        }
    );

    modal.querySelector(
        '#salvarNotificacaoAtividade'
    ).addEventListener(
        'click',
        () => {

            desativarNotificacaoAtividade();

            fecharModalConfiguracao(modal);

        }
    );

    modal.addEventListener(
        'click',
        (evento) => {

            if (evento.target === modal) {

                fecharModalConfiguracao(modal);

            }

        }
    );

    modal.addEventListener(
        'keydown',
        (evento) => {

            if (evento.key === 'Escape') {

                fecharModalConfiguracao(modal);

            }

        }
    );

}

/* ========================================== */
/* DESATIVAR NOTIFICAÇÃO - ATIVIDADE */
/* ========================================== */

function desativarNotificacaoAtividade() {

    const status =
        document.getElementById(
            'statusNotificacaoAtividade'
        );

    const botao =
        document.getElementById(
            'configurarNotificacaoAtividade'
        );

    if (!status || !botao) {
        return;
    }

    status.textContent =
        'Desativada';

    status.classList.remove(
        'ativo'
    );

    status.classList.add(
        'desativado'
    );

    botao.textContent =
        'Ativar';

}

/* ========================================== */
/* CONFIGURAR NOTIFICAÇÃO - NOVOS INSCRITOS */
/* ========================================== */

function iniciarNotificacaoInscritos() {

    const botao =
        document.getElementById(
            'configurarNotificacaoInscritos'
        );

    if (!botao) {
        return;
    }

    botao.addEventListener(
        'click',
        (evento) => {

            evento.preventDefault();
            evento.stopPropagation();

            abrirModalNotificacaoInscritos();

        }
    );

}

iniciarNotificacaoInscritos();

/* ========================================== */
/* MODAL DE NOTIFICAÇÃO - NOVOS INSCRITOS */
/* ========================================== */

function abrirModalNotificacaoInscritos() {

    const modalExistente =
        document.querySelector(
            '.modal-configuracao'
        );

    if (modalExistente) {
        return;
    }

    const modal =
        document.createElement('div');

    modal.classList.add(
        'modal-configuracao'
    );

    modal.innerHTML = `

        <div class="caixa-modal-configuracao">

            <div class="icone-modal-configuracao">

                <i class="bi bi-person-plus"></i>

            </div>

            <h2>
                Notificações de novos inscritos
            </h2>

            <p>
                Receba notificações quando alguém
                se inscrever no seu canal.
            </p>

            <div class="aviso-seguranca-configuracao">

                <i class="bi bi-info-circle"></i>

                <span>
                    Você poderá alterar essa preferência
                    novamente quando quiser.
                </span>

            </div>

            <div class="acoes-modal-configuracao">

                <button
                    type="button"
                    class="cancelar-modal-configuracao"
                >
                    Cancelar
                </button>

                <button
                    type="button"
                    class="salvar-modal-configuracao"
                    id="salvarNotificacaoInscritos"
                >
                    Desativar
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(modal);

    requestAnimationFrame(() => {

        modal.classList.add('aberto');

    });

    modal.querySelector(
        '.cancelar-modal-configuracao'
    ).addEventListener(
        'click',
        () => {

            fecharModalConfiguracao(modal);

        }
    );

    modal.querySelector(
        '#salvarNotificacaoInscritos'
    ).addEventListener(
        'click',
        () => {

            desativarNotificacaoInscritos();

            fecharModalConfiguracao(modal);

        }
    );

    modal.addEventListener(
        'click',
        (evento) => {

            if (evento.target === modal) {

                fecharModalConfiguracao(modal);

            }

        }
    );

    modal.addEventListener(
        'keydown',
        (evento) => {

            if (evento.key === 'Escape') {

                fecharModalConfiguracao(modal);

            }

        }
    );

}

/* ========================================== */
/* DESATIVAR NOTIFICAÇÃO - NOVOS INSCRITOS */
/* ========================================== */

function desativarNotificacaoInscritos() {

    const status =
        document.getElementById(
            'statusNotificacaoInscritos'
        );

    const botao =
        document.getElementById(
            'configurarNotificacaoInscritos'
        );

    if (!status || !botao) {
        return;
    }

    status.textContent =
        'Desativada';

    status.classList.remove(
        'ativo'
    );

    status.classList.add(
        'desativado'
    );

    botao.textContent =
        'Ativar';

}

/* ========================================== */
/* CONFIGURAR NOTIFICAÇÃO - MENÇÕES */
/* ========================================== */

function iniciarNotificacaoMencoes() {

    const botao =
        document.getElementById(
            'configurarNotificacaoMencoes'
        );

    if (!botao) {
        return;
    }

    botao.addEventListener(
        'click',
        (evento) => {

            evento.preventDefault();
            evento.stopPropagation();

            abrirModalNotificacaoMencoes();

        }
    );

}

iniciarNotificacaoMencoes();

/* ========================================== */
/* MODAL DE NOTIFICAÇÃO - MENÇÕES */
/* ========================================== */

function abrirModalNotificacaoMencoes() {

    const modalExistente =
        document.querySelector(
            '.modal-configuracao'
        );

    if (modalExistente) {
        return;
    }

    const modal =
        document.createElement('div');

    modal.classList.add(
        'modal-configuracao'
    );

    modal.innerHTML = `

        <div class="caixa-modal-configuracao">

            <div class="icone-modal-configuracao">

                <i class="bi bi-at"></i>

            </div>

            <h2>
                Notificações de menções
            </h2>

            <p>
                Receba notificações quando alguém
                mencionar você no Astraelion.
            </p>

            <div class="aviso-seguranca-configuracao">

                <i class="bi bi-info-circle"></i>

                <span>
                    Você poderá alterar essa preferência
                    novamente quando quiser.
                </span>

            </div>

            <div class="acoes-modal-configuracao">

                <button
                    type="button"
                    class="cancelar-modal-configuracao"
                >
                    Cancelar
                </button>

                <button
                    type="button"
                    class="salvar-modal-configuracao"
                    id="salvarNotificacaoMencoes"
                >
                    Desativar
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(modal);

    requestAnimationFrame(() => {

        modal.classList.add('aberto');

    });

    modal.querySelector(
        '.cancelar-modal-configuracao'
    ).addEventListener(
        'click',
        () => {

            fecharModalConfiguracao(modal);

        }
    );

    modal.querySelector(
        '#salvarNotificacaoMencoes'
    ).addEventListener(
        'click',
        () => {

            desativarNotificacaoMencoes();

            fecharModalConfiguracao(modal);

        }
    );

    modal.addEventListener(
        'click',
        (evento) => {

            if (evento.target === modal) {

                fecharModalConfiguracao(modal);

            }

        }
    );

    modal.addEventListener(
        'keydown',
        (evento) => {

            if (evento.key === 'Escape') {

                fecharModalConfiguracao(modal);

            }

        }
    );

}

/* ========================================== */
/* DESATIVAR NOTIFICAÇÃO - MENÇÕES */
/* ========================================== */

function desativarNotificacaoMencoes() {

    const status =
        document.getElementById(
            'statusNotificacaoMencoes'
        );

    const botao =
        document.getElementById(
            'configurarNotificacaoMencoes'
        );

    if (!status || !botao) {
        return;
    }

    status.textContent =
        'Desativada';

    status.classList.remove(
        'ativo'
    );

    status.classList.add(
        'desativado'
    );

    botao.textContent =
        'Ativar';

}

/* ========================================== */
/* CONFIGURAR NOTIFICAÇÃO - RECOMENDAÇÕES */
/* ========================================== */

function iniciarNotificacaoRecomendacoes() {

    const botao =
        document.getElementById(
            'configurarNotificacaoRecomendacoes'
        );

    if (!botao) {
        return;
    }

    botao.addEventListener(
        'click',
        (evento) => {

            evento.preventDefault();
            evento.stopPropagation();

            abrirModalNotificacaoRecomendacoes();

        }
    );

}

iniciarNotificacaoRecomendacoes();

/* ========================================== */
/* MODAL DE NOTIFICAÇÃO - RECOMENDAÇÕES */
/* ========================================== */

function abrirModalNotificacaoRecomendacoes() {

    const modalExistente =
        document.querySelector(
            '.modal-configuracao'
        );

    if (modalExistente) {
        return;
    }

    const modal =
        document.createElement('div');

    modal.classList.add(
        'modal-configuracao'
    );

    modal.innerHTML = `

        <div class="caixa-modal-configuracao">

            <div class="icone-modal-configuracao">

                <i class="bi bi-stars"></i>

            </div>

            <h2>
                Notificações de recomendações
            </h2>

            <p>
                Receba notificações sobre vídeos e
                conteúdos que podem interessar a você.
            </p>

            <div class="aviso-seguranca-configuracao">

                <i class="bi bi-info-circle"></i>

                <span>
                    Você poderá alterar essa preferência
                    novamente quando quiser.
                </span>

            </div>

            <div class="acoes-modal-configuracao">

                <button
                    type="button"
                    class="cancelar-modal-configuracao"
                >
                    Cancelar
                </button>

                <button
                    type="button"
                    class="salvar-modal-configuracao"
                    id="salvarNotificacaoRecomendacoes"
                >
                    Desativar
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(modal);

    requestAnimationFrame(() => {

        modal.classList.add('aberto');

    });

    modal.querySelector(
        '.cancelar-modal-configuracao'
    ).addEventListener(
        'click',
        () => {

            fecharModalConfiguracao(modal);

        }
    );

    modal.querySelector(
        '#salvarNotificacaoRecomendacoes'
    ).addEventListener(
        'click',
        () => {

            desativarNotificacaoRecomendacoes();

            fecharModalConfiguracao(modal);

        }
    );

    modal.addEventListener(
        'click',
        (evento) => {

            if (evento.target === modal) {

                fecharModalConfiguracao(modal);

            }

        }
    );

    modal.addEventListener(
        'keydown',
        (evento) => {

            if (evento.key === 'Escape') {

                fecharModalConfiguracao(modal);

            }

        }
    );

}

/* ========================================== */
/* DESATIVAR NOTIFICAÇÃO - RECOMENDAÇÕES */
/* ========================================== */

function desativarNotificacaoRecomendacoes() {

    const status =
        document.getElementById(
            'statusNotificacaoRecomendacoes'
        );

    const botao =
        document.getElementById(
            'configurarNotificacaoRecomendacoes'
        );

    if (!status || !botao) {
        return;
    }

    status.textContent =
        'Desativada';

    status.classList.remove(
        'ativo'
    );

    status.classList.add(
        'desativado'
    );

    botao.textContent =
        'Ativar';

}

/* ========================================== */
/* CONFIGURAR E-MAIL - ATUALIZAÇÕES DA CONTA */
/* ========================================== */

function iniciarEmailAtualizacoes() {

    const botao =
        document.getElementById(
            'configurarEmailAtualizacoes'
        );

    if (!botao) {
        return;
    }

    botao.addEventListener(
        'click',
        (evento) => {

            evento.preventDefault();
            evento.stopPropagation();

            abrirModalEmailAtualizacoes();

        }
    );

}

iniciarEmailAtualizacoes();

/* ========================================== */
/* MODAL E-MAIL - ATUALIZAÇÕES DA CONTA */
/* ========================================== */

function abrirModalEmailAtualizacoes() {

    const modalExistente =
        document.querySelector(
            '.modal-configuracao'
        );

    if (modalExistente) {
        return;
    }

    const modal =
        document.createElement('div');

    modal.classList.add(
        'modal-configuracao'
    );

    modal.innerHTML = `

        <div class="caixa-modal-configuracao">

            <div class="icone-modal-configuracao">

                <i class="bi bi-envelope"></i>

            </div>

            <h2>
                Atualizações da conta
            </h2>

            <p>
                Receba e-mails sobre alterações
                e informações importantes da sua conta.
            </p>

            <div class="aviso-seguranca-configuracao">

                <i class="bi bi-info-circle"></i>

                <span>
                    Alguns e-mails relacionados à segurança
                    e ao funcionamento da conta podem ser
                    enviados independentemente desta preferência.
                </span>

            </div>

            <div class="acoes-modal-configuracao">

                <button
                    type="button"
                    class="cancelar-modal-configuracao"
                >
                    Cancelar
                </button>

                <button
                    type="button"
                    class="salvar-modal-configuracao"
                    id="salvarEmailAtualizacoes"
                >
                    Desativar
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(modal);

    requestAnimationFrame(() => {

        modal.classList.add('aberto');

    });

    modal.querySelector(
        '.cancelar-modal-configuracao'
    ).addEventListener(
        'click',
        () => {

            fecharModalConfiguracao(modal);

        }
    );

    modal.querySelector(
        '#salvarEmailAtualizacoes'
    ).addEventListener(
        'click',
        () => {

            desativarEmailAtualizacoes();

            fecharModalConfiguracao(modal);

        }
    );

    modal.addEventListener(
        'click',
        (evento) => {

            if (evento.target === modal) {

                fecharModalConfiguracao(modal);

            }

        }
    );

    modal.addEventListener(
        'keydown',
        (evento) => {

            if (evento.key === 'Escape') {

                fecharModalConfiguracao(modal);

            }

        }
    );

}

/* ========================================== */
/* DESATIVAR E-MAIL - ATUALIZAÇÕES DA CONTA */
/* ========================================== */

function desativarEmailAtualizacoes() {

    const status =
        document.getElementById(
            'statusEmailAtualizacoes'
        );

    const botao =
        document.getElementById(
            'configurarEmailAtualizacoes'
        );

    if (!status || !botao) {
        return;
    }

    status.textContent =
        'Desativada';

    status.classList.remove(
        'ativo'
    );

    status.classList.add(
        'desativado'
    );

    botao.textContent =
        'Ativar';

}

/* ========================================== */
/* CONFIGURAR E-MAIL - NOVIDADES */
/* ========================================== */

function iniciarEmailNovidades() {

    const botao =
        document.getElementById(
            'configurarEmailNovidades'
        );

    if (!botao) {
        return;
    }

    botao.addEventListener(
        'click',
        (evento) => {

            evento.preventDefault();
            evento.stopPropagation();

            abrirModalEmailNovidades();

        }
    );

}

iniciarEmailNovidades();

/* ========================================== */
/* MODAL E-MAIL - NOVIDADES */
/* ========================================== */

function abrirModalEmailNovidades() {

    const modalExistente =
        document.querySelector(
            '.modal-configuracao'
        );

    if (modalExistente) {
        return;
    }

    const modal =
        document.createElement('div');

    modal.classList.add(
        'modal-configuracao'
    );

    modal.innerHTML = `

        <div class="caixa-modal-configuracao">

            <div class="icone-modal-configuracao">

                <i class="bi bi-stars"></i>

            </div>

            <h2>
                Novidades do Astraelion
            </h2>

            <p>
                Receba e-mails sobre novidades,
                recursos e atualizações da plataforma.
            </p>

            <div class="aviso-seguranca-configuracao">

                <i class="bi bi-info-circle"></i>

                <span>
                    Você poderá alterar essa preferência
                    novamente quando quiser.
                </span>

            </div>

            <div class="acoes-modal-configuracao">

                <button
                    type="button"
                    class="cancelar-modal-configuracao"
                >
                    Cancelar
                </button>

                <button
                    type="button"
                    class="salvar-modal-configuracao"
                    id="salvarEmailNovidades"
                >
                    Desativar
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(modal);

    requestAnimationFrame(() => {

        modal.classList.add('aberto');

    });

    modal.querySelector(
        '.cancelar-modal-configuracao'
    ).addEventListener(
        'click',
        () => {

            fecharModalConfiguracao(modal);

        }
    );

    modal.querySelector(
        '#salvarEmailNovidades'
    ).addEventListener(
        'click',
        () => {

            desativarEmailNovidades();

            fecharModalConfiguracao(modal);

        }
    );

    modal.addEventListener(
        'click',
        (evento) => {

            if (evento.target === modal) {

                fecharModalConfiguracao(modal);

            }

        }
    );

    modal.addEventListener(
        'keydown',
        (evento) => {

            if (evento.key === 'Escape') {

                fecharModalConfiguracao(modal);

            }

        }
    );

}

/* ========================================== */
/* DESATIVAR E-MAIL - NOVIDADES */
/* ========================================== */

function desativarEmailNovidades() {

    const status =
        document.getElementById(
            'statusEmailNovidades'
        );

    const botao =
        document.getElementById(
            'configurarEmailNovidades'
        );

    if (!status || !botao) {
        return;
    }

    status.textContent =
        'Desativada';

    status.classList.remove(
        'ativo'
    );

    status.classList.add(
        'desativado'
    );

    botao.textContent =
        'Ativar';

}

/* ========================================== */
/* CONFIGURAR - REPRODUÇÃO AUTOMÁTICA */
/* ========================================== */

function iniciarReproducaoAutomatica() {

    const botao =
        document.getElementById(
            'configurarReproducaoAutomatica'
        );

    if (!botao) {
        return;
    }

    botao.addEventListener(
        'click',
        (evento) => {

            evento.preventDefault();
            evento.stopPropagation();

            abrirModalReproducaoAutomatica();

        }
    );

}

iniciarReproducaoAutomatica();

/* ========================================== */
/* MODAL - REPRODUÇÃO AUTOMÁTICA */
/* ========================================== */

function abrirModalReproducaoAutomatica() {

    const modalExistente =
        document.querySelector(
            '.modal-configuracao'
        );

    if (modalExistente) {
        return;
    }

    const modal =
        document.createElement('div');

    modal.classList.add(
        'modal-configuracao'
    );

    modal.innerHTML = `

        <div class="caixa-modal-configuracao">

            <div class="icone-modal-configuracao">

                <i class="bi bi-play-circle"></i>

            </div>

            <h2>
                Reprodução automática
            </h2>

            <p>
                Inicie automaticamente o próximo conteúdo
                após o término do vídeo.
            </p>

            <div class="aviso-seguranca-configuracao">

                <i class="bi bi-info-circle"></i>

                <span>
                    Você poderá alterar essa preferência
                    novamente quando quiser.
                </span>

            </div>

            <div class="acoes-modal-configuracao">

                <button
                    type="button"
                    class="cancelar-modal-configuracao"
                >
                    Cancelar
                </button>

                <button
                    type="button"
                    class="salvar-modal-configuracao"
                    id="salvarReproducaoAutomatica"
                >
                    Desativar
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(modal);

    requestAnimationFrame(() => {

        modal.classList.add('aberto');

    });

    modal.querySelector(
        '.cancelar-modal-configuracao'
    ).addEventListener(
        'click',
        () => {

            fecharModalConfiguracao(modal);

        }
    );

    modal.querySelector(
        '#salvarReproducaoAutomatica'
    ).addEventListener(
        'click',
        () => {

            desativarReproducaoAutomatica();

            fecharModalConfiguracao(modal);

        }
    );

    modal.addEventListener(
        'click',
        (evento) => {

            if (evento.target === modal) {

                fecharModalConfiguracao(modal);

            }

        }
    );

    modal.addEventListener(
        'keydown',
        (evento) => {

            if (evento.key === 'Escape') {

                fecharModalConfiguracao(modal);

            }

        }
    );

}

/* ========================================== */
/* DESATIVAR - REPRODUÇÃO AUTOMÁTICA */
/* ========================================== */

function desativarReproducaoAutomatica() {

    const status =
        document.getElementById(
            'statusReproducaoAutomatica'
        );

    const botao =
        document.getElementById(
            'configurarReproducaoAutomatica'
        );

    if (!status || !botao) {
        return;
    }

    status.textContent =
        'Desativada';

    status.classList.remove(
        'ativo'
    );

    status.classList.add(
        'desativado'
    );

    botao.textContent =
        'Ativar';

}

const qualidadePadrao =
    document.getElementById(
        'qualidadePadrao'
    );

if (qualidadePadrao) {

    let valorAnterior =
        qualidadePadrao.value;

    qualidadePadrao.addEventListener(
        'mousedown',
        () => {

            valorAnterior =
                qualidadePadrao.value;

            qualidadePadrao.value = '';

        }
    );

    qualidadePadrao.addEventListener(
        'blur',
        () => {

            if (
                qualidadePadrao.value.trim() === ''
            ) {

                qualidadePadrao.value =
                    valorAnterior;

            }

        }
    );

}