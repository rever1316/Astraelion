document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // =========================================================
    // 1. CONFIGURAÇÕES
    // =========================================================

    const API_BASE = "https://localhost:7229";
    const STORAGE_KEY = "astraelion_canal_criador";

    const CONFIG = {
        limiteImagem: 5 * 1024 * 1024,
        dimensaoMaxima: 1200,
        qualidadeImagem: 0.75,
        formatosPermitidos: ["image/jpeg", "image/png", "image/webp"]
    };

    const estado = {
        canal: null,
        novoAvatar: null,
        novaCapa: null,
        salvando: false
    };

    const elementosPagina = {
        botaoPersonalizar: document.getElementById("btnPersonalizarCanal"),
        nome: document.getElementById("nomeCanal"),
        arroba: document.getElementById("arrobaCanal"),
        descricao: document.getElementById("descricaoCanal"),
        avatar: document.getElementById("avatarCanal"),
        capa: document.querySelector(".capa-canal img")
    };

    if (!elementosPagina.botaoPersonalizar) {
        console.warn("Personalização: botão #btnPersonalizarCanal não encontrado.");
        return;
    }

    // =========================================================
    // 2. FUNÇÕES UTILITÁRIAS
    // =========================================================

    function normalizarUrlImagem(caminho) {
        if (!caminho || typeof caminho !== "string") return "";

        const valor = caminho.trim();
        if (!valor) return "";

        if (
            /^(https?:)?\/\//i.test(valor) ||
            valor.startsWith("data:") ||
            valor.startsWith("blob:")
        ) {
            return valor.startsWith("//")
                ? `${window.location.protocol}${valor}`
                : valor;
        }

        return `${API_BASE}${valor.startsWith("/") ? "" : "/"}${valor}`;
    }

    function obterDadosLocais() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch (erro) {
            console.warn("Não foi possível ler os dados locais do canal:", erro);
            return {};
        }
    }

    function salvarDadosLocais(dados) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
        } catch (erro) {
            console.warn("Não foi possível salvar os dados locais do canal:", erro);
        }
    }

    async function lerResposta(resposta) {
        const texto = await resposta.text();

        if (!texto) return {};

        try {
            return JSON.parse(texto);
        } catch (erro) {
            return { mensagem: texto };
        }
    }

    async function obterTokenCSRF() {
        const resposta = await fetch(`${API_BASE}/api/auth/csrf`, {
            method: "GET",
            credentials: "include"
        });

        const dados = await lerResposta(resposta);

        if (!resposta.ok || !dados.token) {
            throw new Error(
                dados.mensagem ||
                "Não foi possível obter o token de segurança (CSRF)."
            );
        }

        return dados.token;
    }

    async function requisicaoProtegida(url, opcoes = {}) {
        const token = await obterTokenCSRF();
        const headers = new Headers(opcoes.headers || {});

        headers.set("X-CSRF-TOKEN", token);

        return fetch(url, {
            ...opcoes,
            headers,
            credentials: "include"
        });
    }

    function definirImagem(elemento, caminho) {
        if (!elemento || !caminho) return;

        const url = normalizarUrlImagem(caminho);

        if (url) {
            elemento.src = url;
        }
    }

    function atualizarDadosVisuais(canal) {
        if (!canal) return;

        if (elementosPagina.nome && canal.nome) {
            elementosPagina.nome.textContent = canal.nome;
        }

        const arroba = canal.arroba || canal.usuario || canal.identificador;

        if (elementosPagina.arroba && arroba) {
            elementosPagina.arroba.textContent =
                arroba.startsWith("@") ? arroba : `@${arroba}`;
        }

        if (elementosPagina.descricao && canal.descricao !== undefined) {
            elementosPagina.descricao.textContent = canal.descricao || "";
        }

        if (canal.foto) {
            definirImagem(elementosPagina.avatar, canal.foto);
        }

        if (canal.capa) {
            definirImagem(elementosPagina.capa, canal.capa);
        }
    }

    // =========================================================
    // 3. ESTILOS DO MODAL
    // =========================================================

    function criarEstilos() {
        if (document.getElementById("estiloPersonalizacaoCanal")) return;

        const estilo = document.createElement("style");
        estilo.id = "estiloPersonalizacaoCanal";

        estilo.textContent = `
            .modal-personalizar-canal {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                background: rgba(5, 4, 12, .85);
                backdrop-filter: blur(8px);
            }

            .modal-personalizar-canal[hidden],
            .personalizar-avancado-conteudo[hidden] {
                display: none !important;
            }

            .personalizar-container {
                width: 100%;
                max-width: 650px;
                max-height: 90vh;
                overflow-y: auto;
                padding: 26px;
                border: 1px solid rgba(138, 77, 255, .4);
                border-radius: 18px;
                background: var(--cor-fundo-cartao, #130A24);
                color: var(--cor-texto-principal, #B8B8C8);
                box-shadow: 0 15px 50px rgba(0, 0, 0, .6);
            }

            .personalizar-cabecalho {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
                margin-bottom: 24px;
                padding-bottom: 16px;
                border-bottom: 1px solid var(--cor-divisor, #32205F);
            }

            .personalizar-cabecalho h2 {
                margin: 0;
                color: var(--cor-roxo-claro, #B06EFF);
                font-size: 21px;
            }

            .personalizar-fechar {
                border: 0;
                background: transparent;
                color: var(--cor-texto-principal, #fff);
                font-size: 28px;
                cursor: pointer;
            }

            .personalizar-form {
                display: flex;
                flex-direction: column;
                gap: 18px;
            }

            .personalizar-campo,
            .personalizar-imagem-item {
                display: flex;
                flex-direction: column;
                gap: 9px;
            }

            .personalizar-campo label,
            .personalizar-imagem-info strong {
                color: var(--cor-roxo-claro, #B06EFF);
                font-size: 13px;
            }

            .personalizar-campo input,
            .personalizar-campo textarea {
                width: 100%;
                padding: 12px;
                border: 1px solid rgba(138, 77, 255, .35);
                border-radius: 9px;
                outline: none;
                background: #090912;
                color: #fff;
                font: inherit;
            }

            .personalizar-campo input:focus,
            .personalizar-campo textarea:focus {
                border-color: var(--cor-roxo-principal, #8A4DFF);
            }

            .personalizar-campo textarea {
                min-height: 100px;
                resize: vertical;
            }

            .personalizar-imagens {
                display: flex;
                flex-direction: column;
                gap: 18px;
                padding: 18px 0;
                border-top: 1px solid var(--cor-divisor, #32205F);
                border-bottom: 1px solid var(--cor-divisor, #32205F);
            }

            .personalizar-imagens h3,
            .grupo-cores h3 {
                margin: 0;
                color: var(--cor-roxo-claro, #B06EFF);
                font-size: 15px;
            }

            .personalizar-imagem-item {
                padding: 15px;
                border: 1px solid rgba(138, 77, 255, .25);
                border-radius: 10px;
                background: rgba(9, 9, 18, .65);
            }

            .personalizar-imagem-info {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            .personalizar-imagem-info span {
                color: var(--cor-texto-suave, #81798F);
                font-size: 12px;
            }

            .personalizar-imagem-item input[type="file"] {
                width: 100%;
                font-size: 12px;
            }

            .personalizar-avatar-preview {
                width: 100px;
                height: 100px;
                overflow: hidden;
                border: 2px solid var(--cor-roxo-principal, #8A4DFF);
                border-radius: 50%;
                background: #090912;
            }

            .personalizar-avatar-preview img,
            .personalizar-capa-preview img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .personalizar-capa-preview {
                width: 100%;
                aspect-ratio: 16 / 5;
                overflow: hidden;
                border: 1px solid rgba(138, 77, 255, .4);
                border-radius: 9px;
                background: #090912;
            }

            .personalizar-avancado {
                padding-top: 4px;
            }

            .personalizar-avancado > button,
            .btn-restaurar-cores,
            .personalizar-acoes button {
                padding: 12px 16px;
                border: 1px solid rgba(138, 77, 255, .4);
                border-radius: 9px;
                background: #21123b;
                color: #fff;
                font: inherit;
                cursor: pointer;
            }

            .personalizar-avancado-conteudo {
                display: flex;
                flex-direction: column;
                gap: 18px;
                margin-top: 18px;
            }

            .grupo-cores {
                display: flex;
                flex-direction: column;
                gap: 12px;
                padding: 15px;
                border: 1px solid rgba(138, 77, 255, .25);
                border-radius: 10px;
            }

            .grupo-cores-lista {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 12px;
            }

            .controle-cor {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                font-size: 12px;
            }

            .controle-cor input[type="color"] {
                width: 42px;
                height: 32px;
                padding: 2px;
                border: 1px solid rgba(255,255,255,.2);
                border-radius: 6px;
                background: transparent;
                cursor: pointer;
            }

            .personalizar-acoes {
                display: flex;
                justify-content: flex-end;
                flex-wrap: wrap;
                gap: 10px;
                padding-top: 8px;
            }

            .personalizar-acoes .btn-salvar {
                border-color: transparent;
                background: var(--cor-roxo-principal, #8A4DFF);
            }

            .personalizar-acoes button:disabled,
            .btn-restaurar-cores:disabled {
                opacity: .6;
                cursor: not-allowed;
            }

            @media (max-width: 600px) {
                .modal-personalizar-canal {
                    padding: 10px;
                }

                .personalizar-container {
                    max-height: 95vh;
                    padding: 18px;
                }

                .personalizar-acoes {
                    flex-direction: column;
                }

                .personalizar-acoes button {
                    width: 100%;
                }
            }
        `;

        document.head.appendChild(estilo);
    }

    // =========================================================
    // 4. CRIAÇÃO DO MODAL
    // =========================================================

    function criarModal() {
        if (document.getElementById("modalPersonalizarCanal")) {
            return document.getElementById("modalPersonalizarCanal");
        }

        const modal = document.createElement("div");
        modal.id = "modalPersonalizarCanal";
        modal.className = "modal-personalizar-canal";
        modal.hidden = true;

        modal.innerHTML = `
        <div class="personalizar-container">
            <div class="personalizar-cabecalho">
                <h2>Personalizar canal</h2>
                <button
                    type="button"
                    class="personalizar-fechar"
                    id="btnFecharModalCanal"
                    aria-label="Fechar"
                >&times;</button>
            </div>

            <form id="formPersonalizarCanal" class="personalizar-form">

                <div class="personalizar-campo">
                    <label for="inputNomeCanal">Nome do canal</label>
                    <input
                        type="text"
                        id="inputNomeCanal"
                        maxlength="60"
                        required
                    >
                </div>

                <div class="personalizar-campo">
                    <label for="inputUsuarioCanal">Identificador do canal</label>
                    <input
                        type="text"
                        id="inputUsuarioCanal"
                        maxlength="30"
                        placeholder="@seucanal"
                        required
                    >
                </div>

                <div class="personalizar-campo">
                    <label for="inputDescricaoCanal">Descrição</label>
                    <textarea
                        id="inputDescricaoCanal"
                        maxlength="500"
                        placeholder="Conte um pouco sobre seu canal..."
                    ></textarea>
                </div>

                <div class="personalizar-imagens">
                    <h3>Imagens do canal</h3>

                    <div class="personalizar-imagem-item">
                        <div class="personalizar-imagem-info">
                            <strong>Foto do canal</strong>
                            <span>Escolha uma imagem para o avatar.</span>
                        </div>

                        <div class="personalizar-avatar-preview">
                            <img
                                id="previewAvatarCanal"
                                src=""
                                alt="Prévia do avatar"
                            >
                        </div>

                        <input
                            type="file"
                            id="inputAvatarArquivo"
                            accept="image/jpeg,image/png,image/webp"
                        >
                    </div>

                    <button
                        type="button"
                        id="btnRemoverAvatar"
                        class="btn-restaurar-cores"
                    >
                        Remover foto do canal
                    </button>

                    <div class="personalizar-imagem-item">
                        <div class="personalizar-imagem-info">
                            <strong>Capa do canal</strong>
                            <span>Escolha uma imagem para o banner.</span>
                        </div>

                        <div class="personalizar-capa-preview">
                            <img
                                id="previewCapaCanal"
                                src=""
                                alt="Prévia da capa"
                            >
                        </div>

                        <input
                            type="file"
                            id="inputCapaArquivo"
                            accept="image/jpeg,image/png,image/webp"
                        >
                    </div>
                </div>

                <div class="personalizar-avancado">
                    <button
                        type="button"
                        id="btnAbrirAvancado"
                    >
                        Personalização avançada
                    </button>

                    <div
                        class="personalizar-avancado-conteudo"
                        id="painelAvancado"
                        hidden
                    >
                        <div id="coresTextos"></div>
                        <div id="coresBackground"></div>
                        <div id="coresNavs"></div>
                        <div id="coresMenuLateral"></div>
                        <div id="coresBarraMobile"></div>
                        <div id="coresHover"></div>

                        <button
                            type="button"
                            class="btn-restaurar-cores"
                            id="btnRestaurarCores"
                        >
                            Restaurar cores padrão
                        </button>
                    </div>
                </div>

                <div class="personalizar-acoes">
                    <button
                        type="button"
                        id="btnCancelarEdicaoCanal"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        class="btn-salvar"
                        id="btnSalvarPersonalizacao"
                    >
                        Salvar alterações
                    </button>
                </div>
            </form>
        </div>
    `;

        document.body.appendChild(modal);
        return modal;
    }

    // =========================================================
    // 5. REFERÊNCIAS DOS ELEMENTOS DO MODAL
    // =========================================================

    criarEstilos();

    const modal = criarModal();

    const form = document.getElementById("formPersonalizarCanal");
    const inputNome = document.getElementById("inputNomeCanal");
    const inputUsuario = document.getElementById("inputUsuarioCanal");
    const inputDescricao = document.getElementById("inputDescricaoCanal");

    const previewAvatar = document.getElementById("previewAvatarCanal");
    const previewCapa = document.getElementById("previewCapaCanal");

    const inputAvatar = document.getElementById("inputAvatarArquivo");
    const inputCapa = document.getElementById("inputCapaArquivo");
    const btnRemoverAvatar = document.getElementById("btnRemoverAvatar");

    const btnFechar = document.getElementById("btnFecharModalCanal");
    const btnCancelar = document.getElementById("btnCancelarEdicaoCanal");
    const btnSalvar = document.getElementById("btnSalvarPersonalizacao");

    const btnAbrirAvancado = document.getElementById("btnAbrirAvancado");
    const painelAvancado = document.getElementById("painelAvancado");
    const btnRestaurarCores = document.getElementById("btnRestaurarCores");

    // =========================================================
    // 6. ABRIR E FECHAR O MODAL
    // =========================================================

    function abrirModal() {
        modal.hidden = false;
        document.body.style.overflow = "hidden";

        carregarDadosDaAPI().catch(erro => {
            console.error("Erro ao carregar dados para o modal:", erro);
            alert(`Não foi possível carregar os dados do canal: ${erro.message}`);
        });
    }

    function fecharModal() {
        modal.hidden = true;
        document.body.style.overflow = "";
    }

    elementosPagina.botaoPersonalizar.addEventListener("click", abrirModal);

    btnFechar.addEventListener("click", fecharModal);
    btnCancelar.addEventListener("click", fecharModal);

    modal.addEventListener("click", evento => {
        if (evento.target === modal) {
            fecharModal();
        }
    });

    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape" && !modal.hidden) {
            fecharModal();
        }
    });

    btnAbrirAvancado.addEventListener("click", () => {
        painelAvancado.hidden = !painelAvancado.hidden;

        btnAbrirAvancado.textContent = painelAvancado.hidden
            ? "Personalização avançada"
            : "Ocultar personalização avançada";
    });

    // =========================================================
    // 7. PERSONALIZAÇÃO DE CORES
    // =========================================================

    const gruposDeCores = {
        coresTextos: {
            titulo: "Cores dos textos",
            variaveis: {
                "--cor-texto-principal": "#B8B8C8",
                "--cor-texto-destaque": "#FFFFFF",
                "--cor-texto-secundario": "#A49BB5",
                "--cor-texto-suave": "#81798F",
                "--cor-texto-invertido": "#090912"
            }
        },

        coresBackground: {
            titulo: "Fundos",
            variaveis: {
                "--cor-fundo-pagina": "#090912",
                "--cor-fundo-cartao": "#130A24"
            }
        },

        coresNavs: {
            titulo: "Navegação e roxos",
            variaveis: {
                "--cor-fundo-cabecalho": "#130A24",
                "--cor-roxo-principal": "#8A4DFF",
                "--cor-roxo-claro": "#B06EFF",
                "--cor-roxo-escuro": "#32205F"
            }
        },

        coresMenuLateral: {
            titulo: "Menu lateral",
            variaveis: {
                "--cor-fundo-menu-lateral": "#130A24"
            }
        },

        coresBarraMobile: {
            titulo: "Barra de navegação mobile",
            variaveis: {}
        },

        coresHover: {
            titulo: "Efeitos e divisores",
            variaveis: {
                "--cor-roxo-hover": "#6E35D4",
                "--cor-divisor": "#32205F"
            }
        }
    };

    const coresSelecionadas = {};

    function criarControlesDeCores() {
        Object.entries(gruposDeCores).forEach(([id, grupo]) => {
            const recipiente = document.getElementById(id);

            if (!recipiente) return;

            recipiente.className = "grupo-cores";
            recipiente.innerHTML = `
            <h3>${grupo.titulo}</h3>
            <div class="grupo-cores-lista"></div>
        `;

            const lista = recipiente.querySelector(".grupo-cores-lista");

            Object.entries(grupo.variaveis).forEach(([variavel, corPadrao]) => {
                const controle = document.createElement("label");
                controle.className = "controle-cor";

                controle.innerHTML = `
                <span>${variavel.replace("--cor-", "").replaceAll("-", " ")}</span>
                <input
                    type="color"
                    value="${corPadrao}"
                    data-variavel="${variavel}"
                >
            `;

                const input = controle.querySelector("input");

                input.addEventListener("input", () => {
                    coresSelecionadas[variavel] = input.value;

                    document.documentElement.style.setProperty(
                        variavel,
                        input.value
                    );
                });

                lista.appendChild(controle);
            });
        });
    }

    function aplicarCoresPersonalizadas(cores) {
        if (!cores) return;

        let objetoCores = cores;

        if (typeof objetoCores === "string") {
            try {
                objetoCores = JSON.parse(objetoCores);
            } catch (erro) {
                console.warn("Não foi possível interpretar as cores do canal:", erro);
                return;
            }
        }

        if (!objetoCores || typeof objetoCores !== "object") return;

        Object.entries(objetoCores).forEach(([variavel, valor]) => {
            if (typeof valor !== "string") return;

            document.documentElement.style.setProperty(variavel, valor);
            coresSelecionadas[variavel] = valor;

            const input = document.querySelector(
                `input[data-variavel="${variavel}"]`
            );

            if (input) {
                input.value = valor;
            }
        });
    }

    function coletarCoresPersonalizadas() {
        const cores = {};

        Object.entries(gruposDeCores).forEach(([, grupo]) => {
            Object.keys(grupo.variaveis).forEach(variavel => {
                const input = document.querySelector(
                    `input[data-variavel="${variavel}"]`
                );

                if (input) {
                    cores[variavel] = input.value;
                }
            });
        });

        return cores;
    }

    async function salvarCoresNaAPI() {
        const cores = coletarCoresPersonalizadas();

        const resposta = await requisicaoProtegida(
            `${API_BASE}/api/canais/me/cores`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ cores })
            }
        );

        const resultado = await lerResposta(resposta);

        if (!resposta.ok) {
            throw new Error(
                resultado.mensagem || "Não foi possível salvar as cores."
            );
        }

        aplicarCoresPersonalizadas(cores);
    }

    async function restaurarCoresNaAPI() {
        const resposta = await requisicaoProtegida(
            `${API_BASE}/api/canais/me/cores`,
            {
                method: "DELETE"
            }
        );

        const resultado = await lerResposta(resposta);

        if (!resposta.ok) {
            throw new Error(
                resultado.mensagem || "Não foi possível restaurar as cores."
            );
        }

        Object.entries(gruposDeCores).forEach(([, grupo]) => {
            Object.keys(grupo.variaveis).forEach(variavel => {
                document.documentElement.style.removeProperty(variavel);
                delete coresSelecionadas[variavel];
            });
        });

        criarControlesDeCores();
    }

    // =========================================================
    // 8. BUSCA E PREENCHIMENTO DOS DADOS DO CANAL
    // =========================================================

    async function buscarCanalNaAPI() {
        const resposta = await fetch(`${API_BASE}/api/canais/me`, {
            method: "GET",
            credentials: "include"
        });

        const resultado = await lerResposta(resposta);

        if (!resposta.ok) {
            throw new Error(
                resultado.mensagem || "Não foi possível consultar o canal na API."
            );
        }

        if (resultado.temCanal === false) {
            throw new Error("Nenhum canal foi encontrado para esta conta.");
        }

        if (!resultado.canal) {
            throw new Error("A API não retornou os dados do canal.");
        }

        return resultado.canal;
    }

    function preencherModalComCanal(canal) {
        if (!canal) return;

        estado.canal = canal;

        const dadosLocais = obterDadosLocais();

        inputNome.value =
            canal.nome || dadosLocais.nome || "";

        const usuario =
            canal.arroba ||
            canal.usuario ||
            canal.identificador ||
            dadosLocais.usuario ||
            "";

        inputUsuario.value = usuario.replace(/^@+/, "");

        inputDescricao.value =
            canal.descricao || dadosLocais.descricao || "";

        if (canal.foto) {
            const foto = normalizarUrlImagem(canal.foto);
            previewAvatar.src = foto;
            definirImagem(elementosPagina.avatar, canal.foto);
        } else if (dadosLocais.avatar) {
            previewAvatar.src = normalizarUrlImagem(dadosLocais.avatar);
        }

        if (canal.capa) {
            const capa = normalizarUrlImagem(canal.capa);
            previewCapa.src = capa;
            definirImagem(elementosPagina.capa, canal.capa);
        } else if (dadosLocais.capa) {
            previewCapa.src = normalizarUrlImagem(dadosLocais.capa);
        }

        atualizarDadosVisuais(canal);
    }

    async function carregarDadosDaAPI() {
        const canal = await buscarCanalNaAPI();

        preencherModalComCanal(canal);

        if (canal.coresPersonalizadas) {
            aplicarCoresPersonalizadas(canal.coresPersonalizadas);
        }
    }

    // =========================================================
    // 9. PROCESSAMENTO DAS IMAGENS
    // =========================================================

    function processarImagem(arquivo) {
        return new Promise((resolve, reject) => {
            if (!arquivo) {
                reject(new Error("Nenhum arquivo foi selecionado."));
                return;
            }

            if (!CONFIG.formatosPermitidos.includes(arquivo.type)) {
                reject(new Error("Formato inválido. Use JPG, PNG ou WEBP."));
                return;
            }

            if (arquivo.size > CONFIG.limiteImagem) {
                reject(new Error("A imagem deve ter no máximo 5 MB."));
                return;
            }

            const leitor = new FileReader();

            leitor.onerror = () => {
                reject(new Error("Não foi possível ler o arquivo."));
            };

            leitor.onload = () => {
                const imagem = new Image();

                imagem.onerror = () => {
                    reject(new Error("Não foi possível abrir a imagem."));
                };

                imagem.onload = () => {
                    const escala = Math.min(
                        CONFIG.dimensaoMaxima / imagem.width,
                        CONFIG.dimensaoMaxima / imagem.height,
                        1
                    );

                    const largura = Math.max(
                        1,
                        Math.round(imagem.width * escala)
                    );

                    const altura = Math.max(
                        1,
                        Math.round(imagem.height * escala)
                    );

                    const canvas = document.createElement("canvas");

                    canvas.width = largura;
                    canvas.height = altura;

                    const contexto = canvas.getContext("2d");

                    if (!contexto) {
                        reject(new Error("Não foi possível preparar a imagem."));
                        return;
                    }

                    contexto.drawImage(
                        imagem,
                        0,
                        0,
                        largura,
                        altura
                    );

                    resolve(
                        canvas.toDataURL(
                            "image/jpeg",
                            CONFIG.qualidadeImagem
                        )
                    );
                };

                imagem.src = leitor.result;
            };

            leitor.readAsDataURL(arquivo);
        });
    }

    function converterBase64ParaArquivo(base64, nome) {
        const partes = base64.split(",");
        const dados = atob(partes[1]);
        const bytes = new Uint8Array(dados.length);

        for (let i = 0; i < dados.length; i++) {
            bytes[i] = dados.charCodeAt(i);
        }

        return new File(
            [bytes],
            nome,
            { type: "image/jpeg" }
        );
    }

    inputAvatar.addEventListener("change", async () => {
        const arquivo = inputAvatar.files?.[0];

        if (!arquivo) return;

        try {
            const imagem = await processarImagem(arquivo);

            estado.novoAvatar = imagem;
            previewAvatar.src = imagem;
        } catch (erro) {
            estado.novoAvatar = null;
            inputAvatar.value = "";

            alert(erro.message);
        }
    });

    inputCapa.addEventListener("change", async () => {
        const arquivo = inputCapa.files?.[0];

        if (!arquivo) return;

        try {
            const imagem = await processarImagem(arquivo);

            estado.novaCapa = imagem;
            previewCapa.src = imagem;
        } catch (erro) {
            estado.novaCapa = null;
            inputCapa.value = "";

            alert(erro.message);
        }
    });

    // =========================================================
// REMOVER FOTO DO CANAL
// =========================================================

btnRemoverAvatar.addEventListener("click", async () => {
    const confirmar = confirm(
        "Deseja realmente remover a foto do seu canal?"
    );

    if (!confirmar) return;

    btnRemoverAvatar.disabled = true;
    btnRemoverAvatar.textContent = "Removendo...";

    try {
        const resposta = await requisicaoProtegida(
            `${API_BASE}/api/canais/me/foto`,
            {
                method: "DELETE"
            }
        );

        const resultado = await lerResposta(resposta);

        if (!resposta.ok) {
            throw new Error(
                resultado.mensagem || "Não foi possível remover a foto."
            );
        }

        // Limpa o estado da imagem
        estado.novoAvatar = null;
        estado.canal.foto = "";

        inputAvatar.value = "";

        // Limpa os dados locais
        const dadosLocais = obterDadosLocais();
        delete dadosLocais.avatar;
        salvarDadosLocais(dadosLocais);

        // Limpa as prévias
        previewAvatar.removeAttribute("src");
        elementosPagina.avatar?.removeAttribute("src");

        alert("Foto do canal removida com sucesso.");

    } catch (erro) {
        console.error("Erro ao remover a foto:", erro);
        alert(`Não foi possível remover a foto: ${erro.message}`);

    } finally {
        btnRemoverAvatar.disabled = false;
        btnRemoverAvatar.textContent = "Remover foto do canal";
    }
});

    // =========================================================
    // 10. UPLOAD DE IMAGENS
    // =========================================================

    async function enviarImagemParaAPI(arquivo, tipo) {
        const formulario = new FormData();

        formulario.append("arquivo", arquivo);

        const resposta = await requisicaoProtegida(
            `${API_BASE}/api/canais/me/${tipo}`,
            {
                method: "PUT",
                body: formulario
            }
        );

        const resultado = await lerResposta(resposta);

        if (!resposta.ok) {
            throw new Error(
                resultado.mensagem ||
                `Não foi possível enviar ${tipo === "foto" ? "a foto" : "a capa"}.`
            );
        }

        return resultado;
    }

    // =========================================================
    // 11. SALVAR ALTERAÇÕES
    // =========================================================

    
async function salvarPersonalizacao(evento) {
    evento.preventDefault();

    if (estado.salvando) return;

    const nome = inputNome.value.trim();
    const usuario = inputUsuario.value.trim().replace(/^@+/, "");
    const descricao = inputDescricao.value.trim();

    if (!nome || !usuario) {
        alert("Preencha o nome e o identificador do canal.");
        return;
    }

    estado.salvando = true;
    btnSalvar.disabled = true;
    btnSalvar.textContent = "Salvando...";

    const falhas = [];
    const canalAtualizado = { ...estado.canal };

    try {
        // 1. Salvar nome, arroba e descrição no banco de dados.
        try {
            const resposta = await requisicaoProtegida(
                `${API_BASE}/api/canais/me`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nome,
                        arroba: usuario,
                        descricao
                    })
                }
            );

            const resultado = await lerResposta(resposta);

            if (!resposta.ok) {
                throw new Error(
                    resultado.mensagem ||
                    "Não foi possível atualizar os dados do canal."
                );
            }

            canalAtualizado.nome = resultado.canal.nome;
            canalAtualizado.arroba = resultado.canal.arroba;
            canalAtualizado.descricao = resultado.canal.descricao;

        } catch (erro) {
            falhas.push(`Dados do canal: ${erro.message}`);
        }

        // 2. Enviar avatar somente se ele foi alterado.
        if (estado.novoAvatar) {
            try {
                const arquivoAvatar = converterBase64ParaArquivo(
                    estado.novoAvatar,
                    "avatar.jpg"
                );

                const resultado = await enviarImagemParaAPI(
                    arquivoAvatar,
                    "foto"
                );

                const caminhoFoto =
                    resultado.foto ||
                    resultado.caminho ||
                    resultado.url;

                if (!caminhoFoto) {
                    throw new Error(
                        "A API não retornou o caminho da foto enviada."
                    );
                }

                canalAtualizado.foto = caminhoFoto;

                definirImagem(elementosPagina.avatar, caminhoFoto);
                previewAvatar.src = normalizarUrlImagem(caminhoFoto);

                estado.novoAvatar = null;
                inputAvatar.value = "";

            } catch (erro) {
                falhas.push(`Avatar: ${erro.message}`);
            }
        }

        // 3. Enviar capa somente se ela foi alterada.
        if (estado.novaCapa) {
            try {
                const arquivoCapa = converterBase64ParaArquivo(
                    estado.novaCapa,
                    "capa.jpg"
                );

                const resultado = await enviarImagemParaAPI(
                    arquivoCapa,
                    "capa"
                );

                const caminhoCapa =
                    resultado.capa ||
                    resultado.caminho ||
                    resultado.url;

                if (!caminhoCapa) {
                    throw new Error(
                        "A API não retornou o caminho da capa enviada."
                    );
                }

                canalAtualizado.capa = caminhoCapa;

                definirImagem(elementosPagina.capa, caminhoCapa);
                previewCapa.src = normalizarUrlImagem(caminhoCapa);

                estado.novaCapa = null;
                inputCapa.value = "";

            } catch (erro) {
                falhas.push(`Capa: ${erro.message}`);
            }
        }

        // 4. Salvar cores pela rota própria.
        try {
            await salvarCoresNaAPI();
        } catch (erro) {
            falhas.push(`Cores: ${erro.message}`);
        }

        // 5. Atualizar os dados exibidos na página.
        estado.canal = canalAtualizado;
        atualizarDadosVisuais(canalAtualizado);

        if (falhas.length) {
            console.error(
                "Algumas etapas da personalização falharam:",
                falhas
            );

            alert(
                "Parte da personalização foi salva, mas houve problemas:\n\n" +
                falhas.join("\n") +
                "\n\nConfira o Console e a conexão com a API."
            );

            return;
        }

        fecharModal();

        alert("Personalização salva com sucesso!");

    } catch (erro) {
        console.error("Erro ao salvar a personalização:", erro);

        alert(
            `Não foi possível salvar a personalização: ${erro.message}`
        );

    } finally {
        estado.salvando = false;
        btnSalvar.disabled = false;
        btnSalvar.textContent = "Salvar alterações";
    }
}

    form.addEventListener("submit", salvarPersonalizacao);

    // =========================================================
    // 12. RESTAURAR CORES
    // =========================================================

    btnRestaurarCores.addEventListener("click", async () => {
        const confirmar = confirm(
            "Deseja apagar as cores personalizadas e restaurar o padrão do Astraelion?"
        );

        if (!confirmar) return;

        btnRestaurarCores.disabled = true;

        try {
            await restaurarCoresNaAPI();

            alert("Cores padrão restauradas com sucesso.");

        } catch (erro) {
            console.error(
                "Erro ao restaurar as cores:",
                erro
            );

            alert(
                `Não foi possível restaurar as cores: ${erro.message}`
            );

        } finally {
            btnRestaurarCores.disabled = false;
        }
    });

    // =========================================================
    // 13. INICIALIZAÇÃO
    // =========================================================

    criarControlesDeCores();

    carregarDadosDaAPI().catch(erro => {
        console.warn(
            "A personalização iniciou sem conseguir consultar a API:",
            erro
        );
    });

    window.obterTokenCSRF = obterTokenCSRF;

    console.log(
        "Personalização independente do canal inicializada."
    );
});