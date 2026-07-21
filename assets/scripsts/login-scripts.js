function validarLogin() {
    // pega valores dos campos preenchidos tirando os espaços usando trim()
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // Verifica se algum dos dois está vazio
    if (email === '' || senha === '') {
        alert('Por favor, preencha todos os campos para prosseguir!');
        return; // Para a execução aqui e não prossegue
    }

    alert('Campos preenchidos! Prosseguindo...');
    window.location.href = "index.html";
}