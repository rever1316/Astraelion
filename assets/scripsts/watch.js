var MenuItem = document.querySelectorAll('aside.menu-lateral a')

function selectLink() {
    MenuItem.forEach((item) =>
        item.classList.remove('active')
    )
    this.classList.add('active')
}

MenuItem.forEach((item) =>
    item.addEventListener('click', selectLink)
)

// Configuração do tamanho padrão ao carregar a página
// true = recolhido por padrão
// false = expandido por padrão
const INICIAR_RECOLHIDO = true;

document.addEventListener("DOMContentLoaded", () => {

    const btnExpandir = document.querySelector('.btn-menu');
    const aside = document.querySelector('aside.menu-lateral');
    const main = document.querySelector('main.watch-container');

    // Define o estado inicial
    if (INICIAR_RECOLHIDO) {
        aside.classList.add('recolhido');
        main.classList.add('recolhido');
    }

    // Evento do botão do menu
    btnExpandir.addEventListener('click', () => {

        aside.classList.toggle('recolhido');
        main.classList.toggle('recolhido');

    });

});


// =========================================================
// DESCRIÇÃO
// =========================================================

const btnDescricao = document.querySelector('.btn-descricao');
const descricao = document.querySelector('.descricao');

btnDescricao.addEventListener('click', () => {

    descricao.classList.toggle('aberta');

    if (descricao.classList.contains('aberta')) {

        btnDescricao.textContent = 'Mostrar menos';

    } else {

        btnDescricao.textContent = 'Mostrar mais';

    }

});


// =========================================================
// TÍTULO DO VÍDEO
// =========================================================

const tituloVideo = document.querySelector('.titulo-video');
const btnTitulo = document.querySelector('.btn-titulo');

function verificarTitulo() {

    const limite =
        tituloVideo.scrollHeight > tituloVideo.clientHeight;

    if (limite) {

        btnTitulo.style.display = 'block';

    } else {

        btnTitulo.style.display = 'none';

    }

}

btnTitulo.addEventListener('click', function () {

    tituloVideo.classList.toggle('aberto');

    if (tituloVideo.classList.contains('aberto')) {

        btnTitulo.textContent = 'Mostrar menos';

    } else {

        btnTitulo.textContent = 'Mostrar mais';

    }

});

verificarTitulo();

window.addEventListener('resize', verificarTitulo);


// =========================================================
// COMENTÁRIOS
// =========================================================

const comentarios =
    document.querySelectorAll('.comentario');

comentarios.forEach((comentario) => {

    const texto =
        comentario.querySelector('.texto-comentario');

    const botao =
        comentario.querySelector('.btn-mostrar-comentario');

    if (!texto || !botao) return;

    function verificarTamanho() {

        if (texto.scrollHeight > texto.clientHeight) {

            botao.style.display = 'block';

        } else {

            botao.style.display = 'none';

        }

    }

    botao.addEventListener('click', () => {

        texto.classList.toggle('aberto');

        if (texto.classList.contains('aberto')) {

            botao.textContent = 'Mostrar menos';

        } else {

            botao.textContent = 'Mostrar mais';

        }

    });

    verificarTamanho();

});


// =========================================================
// PLAYER ASTRAELION
// =========================================================

const video =
    document.querySelector('#videoPlayer');

const btnPlay =
    document.querySelector('#btnPlay');

const indicadorCarregamento =
    document.querySelector('#indicadorCarregamento');

const iconePlay =
    btnPlay.querySelector('i');

const btnTelaCheia =
    document.querySelector('#btnTelaCheia');

const iconeTelaCheia =
    btnTelaCheia.querySelector('i');

const player =
    video.closest('.player');

const barraProgresso =
    document.querySelector('#barraProgresso');

const tempoVideo =
    document.querySelector('#tempoVideo');

const barraBuffer =
    document.querySelector('#barraBuffer');

const btnVolume =
    document.querySelector('#btnVolume');

const iconeVolume =
    btnVolume.querySelector('i');

const barraVolume =
    document.querySelector('#barraVolume');


// =========================================================
// ESTADO DO PLAYER
// =========================================================

let animacaoProgresso = null;
let temporizadorControles;
let temporizadorAcao;

let inicioVideo = false;
let carregamentoInicialAtivo = true;


// =========================================================
// PLAY / PAUSE
// =========================================================

function atualizarBotaoPlay() {

    if (video.paused) {

        iconePlay.classList.remove(
            'bi-pause-fill'
        );

        iconePlay.classList.add(
            'bi-play-fill'
        );

        btnPlay.setAttribute(
            'aria-label',
            'Reproduzir'
        );

    } else {

        iconePlay.classList.remove(
            'bi-play-fill'
        );

        iconePlay.classList.add(
            'bi-pause-fill'
        );

        btnPlay.setAttribute(
            'aria-label',
            'Pausar'
        );

    }

}


btnPlay.addEventListener('click', () => {

    if (video.paused) {

        video.play();

    } else {

        video.pause();

    }

});


video.addEventListener(
    'play',
    atualizarBotaoPlay
);

video.addEventListener(
    'pause',
    atualizarBotaoPlay
);


// =========================================================
// FORMATAÇÃO DE TEMPO
// =========================================================

function formatarTempo(segundos) {

    if (!Number.isFinite(segundos)) {

        return '0:00';

    }

    const minutos =
        Math.floor(segundos / 60);

    const segundosRestantes =
        Math.floor(segundos % 60);

    return `${minutos}:${segundosRestantes
        .toString()
        .padStart(2, '0')}`;

}


// =========================================================
// ATUALIZAR TEMPO
// =========================================================

function atualizarTempo() {

    const atual =
        formatarTempo(video.currentTime);

    const duracao =
        formatarTempo(video.duration);

    tempoVideo.textContent =
        `${atual} / ${duracao}`;

}


// =========================================================
// BUFFER
// =========================================================

function atualizarBuffer() {

    if (
        !video.duration ||
        video.buffered.length === 0
    ) {

        return;

    }

    const fimBuffer =
        video.buffered.end(
            video.buffered.length - 1
        );

    const porcentagemBuffer =
        (fimBuffer / video.duration) * 100;

    barraBuffer.style.width =
        `${porcentagemBuffer}%`;

}


video.addEventListener(
    'progress',
    atualizarBuffer
);

video.addEventListener(
    'loadedmetadata',
    () => {

        atualizarBuffer();

    }
);

video.addEventListener(
    'durationchange',
    () => {

        atualizarBuffer();

    }
);


// =========================================================
// ATUALIZAÇÃO FLUIDA DO PROGRESSO
// =========================================================

function atualizarProgresso() {

    if (!video.duration) {

        return;

    }

    const progresso =
        (video.currentTime / video.duration) * 100;

    barraProgresso.value =
        progresso;

    atualizarTempo();

    if (
        !video.paused &&
        !video.ended
    ) {

        animacaoProgresso =
            requestAnimationFrame(
                atualizarProgresso
            );

    }

}


// =========================================================
// INICIAR ATUALIZAÇÃO
// =========================================================

video.addEventListener('play', () => {

    cancelAnimationFrame(
        animacaoProgresso
    );

    animacaoProgresso =
        requestAnimationFrame(
            atualizarProgresso
        );

});


// =========================================================
// PARAR ATUALIZAÇÃO
// =========================================================

video.addEventListener('pause', () => {

    cancelAnimationFrame(
        animacaoProgresso
    );

    atualizarProgresso();

});


video.addEventListener('ended', () => {

    cancelAnimationFrame(
        animacaoProgresso
    );

    barraProgresso.value = 100;

    atualizarTempo();

});


video.addEventListener(
    'loadedmetadata',
    () => {

        barraProgresso.value = 0;

        atualizarTempo();

    }
);


// =========================================================
// BARRA DE PROGRESSO
// =========================================================

barraProgresso.addEventListener(
    'input',
    () => {

        if (!video.duration) {

            return;

        }

        const novoTempo =
            (barraProgresso.value / 100) *
            video.duration;

        video.currentTime =
            novoTempo;

        atualizarTempo();

    }
);


// =========================================================
// CONTROLES AUTOMÁTICOS
// =========================================================

function mostrarControles() {

    player.classList.remove(
        'controles-ocultos'
    );

    clearTimeout(
        temporizadorControles
    );

    if (!video.paused) {

        temporizadorControles =
            setTimeout(() => {

                esconderControles();

            }, 3000);

    }

}


function esconderControles() {

    if (!video.paused) {

        player.classList.add(
            'controles-ocultos'
        );

    }

}


// =========================================================
// MOVIMENTO DO MOUSE
// =========================================================

player.addEventListener(
    'mousemove',
    () => {

        mostrarControles();

    }
);


// =========================================================
// CLIQUE NO VÍDEO
// =========================================================

video.addEventListener(
    'click',
    () => {

        if (video.paused) {

            video.play();

            mostrarIndicadorAcao(
                'bi-play-fill',
                'Reproduzindo'
            );

        } else {

            video.pause();

            mostrarIndicadorAcao(
                'bi-pause-fill',
                'Pausado'
            );

        }

        mostrarControles();

    }
);


// =========================================================
// SAIR DO PLAYER
// =========================================================

player.addEventListener(
    'mouseleave',
    () => {

        if (!video.paused) {

            esconderControles();

        }

    }
);


// =========================================================
// PAUSE
// =========================================================

video.addEventListener(
    'pause',
    () => {

        clearTimeout(
            temporizadorControles
        );

        player.classList.remove(
            'controles-ocultos'
        );

        atualizarBotaoPlay();

        mostrarIndicadorAcao(
            'bi-pause-fill',
            'Pausado'
        );

    }
);


// =========================================================
// PLAY
// =========================================================

video.addEventListener(
    'play',
    () => {

        atualizarBotaoPlay();

        if (inicioVideo) {

            mostrarIndicadorAcao(
                'bi-play-fill',
                'Reproduzindo'
            );

        }

    }
);


// =========================================================
// INDICADOR DE AÇÃO
// =========================================================

const indicadorAcao =
    document.querySelector(
        '#indicadorAcao'
    );

const iconeAcao =
    indicadorAcao.querySelector('i');

const textoAcao =
    indicadorAcao.querySelector('span');


function mostrarIndicadorAcao(
    icone,
    texto
) {

    clearTimeout(
        temporizadorAcao
    );

    iconeAcao.className =
        `bi ${icone}`;

    textoAcao.textContent =
        texto;

    indicadorAcao.classList.add(
        'ativo'
    );

    temporizadorAcao =
        setTimeout(() => {

            indicadorAcao.classList.remove(
                'ativo'
            );

        }, 700);

}


// =========================================================
// CONFIGURAÇÕES
// =========================================================

const btnConfiguracoes =
    document.querySelector(
        '#btnConfiguracoes'
    );

const menuConfiguracoes =
    document.querySelector(
        '#menuConfiguracoes'
    );

const opcoesConfiguracao =
    document.querySelectorAll(
        '.config-opcao'
    );


// =========================================================
// ABRIR / FECHAR CONFIGURAÇÕES
// =========================================================

btnConfiguracoes.addEventListener(
    'click',
    (evento) => {

        evento.stopPropagation();

        menuConfiguracoes.classList.toggle(
            'aberto'
        );

        mostrarControles();

    }
);


document.addEventListener(
    'click',
    (evento) => {

        if (
            !menuConfiguracoes.contains(
                evento.target
            ) &&
            evento.target !== btnConfiguracoes
        ) {

            menuConfiguracoes.classList.remove(
                'aberto'
            );

        }

    }
);


// =========================================================
// VELOCIDADE
// =========================================================

const configVelocidade =
    document.querySelector(
        '#configVelocidade'
    );

const menuVelocidade =
    document.querySelector(
        '#menuVelocidade'
    );

const voltarVelocidade =
    document.querySelector(
        '#voltarVelocidade'
    );

const opcoesVelocidade =
    document.querySelectorAll(
        '.velocidade-opcao'
    );


// =========================================================
// ABRIR VELOCIDADE
// =========================================================

configVelocidade.addEventListener(
    'click',
    () => {

        menuConfiguracoes.classList.remove(
            'aberto'
        );

        menuVelocidade.classList.add(
            'aberto'
        );

        mostrarControles();

    }
);


// =========================================================
// VOLTAR
// =========================================================

voltarVelocidade.addEventListener(
    'click',
    () => {

        menuVelocidade.classList.remove(
            'aberto'
        );

        menuConfiguracoes.classList.add(
            'aberto'
        );

    }
);


// =========================================================
// SELECIONAR VELOCIDADE
// =========================================================

opcoesVelocidade.forEach(
    (opcao) => {

        opcao.addEventListener(
            'click',
            () => {

                const velocidade =
                    Number(
                        opcao.dataset.speed
                    );

                video.playbackRate =
                    velocidade;


                const valorVelocidade =
                    configVelocidade.querySelector(
                        'span:last-child'
                    );


                valorVelocidade.innerHTML = `
                    ${
                        velocidade === 1
                            ? 'Normal'
                            : velocidade + 'x'
                    }
                    <i class="bi bi-chevron-right"></i>
                `;


                menuVelocidade.classList.remove(
                    'aberto'
                );

                menuConfiguracoes.classList.add(
                    'aberto'
                );

                mostrarControles();

            }
        );

    }
);


// =========================================================
// TELA CHEIA
// =========================================================

function alternarTelaCheia() {

    if (!document.fullscreenElement) {

        player.requestFullscreen();

    } else {

        document.exitFullscreen();

    }

}


btnTelaCheia.addEventListener(
    'click',
    () => {

        alternarTelaCheia();

        mostrarControles();

    }
);


function atualizarIconeTelaCheia() {

    if (document.fullscreenElement) {

        iconeTelaCheia.classList.remove(
            'bi-fullscreen'
        );

        iconeTelaCheia.classList.add(
            'bi-fullscreen-exit'
        );

        btnTelaCheia.setAttribute(
            'aria-label',
            'Sair da tela cheia'
        );

    } else {

        iconeTelaCheia.classList.remove(
            'bi-fullscreen-exit'
        );

        iconeTelaCheia.classList.add(
            'bi-fullscreen'
        );

        btnTelaCheia.setAttribute(
            'aria-label',
            'Tela cheia'
        );

    }

}


document.addEventListener(
    'fullscreenchange',
    atualizarIconeTelaCheia
);


// =========================================================
// VOLUME
// =========================================================

function atualizarIconeVolume() {

    iconeVolume.classList.remove(
        'bi-volume-up-fill',
        'bi-volume-down-fill',
        'bi-volume-mute-fill'
    );


    if (
        video.muted ||
        video.volume === 0
    ) {

        iconeVolume.classList.add(
            'bi-volume-mute-fill'
        );

    } else if (
        video.volume < 0.5
    ) {

        iconeVolume.classList.add(
            'bi-volume-down-fill'
        );

    } else {

        iconeVolume.classList.add(
            'bi-volume-up-fill'
        );

    }

}


barraVolume.addEventListener(
    'input',
    () => {

        const volume =
            Number(
                barraVolume.value
            );

        video.volume =
            volume;

        video.muted =
            volume === 0;

        atualizarIconeVolume();

    }
);


btnVolume.addEventListener(
    'click',
    () => {

        video.muted =
            !video.muted;

        atualizarIconeVolume();

        mostrarControles();

    }
);


video.addEventListener(
    'volumechange',
    () => {

        if (!video.muted) {

            barraVolume.value =
                video.volume;

        }

        atualizarIconeVolume();

    }
);


// =========================================================
// INDICADOR DE CARREGAMENTO
// =========================================================

function mostrarCarregamento() {

    indicadorCarregamento.classList.add(
        'ativo'
    );

}


function esconderCarregamento() {

    // O carregamento inicial só termina
    // quando o autoplay dos 3 segundos terminar.

    if (carregamentoInicialAtivo) {

        return;

    }

    indicadorCarregamento.classList.remove(
        'ativo'
    );

}


// =========================================================
// EVENTOS DE CARREGAMENTO
// =========================================================

video.addEventListener(
    'waiting',
    () => {

        mostrarCarregamento();

    }
);


video.addEventListener(
    'playing',
    () => {

        esconderCarregamento();

    }
);


video.addEventListener(
    'canplay',
    () => {

        esconderCarregamento();

    }
);


video.addEventListener(
    'ended',
    () => {

        esconderCarregamento();

    }
);


// =========================================================
// AUTOPLAY INICIAL
// =========================================================

// Mostra o carregamento imediatamente
// ao abrir o player.

mostrarCarregamento();


// Aguarda 3 segundos antes de iniciar.

setTimeout(
    () => {

        inicioVideo = true;

        video.muted = false;

        video.volume = 1;

        barraVolume.value = 1;


        video.play()

            .then(
                () => {

                    carregamentoInicialAtivo =
                        false;

                    esconderCarregamento();

                }
            )

            .catch(
                () => {

                    // Fallback para navegadores
                    // que bloqueiam autoplay com áudio.

                    video.muted = true;


                    video.play()

                        .then(
                            () => {

                                carregamentoInicialAtivo =
                                    false;

                                esconderCarregamento();

                            }
                        )

                        .catch(
                            () => {

                                carregamentoInicialAtivo =
                                    false;

                                esconderCarregamento();

                            }
                        );

                }
            );

    },
    3000
);


// =========================================================
// ESTADO INICIAL
// =========================================================

atualizarBotaoPlay();

atualizarTempo();

atualizarIconeVolume();

atualizarIconeTelaCheia();


// =========================================================
// TECLADO
// =========================================================

document.addEventListener(
    'keydown',
    (evento) => {

        // Não interfere quando o usuário
        // estiver digitando.

        const elemento =
            document.activeElement;


        if (
            elemento &&
            (
                elemento.tagName === 'INPUT' ||
                elemento.tagName === 'TEXTAREA' ||
                elemento.tagName === 'SELECT'
            )
        ) {

            return;

        }


        switch (
            evento.key.toLowerCase()
        ) {


            // =================================================
            // 0 - 9
            // =================================================

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':

                evento.preventDefault();


                if (!video.duration) {

                    break;

                }


                const porcentagem =
                    Number(evento.key) * 10;


                video.currentTime =
                    (
                        porcentagem / 100
                    ) *
                    video.duration;


                mostrarIndicadorAcao(
                    'bi-skip-forward-fill',
                    `${porcentagem}%`
                );


                mostrarControles();


                break;


            // =================================================
            // ESPAÇO / K
            // =================================================

            case ' ':
            case 'k':

                evento.preventDefault();


                if (video.paused) {

                    video.play();

                } else {

                    video.pause();

                }


                mostrarControles();


                break;


            // =================================================
            // SETA ESQUERDA
            // =================================================

            case 'arrowleft':

                evento.preventDefault();


                video.currentTime =
                    Math.max(
                        0,
                        video.currentTime - 5
                    );


                mostrarIndicadorAcao(
                    'bi-rewind-fill',
                    '-5 segundos'
                );


                mostrarControles();


                break;


            // =================================================
            // SETA DIREITA
            // =================================================

            case 'arrowright':

                evento.preventDefault();


                video.currentTime =
                    Math.min(
                        video.duration ||
                            Infinity,
                        video.currentTime + 5
                    );


                mostrarIndicadorAcao(
                    'bi-fast-forward-fill',
                    '+5 segundos'
                );


                mostrarControles();


                break;


            // =================================================
            // SETA PARA CIMA
            // =================================================

            case 'arrowup':

                evento.preventDefault();


                video.muted = false;


                video.volume =
                    Math.min(
                        1,
                        video.volume + 0.1
                    );


                barraVolume.value =
                    video.volume;


                atualizarIconeVolume();

                mostrarControles();


                break;


            // =================================================
            // SETA PARA BAIXO
            // =================================================

            case 'arrowdown':

                evento.preventDefault();


                video.volume =
                    Math.max(
                        0,
                        video.volume - 0.1
                    );


                barraVolume.value =
                    video.volume;


                if (
                    video.volume === 0
                ) {

                    video.muted = true;

                }


                atualizarIconeVolume();

                mostrarControles();


                break;


            // =================================================
            // M — MUDO
            // =================================================

            case 'm':

                evento.preventDefault();


                video.muted =
                    !video.muted;


                atualizarIconeVolume();

                mostrarControles();


                break;


            // =================================================
            // F — TELA CHEIA
            // =================================================

            case 'f':

                evento.preventDefault();


                alternarTelaCheia();

                mostrarControles();


                break;

        }

    }
);