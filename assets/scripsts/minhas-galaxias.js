var MenuItem = document.querySelectorAll('aside a');

function selectLink() {
    MenuItem.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
}

MenuItem.forEach((item) => item.addEventListener('click', selectLink));

const INICIAR_RECOLHIDO = false;

document.addEventListener("DOMContentLoaded", () => {
    const btnExpandir = document.querySelector('.btn-menu');
    const aside = document.querySelector('aside');
    const mainContent = document.querySelector('main') || document.querySelector('.fendas-container');

    if (btnExpandir && aside) {
        if (INICIAR_RECOLHIDO) {
            aside.classList.add('recolhido');
            if (mainContent) mainContent.classList.add('recolhido');
        }

        btnExpandir.addEventListener('click', () => {
            aside.classList.toggle('recolhido');
            if (mainContent) mainContent.classList.toggle('recolhido');
        });
    }

    // ==========================================
    // SISTEMA DE GERENCIAMENTO DE GALÁXIAS & UI
    // ==========================================

    const modalCriar = document.getElementById("modalCriarPlaylist");
    const modalEditar = document.getElementById("modalEditarPlaylist");
    const modalAdicionarVideos = document.getElementById("modalAdicionarVideos");
    const popoverMenu = document.getElementById("menuOpcoesPopover");

    const btnAbrirModal = document.querySelector(".btn-criar-galaxia");
    const btnFecharCriar = document.getElementById("btnFecharModalPlaylist");
    const btnCancelarCriar = document.getElementById("btnCancelarModalPlaylist");
    const formCriar = document.getElementById("formCriarPlaylist");

    const btnFecharEditar = document.getElementById("btnFecharModalEditar");
    const btnCancelarEditar = document.getElementById("btnCancelarModalEditar");
    const formEditar = document.getElementById("formEditarPlaylist");

    const btnFecharAdicionar = document.getElementById("btnFecharModalAdicionar");
    const btnConcluirAdicao = document.getElementById("btnConcluirAdicao");

    const opcaoEditar = document.getElementById("opcaoMenuEditar");
    const opcaoAdicionar = document.getElementById("opcaoMenuAdicionar");

    const gradeGalaxias = document.getElementById("gradeGalaxias");

    let galaxiaSelecionadaId = null;
    let botaoAtivo = null;

    // Gerenciador de Dados (LocalStorage)
    const AstraelionPlaylistsManager = {
        obterTodas: function () {
            return JSON.parse(localStorage.getItem("astraelion_playlists") || "[]");
        },
        salvarTodas: function (playlists) {
            localStorage.setItem("astraelion_playlists", JSON.stringify(playlists));
        },
        criar: function (nome, descricao, visibilidade) {
            const playlists = this.obterTodas();
            const novaPlaylist = {
                id: "galaxia_" + Date.now(),
                nome: nome,
                descricao: descricao || "",
                visibilidade: visibilidade || "publica",
                videos: []
            };
            playlists.push(novaPlaylist);
            this.salvarTodas(playlists);
            return novaPlaylist;
        },
        editar: function (playlistId, novoNome, novaDescricao, novaVisibilidade) {
            const playlists = this.obterTodas();
            const playlist = playlists.find(p => p.id === playlistId);
            if (playlist) {
                playlist.nome = novoNome;
                playlist.descricao = novaDescricao;
                playlist.visibilidade = novaVisibilidade;
                this.salvarTodas(playlists);
                return true;
            }
            return false;
        },
        adicionarVideo: function (playlistId, dadosVideo) {
            const playlists = this.obterTodas();
            const playlist = playlists.find(p => p.id === playlistId);
            if (playlist) {
                const jaExiste = playlist.videos.some(v => v.id === dadosVideo.id);
                if (!jaExiste) {
                    playlist.videos.push(dadosVideo);
                    this.salvarTodas(playlists);
                    return true;
                }
            }
            return false;
        }
    };

    // --- CONTROLE DE MODAIS ---
    if (btnAbrirModal) btnAbrirModal.addEventListener("click", () => modalCriar?.classList.add("ativo"));
    if (btnFecharCriar) btnFecharCriar.addEventListener("click", () => modalCriar?.classList.remove("ativo"));
    if (btnCancelarCriar) btnCancelarCriar.addEventListener("click", () => modalCriar?.classList.remove("ativo"));

    if (btnFecharEditar) btnFecharEditar.addEventListener("click", () => modalEditar?.classList.remove("ativo"));
    if (btnCancelarEditar) btnCancelarEditar.addEventListener("click", () => modalEditar?.classList.remove("ativo"));

    if (btnFecharAdicionar) btnFecharAdicionar.addEventListener("click", () => modalAdicionarVideos?.classList.remove("ativo"));
    if (btnConcluirAdicao) btnConcluirAdicao.addEventListener("click", () => modalAdicionarVideos?.classList.remove("ativo"));

    // --- SISTEMA DE POPOVER FIXO ALINHADO AO BOTÃO ---
    document.addEventListener('click', function(event) {
        const botaoClicado = event.target.closest('.btn-opcoes-galaxia');

        if (botaoClicado) {
            event.stopPropagation();
            const card = botaoClicado.closest(".card-galaxia");
            if (!card) return;

            const novoId = card.id;

            if (botaoAtivo === botaoClicado && popoverMenu.style.display === 'block') {
                popoverMenu.style.display = 'none';
                popoverMenu.hidden = true;
                botaoAtivo = null;
                galaxiaSelecionadaId = null;
                return;
            }

            botaoAtivo = botaoClicado;
            galaxiaSelecionadaId = novoId;

            // Garante que o menu está solto no body para flutuar sem cortes
            if (popoverMenu.parentElement !== document.body) {
                document.body.appendChild(popoverMenu);
            }

            const rect = botaoClicado.getBoundingClientRect();
            
            const larguraMenu = 190; 
            const alturaMenu = 100;  
            
            // Posicionamento fixo logo abaixo do botão de 3 pontos
            let topPos = rect.bottom + 6; 
            if (topPos + alturaMenu > window.innerHeight) {
                topPos = rect.top - alturaMenu - 6;
            }

            // Alinha a parte direita do menu com a parte direita do botão
            let leftPos = rect.right - larguraMenu;

            if (leftPos < 10) {
                leftPos = rect.left;
            }

            if (leftPos + larguraMenu > window.innerWidth - 10) {
                leftPos = window.innerWidth - larguraMenu - 10;
            }

            popoverMenu.style.position = 'fixed';
            popoverMenu.style.top = `${topPos}px`;
            popoverMenu.style.left = `${leftPos}px`;
            popoverMenu.style.display = 'flex';
            popoverMenu.hidden = false;

        } else {
            if (popoverMenu && !popoverMenu.contains(event.target)) {
                popoverMenu.style.display = 'none';
                popoverMenu.hidden = true;
                botaoAtivo = null;
                galaxiaSelecionadaId = null;
            }
        }
    });

    // --- FECHAR POPOVER AUTOMATICAMENTE AO ROLAR A PÁGINA ---
    window.addEventListener('scroll', () => {
        if (popoverMenu && !popoverMenu.hidden && popoverMenu.style.display !== 'none') {
            popoverMenu.style.display = 'none';
            popoverMenu.hidden = true;
            botaoAtivo = null;
            galaxiaSelecionadaId = null;
        }
    }, { passive: true });

    // --- RENDERIZAR GALÁXIAS DINÂMICAS ---
    function renderizarGalaxiasDinamicas() {
        const playlistsSalvas = AstraelionPlaylistsManager.obterTodas();

        playlistsSalvas.forEach(galaxia => {
            let card = document.getElementById(galaxia.id);

            if (card) {
                const titulo = card.querySelector("h3 a");
                const status = card.querySelector(".status-galaxia");
                const quantidade = card.querySelector(".quantidade-videos");

                if (titulo) titulo.textContent = galaxia.nome;

                card.setAttribute("data-titulo", galaxia.nome);
                card.setAttribute("data-tipo", galaxia.visibilidade === "privada" ? "privadas" : "criadas");

                if (status) {
                    const privada = galaxia.visibilidade === "privada";
                    status.className = privada ? "status-galaxia privada" : "status-galaxia";
                    status.innerHTML = privada ? '<i class="bi bi-lock-fill"></i> Privada' : '<i class="bi bi-globe2"></i> Pública';
                }

                if (quantidade) {
                    quantidade.innerHTML = `<i class="bi bi-play-fill"></i> ${galaxia.videos.length} vídeos`;
                }
                return;
            }

            card = document.createElement("article");
            card.className = "card-galaxia";
            card.id = galaxia.id;
            card.setAttribute("data-tipo", galaxia.visibilidade === "privada" ? "privadas" : "criadas");
            card.setAttribute("data-titulo", galaxia.nome);

            const iconeVisibilidade = galaxia.visibilidade === "privada"
                ? '<span class="status-galaxia privada"><i class="bi bi-lock-fill"></i> Privada</span>'
                : '<span class="status-galaxia"><i class="bi bi-globe2"></i> Pública</span>';

            card.innerHTML = `
                <a href="/assets/paginas-segundarias/galaxias.html" class="capa-galaxia">
                    <img src="/assets/img/gl2.jpg" alt="${galaxia.nome}">
                    <span class="quantidade-videos">
                        <i class="bi bi-play-fill"></i> ${galaxia.videos.length} vídeos
                    </span>
                </a>
                <div class="informacoes-galaxia">
                    <div class="detalhes-galaxia">
                        <h3>
                            <a href="/assets/paginas-segundarias/galaxias.html">${galaxia.nome}</a>
                        </h3>
                        <p>Criada por você</p>
                        ${iconeVisibilidade}
                    </div>
                    <button class="btn-opcoes-galaxia" type="button" aria-label="Opções da galáxia">
                        <i class="bi bi-three-dots-vertical"></i>
                    </button>
                </div>
            `;

            if (gradeGalaxias) {
                gradeGalaxias.prepend(card);
            }
        });
    }

    // --- AÇÕES DO POPOVER (EDITAR / ADICIONAR) ---
    if (opcaoEditar) {
        opcaoEditar.addEventListener("click", (e) => {
            e.stopPropagation();
            if (popoverMenu) {
                popoverMenu.style.display = "none";
                popoverMenu.hidden = true;
            }
            botaoAtivo = null;

            if (!galaxiaSelecionadaId || !modalEditar) return;

            let galaxias = AstraelionPlaylistsManager.obterTodas();
            let galaxia = galaxias.find(g => g.id === galaxiaSelecionadaId);

            if (!galaxia) {
                const cardEl = document.getElementById(galaxiaSelecionadaId);
                const nomeEl = cardEl?.querySelector("h3 a");
                galaxia = {
                    id: galaxiaSelecionadaId,
                    nome: nomeEl ? nomeEl.textContent.trim() : "Galáxia",
                    descricao: "",
                    visibilidade: "publica",
                    videos: []
                };
            }

            document.getElementById("editarPlaylistId").value = galaxia.id;
            document.getElementById("editarNomePlaylist").value = galaxia.nome;
            document.getElementById("editarDescricaoPlaylist").value = galaxia.descricao || "";
            document.getElementById("editarVisibilidadePlaylist").value = galaxia.visibilidade || "publica";

            modalEditar.classList.add("ativo");
        });
    }

    if (opcaoAdicionar) {
        opcaoAdicionar.addEventListener("click", (e) => {
            e.stopPropagation();
            if (popoverMenu) {
                popoverMenu.style.display = "none";
                popoverMenu.hidden = true;
            }
            botaoAtivo = null;

            if (modalAdicionarVideos) {
                document.querySelectorAll(".aba-btn").forEach(b => b.classList.remove("ativa"));
                document.querySelector('.aba-btn[data-aba="meusVideos"]')?.classList.add("ativa");
                document.getElementById("painelMeusVideos")?.classList.add("ativa");
                document.getElementById("painelGeralVideos")?.classList.remove("ativa");

                carregarListasDeVideosParaAdicao();
                modalAdicionarVideos.classList.add("ativo");
            }
        });
    }

    // --- SUBMISSÕES DE FORMULÁRIOS ---
    if (formCriar) {
        formCriar.addEventListener("submit", (e) => {
            e.preventDefault();
            const nome = document.getElementById("nomePlaylist").value.trim();
            const descricao = document.getElementById("descricaoPlaylist").value.trim();
            const visibilidade = document.getElementById("visibilidadePlaylist").value;

            if (nome) {
                AstraelionPlaylistsManager.criar(nome, descricao, visibilidade);
                formCriar.reset();
                modalCriar?.classList.remove("ativo");
                renderizarGalaxiasDinamicas();
            }
        });
    }

    if (formEditar) {
        formEditar.addEventListener("submit", (e) => {
            e.preventDefault();
            const id = document.getElementById("editarPlaylistId").value;
            const nome = document.getElementById("editarNomePlaylist").value.trim();
            const descricao = document.getElementById("editarDescricaoPlaylist").value.trim();
            const visibilidade = document.getElementById("editarVisibilidadePlaylist").value;

            if (!id || !nome) return;

            let playlists = AstraelionPlaylistsManager.obterTodas();
            let existe = playlists.some(p => p.id === id);

            if (!existe) {
                playlists.push({
                    id: id,
                    nome: nome,
                    descricao: descricao,
                    visibilidade: visibilidade,
                    videos: []
                });
                AstraelionPlaylistsManager.salvarTodas(playlists);
            } else {
                AstraelionPlaylistsManager.editar(id, nome, descricao, visibilidade);
            }

            formEditar.reset();
            modalEditar.classList.remove("ativo");
            renderizarGalaxiasDinamicas();
            galaxiaSelecionadaId = null;
        });
    }

    // --- CONTROLE DE ABAS DO MODAL DE ADICIONAR VÍDEOS ---
    const abasBtns = document.querySelectorAll(".aba-btn");
    abasBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            abasBtns.forEach(b => b.classList.remove("ativa"));
            btn.classList.add("ativa");

            const alvoAba = btn.getAttribute("data-aba");
            const painelMeus = document.getElementById("painelMeusVideos");
            const painelGeral = document.getElementById("painelGeralVideos");

            if (painelMeus && painelGeral) {
                if (alvoAba === "meusVideos") {
                    painelMeus.classList.add("ativa");
                    painelGeral.classList.remove("ativa");
                } else {
                    painelGeral.classList.add("ativa");
                    painelMeus.classList.remove("ativa");
                }
            }
        });
    });

    // --- CARREGAR VÍDEOS PARA ADIÇÃO COM PESQUISA ---
    const meusVideosExemplo = [
        { id: "v1", titulo: "Explorando o Cosmos de Astraelion", thumb: "/assets/img/thumb2.jpg", link: "v1" },
        { id: "v2", titulo: "Criando Interfaces Web Cósmicas", thumb: "/assets/img/thumb3.jpg", link: "v2" },
        { id: "v5", titulo: "Arquitetura Avançada de Sistemas WMS", thumb: "/assets/img/thumb4.jpg", link: "v5" }
    ];

    const videosGeraisPublicosExemplo = [
        { id: "v3", titulo: "A História por trás das Fendas", thumb: "/assets/img/fenda1.jpg", link: "v3" },
        { id: "v4", titulo: "Guia de Sobrevivência Espacial", thumb: "/assets/img/gl2.jpg", link: "v4" },
        { id: "v6", titulo: "Segredos do Universo Paralelo", thumb: "/assets/img/thumb1.jpg", link: "v6" }
    ];

    function carregarListasDeVideosParaAdicao(filtro = "") {
        const containerMeus = document.getElementById("listaMeusVideosContainer");
        const containerGeral = document.getElementById("listaGeralVideosContainer");
        const termo = filtro.toLowerCase().trim();

        const meusFiltrados = meusVideosExemplo.filter(v => 
            v.titulo.toLowerCase().includes(termo) || v.link.toLowerCase().includes(termo) || v.id.toLowerCase().includes(termo)
        );

        const geraisFiltrados = videosGeraisPublicosExemplo.filter(v => 
            v.titulo.toLowerCase().includes(termo) || v.link.toLowerCase().includes(termo) || v.id.toLowerCase().includes(termo)
        );

        if (containerMeus) {
            containerMeus.innerHTML = meusFiltrados.length ? "" : '<p class="vazio-texto">Nenhum vídeo encontrado.</p>';
            meusFiltrados.forEach(vid => {
                containerMeus.innerHTML += `
                    <div class="item-video-selecao">
                        <div class="item-video-info-rapida">
                            <img src="${vid.thumb}" alt="">
                            <h4>${vid.titulo}</h4>
                        </div>
                        <button type="button" class="btn-adicionar-individual" onclick="adicionarVideoNaGalaxiaAtual('${vid.id}', '${vid.titulo.replace(/'/g, "\\'")}', '${vid.thumb}', this)">Adicionar</button>
                    </div>
                `;
            });
        }

        if (containerGeral) {
            containerGeral.innerHTML = geraisFiltrados.length ? "" : '<p class="vazio-texto">Nenhum vídeo encontrado.</p>';
            geraisFiltrados.forEach(vid => {
                containerGeral.innerHTML += `
                    <div class="item-video-selecao">
                        <div class="item-video-info-rapida">
                            <img src="${vid.thumb}" alt="">
                            <h4>${vid.titulo}</h4>
                        </div>
                        <button type="button" class="btn-adicionar-individual" onclick="adicionarVideoNaGalaxiaAtual('${vid.id}', '${vid.titulo.replace(/'/g, "\\'")}', '${vid.thumb}', this)">Adicionar</button>
                    </div>
                `;
            });
        }
    }

    const inputPesquisaModal = document.getElementById("inputPesquisaVideoModal");
    if (inputPesquisaModal) {
        inputPesquisaModal.addEventListener("input", (e) => {
            carregarListasDeVideosParaAdicao(e.target.value);
        });
    }

    window.adicionarVideoNaGalaxiaAtual = function (idVid, tituloVid, thumbVid, botaoEl) {
        if (!galaxiaSelecionadaId) return;

        let playlists = AstraelionPlaylistsManager.obterTodas();
        let playlist = playlists.find(p => p.id === galaxiaSelecionadaId);
        if (!playlist) {
            const cardEl = document.getElementById(galaxiaSelecionadaId);
            const nomeEl = cardEl?.querySelector("h3 a");
            playlist = {
                id: galaxiaSelecionadaId,
                nome: nomeEl ? nomeEl.textContent.trim() : "Galáxia",
                descricao: "",
                visibilidade: "publica",
                videos: []
            };
            playlists.push(playlist);
            AstraelionPlaylistsManager.salvarTodas(playlists);
        }

        AstraelionPlaylistsManager.adicionarVideo(galaxiaSelecionadaId, { id: idVid, titulo: tituloVid, thumb: thumbVid });

        botaoEl.textContent = "Adicionado!";
        botaoEl.classList.add("adicionado");
        setTimeout(() => {
            botaoEl.textContent = "Adicionar";
            botaoEl.classList.remove("adicionado");
        }, 1500);

        renderizarGalaxiasDinamicas();
    };

    // Inicialização
    renderizarGalaxiasDinamicas();
});


/* ========================================
   PESQUISA EXPANSÍVEL — CELULARES
======================================== */
const pesquisa = document.querySelector('.pesquisa');
const inputPesquisa = document.querySelector('#inputPesquisa');
const btnBuscar = document.querySelector('.pesquisa .buscar');
const btnFecharPesquisa = document.querySelector('.fechar-pesquisa');

if (pesquisa && inputPesquisa && btnBuscar && btnFecharPesquisa) {
    function abrirPesquisa() {
        if (window.innerWidth > 768) return;
        pesquisa.classList.add('ativa');
        inputPesquisa.focus();
    }

    function fecharPesquisa() {
        pesquisa.classList.remove('ativa');
        inputPesquisa.value = '';
        inputPesquisa.blur();
    }

    btnBuscar.addEventListener('click', () => {
        if (window.innerWidth <= 768 && !pesquisa.classList.contains('ativa')) {
            abrirPesquisa();
            return;
        }
        if (inputPesquisa.value.trim()) {
            inputPesquisa.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
            );
        }
    });

    btnFecharPesquisa.addEventListener('click', fecharPesquisa);

    inputPesquisa.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') fecharPesquisa();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) pesquisa.classList.remove('ativa');
    });
}