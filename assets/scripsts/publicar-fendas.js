(() => {
  const $ = s => document.querySelector(s);
  const form = $("#formFenda"), inputVideo = $("#arquivoVideo"), zona = $("#zonaUpload");
  const bloco = $("#arquivoSelecionado"), video = $("#videoPreview"), msg = $("#mensagemFormulario");
  let videoURL = null, imageURL = null;

  function mensagem(texto, erro = false) {
    msg.textContent = texto;
    msg.classList.add("visivel");
    msg.classList.toggle("erro", erro);
  }

  function limparMensagem() { 
    msg.textContent = ""; 
    msg.classList.remove("visivel", "erro"); 
  }

  function abrirModalConfirmacao() {
    return new Promise((resolve) => {
      const modal = $("#modalConfirmacao");
      modal.style.display = "flex";

      const btnSim = $("#modalBtnConfirmar");
      const btnNao = $("#modalBtnCancelar");

      const limparEventos = () => {
        modal.style.display = "none";
        btnSim.removeEventListener("click", onSim);
        btnNao.removeEventListener("click", onNao);
      };

      const onSim = () => { limparEventos(); resolve(true); };
      const onNao = () => { limparEventos(); resolve(false); };

      btnSim.addEventListener("click", onSim);
      btnNao.addEventListener("click", onNao);
    });
  }

  function tamanho(bytes) {
    return bytes < 1048576 ? `${(bytes / 1024).toFixed(1)} KB` :
      bytes < 1073741824 ? `${(bytes / 1048576).toFixed(1)} MB` : `${(bytes / 1073741824).toFixed(2)} GB`;
  }

  function selecionarVideo(file) {
    limparMensagem();
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      return mensagem("Sintonize um arquivo de frequência de vídeo compatível.", true);
    }

    if (videoURL) URL.revokeObjectURL(videoURL);
    videoURL = URL.createObjectURL(file);
    video.src = videoURL;

    $("#nomeArquivo").textContent = file.name;
    $("#detalhesArquivo").textContent = `${tamanho(file.size)} · Fenda pronta para abertura`;
    zona.hidden = true;
    bloco.hidden = false;
    $("#statusRascunho").innerHTML = '<i class="bi bi-cloud-check"></i> Fenda sintonizada na órbita local';
  }

  function removerVideo() {
    video.pause();
    video.removeAttribute("src");
    video.load();

    if (videoURL) URL.revokeObjectURL(videoURL);
    videoURL = null;
    inputVideo.value = "";
    bloco.hidden = true;
    zona.hidden = false;
    $("#statusRascunho").innerHTML = '<i class="bi bi-cloud-check"></i> Anomalia pronta para abertura';
  }

  $("#btnSelecionarVideo").addEventListener("click", () => inputVideo.click());
  $("#btnTrocarVideo").addEventListener("click", () => inputVideo.click());
  $("#btnRemoverVideo").addEventListener("click", removerVideo);

  zona.addEventListener("click", e => { if (!e.target.closest("button")) inputVideo.click(); });
  zona.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputVideo.click();
    }
  });

  inputVideo.addEventListener("change", () => selecionarVideo(inputVideo.files[0]));

  ["dragenter", "dragover"].forEach(ev => zona.addEventListener(ev, e => { e.preventDefault(); zona.classList.add("arrastando"); }));
  ["dragleave", "drop"].forEach(ev => zona.addEventListener(ev, e => { e.preventDefault(); zona.classList.remove("arrastando"); }));
  zona.addEventListener("drop", e => selecionarVideo(e.dataTransfer.files[0]));

  $("#tituloVideo").addEventListener("input", e => {
    $("#contadorTitulo").textContent = `${e.target.value.length} / 100`;
    limparMensagem();
  });

  $("#descricaoVideo").addEventListener("input", e => {
    $("#contadorDescricao").textContent = `${e.target.value.length} / 2000`;
    limparMensagem();
  });

  $("#btnSelecionarMiniatura").addEventListener("click", () => $("#miniaturaVideo").click());

  $("#miniaturaVideo").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      return mensagem("Selecione um formato de imagem válido para a capa da fenda.", true);
    }

    if (imageURL) URL.revokeObjectURL(imageURL);
    imageURL = URL.createObjectURL(file);

    const img = document.createElement("img");
    img.src = imageURL;
    img.alt = "Projeção de capa";

    $("#miniaturaPreview").replaceChildren(img);
    $("#btnRemoverMiniatura").hidden = false;
    limparMensagem();
  });

  $("#btnRemoverMiniatura").addEventListener("click", () => {
    if (imageURL) URL.revokeObjectURL(imageURL);
    imageURL = null;
    $("#miniaturaVideo").value = "";
    $("#miniaturaPreview").innerHTML = '<i class="bi bi-image"></i><span>Projeção de Capa</span>';
    $("#btnRemoverMiniatura").hidden = true;
  });

  $("#btnLimpar").addEventListener("click", async (e) => {
    e.preventDefault();
    const confirmado = await abrirModalConfirmacao();
    if (!confirmado) return;

    form.reset();
    removerVideo();
    $("#btnRemoverMiniatura").click();
    $("#contadorTitulo").textContent = "0 / 100";
    $("#contadorDescricao").textContent = "0 / 2000";
    limparMensagem();
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    limparMensagem();

    if (!inputVideo.files[0]) {
      mensagem("Sintonize uma frequência de vídeo antes de abrir a fenda.", true);
      zona.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!$("#tituloVideo").value.trim()) {
      $("#tituloVideo").focus();
      mensagem("Insira um título para identificar sua fenda no cosmos.", true);
      return;
    }

    const dados = {
      arquivo: inputVideo.files[0].name,
      titulo: $("#tituloVideo").value.trim(),
      descricao: $("#descricaoVideo").value.trim(),
      constelacao: $("#categoriaVideo").value,
      esferaAlcance: form.querySelector('input[name="visibilidade"]:checked').value,
      hologramaCapa: $("#miniaturaVideo").files[0]?.name || null
    };

    console.info("Fenda materializada com sucesso:", dados);
    mensagem("Fenda aberta e integrada no tecido espacial do Astraelion!");
  });

  window.addEventListener("beforeunload", () => {
    if (videoURL) URL.revokeObjectURL(videoURL);
    if (imageURL) URL.revokeObjectURL(imageURL);
  });
})();