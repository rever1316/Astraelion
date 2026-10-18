
document.addEventListener("DOMContentLoaded", () => {
    const filtros = document.querySelectorAll(".filtro-tema");
    const cards = document.querySelectorAll(
        ".grade-videos .card-video"
    );

    // Verifica se os cards possuem categorias
    cards.forEach((card, indice) => {
        if (!card.dataset.categoria) {
            console.warn(
                `O card ${indice + 1} está sem data-categoria.`,
                card
            );
        }
    });

    filtros.forEach(filtro => {
        filtro.addEventListener("click", () => {
            const categoriaSelecionada = filtro.dataset.filtro;

            filtros.forEach(botao => {
                const ativo = botao === filtro;

                botao.classList.toggle("ativo", ativo);
                botao.setAttribute("aria-pressed", String(ativo));
            });

            cards.forEach(card => {
                const categoriaCard = card.dataset.categoria;

                card.hidden = categoriaSelecionada !== "todos" &&
                    categoriaCard !== categoriaSelecionada;
            });
        });
    });
});
