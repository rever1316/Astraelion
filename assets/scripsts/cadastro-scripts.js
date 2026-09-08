function validarCadastro() {

    const nome =
        document.getElementById('nome').value.trim();

    const email =
        document.getElementById('email').value.trim();

    const senha =
        document.getElementById('senha').value.trim();

    const confirmaSenha =
        document.getElementById('confirmaSenha').value.trim();


    /* ============================= */
    /* CAMPOS INCOMPLETOS */
    /* ============================= */

    if (
        nome === '' ||
        email === '' ||
        senha === '' ||
        confirmaSenha === ''
    ) {

        mostrarModalCadastro(
            'Campos incompletos',
            'Por favor, preencha todos os campos para forjar sua chave!',
            'bi-exclamation-circle'
        );

        return;
    }


    /* ============================= */
    /* SENHAS DIFERENTES */
    /* ============================= */

    if (senha !== confirmaSenha) {

        mostrarModalCadastro(
            'Senhas divergentes',
            'Os códigos de segurança da chave não coincidem. Verifique e tente novamente!',
            'bi-x-circle'
        );

        return;
    }


    /* ============================= */
    /* CADASTRO REALIZADO */
    /* ============================= */

    mostrarModalCadastro(
        'Chave forjada com sucesso!',
        'Bem-vindo ao universo, Viajante. Sua jornada começa agora.',
        'bi-stars',
        true
    );
}


/* ============================= */
/* MODAL - CADASTRO */
/* ============================= */

function mostrarModalCadastro(
    titulo,
    mensagem,
    icone = 'bi-exclamation-circle',
    redirecionar = false
) {

    const modalExistente =
        document.querySelector('.modal-cadastro');

    if (modalExistente) {
        modalExistente.remove();
    }


    const modal =
        document.createElement('div');

    modal.classList.add('modal-cadastro');

    modal.innerHTML = `
        <div class="caixa-modal-cadastro">

            <div class="icone-modal-cadastro">
                <i class="bi ${icone}"></i>
            </div>

            <h2>
                ${titulo}
            </h2>

            <p>
                ${mensagem}
            </p>

            <button class="acao-modal-cadastro">
                OK
            </button>

        </div>
    `;

    document.body.appendChild(modal);


    requestAnimationFrame(() => {
        modal.classList.add('aberto');
    });


    /* ============================= */
    /* BOTÃO OK */
    /* ============================= */

    modal
        .querySelector('.acao-modal-cadastro')
        .addEventListener('click', () => {

            if (redirecionar) {

                window.location.href =
                    "./login.html";

            } else {

                fecharModalCadastro();

            }

        });


    /* ============================= */
    /* CLICAR FORA */
    /* ============================= */

    modal.addEventListener('click', (evento) => {

        if (evento.target === modal) {
            fecharModalCadastro();
        }

    });


    /* ============================= */
    /* ESC */
    /* ============================= */

    document.addEventListener(
        'keydown',
        function fecharComEsc(evento) {

            if (evento.key === 'Escape') {

                fecharModalCadastro();

                document.removeEventListener(
                    'keydown',
                    fecharComEsc
                );

            }

        }
    );
}


/* ============================= */
/* FECHAR MODAL */
/* ============================= */

function fecharModalCadastro() {

    const modal =
        document.querySelector('.modal-cadastro');

    if (!modal) {
        return;
    }

    modal.classList.remove('aberto');

    setTimeout(() => {
        modal.remove();
    }, 250);

}