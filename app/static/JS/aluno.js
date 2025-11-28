
document.getElementById("form-aluno").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/alunos/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "/login";  // Redireciona após cadastro
        } else {
            alert("Erro: " + (result.error || "Tente novamente."));
        }

    } catch (err) {
        console.error(err);
        alert("Erro ao enviar cadastro.");
    }
});

console.log("JS carregado!");

// --- Máscara de Telefone ---
function mascaraTelefone(input) {
    let valor = input.value.replace(/\D/g, '').slice(0, 11);

    if (valor.length <= 10) {
        // Formato (XX) XXXX-XXXX
        input.value = valor.replace(
            /^(\d{0,2})(\d{0,4})(\d{0,4})$/,
            (_, ddd, p1, p2) =>
                `${ddd ? '(' + ddd : ''}${p1 ? ') ' + p1 : ''}${p2 ? '-' + p2 : ''}`
        );
    } else {
        // Formato (XX) XXXXX-XXXX
        input.value = valor.replace(
            /^(\d{0,2})(\d{0,5})(\d{0,4})$/,
            (_, ddd, p1, p2) =>
                `${ddd ? '(' + ddd : ''}${p1 ? ') ' + p1 : ''}${p2 ? '-' + p2 : ''}`
        );
    }
}

// --- Máscara de CPF ---
function mascaraCPF(input) {
    let valor = input.value.replace(/\D/g, '').slice(0, 11);

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    input.value = valor;
}

// Aplica máscara em todos inputs tipo telefone
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', e => mascaraTelefone(e.target));
});


// --- Identificador: CPF ou Outro ---
const identificadorInput = document.getElementById('identificador');
const tipoIdentificador = document.getElementById('tipo_identificador');

if (identificadorInput && tipoIdentificador) {

    identificadorInput.addEventListener('input', e => {
        let valor = e.target.value;

        if (tipoIdentificador.value === "cpf") {
            mascaraCPF(e.target);
        } else {
            // Apenas números, limite de 15 caracteres
            e.target.value = valor.replace(/\D/g, '').slice(0, 15);
        }
    });

    tipoIdentificador.addEventListener('change', () => {
        identificadorInput.value = "";
    });
}

// CPF direto no campo "cpf"
const cpfInput = document.getElementById('cpf');
if (cpfInput) {
    cpfInput.addEventListener('input', e => mascaraCPF(e.target));
}


const passwordInput = document.getElementById('senha');
const togglePassword = document.getElementById('togglePassword');

// Mostrar/ocultar senha
togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;

    togglePassword.classList.toggle('fa-eye-slash');
});
