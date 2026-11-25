
/* ELEMENTOS DO HTML */

const formulario = document.getElementById("accessForm");
const campoCodigo = document.getElementById("accessCode");
const botaoOlho = document.getElementById("togglePassword");
const accessMessage = document.getElementById("accessMessage");
const toastText = document.getElementById("toastText");


/* CARREGAR OS ÍCONES DO LUCIDE */

lucide.createIcons();


/* MOSTRAR OU OCULTAR O CÓDIGO */

botaoOlho.addEventListener("click", function() {

    if (campoCodigo.type === "password") {

        campoCodigo.type = "text";

        botaoOlho.setAttribute("aria-label", "Ocultar código de acesso");

        botaoOlho.innerHTML = '<i data-lucide="eye-off"></i>';

    } else {

        campoCodigo.type = "password";

        botaoOlho.setAttribute("aria-label", "Mostrar código de acesso");

        botaoOlho.innerHTML = '<i data-lucide="eye"></i>';

    }

    // Atualizar os ícones do Lucide
    lucide.createIcons();

});


/* EXIBIR NOTIFICAÇÕES */

function mostrarNotificacao(mensagem, tipo, icone) {

    // Definir o texto
    toastText.textContent = mensagem;

    // Definir o tipo e o ícone
    accessMessage.className = "toast " + tipo;

    accessMessage.innerHTML =
        `<i data-lucide="${icone}"></i>
         <span id="toastText">${mensagem}</span>`;

    // Atualizar o ícone Lucide
    lucide.createIcons();

    // Exibir notificação
    accessMessage.classList.add("show");

    // Ocultar após 3 segundos
    setTimeout(function() {
        accessMessage.classList.remove("show");
    }, 3000);
}



/* CÓDIGO DE ACESSO AUTORIZADO */

const codigoCorreto = "@amaqFi26";


/* VERIFICAÇÃO DO FORMULÁRIO */

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigoDigitado = campoCodigo.value;

    if (codigoDigitado === codigoCorreto) {

        // Notificação de sucesso
        mostrarNotificacao(
            "Acesso autorizado! Bem-vinda ao Finan.",
            "success",
            "check-circle"
        );

        // Redirecionar após a notificação
        setTimeout(function() {
            window.location.href = "../dashboard/dashboard.html";
        }, 1500);

    } else {

        // Notificação de erro
        mostrarNotificacao(
            "Código de acesso incorreto. Tente novamente.",
            "error",
            "alert-circle"
        );

        // Limpar o campo
        campoCodigo.value = "";

        // Manter o foco
        campoCodigo.focus();

    }

});
