
// ELEMENTOS DO HTML

const botaoAbrir = document.getElementById("abrir-modal");
const modal = document.getElementById("modal-cadastro");
const botaoCancelar = document.getElementById("cancelar-cadastro");
const formulario = document.getElementById("form-associado");
const corpoTabela = document.getElementById("corpo-tabela");

const campoBusca = document.getElementById("search-input");

const botaoAnterior = document.getElementById("pagina-anterior");
const botaoProximo = document.getElementById("proxima-pagina");
const contadorPaginas = document.getElementById("contador-paginas");

// ELEMENTOS DO MODAL DE EXCLUSÃO

const modalExcluir = document.getElementById("modal-excluir");
const botaoCancelarExclusao = document.getElementById("cancelar-exclusao");
const botaoConfirmarExclusao = document.getElementById("confirmar-exclusao");

let associadoParaExcluir = null;

// ELEMENTOS DO MODAL DE CADASTRO/EDIÇÃO

const tituloModal = document.getElementById("titulo-modal");
const descricaoModal = document.getElementById("descricao-modal");
const botaoConfirmarCadastro = document.getElementById("confirmar-cadastro");

// ASSOCIADO QUE ESTÁ SENDO EDITADO

let associadoEmEdicao = null;

// ELEMENTOS DA NOTIFICAÇÃO

const toast = document.getElementById("toast");
const toastMensagem = document.getElementById("toast-mensagem");

let temporizadorToast;

// CONFIGURAÇÕES DA PAGINAÇÃO

const associadosPorPagina = 15;
let paginaAtual = 1;


// LISTA DE ASSOCIADOS

let associados = [

    {
        nome: "Maria de Fátima Oliveira",
        telefone: "(88) 9 9123-4567",
        email: "maria.oliveira@email.com",
        cadastro: "12/02/2025",
        vencimento: "10"
    },

    {
        nome: "Ana Beatriz da Silva",
        telefone: "(88) 9 8765-4321",
        email: "ana.silva@email.com",
        cadastro: "03/03/2025",
        vencimento: "10"
    },

    {
        nome: "Joana Carla Mendes",
        telefone: "(88) 9 9888-1122",
        email: "joana.mendes@email.com",
        cadastro: "18/04/2025",
        vencimento: "10"
    },

    {
        nome: "Francisca Alves Lima",
        telefone: "(88) 9 9432-1087",
        email: "francisca.lima@email.com",
        cadastro: "21/04/2025",
        vencimento: "10"
    },

    {
        nome: "Pedro Henrique Costa",
        telefone: "(88) 9 9234-5678",
        email: "pedro.costa@email.com",
        cadastro: "05/05/2025",
        vencimento: "10"
    },

    {
        nome: "Camila Rodrigues Sousa",
        telefone: "(88) 9 9345-6789",
        email: "camila.sousa@email.com",
        cadastro: "12/05/2025",
        vencimento: "15"
    },

    {
        nome: "Lucas Gabriel Ferreira",
        telefone: "(88) 9 9456-7890",
        email: "lucas.ferreira@email.com",
        cadastro: "20/05/2025",
        vencimento: "05"
    },

    {
        nome: "Mariana Alves Pereira",
        telefone: "(88) 9 9567-8901",
        email: "mariana.pereira@email.com",
        cadastro: "02/06/2025",
        vencimento: "20"
    },

    {
        nome: "Rafael Oliveira Martins",
        telefone: "(88) 9 9678-9012",
        email: "rafael.martins@email.com",
        cadastro: "10/06/2025",
        vencimento: "25"
    },

    {
        nome: "Beatriz Carvalho Lima",
        telefone: "(88) 9 9789-0123",
        email: "beatriz.lima@email.com",
        cadastro: "18/06/2025",
        vencimento: "10"
    },

    {
        nome: "Gabriel Santos Almeida",
        telefone: "(88) 9 9890-1234",
        email: "gabriel.almeida@email.com",
        cadastro: "25/06/2025",
        vencimento: "15"
    },

    {
        nome: "Isabela Mendes Rocha",
        telefone: "(88) 9 9901-2345",
        email: "isabela.rocha@email.com",
        cadastro: "03/07/2025",
        vencimento: "05"
    },

    {
        nome: "Matheus Ribeiro Nunes",
        telefone: "(88) 9 9012-3456",
        email: "matheus.nunes@email.com",
        cadastro: "11/07/2025",
        vencimento: "20"
    },

    {
        nome: "Letícia Fernandes Costa",
        telefone: "(88) 9 9123-5678",
        email: "leticia.costa@email.com",
        cadastro: "19/07/2025",
        vencimento: "25"
    }
];


// ABRIR MODAL

botaoAbrir.addEventListener("click", function () {

    modal.classList.add("ativo");

});

// EVENTO CANCELAR
botaoCancelar.addEventListener("click", fecharModal);


// FECHAR MODAL E RESTAURAR CONFIGURAÇÕES

function fecharModal() {

    // FECHAR MODAL

    modal.classList.remove("ativo");

    // LIMPAR FORMULÁRIO

    formulario.reset();

    // CANCELAR MODO DE EDIÇÃO

    associadoEmEdicao = null;

    // RESTAURAR TÍTULO

    tituloModal.textContent = "Novo Associado";

    // RESTAURAR DESCRIÇÃO

    descricaoModal.textContent = "Preencha os dados para cadastrar um associado.";

    // RESTAURAR BOTÃO

    botaoConfirmarCadastro.textContent = "Cadastrar";

}


// FORMATAR DATA ATUAL

function obterDataAtual() {

    const hoje = new Date();

    const dia = String(hoje.getDate()).padStart(2, "0");
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const ano = hoje.getFullYear();

    return dia + "/" + mes + "/" + ano;

}

// CANCELAR EXCLUSÃO

botaoCancelarExclusao.addEventListener("click", function () {

    modalExcluir.classList.remove("ativo");

    associadoParaExcluir = null;

});


// CONFIRMAR EXCLUSÃO

botaoConfirmarExclusao.addEventListener("click", function () {

    if (associadoParaExcluir !== null) {

        // ENCONTRAR O ASSOCIADO NA LISTA

        const indice = associados.indexOf(associadoParaExcluir);

        // REMOVER ASSOCIADO

        if (indice !== -1) {

            associados.splice(indice, 1);

        }

        // ATUALIZAR TABELA

        renderizarTabela();

        // EXIBIR NOTIFICAÇÃO

        mostrarNotificacao("Associado excluído com sucesso!");

    }

    // FECHAR MODAL

    modalExcluir.classList.remove("ativo");

    associadoParaExcluir = null;

});

// EXIBIR NOTIFICAÇÃO

function mostrarNotificacao(mensagem) {

    // DEFINIR MENSAGEM

    toastMensagem.textContent = mensagem;

    // EXIBIR NOTIFICAÇÃO

    toast.classList.add("ativo");

    // CANCELAR TEMPORIZADOR ANTERIOR

    clearTimeout(temporizadorToast);

    // OCULTAR APÓS 3 SEGUNDOS

    temporizadorToast = setTimeout(function () {

        toast.classList.remove("ativo");

    }, 3000);

}

// RENDERIZAR TABELA

function renderizarTabela() {

    // FILTRAR ASSOCIADOS PELO NOME

    const pesquisa = campoBusca.value.trim().toLowerCase();

    const associadosFiltrados = associados.filter(function (associado) {

        return associado.nome.toLowerCase().includes(pesquisa);

    });


    // CALCULAR QUANTIDADE DE PÁGINAS

    const totalPaginas = Math.max(
        1,
        Math.ceil(associadosFiltrados.length / associadosPorPagina)
    );


    // GARANTIR QUE A PÁGINA ATUAL SEJA VÁLIDA

    if (paginaAtual > totalPaginas) {

        paginaAtual = totalPaginas;

    }


    // DEFINIR OS LIMITES DOS ASSOCIADOS EXIBIDOS

    const inicio = (paginaAtual - 1) * associadosPorPagina;

    const fim = inicio + associadosPorPagina;

    const associadosPagina = associadosFiltrados.slice(inicio, fim);


    // LIMPAR TABELA

    corpoTabela.innerHTML = "";


    // VERIFICAR SE EXISTEM RESULTADOS

    if (associadosPagina.length === 0) {

        const linha = document.createElement("tr");
        const coluna = document.createElement("td");

        coluna.textContent = "Nenhum associado encontrado.";

        coluna.setAttribute("colspan", "4");

        coluna.style.textAlign = "center";
        coluna.style.padding = "25px";

        linha.appendChild(coluna);
        corpoTabela.appendChild(linha);

    }


    // PERCORRER ASSOCIADOS DA PÁGINA

    associadosPagina.forEach(function (associado) {

        const linha = document.createElement("tr");


        // COLUNA ASSOCIADO

        const colunaAssociado = document.createElement("td");

        const divAssociado = document.createElement("div");
        divAssociado.classList.add("associado");

        const palavras = associado.nome.trim().split(/\s+/);

        const iniciais = palavras[0][0] +
            palavras[palavras.length - 1][0];

        const avatar = document.createElement("span");
        avatar.classList.add("iniciais");
        avatar.textContent = iniciais.toUpperCase();

        const nomeAssociado = document.createElement("strong");
        nomeAssociado.textContent = associado.nome;

        divAssociado.appendChild(avatar);
        divAssociado.appendChild(nomeAssociado);

        colunaAssociado.appendChild(divAssociado);


        // COLUNA CONTATO

        const colunaContato = document.createElement("td");

        const divContato = document.createElement("div");
        divContato.classList.add("contato");

        const telefoneAssociado = document.createElement("p");
        telefoneAssociado.textContent = associado.telefone;

        const emailAssociado = document.createElement("p");
        emailAssociado.textContent = associado.email;

        divContato.appendChild(telefoneAssociado);
        divContato.appendChild(emailAssociado);

        colunaContato.appendChild(divContato);


        // COLUNA DATA DE CADASTRO

        const colunaData = document.createElement("td");

        const divData = document.createElement("div");
        divData.classList.add("data");

        divData.textContent = associado.cadastro +
            " · vencimento dia " + associado.vencimento;

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
        imagemEditar.src = "/Sistema-Finan/SistemaFinan/imgs/escrever.png";
        imagemEditar.classList.add("icon-actions-editar");

        botaoEditar.appendChild(imagemEditar);

        // EDITAR ASSOCIADO

        botaoEditar.addEventListener("click", function () {

            // IDENTIFICAR ASSOCIADO

            associadoEmEdicao = associado;

            // PREENCHER CAMPOS COM OS DADOS ATUAIS

            document.getElementById("nome").value = associado.nome;

            document.getElementById("telefone").value = associado.telefone;

            document.getElementById("email").value = associado.email;

            document.getElementById("dia-vencimento").value = associado.vencimento;

            // ALTERAR TÍTULO E DESCRIÇÃO

            tituloModal.textContent = "Editar Associado";

            descricaoModal.textContent = "Atualize os dados do associado.";

            // ALTERAR TEXTO DO BOTÃO

            botaoConfirmarCadastro.textContent = "Salvar Alterações";

            // ABRIR MODAL

            modal.classList.add("ativo");

        });


        const botaoExcluir = document.createElement("button");
        botaoExcluir.classList.add("excluir");
        botaoExcluir.type = "button";
        botaoExcluir.setAttribute("aria-label", "Excluir associado");

        const imagemExcluir = document.createElement("img");
        imagemExcluir.src = "/Sistema-Finan/SistemaFinan/imgs/excluir.png";
        imagemExcluir.classList.add("icon-actions-excluir");

        botaoExcluir.appendChild(imagemExcluir);

        // ABRIR MODAL DE EXCLUSÃO

        botaoExcluir.addEventListener("click", function () {

            associadoParaExcluir = associado;

            modalExcluir.classList.add("ativo");

        });


        divAcoes.appendChild(botaoEditar);
        divAcoes.appendChild(botaoExcluir);

        colunaAcoes.appendChild(divAcoes);


        // ADICIONAR COLUNAS À LINHA

        linha.appendChild(colunaAssociado);
        linha.appendChild(colunaContato);
        linha.appendChild(colunaData);
        linha.appendChild(colunaAcoes);


        // INSERIR LINHA NA TABELA

        corpoTabela.appendChild(linha);

    });


    // ATUALIZAR CONTADOR DE PÁGINAS

    contadorPaginas.textContent =
        "Página " + paginaAtual + " de " + totalPaginas;


    // CONTROLAR ESTADO DAS SETAS

    botaoAnterior.disabled = paginaAtual === 1;

    botaoProximo.disabled = paginaAtual === totalPaginas;

}

// CADASTRAR OU EDITAR ASSOCIADO

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    // CAPTURAR VALORES DOS CAMPOS

    const nome = document.getElementById("nome").value.trim();

    const telefone = document.getElementById("telefone").value;

    const email = document.getElementById("email").value;

    const vencimento = document.getElementById("dia-vencimento").value;


    // VERIFICAR SE É UMA EDIÇÃO

    if (associadoEmEdicao !== null) {

        // ATUALIZAR DADOS DO ASSOCIADO

        associadoEmEdicao.nome = nome;

        associadoEmEdicao.telefone = telefone;

        associadoEmEdicao.email = email;

        associadoEmEdicao.vencimento = vencimento;

        // MANTER A DATA ORIGINAL DE CADASTRO

        // EXIBIR NOTIFICAÇÃO

        mostrarNotificacao("Dados do associado atualizados com sucesso!");

    } else {

        // CADASTRAR NOVO ASSOCIADO

        associados.push({

            nome: nome,
            telefone: telefone,
            email: email,
            cadastro: obterDataAtual(),
            vencimento: vencimento

        });

        // EXIBIR NOTIFICAÇÃO

        mostrarNotificacao("Novo associado cadastrado!");

    }


    // VOLTAR PARA A PRIMEIRA PÁGINA

    paginaAtual = 1;


    // LIMPAR PESQUISA

    campoBusca.value = "";


    // ATUALIZAR TABELA

    renderizarTabela();


    // FECHAR MODAL

    fecharModal();

});


// PESQUISAR ASSOCIADOS

campoBusca.addEventListener("input", function () {

    paginaAtual = 1;

    renderizarTabela();

});


// VOLTAR PÁGINA

botaoAnterior.addEventListener("click", function () {

    if (paginaAtual > 1) {

        paginaAtual--;

        renderizarTabela();

    }

});


// AVANÇAR PÁGINA

botaoProximo.addEventListener("click", function () {

    const pesquisa = campoBusca.value.trim().toLowerCase();

    const associadosFiltrados = associados.filter(function (associado) {

        return associado.nome.toLowerCase().includes(pesquisa);

    });

    const totalPaginas = Math.max(
        1,
        Math.ceil(associadosFiltrados.length / associadosPorPagina)
    );


    if (paginaAtual < totalPaginas) {

        paginaAtual++;

        renderizarTabela();

    }

});


// EXIBIR ASSOCIADOS INICIALMENTE

renderizarTabela();
