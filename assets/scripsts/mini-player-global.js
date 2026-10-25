(() => {
  // 1. O mini player flutuante SÓ DEVE APARECER EM DISPOSITIVOS MÓVEIS (<= 768px)
  if (window.innerWidth > 768) {
    return;
  }

  // 2. Páginas onde o mini player NÃO deve aparecer de todo
  const pathAtual = window.location.pathname;
  const eTelaExcluida = pathAtual.includes("notificacao") || pathAtual.includes("configuracoes") || pathAtual.includes("watch.html");

  if (eTelaExcluida) {
    const estadoSalvo = JSON.parse(localStorage.getItem("astraelion_mini_player") || "null");
    if (estadoSalvo) {
      estadoSalvo.estaReproduzindo = false;
      localStorage.setItem("astraelion_mini_player", JSON.stringify(estadoSalvo));
    }
    return;
  }

  // 3. Verifica se existe um vídeo minimizado guardado pelo utilizador
  const dadosMini = JSON.parse(localStorage.getItem("astraelion_mini_player") || "null");
  if (!dadosMini) return;

  // 4. Injeta os estilos CSS do mini player flutuante (Apenas para mobile)
  if (!document.getElementById("estiloMiniPlayerGlobal")) {
    const estilo = document.createElement("style");
    estilo.id = "estiloMiniPlayerGlobal";
    estilo.innerHTML = `
      .mini-player-flutuante {
        position: fixed;
        bottom: 75px;
        right: 16px;
        width: 160px;
        aspect-ratio: 16 / 9;
        background: #000;
        border-radius: 12px;
        z-index: 9999;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.7), 0 0 15px rgba(138, 77, 255, 0.4);
        border: 1px solid var(--cor-borda-destaque, rgba(138, 77, 255, 0.6));
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: miniPop 0.25s ease-out;
        cursor: pointer;
      }
      .mini-player-flutuante video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .mini-player-fechar {
        position: absolute;
        top: 2px;
        right: 4px;
        background: rgba(0,0,0,0.6);
        color: #fff;
        border: none;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 10px;
        display: grid;
        place-items: center;
        cursor: pointer;
        z-index: 10000;
      }
      @keyframes miniPop {
        from { transform: scale(0.5); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(estilo);
  }

  // 5. Cria o elemento HTML do mini player se ele ainda não existir na tela
  if (!document.getElementById("miniPlayerGlobal")) {
    const miniContainer = document.createElement("div");
    miniContainer.id = "miniPlayerGlobal";
    miniContainer.className = "mini-player-flutuante";
    
    // Respeita estritamente o estado guardado: se estava pausado, não dá autoplay
    const deveReproduzir = dadosMini.estaReproduzindo ? 'autoplay' : '';

    miniContainer.innerHTML = `
      <button class="mini-player-fechar" id="fecharMiniPlayer" title="Fechar">&times;</button>
      <video id="videoMiniGlobal" src="${dadosMini.srcVideo}" playsinline ${deveReproduzir}></video>
    `;
    document.body.appendChild(miniContainer);

    const videoEl = document.getElementById("videoMiniGlobal");
    videoEl.currentTime = dadosMini.tempoAtual || 0;
    
    if (!dadosMini.estaReproduzindo) {
      videoEl.pause();
    }

    // Botão de fechar ("X")
    document.getElementById("fecharMiniPlayer").addEventListener("click", (e) => {
      e.stopPropagation();
      localStorage.removeItem("astraelion_mini_player");
      miniContainer.remove();
    });

    // Clicar no mini player expande de volta para a tela de watch
    miniContainer.addEventListener("click", () => {
      const tempoAtualDoVideo = videoEl.currentTime;
      localStorage.removeItem("astraelion_mini_player");
      window.location.href = `/assets/paginas-segundarias/watch.html?t=${tempoAtualDoVideo}`;
    });

    // Atualiza o tempo no storage
    videoEl.addEventListener("timeupdate", () => {
      dadosMini.tempoAtual = videoEl.currentTime;
      localStorage.setItem("astraelion_mini_player", JSON.stringify(dadosMini));
    });
  }
})();