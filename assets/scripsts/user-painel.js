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
        alt="Avatar da conta"
        class="avatar-painel-usuario"
    >

    <div class="info-painel-usuario">
        <strong class="nome-painel-usuario">
            Visitante
        </strong>

        <span class="arroba-painel-usuario">
            Entre na sua conta
        </span>

        <span class="status-painel-usuario">
            Não conectado
        </span>
    </div>
</div>

        <!-- ================================= -->
        <!-- LISTA PRINCIPAL -->
        <!-- ================================= -->
        <div class="lista-painel-usuario">

            <!-- PERFIL / CRIAR CANAL -->
<a
    href="#"
    class="item-painel-usuario"
    id="btnPerfilCanal"
>

    <i class="bi bi-person-circle icone-item-usuario"></i>

    <div class="info-item-usuario">
        <strong id="tituloPerfilCanal">Criar canal</strong>
        <span id="descricaoPerfilCanal">
            Tenha seu próprio espaço no Astraelion
        </span>
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
    <button
        class="btn-conta-usuario"
        id="btnContaUsuario"
        type="button"
    >
        <i class="bi bi-box-arrow-in-right" id="iconeContaUsuario"></i>
        <span id="textoContaUsuario">Entrar</span>
    </button>
</div>
    `;

    document.body.appendChild(painel);

    /* ========================================= */
    /* MODAL DE CRIAÇÃO DE CANAL                 */
    /* ========================================= */

    const modalCriarCanal = document.createElement('div');
    modalCriarCanal.classList.add('modal-criar-canal');
    modalCriarCanal.id = 'modalCriarCanal';
    modalCriarCanal.hidden = true;
    modalCriarCanal.innerHTML = `
    <div class="conteudo-modal-canal">

        <div class="cabecalho-modal-canal">
            <div>
                <h2>Criar seu canal</h2>
                <p>Crie seu próprio espaço no Astraelion.</p>
            </div>

            <button
                type="button"
                class="fechar-modal-canal"
                id="fecharModalCanal"
                aria-label="Fechar"
            >
                <i class="bi bi-x-lg"></i>
            </button>
        </div>

        <form id="formCriarCanal">

            <div class="campo-modal-canal">
                <label for="nomeCanal">Nome do canal</label>
                <input
                    type="text"
                    id="nomeCanal"
                    name="nome"
                    placeholder="Como seu canal será chamado?"
                    maxlength="150"
                    required
                >
            </div>

            <div class="campo-modal-canal">
                <label for="arrobaCanal">Identificador do canal</label>
                <div class="campo-arroba-canal">
                    <span>@</span>
                    <input
                        type="text"
                        id="arrobaCanal"
                        name="arroba"
                        placeholder="seucanal"
                        minlength="3"
                        maxlength="50"
                        required
                    >
                </div>
                <small>Use letras, números, pontos ou underline.</small>
            </div>

            <div class="campo-modal-canal">
                <label for="descricaoCanal">Descrição</label>
                <textarea
                    id="descricaoCanal"
                    name="descricao"
                    placeholder="Conte um pouco sobre seu canal..."
                    maxlength="1000"
                    rows="4"
                ></textarea>
            </div>

            <button type="submit" class="btn-criar-canal">
                Criar canal
            </button>

        </form>
    </div>
`;

    document.body.appendChild(modalCriarCanal);

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
    /* SESSÃO E ESTADO DA CONTA                  */
    /* ========================================= */

    const avatarUsuario = painel.querySelector('.avatar-painel-usuario');
    const nomeUsuario = painel.querySelector('.nome-painel-usuario');
    const arrobaUsuario = painel.querySelector('.arroba-painel-usuario');
    const statusUsuario = painel.querySelector('.status-painel-usuario');

    const btnPerfilCanal = painel.querySelector('#btnPerfilCanal');

    /* ========================================= */
    /* CONTROLE DO MODAL DE CRIAÇÃO DE CANAL     */
    /* ========================================= */

    const fecharModalCanal = modalCriarCanal.querySelector(
        '#fecharModalCanal'
    );

    function abrirModalCriarCanal() {
    painel.classList.remove('aberto');

    modalCriarCanal.hidden = false;
    modalCriarCanal.classList.add('aberto');

    document.body.classList.add('modal-canal-aberto');
}

    function fecharModalCriarCanal() {
    modalCriarCanal.classList.remove('aberto');
    modalCriarCanal.hidden = true;

    document.body.classList.remove('modal-canal-aberto');
}

    
btnPerfilCanal.addEventListener('click', async (evento) => {
    evento.preventDefault();
    evento.stopPropagation();

    // Confirma a sessão e verifica se já existe um canal.
    const usuario = await window.verificarSessao();

    if (!usuario) {
        return;
    }

    // Se já possui canal, permite acessar o perfil.
    if (usuario.canal) {
        window.location.href =
            '/assets/paginas-segundarias/canal-criador-perfil.html';
        return;
    }

    // Se não possui canal, abre o modal.
    abrirModalCriarCanal();
});


    fecharModalCanal.addEventListener('click', fecharModalCriarCanal);

    modalCriarCanal.addEventListener('click', (evento) => {
        if (evento.target === modalCriarCanal) {
            fecharModalCriarCanal();
        }
    });

    /* ========================================= */
    /* CRIAÇÃO DO CANAL — INTEGRAÇÃO COM API     */
    /* ========================================= */

    const formCriarCanal = modalCriarCanal.querySelector('#formCriarCanal');

    formCriarCanal.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const nome = formCriarCanal.querySelector('#nomeCanal').value.trim();
        const arroba = formCriarCanal.querySelector('#arrobaCanal').value.trim();
        const descricao = formCriarCanal.querySelector('#descricaoCanal').value.trim();

        const botaoEnviar = formCriarCanal.querySelector('.btn-criar-canal');

        if (!window.usuarioLogado) {
            alert('Sua sessão não foi identificada. Entre novamente na sua conta.');
            return;
        }

        botaoEnviar.disabled = true;
        botaoEnviar.textContent = 'Criando canal...';

        try {
            const resposta = await fetch('https://localhost:7229/api/canais', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome,
                    arroba: arroba,
                    descricao: descricao
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.mensagem || 'Não foi possível criar o canal.'
                );
            }

            alert('Canal criado com sucesso!');

            fecharModalCriarCanal();

            // Atualiza os dados da sessão e do canal.
            await atualizarPainelUsuario();

            formCriarCanal.reset();

        } catch (erro) {
            console.error('Erro ao criar canal:', erro);
            alert(erro.message);

        } finally {
            botaoEnviar.disabled = false;
            botaoEnviar.textContent = 'Criar canal';
        }
    });

    const tituloPerfilCanal = painel.querySelector('#tituloPerfilCanal');
    const descricaoPerfilCanal = painel.querySelector('#descricaoPerfilCanal');

    const btnConta = painel.querySelector('#btnContaUsuario');
    const textoConta = painel.querySelector('#textoContaUsuario');
    const iconeConta = painel.querySelector('#iconeContaUsuario');

    // Item de gerenciamento da conta.
    const itemConta = painel.querySelector(
        'a[href="/assets/paginas-segundarias/configuracoes.html"]'
    );

    
// Atualiza o painel conforme a sessão.
async function atualizarPainelUsuario() {

    let usuario = null;

    try {
        usuario = await window.verificarSessao();
    } catch (erro) {
        console.error('Erro ao consultar usuário:', erro);
    }

    // ESTADO: VISITANTE
    if (!usuario) {

        atualizarFotoNavegacao(null);

        avatarUsuario.src = '/assets/img/logo.ico';
        avatarUsuario.alt = 'Visitante';

        nomeUsuario.textContent = 'Visitante';
        arrobaUsuario.textContent = 'Entre na sua conta';
        statusUsuario.textContent = 'Não conectado';

        btnPerfilCanal.style.display = 'none';

        if (itemConta) {
            itemConta.style.display = 'none';
        }

        textoConta.textContent = 'Entrar';
        iconeConta.className = 'bi bi-box-arrow-in-right';

        return;
    }

    // ESTADO: USUÁRIO CONECTADO
    atualizarFotoNavegacao(usuario);

    const temCanal = !!usuario.canal;

    // Define a identidade exibida no painel
    const fotoPerfil = usuario.canal?.foto || usuario.foto;
    const nomePerfil = usuario.canal?.nome || usuario.nome;

    avatarUsuario.src = normalizarUrlImagem(fotoPerfil);
    avatarUsuario.alt = `Foto de ${nomePerfil || 'Usuário'}`;

    nomeUsuario.textContent = nomePerfil || 'Usuário';

    // Define o identificador exibido
    if (temCanal && usuario.canal.arroba) {

        const arroba = usuario.canal.arroba;

        arrobaUsuario.textContent = arroba.startsWith('@')
            ? arroba
            : `@${arroba}`;

    } else {

        const arroba = (usuario.nome || 'usuario')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '');

        arrobaUsuario.textContent = `@${arroba}`;
    }

    // Define o status
    statusUsuario.textContent = temCanal
        ? 'Canal conectado'
        : 'Conta conectada';

    // Define o destino e o conteúdo do botão de perfil
    btnPerfilCanal.href = temCanal
    ? '/assets/paginas-segundarias/canal-criador-perfil.html'
    : '/assets/paginas-segundarias/criar-canal.html';

    tituloPerfilCanal.textContent = temCanal
        ? 'Meu perfil'
        : 'Criar canal';

    descricaoPerfilCanal.textContent = temCanal
        ? 'Acesse seu canal no Astraelion'
        : 'Tenha seu próprio espaço no Astraelion';

    btnPerfilCanal.style.display = 'flex';

    // Opção de conta
    if (itemConta) {
        itemConta.style.display = 'flex';
    }

    textoConta.textContent = 'Sair';
    iconeConta.className = 'bi bi-box-arrow-right';
}

    // Verifica a sessão e configura o botão de conta.
    atualizarPainelUsuario();

    // Ação do botão Entrar / Sair.
    btnConta.addEventListener('click', async () => {

        const usuario = window.usuarioLogado;

        // VISITANTE: encaminha para o login.
        if (!usuario) {
            window.location.href =
                './assets/paginas-segundarias/login.html';

            return;
        }

        // USUÁRIO CONECTADO: encerra a sessão.
        try {
            const resposta = await fetch(
                'https://localhost:7229/api/auth/logout',
                {
                    method: 'POST',
                    credentials: 'include'
                }
            );

            if (!resposta.ok) {
                throw new Error('Não foi possível encerrar a sessão.');
            }

            window.usuarioLogado = null;

            await atualizarPainelUsuario();

            window.location.href = '/index.html';

        } catch (erro) {
            console.error('Erro ao sair da conta:', erro);
            alert('Não foi possível encerrar sua sessão. Tente novamente.');
        }
    });

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
        if (evento.altKey && tecla === 'c') { evento.preventDefault(); navegar('/assets/paginas-segundarias/canal-criador-perfil.html'); }

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

const API_BASE = 'https://localhost:7229';

function normalizarUrlImagem(caminho) {
    if (!caminho) {
        return '/assets/img/logo.ico';
    }

    // Se já for uma URL absoluta, mantém o endereço.
    if (caminho.startsWith('http://') || caminho.startsWith('https://')) {
        return caminho;
    }

    // Se for um caminho da API, adiciona o endereço do servidor.
    return `${API_BASE}${caminho.startsWith('/') ? '' : '/'}${caminho}`;
}

function atualizarFotoNavegacao(usuario) {
    const botoesPerfil = document.querySelectorAll(
        '.btn-user-painel, .item-perfil-mobile'
    );

    botoesPerfil.forEach(botao => {
        let imagem = botao.querySelector('.foto-nav-usuario');
        let icone = botao.querySelector('i');

        // Visitante: volta ao ícone padrão
        if (!usuario) {
            if (imagem) imagem.remove();

            if (icone) {
                icone.style.display = '';
            }

            return;
        }

        // Foto do canal tem prioridade; sem canal, usa a conta Google
        const foto = usuario.canal?.foto || usuario.foto;

        if (!foto) return;

        if (!imagem) {
            imagem = document.createElement('img');
            imagem.className = 'foto-nav-usuario';
            imagem.alt = 'Perfil';
            botao.appendChild(imagem);
        }

        imagem.src = normalizarUrlImagem(foto);

        if (icone) {
            icone.style.display = 'none';
        }
    });
}