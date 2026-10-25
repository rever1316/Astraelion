(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  const modalTela = $("#modalSeletorTela");
  const btnAbrirModal = $("#btnAbrirSeletorTela");
  const btnFecharModal = $("#btnCancelarModalTela");
  const btnConfirmarModal = $("#btnConfirmarModalTela");
  const cardsOpcao = $$(".card-opcao-fonte");
  const tagModoOverlay = $("#tagModoOverlay");

  // Abrir modal estilo Discord
  btnAbrirModal.addEventListener("click", () => {
    modalTela.hidden = false;
  });

  // Fechar modal
  btnFecharModal.addEventListener("click", () => {
    modalTela.hidden = true;
  });

  // Seleção visual dos cards no modal
  cardsOpcao.forEach(card => {
    card.addEventListener("click", () => {
      cardsOpcao.forEach(c => c.classList.remove("selecionado"));
      card.classList.add("selecionado");
      const radio = card.querySelector("input[type='radio']");
      if (radio) radio.checked = true;
    });
  });

  // Confirmar escolha do modo de tela/overlay
  btnConfirmarModal.addEventListener("click", () => {
    const selecionado = document.querySelector("input[name='fonteCaptura']:checked");
    if (selecionado) {
      const modoVal = selecionado.value;
      if (modoVal === "app") {
        tagModoOverlay.textContent = "Modo: Aplicativo Específico";
      } else if (modoVal === "gravador") {
        tagModoOverlay.textContent = "Modo: Apenas no Gravador";
      } else if (modoVal === "todas") {
        tagModoOverlay.textContent = "Modo: Fixado em Todas as Telas";
      }
    }
    modalTela.hidden = true;
  });

  // Ligar/Desligar câmera de prévia (simulada via WebRTC)
  let streamAtivo = null;
  $("#btnAtivarCamera").addEventListener("click", async () => {
    const videoElem = $("#webcamPreview");
    try {
      if (!streamAtivo) {
        streamAtivo = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        videoElem.srcObject = streamAtivo;
        $("#btnAtivarCamera").innerHTML = '<i class="bi bi-camera-video-off"></i> Desligar Câmera';
      } else {
        streamAtivo.getTracks().forEach(track => track.stop());
        streamAtivo = null;
        videoElem.srcObject = null;
        $("#btnAtivarCamera").innerHTML = '<i class="bi bi-camera-video"></i> Ligar Câmera';
      }
    } catch (err) {
      alert("Não foi possível acessar a câmera no momento.");
    }
  });

  // Simulação de Iniciar Live
  let aoVivo = false;
  $("#btnIniciarLive").addEventListener("click", () => {
    aoVivo = !aoVivo;
    const badgeAoVivo = $(".live-badge-ao-vivo");
    const btnLive = $("#btnIniciarLive");

    if (aoVivo) {
      badgeAoVivo.hidden = false;
      btnLive.innerHTML = '<i class="bi bi-stop-circle"></i> Encerrar Transmissão';
      btnLive.style.background = "linear-gradient(110deg, #E84055, #FF5B73)";
    } else {
      badgeAoVivo.hidden = true;
      btnLive.innerHTML = '<i class="bi bi-broadcast"></i> Iniciar Transmissão';
      btnLive.style.background = "linear-gradient(110deg, #7540E8, #9D5BFF)";
    }
  });

  // Envio de eco no chat
  const inputChat = $("#inputChat");
  const containerChat = $("#chatMensagens");

  function enviarMensagemChat() {
    const texto = inputChat.value.trim();
    if (!texto) return;

    const div = document.createElement("div");
    div.className = "mensagem-chat";
    div.innerHTML = `<strong>Você (Comandante)</strong>: <span>${texto}</span>`;
    containerChat.appendChild(div);
    inputChat.value = "";
    containerChat.scrollTop = containerChat.scrollHeight;
  }

  $("#btnEnviarEco").addEventListener("click", enviarMensagemChat);
  inputChat.addEventListener("keypress", e => {
    if (e.key === "Enter") enviarMensagemChat();
  });
})();

(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  const modalTela = $("#modalSeletorTela");
  const btnAbrirModal = $("#btnAbrirSeletorTela");
  const btnFecharModal = $("#btnCancelarModalTela");
  const btnConfirmarModal = $("#btnConfirmarModalTela");
  const cardsOpcao = $$(".card-opcao-fonte");
  const tagModoOverlay = $("#tagModoOverlay");

  // Contadores do formulário (Título e Descrição)
  const inputTitulo = $("#tituloLive");
  const contadorTitulo = $("#contadorTitulo");
  if (inputTitulo) {
    inputTitulo.addEventListener("input", e => {
      contadorTitulo.textContent = `${e.target.value.length} / 100`;
    });
  }

  const inputDescricao = $("#descricaoLive");
  const contadorDescricao = $("#contadorDescricao");
  if (inputDescricao) {
    inputDescricao.addEventListener("input", e => {
      contadorDescricao.textContent = `${e.target.value.length} / 5000`;
    });
  }

  // Copiar Chave de Transmissão e URL
  $("#btnCopiarUrl").addEventListener("click", () => {
    navigator.clipboard.writeText($("#urlServidor").value);
    alert("URL do Servidor copiada para a área de transferência!");
  });

  $("#btnCopiarChave").addEventListener("click", () => {
    navigator.clipboard.writeText($("#chaveTransmissao").value);
    alert("Chave de Transmissão copiada com sucesso!");
  });

  // Mostrar / Ocultar Chave de Transmissão
  $("#btnMostrarChave").addEventListener("click", () => {
    const inputChave = $("#chaveTransmissao");
    if (inputChave.type === "password") {
      inputChave.type = "text";
      $("#btnMostrarChave").innerHTML = '<i class="bi bi-eye-slash"></i>';
    } else {
      inputChave.type = "password";
      $("#btnMostrarChave").innerHTML = '<i class="bi bi-eye"></i>';
    }
  });

  // Modal estilo Discord
  btnAbrirModal.addEventListener("click", () => modalTela.hidden = false);
  btnFecharModal.addEventListener("click", () => modalTela.hidden = true);

  cardsOpcao.forEach(card => {
    card.addEventListener("click", () => {
      cardsOpcao.forEach(c => c.classList.remove("selecionado"));
      card.classList.add("selecionado");
      const radio = card.querySelector("input[type='radio']");
      if (radio) radio.checked = true;
    });
  });

  btnConfirmarModal.addEventListener("click", () => {
    const selecionado = document.querySelector("input[name='fonteCaptura']:checked");
    if (selecionado) {
      const modoVal = selecionado.value;
      if (modoVal === "app") tagModoOverlay.textContent = "Modo: Aplicativo Específico";
      else if (modoVal === "gravador") tagModoOverlay.textContent = "Modo: Apenas no Gravador";
      else if (modoVal === "todas") tagModoOverlay.textContent = "Modo: Fixado em Todas as Telas";
    }
    modalTela.hidden = true;
  });

  // Câmera Preview
  let streamAtivo = null;
  $("#btnAtivarCamera").addEventListener("click", async () => {
    const videoElem = $("#webcamPreview");
    try {
      if (!streamAtivo) {
        streamAtivo = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        videoElem.srcObject = streamAtivo;
        $("#btnAtivarCamera").innerHTML = '<i class="bi bi-camera-video-off"></i> Desligar Câmera';
      } else {
        streamAtivo.getTracks().forEach(track => track.stop());
        streamAtivo = null;
        videoElem.srcObject = null;
        $("#btnAtivarCamera").innerHTML = '<i class="bi bi-camera-video"></i> Ligar Câmera';
      }
    } catch (err) {
      alert("Não foi possível acessar a câmera no momento.");
    }
  });

  // Iniciar Live
  let aoVivo = false;
  $("#btnIniciarLive").addEventListener("click", () => {
    if (!inputTitulo.value.trim()) {
      alert("Por favor, insira um Título para a Transmissão antes de ir ao ar.");
      inputTitulo.focus();
      return;
    }

    aoVivo = !aoVivo;
    const badgeAoVivo = $(".live-badge-ao-vivo");
    const btnLive = $("#btnIniciarLive");
    const statusSync = $("#statusSincronizacao");

    if (aoVivo) {
      badgeAoVivo.hidden = false;
      btnLive.innerHTML = '<i class="bi bi-stop-circle"></i> Encerrar Transmissão';
      btnLive.style.background = "linear-gradient(110deg, #E84055, #FF5B73)";
      statusSync.innerHTML = '<i class="bi bi-broadcast"></i> Transmitindo ao vivo...';
      statusSync.style.color = "#FF4568";
      statusSync.style.borderColor = "rgba(255, 69, 104, 0.3)";
    } else {
      badgeAoVivo.hidden = true;
      btnLive.innerHTML = '<i class="bi bi-broadcast"></i> Iniciar Transmissão';
      btnLive.style.background = "linear-gradient(110deg, #7540E8, #9D5BFF)";
      statusSync.innerHTML = '<i class="bi bi-link"></i> Gravador Sincronizado';
      statusSync.style.color = "var(--cor-status-sucesso)";
      statusSync.style.borderColor = "rgba(168, 230, 193, 0.3)";
    }
  });

  // Chat
  const inputChat = $("#inputChat");
  const containerChat = $("#chatMensagens");

  function enviarMensagemChat() {
    const texto = inputChat.value.trim();
    if (!texto) return;

    const div = document.createElement("div");
    div.className = "mensagem-chat";
    div.innerHTML = `<strong>Você (Comandante)</strong>: <span>${texto}</span>`;
    containerChat.appendChild(div);
    inputChat.value = "";
    containerChat.scrollTop = containerChat.scrollHeight;
  }

  $("#btnEnviarEco").addEventListener("click", enviarMensagemChat);
  inputChat.addEventListener("keypress", e => {
    if (e.key === "Enter") enviarMensagemChat();
  });
})();