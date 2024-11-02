// Função para adicionar uma nova UC
function adicionarUC() {
    const uc = prompt("Digite o nome da nova UC:");
    if (uc) {
        const lista = document.getElementById("lista-ucs");
        const novoItem = document.createElement("li");
        novoItem.setAttribute("draggable", "true");
        novoItem.setAttribute("ondragstart", "drag(event)");
        novoItem.innerHTML = `${uc} <button onclick="removerUC(this)">Remover</button>`;
        lista.appendChild(novoItem);
    }
}

// Função para remover uma UC
function removerUC(botao) {
    const li = botao.parentElement;
    li.parentElement.removeChild(li);
}

// Funções para arrastar e soltar
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.outerHTML);
    event.dataTransfer.setData("index", Array.from(event.target.parentElement.children).indexOf(event.target));
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const index = event.dataTransfer.getData("index");
    const target = event.target.closest("li");

    if (target && target !== event.target) {
        const newItem = document.createElement("li");
        newItem.innerHTML = data;
        newItem.setAttribute("draggable", "true");
        newItem.setAttribute("ondragstart", "drag(event)");

        const parent = target.parentElement;

        if (Array.from(parent.children).indexOf(target) < index) {
            parent.insertBefore(newItem, target.nextSibling);
        } else {
            parent.insertBefore(newItem, target);
        }
        parent.removeChild(parent.children[index]);
    }
}

// Função para validar CPF
function validarCPF(input) {
    const cpf = input.value.replace(/\D/g, ''); // Remove caracteres que não são numéricos
    const erroSpan = document.getElementById("cpf-erro");

    // Verifica se o CPF tem os 11 dígitos
    if (cpf.length !== 11) {
        erroSpan.style.display = 'inline';
        return false;
    }

    // Máscara do CPF
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Regex para CPF com máscara
    if (!regex.test(input.value)) {
        erroSpan.style.display = 'inline';
        return false;
    } else {
        erroSpan.style.display = 'none';
    }

    // Validação do CPF (algoritmo simples)
    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9))) {
        erroSpan.style.display = 'inline';
        return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(10))) {
        erroSpan.style.display = 'inline';
        return false;
    }

    erroSpan.style.display = 'none';
    return true;
}

// Função para validar o e-mail
function validarEmail(input) {
    const email = input.value;
    const erroSpan = document.getElementById("email-erro");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Caracteres para validação de e-mail

    if (!regex.test(email)) {
        erroSpan.style.display = 'inline';
        return false;
    } else {
        erroSpan.style.display = 'none';
    }

    return true;
}

// Função para adicionar nova descrição
function adicionarDescricao() {
    const novaDescricao = document.getElementById("nova-descricao").value.trim();
    if (novaDescricao) {
        const descricaoMim = document.getElementById("descricao-mim");
        descricaoMim.innerHTML += `<br>${novaDescricao}`; 
        document.getElementById("nova-descricao").value = ''; 
    }
}
