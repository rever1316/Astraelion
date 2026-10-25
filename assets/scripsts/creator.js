(() => {
  // 1. Injetar o estilo CSS utilizando 100% as variáveis globais do vars.css
  if (!document.getElementById("estiloPopoverCriacao")) {
    const estiloPopover = document.createElement("style");
    estiloPopover.id = "estiloPopoverCriacao";
    estiloPopover.innerHTML = `
      .popover-criacao {
        position: fixed;
        top: 60px;
        right: 80px;
        z-index: 2000;
        width: 320px;
        background-color: var(--cor-fundo-cartao, #151027);
        border: 1px solid var(--cor-borda-padrao, rgba(138, 77, 255, 0.3));
        border-radius: 18px;
        padding: 12px;
        box-shadow: 0 15px 35px var(--cor-sombra-forte, rgba(0, 0, 0, 0.5));
        backdrop-filter: blur(12px);
        display: none;
        flex-direction: column;
        gap: 4px;
        animation: popoverFadeIn 0.2s ease-out;
      }

      .popover-criacao:not([hidden]) {
        display: flex;
      }

      .popover-cabecalho {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px 12px;
        border-bottom: 1px solid var(--cor-divisor, #1D1136);
        margin-bottom: 6px;
      }

      .popover-cabecalho span {
        font-size: 11px;
        letter-spacing: 1px;
        color: var(--cor-roxo-claro, #B06EFF);
        text-transform: uppercase;
        font-weight: bold;
      }

      .popover-puxador-mobile {
        display: none;
        width: 36px;
        height: 4px;
        background: rgba(176, 110, 255, 0.3);
        border-radius: 2px;
        margin: 0 auto 8px auto;
      }

      .popover-opcao {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        border-radius: 12px;
        text-decoration: none;
        color: var(--cor-texto-principal, #FFF);
        transition: all 0.2s ease;
        cursor: pointer;
      }

      .popover-opcao:hover, .popover-opcao:active {
        background-color: var(--cor-fundo-hover, #32205F);
      }

      .popover-opcao-icone {
        display: grid;
        place-items: center;
        width: 36px;
        height: 36px;
        border-radius: 10px;
        background: rgba(138, 77, 255, 0.15);
        color: var(--cor-roxo-claro, #B06EFF);
        font-size: 18px;
        flex-shrink: 0;
        transition: 0.2s;
      }

      .popover-opcao:hover .popover-opcao-icone {
        background: var(--cor-roxo-principal, #8A4DFF);
        color: #FFF;
      }

      .popover-opcao-info {
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 2px;
      }

      .popover-opcao-info strong {
        font-size: 12px;
        font-weight: 400;
        color: var(--cor-texto-destaque, #FCFCFC);
      }

      .popover-opcao-info small {
        font-size: 10px;
        color: var(--cor-texto-suave, #81798F);
        line-height: 1.3;
      }

      .popover-opcao .seta-indicador {
        font-size: 12px;
        color: var(--cor-texto-suave, #81798F);
        transition: transform 0.2s;
      }

      .popover-opcao:hover .seta-indicador {
        color: var(--cor-roxo-claro, #B06EFF);
        transform: translateX(3px);
      }

      @keyframes popoverFadeIn {
        from { opacity: 0; transform: translateY(-8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes popoverSlideUp {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }

      .popover-backdrop-mobile {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(9, 9, 18, 0.7);
        backdrop-filter: blur(4px);
        z-index: 1999;
      }

      @media (max-width: 600px) {
        .popover-backdrop-mobile:not([hidden]) {
          display: block;
        }

        .popover-criacao {
          position: fixed !important;
          top: auto !important;
          bottom: 0 !important;
          left: 0 !important;
          right: 0 !important;
          width: 100% !important;
          max-width: 100% !important;
          border-radius: 22px 22px 0 0 !important;
          border-bottom: none !important;
          padding: 16px 16px 32px 16px !important;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.8) !important;
          animation: popoverSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .popover-puxador-mobile {
          display: block;
        }

        .popover-opcao {
          padding: 14px 12px;
        }

        .popover-opcao-icone {
          width: 42px;
          height: 42px;
          font-size: 20px;
        }

        .popover-opcao-info strong {
          font-size: 13px;
        }

        .popover-opcao-info small {
          font-size: 11px;
        }
      }
    `;
    document.head.appendChild(estiloPopover);
  }

  // 2. Injetar a Estrutura HTML do Balão e Backdrop
  if (!document.getElementById("popoverCriacao")) {
    const backdrop = document.createElement("div");
    backdrop.className = "popover-backdrop-mobile";
    backdrop.id = "popoverBackdropMobile";
    backdrop.hidden = true;
    document.body.appendChild(backdrop);

    const containerPopover = document.createElement("div");
    containerPopover.className = "popover-criacao";
    containerPopover.id = "popoverCriacao";
    containerPopover.hidden = true;

    containerPopover.innerHTML = `
      <div class="popover-puxador-mobile"></div>
      <div class="popover-cabecalho">
        <span>Central de Criação</span>
      </div>

      <a href="/assets/paginas-segundarias/transmitir.html" class="popover-opcao">
        <div class="popover-opcao-icone"><i class="bi bi-broadcast"></i></div>
        <div class="popover-opcao-info">
          <strong>Transmitir ao vivo</strong>
          <small>Iniciar live com gravador e chat</small>
        </div>
        <i class="bi bi-chevron-right seta-indicador"></i>
      </a>

      <a href="/assets/paginas-segundarias/publicar-video.html" class="popover-opcao">
        <div class="popover-opcao-icone"><i class="bi bi-cloud-arrow-up"></i></div>
        <div class="popover-opcao-info">
          <strong>Publicar vídeo</strong>
          <small>Propagar frequências no feed</small>
        </div>
        <i class="bi bi-chevron-right seta-indicador"></i>
      </a>

      <a href="/assets/paginas-segundarias/publicar-fendas.html" class="popover-opcao">
        <div class="popover-opcao-icone"><i class="bi bi-vinyl"></i></div>
        <div class="popover-opcao-info">
          <strong>Criar fenda</strong>
          <small>Abrir anomalia ou post rápido</small>
        </div>
        <i class="bi bi-chevron-right seta-indicador"></i>
      </a>
    `;
    document.body.appendChild(containerPopover);
  }

  // 3. Lógica unificada para acionar pelo Header ou pela barra inferior mobile
  const popover = document.getElementById("popoverCriacao");
  const backdrop = document.getElementById("popoverBackdropMobile");

  function fecharPopover() {
    popover.hidden = true;
    if (backdrop) backdrop.hidden = true;
  }

  function abrirPopover(btnTarget) {
    const isMobile = window.innerWidth <= 600;

    if (!isMobile && btnTarget) {
      const rect = btnTarget.getBoundingClientRect();
      popover.style.top = `${rect.bottom + 10}px`;
      popover.style.right = `${window.innerWidth - rect.right}px`;
    }

    popover.hidden = false;
    if (backdrop) backdrop.hidden = false;
  }

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".btn-user, .btn-user-painel, .item-postar-mobile, [title='Transmitir'], [title='Central de Criação']");

    if (trigger) {
      e.preventDefault();
      e.stopPropagation();

      if (popover.hidden) {
        abrirPopover(trigger);
      } else {
        fecharPopover();
      }
      return;
    }

    if ((e.target === backdrop || !e.target.closest("#popoverCriacao")) && !popover.hidden) {
      fecharPopover();
    }
  });

  window.addEventListener("resize", () => {
    if (!popover.hidden && window.innerWidth > 600) {
      fecharPopover();
    }
  });
})();