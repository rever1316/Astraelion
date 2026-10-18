
document.addEventListener("DOMContentLoaded", () => {
    const grupo = document.querySelector(".grupo-inscricoes");
    const botao = document.querySelector("#btnVerInscricoes");
    const lista = document.querySelector("#listaInscricoesMenu");

    if (!grupo || !botao || !lista) return;

    const canais = [...lista.querySelectorAll(".item-inscrito")];

    // Limita a lista lateral aos primeiros 25 canais.
    canais.slice(25).forEach(canal => canal.remove());

    function atualizarBotao() {
        const expandido = grupo.classList.contains("expandido");
        const texto = botao.querySelector("span");

        if (texto) {
            texto.textContent = expandido ? "Ver menos" : "Ver mais";
        }

        botao.setAttribute("aria-expanded", String(expandido));

        // Não mostra o botão quando existem 6 canais ou menos.
        botao.hidden = canais.length <= 6;
    }

    botao.addEventListener("click", () => {
        grupo.classList.toggle("expandido");
        atualizarBotao();
    });

    atualizarBotao();
});


document.addEventListener("DOMContentLoaded", () => {

    /* ========================================
       ELEMENTOS PRINCIPAIS
    ======================================== */

    const faixaCanais = document.querySelector("#faixaCanais");
    const botaoAnterior = document.querySelector("#canaisAnterior");
    const botaoProximo = document.querySelector("#canaisProximo");

    const botaoAbrirTodos = document.querySelector("#abrirTodosCanais");
    const botaoFecharTodos = document.querySelector("#fecharTodosCanais");
    const overlayCanais = document.querySelector("#overlayCanais");
    const listaTodosCanais = document.querySelector("#listaTodosCanais");
    const pesquisaCanais = document.querySelector("#pesquisaCanais");

    /* ========================================
       FAIXA HORIZONTAL DE CANAIS
    ======================================== */

    function deslocarCanais(direcao) {
        if (!faixaCanais) return;

        const primeiroCanal = faixaCanais.querySelector(".canal-inscrito");
        const larguraCanal = primeiroCanal
            ? primeiroCanal.getBoundingClientRect().width
            : 112;

        const estilo = getComputedStyle(faixaCanais);
        const espacamento = parseFloat(estilo.columnGap) || 0;
        const distancia = (larguraCanal + espacamento) * 3;

        faixaCanais.scrollBy({
            left: distancia * direcao,
            behavior: "smooth"
        });
    }

    botaoAnterior?.addEventListener("click", () => {
        deslocarCanais(-1);
    });

    botaoProximo?.addEventListener("click", () => {
        deslocarCanais(1);
    });

    /* ========================================
       DADOS DOS CANAIS
       Futuramente poderão vir do backend.
    ======================================== */

    function obterCanais() {
        if (!faixaCanais) return [];

        return [...faixaCanais.querySelectorAll(".canal-inscrito")]
            .map((canal, indice) => {
                const avatar = canal.querySelector(".avatar-inscrito img");
                const nome = canal.querySelector("strong");
                const arroba = canal.querySelector(".arroba-canal");

                return {
                    elemento: canal,
                    indice,
                    nome: nome?.textContent.trim() || "Canal sem nome",
                    arroba: arroba?.textContent.trim() || "@canal",
                    imagem: avatar?.getAttribute("src") || "/assets/img/logo.ico",
                    publicouHoje: canal.dataset.publicouHoje === "true"
                };
            });
    }

    /* ========================================
       JANELA VER TODOS OS CANAIS
    ======================================== */

    function abrirJanelaCanais() {
        if (!overlayCanais) return;

        overlayCanais.hidden = false;
        document.body.style.overflow = "hidden";

        if (pesquisaCanais) {
            pesquisaCanais.value = "";
        }

        renderizarListaCanais();
        pesquisaCanais?.focus();
    }

    function fecharJanelaCanais() {
        if (!overlayCanais) return;

        overlayCanais.hidden = true;
        document.body.style.overflow = "";
        botaoAbrirTodos?.focus();
    }

    botaoAbrirTodos?.addEventListener("click", abrirJanelaCanais);
    botaoFecharTodos?.addEventListener("click", fecharJanelaCanais);

    overlayCanais?.addEventListener("click", (evento) => {
        if (evento.target === overlayCanais) {
            fecharJanelaCanais();
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && overlayCanais && !overlayCanais.hidden) {
            fecharJanelaCanais();
        }
    });

    /* ========================================
       LISTA ALFABÉTICA E PESQUISA
    ======================================== */

    function renderizarListaCanais() {
        if (!listaTodosCanais || !faixaCanais) return;

        const termo = (pesquisaCanais?.value || "")
            .trim()
            .toLocaleLowerCase("pt-BR");

        const canais = obterCanais()
            .filter((canal) => {
                return canal.nome.toLocaleLowerCase("pt-BR").includes(termo)
                    || canal.arroba.toLocaleLowerCase("pt-BR").includes(termo);
            })
            .sort((a, b) => {
                // Primeiro, canais com publicação de hoje.
                if (a.publicouHoje !== b.publicouHoje) {
                    return Number(b.publicouHoje) - Number(a.publicouHoje);
                }

                return a.nome.localeCompare(b.nome, "pt-BR", {
                    sensitivity: "base"
                });
            });

        listaTodosCanais.replaceChildren();

        if (canais.length === 0) {
            const mensagem = document.createElement("p");
            mensagem.textContent = "Nenhum canal encontrado.";
            mensagem.style.cssText =
                "padding:18px 10px;color:var(--ins-texto-suave);font-size:12px;";

            listaTodosCanais.appendChild(mensagem);
            return;
        }

        canais.forEach((canal) => {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "item-todos-canais";

            const imagem = document.createElement("img");
            imagem.src = canal.imagem;
            imagem.alt = "";
            imagem.loading = "lazy";

            const dados = document.createElement("span");
            dados.className = "dados-todos-canais";

            const nome = document.createElement("strong");
            nome.textContent = canal.nome;

            const arroba = document.createElement("span");
            arroba.textContent = canal.arroba;

            dados.append(nome, arroba);
            item.append(imagem, dados);

            item.addEventListener("click", () => {
                moverCanalParaInicio(canal.elemento);
                fecharJanelaCanais();
            });

            listaTodosCanais.appendChild(item);
        });
    }

    pesquisaCanais?.addEventListener("input", renderizarListaCanais);

    /* ========================================
       MOVER CANAL PARA O INÍCIO DA FAIXA
    ======================================== */

    function moverCanalParaInicio(canal) {
        if (!faixaCanais || !canal) return;

        faixaCanais.prepend(canal);

        faixaCanais.scrollTo({
            left: 0,
            behavior: "smooth"
        });
    }

    /* ========================================
       LINHAS INDEPENDENTES DE FENDAS
    ======================================== */

    document.querySelectorAll(".linha-fendas").forEach((linha) => {
        const faixa = linha.querySelector(".faixa-fendas");
        const anterior = linha.querySelector(".seta-fendas.anterior");
        const proximo = linha.querySelector(".seta-fendas.proximo");

        if (!faixa) return;

        function deslocarFendas(direcao) {
            const primeiroCard = faixa.querySelector(".card-fenda-inscricao");

            if (!primeiroCard) return;

            const largura = primeiroCard.getBoundingClientRect().width;
            const gap = parseFloat(getComputedStyle(faixa).columnGap) || 0;

            faixa.scrollBy({
                left: (largura + gap) * 2 * direcao,
                behavior: "smooth"
            });
        }

        anterior?.addEventListener("click", () => {
            deslocarFendas(-1);
        });

        proximo?.addEventListener("click", () => {
            deslocarFendas(1);
        });
    });

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

        // Ação de pesquisa será conectada ao sistema de busca existente.
        if (inputPesquisa.value.trim()) {
            inputPesquisa.dispatchEvent(
                new KeyboardEvent('keydown', {
                    key: 'Enter',
                    bubbles: true
                })
            );
        }
    });

    btnFecharPesquisa.addEventListener('click', fecharPesquisa);

    inputPesquisa.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            fecharPesquisa();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            pesquisa.classList.remove('ativa');
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const grupo = document.querySelector(".grupo-inscricoes");
    const lista = document.querySelector("#listaInscricoesMenu");
    const botao = document.querySelector("#btnVerInscricoes");

    if (!grupo || !lista || !botao) return;

    const LIMITE_INICIAL = 10;

    // Organiza os canais alfabeticamente.
    function ordenarCanais() {
        const canais = [
            ...lista.querySelectorAll(".item-inscrito")
        ];

        canais.sort((a, b) => {
            const nomeA = a.querySelector("span")?.textContent.trim() || "";
            const nomeB = b.querySelector("span")?.textContent.trim() || "";

            return nomeA.localeCompare(nomeB, "pt-BR", {
                sensitivity: "base"
            });
        });

        canais.forEach(canal => lista.appendChild(canal));

        return canais;
    }

    const canais = ordenarCanais();

    function atualizarLista() {
        const expandido = grupo.classList.contains("expandido");
        const temMaisCanais = canais.length > LIMITE_INICIAL;

        // O botão só existe quando há mais de 10 canais.
        botao.hidden = !temMaisCanais;

        // Atualiza o texto e o estado acessível do botão.
        const texto = botao.querySelector("span");

        if (texto) {
            texto.textContent = expandido ? "Ver menos" : "Ver mais";
        }

        botao.setAttribute("aria-expanded", String(expandido));

        canais.forEach((canal, indice) => {
    canal.hidden = !expandido && indice >= LIMITE_INICIAL;
});

lista.classList.toggle("lista-expandida", expandido);

// Ao expandir, a lista começa do início.
if (expandido) {
    lista.scrollTop = 0;
}
    }

    botao.addEventListener("click", () => {
        grupo.classList.toggle("expandido");
        atualizarLista();
    });

    atualizarLista();
});
