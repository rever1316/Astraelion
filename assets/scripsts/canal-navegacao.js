
document.addEventListener("DOMContentLoaded", () => {

    // 1. Menu lateral e navegação
    const menuItems = document.querySelectorAll("aside a");

    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            menuItems.forEach((link) => {
                link.classList.remove("active");
            });

            item.classList.add("active");
        });
    });

    // 2. Recolher e expandir menu lateral
    const btnExpandir = document.querySelector(".btn-menu");
    const aside = document.querySelector("aside");

    const mainContent =
        document.querySelector("main") ||
        document.querySelector(".fendas-container");

    if (btnExpandir && aside) {
        btnExpandir.addEventListener("click", () => {
            aside.classList.toggle("recolhido");

            if (mainContent) {
                mainContent.classList.toggle("recolhido");
            }
        });
    }

    // 3. Navegação entre abas do canal
    const categorias = document.querySelectorAll(".categoria");
    const trilhoAbas = document.querySelector(".abas-trilho");

    categorias.forEach((categoria) => {
        categoria.addEventListener("click", () => {

            categorias.forEach((item) => {
                item.classList.remove("active");
            });

            categoria.classList.add("active");

            const aba = Number(categoria.dataset.aba);

            if (trilhoAbas) {
                trilhoAbas.style.transform =
                    `translateX(-${aba * 25}%)`;
            }
        });
    });

});
