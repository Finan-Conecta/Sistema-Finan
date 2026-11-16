
// ELEMENTOS DO HTML

const corpoTabela = document.getElementById("corpo-tabela");

const campoBusca = document.getElementById("search-input");

const filtroAno = document.getElementById("filtro-ano");
const filtroMes = document.getElementById("filtro-mes");
const filtroStatus = document.getElementById("filtro-status");

const botaoAnterior = document.getElementById("pagina-anterior");
const botaoProximo = document.getElementById("proxima-pagina");

const contadorPaginas = document.getElementById("contador-paginas");

const tituloMensalidades = document.getElementById("titulo-mensalidades");


// ELEMENTOS DO MODAL

const modalEdicao = document.getElementById("modal-edicao");

const formulario = document.getElementById("form-pagamento");

const botaoCancelar = document.getElementById("cancelar-edicao");

const nomeAssociado = document.getElementById("nome-associado");
const valorPagamento = document.getElementById("valor-pagamento");

const statusPagamento = document.getElementById("status-pagamento");
const dataPagamento = document.getElementById("data-pagamento");


// ELEMENTOS DA NOTIFICAÇÃO

const toast = document.getElementById("toast");
const toastMensagem = document.getElementById("toast-mensagem");

let temporizadorToast;


// CONFIGURAÇÕES DA PAGINAÇÃO

const pagamentosPorPagina = 15;

let paginaAtual = 1;


// MÊS E ANO ATUAL

const hoje = new Date();

const mesAtual = hoje.getMonth() + 1;
const anoAtual = hoje.getFullYear();


// PAGAMENTO QUE ESTÁ SENDO EDITADO

let pagamentoEmEdicao = null;


// LISTA DE MESES

const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];


// CRIAR DATA NO FORMATO ISO

function criarDataISO(ano, mes, dia) {

    return ano + "-" +
        String(mes).padStart(2, "0") + "-" +
        String(dia).padStart(2, "0");

}


// FORMATAR DATA PARA BRASILEIRO

function formatarData(data) {

    if (!data) {
        return "Não pago";
    }

    const partes = data.split("-");

    return partes[2] + "/" + partes[1] + "/" + partes[0];

}


// OBTER DATA ATUAL

function obterDataAtual() {

    const dia = String(hoje.getDate()).padStart(2, "0");

    const mes = String(hoje.getMonth() + 1).padStart(2, "0");

    const ano = hoje.getFullYear();

    return ano + "-" + mes + "-" + dia;

}


// LISTA DE PAGAMENTOS

const pagamentos = [

    {
        associado: "Maria de Fátima Oliveira",
        valor: 30.00,
        diaVencimento: 10,
        dataPagamento: criarDataISO(anoAtual, mesAtual, 5),
        status: "efetuado"
    },

    {
        associado: "Ana Beatriz da Silva",
        valor: 30.00,
        diaVencimento: 10,
        dataPagamento: "",
        status: "pendente"
    },

    {
        associado: "Joana Carla Mendes",
        valor: 30.00,
        diaVencimento: 10,
        dataPagamento: "",
        status: "atrasado"
    },

    {
        associado: "Francisca Alves Lima",
        valor: 30.00,
        diaVencimento: 10,
        dataPagamento: criarDataISO(anoAtual, mesAtual, 8),
        status: "efetuado"
    },

    {
        associado: "Pedro Henrique Costa",
        valor: 30.00,
        diaVencimento: 10,
        dataPagamento: "",
        status: "pendente"
    },

    {
        associado: "Camila Rodrigues Sousa",
        valor: 30.00,
        diaVencimento: 15,
        dataPagamento: criarDataISO(anoAtual, mesAtual, 10),
        status: "efetuado"
    },

    {
        associado: "Lucas Gabriel Ferreira",
        valor: 30.00,
        diaVencimento: 5,
        dataPagamento: "",
        status: "atrasado"
    },

    {
        associado: "Mariana Alves Pereira",
        valor: 30.00,
        diaVencimento: 20,
        dataPagamento: "",
        status: "pendente"
    },

    {
        associado: "Rafael Oliveira Martins",
        valor: 30.00,
        diaVencimento: 25,
        dataPagamento: criarDataISO(anoAtual, mesAtual, 12),
        status: "efetuado"
    },

    {
        associado: "Beatriz Carvalho Lima",
        valor: 30.00,
        diaVencimento: 10,
        dataPagamento: "",
        status: "atrasado"
    },

    {
        associado: "Gabriel Santos Almeida",
        valor: 30.00,
        diaVencimento: 15,
        dataPagamento: criarDataISO(anoAtual, mesAtual, 14),
        status: "efetuado"
    },

    {
        associado: "Isabela Mendes Rocha",
        valor: 30.00,
        diaVencimento: 5,
        dataPagamento: "",
        status: "pendente"
    },

    {
        associado: "Matheus Ribeiro Nunes",
        valor: 30.00,
        diaVencimento: 20,
        dataPagamento: criarDataISO(anoAtual, mesAtual, 15),
        status: "efetuado"
    },

    {
        associado: "Letícia Fernandes Costa",
        valor: 30.00,
        diaVencimento: 25,
        dataPagamento: "",
        status: "atrasado"
    }

];


// CONFIGURAR FILTROS INICIAIS

function configurarFiltros() {

    // OBTER ANOS EXISTENTES

    const anos = [];

    pagamentos.forEach(function (pagamento) {

        if (!anos.includes(anoAtual)) {

            anos.push(anoAtual);

        }

    });

    // ADICIONAR ANOS AO SELECT

    filtroAno.innerHTML = "";

    anos.forEach(function (ano) {

        const opcao = document.createElement("option");

        opcao.value = ano;
        opcao.textContent = ano;

        filtroAno.appendChild(opcao);

    });

    // SELECIONAR ANO E MÊS ATUAL

    filtroAno.value = anoAtual;
    filtroMes.value = mesAtual;

}


// ATUALIZAR TÍTULO DA TABELA

function atualizarTitulo() {

    const mes = Number(filtroMes.value);

    const ano = filtroAno.value;

    tituloMensalidades.textContent =
        "Mensalidades de " + meses[mes - 1] + " de " + ano;

}


// OBTER DATA DE VENCIMENTO

function obterVencimento(dia) {

    const ano = Number(filtroAno.value);

    const mes = Number(filtroMes.value);

    return criarDataISO(ano, mes, dia);

}


// FORMATAR VALOR EM REAIS

function formatarValor(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// ATUALIZAR ESTILO DO STATUS

function atualizarEstiloStatus(seletor) {

    seletor.className = "status-select status-" + seletor.value;

}


// EXIBIR NOTIFICAÇÃO

function mostrarNotificacao(mensagem) {

    toastMensagem.textContent = mensagem;

    toast.classList.add("ativo");

    clearTimeout(temporizadorToast);

    temporizadorToast = setTimeout(function () {

        toast.classList.remove("ativo");

    }, 3000);

}


// ABRIR MODAL DE EDIÇÃO

function abrirModal(pagamento) {

    pagamentoEmEdicao = pagamento;

    // PREENCHER DADOS DO ASSOCIADO

    nomeAssociado.value = pagamento.associado;

    valorPagamento.value = formatarValor(pagamento.valor);

    statusPagamento.value = pagamento.status;

    dataPagamento.value = pagamento.dataPagamento;

    // CONFIGURAR CAMPO DE DATA

    controlarCampoData();

    // ABRIR MODAL

    modalEdicao.classList.add("ativo");

}


// CONTROLAR CAMPO DE DATA

function controlarCampoData() {

    if (statusPagamento.value === "efetuado") {

        dataPagamento.disabled = false;

        dataPagamento.required = true;

        // PREENCHER DATA ATUAL CASO ESTEJA VAZIA

        if (dataPagamento.value === "") {

            dataPagamento.value = obterDataAtual();

        }

    } else {

        dataPagamento.value = "";

        dataPagamento.disabled = true;

        dataPagamento.required = false;

    }

}


// ALTERAÇÃO DO STATUS NO MODAL

statusPagamento.addEventListener("change", function () {

    controlarCampoData();

});


// FECHAR MODAL

function fecharModal() {

    modalEdicao.classList.remove("ativo");

    formulario.reset();

    pagamentoEmEdicao = null;

}


// CANCELAR EDIÇÃO

botaoCancelar.addEventListener("click", function () {

    fecharModal();

});


// SALVAR ALTERAÇÕES

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    if (pagamentoEmEdicao !== null) {

        // ATUALIZAR STATUS

        pagamentoEmEdicao.status = statusPagamento.value;

        // ATUALIZAR DATA DE PAGAMENTO

        if (statusPagamento.value === "efetuado") {

            pagamentoEmEdicao.dataPagamento = dataPagamento.value;

        } else {

            pagamentoEmEdicao.dataPagamento = "";

        }

        // FECHAR MODAL

        fecharModal();

        // ATUALIZAR TABELA

        renderizarTabela();

        // NOTIFICAÇÃO

        mostrarNotificacao("Pagamento atualizado com sucesso!");

    }

});


// RENDERIZAR TABELA

function renderizarTabela() {

    // CAPTURAR FILTROS

    const pesquisa = campoBusca.value.trim().toLowerCase();

    const ano = Number(filtroAno.value);

    const mes = Number(filtroMes.value);

    const status = filtroStatus.value;


    // FILTRAR PAGAMENTOS

    const pagamentosFiltrados = pagamentos.filter(function (pagamento) {

        const nomeCorresponde =
            pagamento.associado.toLowerCase().includes(pesquisa);

        const statusCorresponde =
            status === "todos" || pagamento.status === status;

        return nomeCorresponde && statusCorresponde;

    });


    // CALCULAR PÁGINAS

    const totalPaginas = Math.max(
        1,
        Math.ceil(pagamentosFiltrados.length / pagamentosPorPagina)
    );


    // GARANTIR PÁGINA VÁLIDA

    if (paginaAtual > totalPaginas) {

        paginaAtual = totalPaginas;

    }


    // DEFINIR LIMITES

    const inicio = (paginaAtual - 1) * pagamentosPorPagina;

    const fim = inicio + pagamentosPorPagina;

    const pagamentosPagina = pagamentosFiltrados.slice(inicio, fim);


    // LIMPAR TABELA

    corpoTabela.innerHTML = "";


    // VERIFICAR RESULTADOS

    if (pagamentosPagina.length === 0) {

        const linha = document.createElement("tr");

        const coluna = document.createElement("td");

        coluna.textContent = "Nenhum pagamento encontrado.";

        coluna.setAttribute("colspan", "6");

        coluna.style.textAlign = "center";

        coluna.style.padding = "25px";

        linha.appendChild(coluna);

        corpoTabela.appendChild(linha);

    }


    // PERCORRER PAGAMENTOS

    pagamentosPagina.forEach(function (pagamento) {

        const linha = document.createElement("tr");


        // COLUNA ASSOCIADO

        const colunaAssociado = document.createElement("td");

        const divAssociado = document.createElement("div");

        divAssociado.classList.add("associado");

        // OBTER INICIAIS

        const palavras = pagamento.associado.trim().split(/\s+/);

        const iniciais = palavras[0][0] +
            palavras[palavras.length - 1][0];

        const avatar = document.createElement("span");

        avatar.classList.add("iniciais");

        avatar.textContent = iniciais.toUpperCase();

        const nome = document.createElement("strong");

        nome.textContent = pagamento.associado;

        divAssociado.appendChild(avatar);

        divAssociado.appendChild(nome);

        colunaAssociado.appendChild(divAssociado);


        // COLUNA VALOR

        const colunaValor = document.createElement("td");

        colunaValor.textContent = formatarValor(pagamento.valor);

        colunaValor.classList.add("valor");


        // COLUNA VENCIMENTO

        const colunaVencimento = document.createElement("td");

        colunaVencimento.textContent = formatarData(
            obterVencimento(pagamento.diaVencimento)
        );


        // COLUNA PAGAMENTO

        const colunaPagamento = document.createElement("td");

        if (pagamento.status === "efetuado" && pagamento.dataPagamento !== "") {

            colunaPagamento.textContent = formatarData(
                pagamento.dataPagamento
            );

        } else {

            colunaPagamento.textContent = "Não pago";

            colunaPagamento.classList.add("nao-pago");

        }


        // COLUNA STATUS

        const colunaStatus = document.createElement("td");

        const seletorStatus = document.createElement("select");

        seletorStatus.classList.add("status-select");

        // OPÇÕES DE STATUS

        const opcoesStatus = [
            { valor: "efetuado", texto: "Efetuado" },
            { valor: "pendente", texto: "Pendente" },
            { valor: "atrasado", texto: "Atrasado" }
        ];

        opcoesStatus.forEach(function (opcao) {

            const elemento = document.createElement("option");

            elemento.value = opcao.valor;

            elemento.textContent = opcao.texto;

            seletorStatus.appendChild(elemento);

        });

        seletorStatus.value = pagamento.status;

        atualizarEstiloStatus(seletorStatus);


        // ALTERAR STATUS DIRETAMENTE NA TABELA

        seletorStatus.addEventListener("change", function () {

            pagamento.status = seletorStatus.value;

            // SE FOR EFETUADO, REGISTRAR DATA

            if (pagamento.status === "efetuado") {

                if (pagamento.dataPagamento === "") {

                    pagamento.dataPagamento = obterDataAtual();

                }

            } else {

                pagamento.dataPagamento = "";

            }

            // ATUALIZAR ESTILO

            atualizarEstiloStatus(seletorStatus);

            // ATUALIZAR TABELA

            renderizarTabela();

            // NOTIFICAÇÃO

            mostrarNotificacao("Status do pagamento atualizado!");

        });


        colunaStatus.appendChild(seletorStatus);


        // COLUNA AÇÕES

        const colunaAcoes = document.createElement("td");

        const divAcoes = document.createElement("div");

        divAcoes.classList.add("acoes");

        const botaoEditar = document.createElement("button");

        botaoEditar.type = "button";

        botaoEditar.setAttribute("aria-label", "Editar pagamento");

        const imagemEditar = document.createElement("img");

        imagemEditar.src = "/SistemaFinan/imgs/escrever.png";

        imagemEditar.classList.add("icon-actions-editar");

        botaoEditar.appendChild(imagemEditar);


        // ABRIR MODAL

        botaoEditar.addEventListener("click", function () {

            abrirModal(pagamento);

        });


        divAcoes.appendChild(botaoEditar);

        colunaAcoes.appendChild(divAcoes);


        // ADICIONAR COLUNAS À LINHA

        linha.appendChild(colunaAssociado);

        linha.appendChild(colunaValor);

        linha.appendChild(colunaVencimento);

        linha.appendChild(colunaPagamento);

        linha.appendChild(colunaStatus);

        linha.appendChild(colunaAcoes);


        // INSERIR NA TABELA

        corpoTabela.appendChild(linha);

    });


    // ATUALIZAR PAGINAÇÃO

    contadorPaginas.textContent =
        "Página " + paginaAtual + " de " + totalPaginas;

    botaoAnterior.disabled = paginaAtual === 1;

    botaoProximo.disabled = paginaAtual === totalPaginas;


    // ATUALIZAR TÍTULO

    atualizarTitulo();

}


// EVENTO DE PESQUISA

campoBusca.addEventListener("input", function () {

    paginaAtual = 1;

    renderizarTabela();

});


// EVENTO FILTRO DE ANO

filtroAno.addEventListener("change", function () {

    paginaAtual = 1;

    renderizarTabela();

});


// EVENTO FILTRO DE MÊS

filtroMes.addEventListener("change", function () {

    paginaAtual = 1;

    renderizarTabela();

});


// EVENTO FILTRO DE STATUS

filtroStatus.addEventListener("change", function () {

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

    const status = filtroStatus.value;

    const pagamentosFiltrados = pagamentos.filter(function (pagamento) {

        const nomeCorresponde =
            pagamento.associado.toLowerCase().includes(pesquisa);

        const statusCorresponde =
            status === "todos" || pagamento.status === status;

        return nomeCorresponde && statusCorresponde;

    });

    const totalPaginas = Math.max(
        1,
        Math.ceil(pagamentosFiltrados.length / pagamentosPorPagina)
    );

    if (paginaAtual < totalPaginas) {

        paginaAtual++;

        renderizarTabela();

    }

});


// INICIALIZAR SISTEMA

configurarFiltros();

renderizarTabela();
