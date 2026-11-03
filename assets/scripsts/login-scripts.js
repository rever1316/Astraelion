function validarLogin() {

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (email === '' || senha === '') {
        mostrarModalLogin(
            'Campos incompletos',
            'Por favor, preencha todos os campos para prosseguir.',
            'bi-exclamation-circle'
        );
        return;
    }

    mostrarModalLogin(
        'Acesso autorizado',
        'Campos preenchidos! Sua jornada pelo Astraelion está prestes a começar.',
        'bi-stars',
        () => {
            window.location.href = "/index.html";
        }
    );
}

/* ============================= */
/* MODAL - LOGIN */
/* ============================= */

function mostrarModalLogin(
    titulo,
    mensagem,
    icone = 'bi-exclamation-circle',
    acao = null
) {
    // Remove modal anterior, caso exista
    const modalExistente = document.querySelector('.modal-login');
    if (modalExistente) {
        modalExistente.remove();
    }

    // Cria o modal
    const modal = document.createElement('div');
    modal.classList.add('modal-login');

    modal.innerHTML = `
        <div class="caixa-modal-login">
            <div class="icone-modal-login">
                <i class="bi ${icone}"></i>
            </div>
            <h2>${titulo}</h2>
            <p>${mensagem}</p>
            <button class="acao-modal-login">OK</button>
        </div>
    `;

    document.body.appendChild(modal);

    // Ativa animação
    requestAnimationFrame(() => {
        modal.classList.add('aberto');
    });

    // Botão OK (com suporte ao callback de ação)
    modal.querySelector('.acao-modal-login').addEventListener('click', () => {
        fecharModalLogin(acao);
    });

    // Clicar fora da caixa fecha o modal
    modal.addEventListener('click', (evento) => {
        if (evento.target === modal) {
            fecharModalLogin();
        }
    });

    // ESC fecha o modal
    document.addEventListener(
        'keydown',
        function fecharComEsc(evento) {
            if (evento.key === 'Escape') {
                fecharModalLogin();
                document.removeEventListener('keydown', fecharComEsc);
            }
        }
    );
}

/* ============================= */
/* FECHAR MODAL */
/* ============================= */

function fecharModalLogin(callback) {
    const modal = document.querySelector('.modal-login');

    if (!modal) {
        if (callback) callback();
        return;
    }

    modal.classList.remove('aberto');

    setTimeout(() => {
        modal.remove();
        if (callback) {
            callback(); // Executa a ação (redirecionamento) só após o modal sumir
        }
    }, 250);
}


const GOOGLE_CLIENT_ID = "652242179888-u4q07le5pelpnfhjd6bgvf135kbhcm3f.apps.googleusercontent.com";

function inicializarLoginGoogle() {
    if (!window.google?.accounts?.id) {
        console.error("A biblioteca de login do Google não carregou.");
        return;
    }

    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: receberCredencialGoogle
    });

    google.accounts.id.renderButton(
        document.getElementById("googleLogin"),
        {
            type: "standard",
            theme: "filled_black",
            size: "large",
            text: "continue_with",
            shape: "rectangular",
            width: 260,
            locale: "pt-BR"
        }
    );
}


async function receberCredencialGoogle(resposta) {
    try {
        const respostaApi = await fetch(
            "https://localhost:7229/api/auth/google",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    credential: resposta.credential
                })
            }
        );

        if (!respostaApi.ok) {
            throw new Error("A API não aceitou a credencial.");
        }

        const usuario = await respostaApi.json();

        console.log("Login realizado com sucesso!");

        mostrarModalLogin(
            "Bem-vindo ao Astraelion!",
            `Sua jornada começa agora, ${usuario.nome}.`,
            "bi-stars",
            () => {
                window.location.href = "/index.html";
            }
        );

    } catch (erro) {
        console.error("Erro no login Google:", erro);

        mostrarModalLogin(
            "Não foi possível entrar",
            "Ocorreu um erro ao validar sua conta. Tente novamente.",
            "bi-exclamation-circle"
        );
    }
}


window.addEventListener("load", () => {
    if (window.google?.accounts?.id) {
        inicializarLoginGoogle();
    } else {
        const scriptGoogle = document.querySelector(
            'script[src="https://accounts.google.com/gsi/client"]'
        );

        if (scriptGoogle) {
            scriptGoogle.addEventListener(
                "load",
                inicializarLoginGoogle,
                { once: true }
            );
        }
    }
});
