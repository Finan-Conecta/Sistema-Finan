
// ELEMENTOS DO HTML
const botaoAbrir = document.getElementById("abrir-modal");
const modal = document.getElementById("modal-cadastro");
const botaoCancelar = document.getElementById("cancelar-cadastro");
const formulario = document.getElementById("form-associado");
const corpoTabela = document.getElementById("corpo-tabela");


// ABRIR MODAL
botaoAbrir.addEventListener("click", function() {
    modal.classList.add("ativo");
});


// FECHAR MODAL
function fecharModal() {
    modal.classList.remove("ativo");
    formulario.reset();
}

botaoCancelar.addEventListener("click", fecharModal);


// CADASTRAR ASSOCIADO
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // CAPTURAR OS VALORES DOS CAMPOS
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const vencimento = document.getElementById("dia-vencimento").value;

    // GERAR INICIAIS DO NOME
    const palavras = nome.trim().split(" ");
    const iniciais = palavras[0][0] + palavras[palavras.length - 1][0];

    // CAPTURAR DATA ATUAL
    const hoje = new Date();

    const dia = String(hoje.getDate()).padStart(2, "0");
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const ano = hoje.getFullYear();

    const dataCadastro = dia + "/" + mes + "/" + ano;


    // CRIAR NOVA LINHA
    const linha = document.createElement("tr");


    // COLUNA ASSOCIADO
    const colunaAssociado = document.createElement("td");

    const divAssociado = document.createElement("div");
    divAssociado.classList.add("associado");

    const avatar = document.createElement("span");
    avatar.classList.add("iniciais");
    avatar.textContent = iniciais;

    const nomeAssociado = document.createElement("strong");
    nomeAssociado.textContent = nome;

    divAssociado.appendChild(avatar);
    divAssociado.appendChild(nomeAssociado);
    colunaAssociado.appendChild(divAssociado);


    // COLUNA CONTATO
    const colunaContato = document.createElement("td");

    const divContato = document.createElement("div");
    divContato.classList.add("contato");

    const telefoneAssociado = document.createElement("p");
    telefoneAssociado.textContent = telefone;

    const emailAssociado = document.createElement("p");
    emailAssociado.textContent = email;

    divContato.appendChild(telefoneAssociado);
    divContato.appendChild(emailAssociado);
    colunaContato.appendChild(divContato);


    // COLUNA DATA DE CADASTRO
    const colunaData = document.createElement("td");

    const divData = document.createElement("div");
    divData.classList.add("data");

    divData.textContent = dataCadastro + " · vencimento dia " + vencimento;

    colunaData.appendChild(divData);


    // COLUNA AÇÕES
    const colunaAcoes = document.createElement("td");

    const divAcoes = document.createElement("div");
    divAcoes.classList.add("acoes");

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("editar");
    botaoEditar.type = "button";
    botaoEditar.setAttribute("aria-label", "Editar associado");

    const imagemEditar = document.createElement("img");
    imagemEditar.src = "/SistemaFinan/imgs/escrever.png";
    imagemEditar.classList.add("icon-actions-editar");

    botaoEditar.appendChild(imagemEditar);


    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("excluir");
    botaoExcluir.type = "button";
    botaoExcluir.setAttribute("aria-label", "Excluir associado");

    const imagemExcluir = document.createElement("img");
    imagemExcluir.src = "/SistemaFinan/imgs/excluir.png";
    imagemExcluir.classList.add("icon-actions-excluir");

    botaoExcluir.appendChild(imagemExcluir);


    divAcoes.appendChild(botaoEditar);
    divAcoes.appendChild(botaoExcluir);
    colunaAcoes.appendChild(divAcoes);


    // ADICIONAR COLUNAS À LINHA
    linha.appendChild(colunaAssociado);
    linha.appendChild(colunaContato);
    linha.appendChild(colunaData);
    linha.appendChild(colunaAcoes);


    // INSERIR NOVO ASSOCIADO NA TABELA
    corpoTabela.appendChild(linha);


    // FECHAR MODAL
    fecharModal();

});
