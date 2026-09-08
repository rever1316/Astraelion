const cabecalhosConfiguracao =
    document.querySelectorAll('.cabecalho-item-configuracao');


cabecalhosConfiguracao.forEach((cabecalho) => {

    cabecalho.addEventListener('click', () => {

        const item =
            cabecalho.closest('.item-configuracao');


        // Fecha outras categorias abertas

        document
            .querySelectorAll('.item-configuracao.aberto')
            .forEach((aberto) => {

                if (aberto !== item) {
                    aberto.classList.remove('aberto');
                }

            });


        // Abre ou fecha a categoria clicada

        item.classList.toggle('aberto');

    });

});