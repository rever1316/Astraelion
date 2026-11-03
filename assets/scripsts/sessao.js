
const API_URL = "https://localhost:7229";

window.verificarSessao = async function () {
    try {
        // Primeiro: verifica a conta autenticada
        const resposta = await fetch(`${API_URL}/api/auth/sessao`, {
            method: "GET",
            credentials: "include"
        });

        if (resposta.status === 401) {
            window.usuarioLogado = null;
            return null;
        }

        if (!resposta.ok) {
            throw new Error("Não foi possível verificar a sessão.");
        }

        const usuario = await resposta.json();

        // Segundo: consulta se essa conta possui um canal
        const respostaCanal = await fetch(`${API_URL}/api/canais/me`, {
            method: "GET",
            credentials: "include"
        });

        if (!respostaCanal.ok) {
            throw new Error("Não foi possível consultar o canal.");
        }

        const dadosCanal = await respostaCanal.json();

        // Junta os dados da conta e do canal
        usuario.canal = dadosCanal.temCanal
            ? dadosCanal.canal
            : null;

        window.usuarioLogado = usuario;

        console.log("Sessão reconhecida!", usuario);

        return usuario;

    } catch (erro) {
        console.error("Erro ao verificar sessão:", erro);
        window.usuarioLogado = null;
        return null;
    }
};
