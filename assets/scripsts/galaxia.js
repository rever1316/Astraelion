document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. MENU LATERAL (TOGGLE / RECOLHER)
    ========================================================= */
    const btnMenu = document.querySelector('.btn-menu');
    const asideMenu = document.querySelector('aside.menu-lateral');
    const galaxiaContainer = document.querySelector('.galaxia-container');

    if (btnMenu && asideMenu) {
        btnMenu.addEventListener('click', () => {
            asideMenu.classList.toggle('recolhido');
            if (galaxiaContainer) {
                galaxiaContainer.classList.toggle('recolhido');
            }
        });
    }

    /* =========================================================
       2. BOX DE OPÇÕES DOS 3 PONTOS (POPOVER GALÁXIA)
    ========================================================= */
    const btnOpcoesTopo = document.querySelector('.btn-opcoes-topo');
    const menuOpcoesPopover = document.getElementById('menuOpcoesPopover');

    if (btnOpcoesTopo && menuOpcoesPopover) {
        // Clique no botão de 3 pontos para abrir/fechar o box
        btnOpcoesTopo.addEventListener('click', (e) => {
            e.stopPropagation();
            menuOpcoesPopover.hidden = !menuOpcoesPopover.hidden;
        });

        // Clique fora do menu fecha o box
        window.addEventListener('click', (e) => {
            if (!menuOpcoesPopover.contains(e.target) && !btnOpcoesTopo.contains(e.target)) {
                menuOpcoesPopover.hidden = true;
            }
        });
    }

    /* =========================================================
       3. MODAIS (EDITAR E ADICIONAR VÍDEOS)
    ========================================================= */
    const modalEditar = document.getElementById('modalEditarPlaylist');
    const modalAdicionar = document.getElementById('modalAdicionarVideos');

    const opcaoEditar = document.getElementById('opcaoMenuEditar');
    const opcaoAdicionar = document.getElementById('opcaoMenuAdicionar');

    const btnFecharEditar = document.getElementById('btnFecharModalEditar');
    const btnCancelarEditar = document.getElementById('btnCancelarModalEditar');

    const btnFecharAdicionar = document.getElementById('btnFecharModalAdicionar');
    const btnConcluirAdicao = document.getElementById('btnConcluirAdicao');

    const formEditar = document.getElementById('formEditarPlaylist');

    // --- ABRIR MODAL EDITAR ---
    if (opcaoEditar && modalEditar) {
        opcaoEditar.addEventListener('click', () => {
            if (menuOpcoesPopover) menuOpcoesPopover.hidden = true;

            // Preenche os campos do modal com os dados atuais da página
            const tituloAtual = document.querySelector('.identidade-galaxia h1')?.textContent.trim() || '';
            const descAtual = document.querySelector('.descricao-galaxia p')?.textContent.trim() || '';

            const inputNome = document.getElementById('editarNomePlaylist');
            const inputDesc = document.getElementById('editarDescricaoPlaylist');

            if (inputNome) inputNome.value = tituloAtual;
            if (inputDesc) inputDesc.value = descAtual;

            modalEditar.classList.add('ativo');
        });
    }

    // --- ABRIR MODAL ADICIONAR VÍDEOS ---
    if (opcaoAdicionar && modalAdicionar) {
        opcaoAdicionar.addEventListener('click', () => {
            if (menuOpcoesPopover) menuOpcoesPopover.hidden = true;
            modalAdicionar.classList.add('ativo');
        });
    }

    // --- FECHAR MODAIS (BOTÕES) ---
    function fecharModais() {
        if (modalEditar) modalEditar.classList.remove('ativo');
        if (modalAdicionar) modalAdicionar.classList.remove('ativo');
    }

    if (btnFecharEditar) btnFecharEditar.addEventListener('click', fecharModais);
    if (btnCancelarEditar) btnCancelarEditar.addEventListener('click', fecharModais);
    if (btnFecharAdicionar) btnFecharAdicionar.addEventListener('click', fecharModais);
    if (btnConcluirAdicao) btnConcluirAdicao.addEventListener('click', fecharModais);

    // --- FECHAR MODAL CLICANDO NO FUNDO (FORA) ---
    window.addEventListener('click', (e) => {
        if (e.target === modalEditar || e.target === modalAdicionar) {
            fecharModais();
        }
    });

    // --- SALVAR ALTERAÇÕES DA GALÁXIA ---
    if (formEditar) {
        formEditar.addEventListener('submit', (e) => {
            e.preventDefault();

            const novoNome = document.getElementById('editarNomePlaylist')?.value.trim();
            const novaDesc = document.getElementById('editarDescricaoPlaylist')?.value.trim();

            if (novoNome) {
                const h1 = document.querySelector('.identidade-galaxia h1');
                const p = document.querySelector('.descricao-galaxia p');

                if (h1) h1.textContent = novoNome;
                if (p) p.textContent = novaDesc;

                fecharModais();
            }
        });
    }

    /* =========================================================
       4. BOTÃO "VER MAIS" DA LISTA DE VÍDEOS
    ========================================================= */
    const episodiosGalaxia = document.querySelectorAll('.video-galaxia');
    const btnVerMaisGalaxia = document.getElementById('btnVerMaisGalaxia');

    const limiteInicial = 10;
    const quantidadePorClique = 10;
    let visiveis = limiteInicial;

    if (episodiosGalaxia.length > 0) {
        // Esconde os vídeos além do limite inicial
        episodiosGalaxia.forEach((ep, index) => {
            if (index >= limiteInicial) {
                ep.style.display = 'none';
            }
        });

        // Oculta o botão se a lista for menor ou igual ao limite
        if (episodiosGalaxia.length <= limiteInicial && btnVerMaisGalaxia) {
            btnVerMaisGalaxia.style.display = 'none';
        }

        if (btnVerMaisGalaxia) {
            btnVerMaisGalaxia.addEventListener('click', () => {
                const proximoLimite = visiveis + quantidadePorClique;

                episodiosGalaxia.forEach((ep, index) => {
                    if (index >= visiveis && index < proximoLimite) {
                        ep.style.display = window.innerWidth <= 768 ? 'block' : 'grid';
                    }
                });

                visiveis = proximoLimite;

                if (visiveis >= episodiosGalaxia.length) {
                    btnVerMaisGalaxia.style.display = 'none';
                }
            });
        }
    }
});