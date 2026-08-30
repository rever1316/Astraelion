function validarCadastro() {
    // Pega os valores de todos os campos removendo espaços extras
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const confirmaSenha = document.getElementById('confirmaSenha').value.trim();

    // Verifica se algum campo está vazio
    if (nome === '' || email === '' || senha === '' || confirmaSenha === '') {
        alert('Por favor, preencha todos os campos para forjar sua chave!');
        return; // Para a execução
    }

    // Verifica se as senhas coincidem
    if (senha !== confirmaSenha) {
        alert('Os códigos de segurança da chave não coincidem. Verifique e tente novamente!');
        return; // Para a execução
    }

    // Se tudo estiver certo, avisa o viajante e redireciona para a página principal (ou tela de login)
    alert('Chave forjada com sucesso! Bem-vindo ao universo, Viajante.');
    window.location.href = "index.html"; // Altere para "login.html" se preferir mandar para o login
}