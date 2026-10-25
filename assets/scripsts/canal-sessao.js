document.addEventListener("DOMContentLoaded", () => {
    // 1. Menu Lateral e Navegação
    var MenuItem = document.querySelectorAll('aside a');
    function selectLink() {
        MenuItem.forEach((item) => item.classList.remove('active'));
        this.classList.add('active');
    }
    MenuItem.forEach((item) => item.addEventListener('click', selectLink));

    const btnExpandir = document.querySelector('.btn-menu');
    const aside = document.querySelector('aside');
    const mainContent = document.querySelector('main') || document.querySelector('.fendas-container');

    if (btnExpandir && aside) {
        btnExpandir.addEventListener('click', () => {
            aside.classList.toggle('recolhido');
            if (mainContent) mainContent.classList.toggle('recolhido');
        });
    }

    // 2. Elementos do Modal de Personalização do Canal
    const modalCanal = document.getElementById("modalPersonalizarCanal");
    const btnPersonalizar = document.getElementById("btnPersonalizarCanal");
    const btnFecharModal = document.getElementById("btnFecharModalCanal");
    const btnCancelarModal = document.getElementById("btnCancelarEdicaoCanal");
    const formCanal = document.getElementById("formPersonalizarCanal");

    // Painel Avançado
    const btnAbrirAvancado = document.getElementById("btnAbrirAvancado");
    const painelAvancado = document.getElementById("painelAvancado");

    // Inputs
    const inputCapaArquivo = document.getElementById("inputCapaArquivo");
    const inputAvatarArquivo = document.getElementById("inputAvatarArquivo");
    const inputCorDestaque = document.getElementById("inputCorDestaque");

    // Elementos visuais na tela do canal
    const elNome = document.querySelector(".dados-canal h1");
    const elUsuario = document.querySelector(".usuario-canal");
    const elDescricao = document.querySelector(".descricao-canal p");
    const elCapa = document.querySelector(".capa-canal img");
    const elAvatar = document.querySelector(".avatar-canal");

    const STORAGE_KEY = "astraelion_canal_criador";

    let novaCapaBase64 = "";
    let novoAvatarBase64 = "";

    // Carregar dados salvos no LocalStorage
    function carregarDadosCanal() {
        const dadosSalvos = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!dadosSalvos) return;

        if (elNome && dadosSalvos.nome) elNome.textContent = dadosSalvos.nome;
        if (elUsuario && dadosSalvos.usuario) elUsuario.textContent = dadosSalvos.usuario;
        if (elDescricao && dadosSalvos.descricao) elDescricao.textContent = dadosSalvos.descricao;
        
        if (elCapa && dadosSalvos.capa) {
            elCapa.src = dadosSalvos.capa;
            novaCapaBase64 = dadosSalvos.capa;
        }
        if (elAvatar && dadosSalvos.avatar) {
            elAvatar.src = dadosSalvos.avatar;
            novoAvatarBase64 = dadosSalvos.avatar;
        }

        if (inputCorDestaque && dadosSalvos.corDestaque) {
            inputCorDestaque.value = dadosSalvos.corDestaque;
            document.documentElement.style.setProperty('--cor-roxo-principal', dadosSalvos.corDestaque);
        }
    }

    // Conversor de imagem local para Base64
    function lerArquivoComoBase64(input, callback) {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => callback(e.target.result);
            reader.readAsDataURL(file);
        } else {
            callback(null);
        }
    }

    if (inputCapaArquivo) {
        inputCapaArquivo.addEventListener("change", () => {
            lerArquivoComoBase64(inputCapaArquivo, (base64) => {
                if (base64) novaCapaBase64 = base64;
            });
        });
    }

    if (inputAvatarArquivo) {
        inputAvatarArquivo.addEventListener("change", () => {
            lerArquivoComoBase64(inputAvatarArquivo, (base64) => {
                if (base64) novoAvatarBase64 = base64;
            });
        });
    }

    // Abrir/Fechar Modal
    if (btnPersonalizar && modalCanal) {
        btnPersonalizar.addEventListener("click", () => {
            const inputNome = document.getElementById("inputNomeCanal");
            const inputUsuario = document.getElementById("inputUsuarioCanal");
            const inputDescricao = document.getElementById("inputDescricaoCanal");

            if (inputNome) inputNome.value = elNome ? elNome.textContent.trim() : "";
            if (inputUsuario) inputUsuario.value = elUsuario ? elUsuario.textContent.trim() : "";
            if (inputDescricao) inputDescricao.value = elDescricao ? elDescricao.textContent.trim() : "";

            modalCanal.classList.add("ativo");
        });
    }

    function fecharModal() {
        if (modalCanal) modalCanal.classList.remove("ativo");
        if (painelAvancado) painelAvancado.hidden = true;
    }

    if (btnFecharModal) btnFecharModal.addEventListener("click", fecharModal);
    if (btnCancelarModal) btnCancelarModal.addEventListener("click", fecharModal);

    window.addEventListener("click", (e) => {
        if (e.target === modalCanal) fecharModal();
    });

    // Alternar Painel Avançado
    if (btnAbrirAvancado && painelAvancado) {
        btnAbrirAvancado.addEventListener("click", () => {
            painelAvancado.hidden = !painelAvancado.hidden;
        });
    }

    // Submeter formulário de edição do canal
    if (formCanal) {
        formCanal.addEventListener("submit", (e) => {
            e.preventDefault();

            const dadosAtuais = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

            const dadosCanal = {
                nome: document.getElementById("inputNomeCanal")?.value.trim() || "",
                usuario: document.getElementById("inputUsuarioCanal")?.value.trim() || "",
                descricao: document.getElementById("inputDescricaoCanal")?.value.trim() || "",
                capa: novaCapaBase64 || dadosAtuais.capa || "",
                avatar: novoAvatarBase64 || dadosAtuais.avatar || "",
                corDestaque: inputCorDestaque ? inputCorDestaque.value : "#8A4DFF"
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosCanal));

            carregarDadosCanal();
            fecharModal();
        });
    }

    // Inicializar carregamento dos dados do canal
    carregarDadosCanal();

    // 3. Sistema de Abas do Canal
    const categorias = document.querySelectorAll('.categoria');
    const trilhoAbas = document.querySelector('.abas-trilho');

    categorias.forEach((categoria) => {
        categoria.addEventListener('click', () => {
            categorias.forEach((item) => item.classList.remove('active'));
            categoria.classList.add('active');
            const aba = Number(categoria.dataset.aba);
            if (trilhoAbas) {
                trilhoAbas.style.transform = `translateX(-${aba * 25}%)`;
            }
        });
    });
});

// Conversor e redimensionador de imagem local para Base64 otimizado (Evita QuotaExceededError)
    function lerArquivoComRedimensionamento(input, callback) {
        const file = input.files[0];
        if (!file) {
            callback(null);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 800;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Converte para JPEG comprimido a 70% de qualidade
                const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                callback(dataUrl);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    if (inputCapaArquivo) {
        inputCapaArquivo.addEventListener("change", () => {
            lerArquivoComRedimensionamento(inputCapaArquivo, (base64) => {
                if (base64) novaCapaBase64 = base64;
            });
        });
    }

    if (inputAvatarArquivo) {
        inputAvatarArquivo.addEventListener("change", () => {
            lerArquivoComRedimensionamento(inputAvatarArquivo, (base64) => {
                if (base64) novoAvatarBase64 = base64;
            });
        });
    }
