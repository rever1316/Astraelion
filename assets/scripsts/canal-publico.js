
document.addEventListener("DOMContentLoaded", async () => {

    const API_BASE = "https://localhost:7229";

    const elementos = {
        nome: document.getElementById("nomeCanal"),
        arroba: document.getElementById("arrobaCanal"),
        avatar: document.getElementById("avatarCanal"),
        descricao: document.getElementById("descricaoCanal"),
        acoesCriador: document.getElementById("acoesCriador"),
        acoesVisitante: document.getElementById("acoesVisitante"),
        inscritos: document.getElementById("inscritosCanal")
    };

function normalizarUrlImagem(caminho) {
    if (!caminho || typeof caminho !== "string") {
        return "";
    }

    const valor = caminho.trim();

    if (/^https?:\/\//i.test(valor)) {
        return valor;
    }

    return `${API_BASE}${valor.startsWith("/") ? "" : "/"}${valor}`;
}

    // Identifica o canal pela URL.
    const parametros = new URLSearchParams(window.location.search);
    const arrobaURL = parametros.get("arroba");

    try {

        let canal;
        let ehProprietario = false;

        // =========================================
        // 1. CARREGAR CANAL PÚBLICO OU DO CRIADOR
        // =========================================

        if (arrobaURL) {

            const resposta = await fetch(
                `${API_BASE}/api/canais/publico/${encodeURIComponent(arrobaURL)}`,
                { credentials: "include" }
            );

            if (!resposta.ok) {
                throw new Error("Não foi possível encontrar este canal.");
            }

            canal = await resposta.json();

        } else {

            const resposta = await fetch(
                `${API_BASE}/api/canais/me`,
                { credentials: "include" }
            );

            if (!resposta.ok) {
                throw new Error("Não foi possível carregar seu canal.");
            }

            const resultado = await resposta.json();

            if (!resultado.temCanal || !resultado.canal) {
                throw new Error("Sua conta ainda não possui um canal.");
            }

            canal = resultado.canal;
            ehProprietario = true;
        }

        // =========================================
        // 2. VERIFICAR SE O VISITANTE É O PROPRIETÁRIO
        // =========================================

        if (arrobaURL) {

            const respostaUsuario = await fetch(
                `${API_BASE}/api/canais/me`,
                { credentials: "include" }
            );

            if (respostaUsuario.ok) {

                const resultadoUsuario = await respostaUsuario.json();

                ehProprietario =
                    resultadoUsuario.temCanal &&
                    resultadoUsuario.canal?.id === canal.id;
            }
        }

        // =========================================
        // 3. PREENCHER INFORMAÇÕES DO CANAL
        // =========================================

        if (elementos.nome) {
            elementos.nome.textContent = canal.nome;
        }

        if (elementos.arroba) {
            elementos.arroba.textContent = `@${canal.arroba}`;
        }

        if (elementos.descricao) {
            elementos.descricao.textContent =
                canal.descricao || "Este canal ainda não possui descrição.";
        }

        if (elementos.avatar) {
    if (canal.foto) {
        elementos.avatar.src = normalizarUrlImagem(canal.foto);
    } else {
        elementos.avatar.src = "/assets/img/avatar1.jpg";
    }
}

        // =========================================
        // 4. EXIBIR AÇÕES CORRETAS
        // =========================================

        if (elementos.acoesCriador) {
            elementos.acoesCriador.hidden = !ehProprietario;
        }

        if (elementos.acoesVisitante) {
            elementos.acoesVisitante.hidden = ehProprietario;
        }

        // =========================================
        // 5. APLICAR CORES PERSONALIZADAS
        // =========================================

        if (canal.coresPersonalizadas) {

            let cores;

            try {
                cores = typeof canal.coresPersonalizadas === "string"
                    ? JSON.parse(canal.coresPersonalizadas)
                    : canal.coresPersonalizadas;

            } catch (erro) {
                console.error("Erro ao interpretar as cores:", erro);
                cores = null;
            }

            if (cores && typeof cores === "object") {

                Object.entries(cores).forEach(([variavel, valor]) => {

                    if (
                        variavel.startsWith("--") &&
                        typeof valor === "string" &&
                        /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(valor)
                    ) {
                        document.documentElement.style.setProperty(
                            variavel,
                            valor
                        );
                    }

                });
            }
        }

        console.log("Canal carregado:", canal);
        console.log("Proprietário:", ehProprietario);

    } catch (erro) {

        console.error("Erro ao carregar canal:", erro);

        if (elementos.nome) {
            elementos.nome.textContent = "Não foi possível carregar o canal.";
        }

        if (elementos.acoesCriador) {
            elementos.acoesCriador.hidden = true;
        }

        if (elementos.acoesVisitante) {
            elementos.acoesVisitante.hidden = true;
        }
    }

});
