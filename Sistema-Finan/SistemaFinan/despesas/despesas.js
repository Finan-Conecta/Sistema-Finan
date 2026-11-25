
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

const modalCadastro = document.getElementById("modal-cadastro");
const modalExcluir = document.getElementById("modal-excluir");
const botaoCancelarExclusao = document.getElementById("cancelar-exclusao");
const botaoConfirmarExclusao = document.getElementById("confirmar-exclusao");
const mensagemExclusao = document.getElementById("mensagem-exclusao");

const botaoCancelar = document.getElementById("cancelar-edicao");

const formulario = document.getElementById("form-edicao-despesa");
const descricaoDespesa = document.getElementById("descricao-despesa");
const valorDespesa = document.getElementById("valor-despesa");
const statusDespesa = document.getElementById("status-despesa");
const dataPagamento = document.getElementById("data-pagamento");

const formularioCadastro = document.getElementById("form-despesa");
const descricaoNovaDespesa = document.getElementById("descricao");
const valorNovaDespesa = document.getElementById("valor");
const diaNovoVencimento = document.getElementById("dia-vencimento");
const botaoCancelarCadastro = document.getElementById("cancelar-cadastro");


// ELEMENTOS DA NOTIFICAÇÃO

const toast = document.getElementById("toast");
const toastTitulo = document.getElementById("toast-titulo");
const toastMensagem = document.getElementById("toast-mensagem");
const toastIcone = toast.querySelector(".toast-icon");

let temporizadorToast;

let despesaEmExclusao = null;


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


// LISTA DE DESPESAS

let despesas = [

    {
        despesa: "Conta de energia",
        valor: 80.00,
        diaVencimento: 10,
        dataPagamento: criarDataISO(anoAtual, mesAtual, 5),
        status: "pendente"
    },
    {
        despesa: "Internet",
        valor: 100.00,
        diaVencimento: 15,
        dataPagamento: criarDataISO(anoAtual, mesAtual, 10),
        status: "pendente"
    },
    {
        despesa: "Conta de água",
        valor: 50.00,
        diaVencimento: 15,
        dataPagamento: criarDataISO(anoAtual, mesAtual, 10),
        status: "pendente"
    },
    {
        despesa: "Aluguel",
        valor: 1200.00,
        diaVencimento: 20,
        dataPagamento: criarDataISO(anoAtual, mesAtual, 5),
        status: "pendente"
    },


];

const despesasSalvas = JSON.parse(localStorage.getItem("despesas") || "null");

if (Array.isArray(despesasSalvas)) {
    despesas = despesasSalvas;
}

function salvarDespesas() {
    localStorage.setItem("despesas", JSON.stringify(despesas));
}


// CONFIGURAR FILTROS INICIAIS

function configurarFiltros() {

    // OBTER ANOS EXISTENTES

    const anos = [];

    despesas.forEach(function (despesas) {

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

function mostrarNotificacao(mensagem, tipo) {

    const ehErro = tipo === "erro";
    toastTitulo.textContent = ehErro ? "Erro!" : "Sucesso!";
    toastMensagem.textContent = mensagem;
    toastIcone.textContent = ehErro ? "!" : "✓";
    toast.classList.toggle("erro", ehErro);

    toast.classList.add("ativo");

    clearTimeout(temporizadorToast);

    temporizadorToast = setTimeout(function () {

        toast.classList.remove("ativo");

    }, 3000);

}

// ABRIR MODAL DE CADASTRO

const botaoAbrir = document.getElementById("abrir-modal");

botaoAbrir.addEventListener("click", function () {

    modalCadastro.classList.add("ativo");

});

botaoCancelarCadastro.addEventListener("click", function () {
    formularioCadastro.reset();
    modalCadastro.classList.remove("ativo");
});

botaoCancelarExclusao.addEventListener("click", function () {
    despesaEmExclusao = null;
    modalExcluir.classList.remove("ativo");
});

botaoConfirmarExclusao.addEventListener("click", function () {
    if (despesaEmExclusao === null) {
        return;
    }

    const indice = despesas.indexOf(despesaEmExclusao);

    if (indice !== -1) {
        despesas.splice(indice, 1);
        salvarDespesas();
    }

    despesaEmExclusao = null;
    modalExcluir.classList.remove("ativo");
    renderizarTabela();
    mostrarNotificacao("Despesa excluída com sucesso!");
});

formularioCadastro.addEventListener("submit", function (event) {
    event.preventDefault();

    const descricao = descricaoNovaDespesa.value.trim();
    let valorInformado = valorNovaDespesa.value
        .trim()
        .replace(/^R\$\s*/i, "")
        .replace(/\s/g, "");

    if (valorInformado.includes(",")) {
        valorInformado = valorInformado
            .replace(/\./g, "")
            .replace(",", ".");
    }

    const valor = Number(valorInformado);
    const diaVencimento = Number(diaNovoVencimento.value);

    if (!descricao) {
        mostrarNotificacao("Informe a descrição da despesa.", "erro");
        descricaoNovaDespesa.focus();
        return;
    }

    if (!valorInformado) {
        mostrarNotificacao("Informe o valor da despesa.", "erro");
        valorNovaDespesa.focus();
        return;
    }

    if (!Number.isFinite(valor)) {
        mostrarNotificacao("O valor precisa ser numérico. Exemplo: 150,00.", "erro");
        valorNovaDespesa.focus();
        return;
    }

    if (valor <= 0) {
        mostrarNotificacao("O valor da despesa precisa ser maior que zero.", "erro");
        valorNovaDespesa.focus();
        return;
    }

    if (!Number.isFinite(diaVencimento) || diaVencimento <= 0) {
        mostrarNotificacao("Selecione um dia de vencimento válido.", "erro");
        diaNovoVencimento.focus();
        return;
    }

    const novaDespesa = {
        despesa: descricao,
        valor: valor,
        diaVencimento: diaVencimento,
        dataPagamento: "",
        status: "pendente"
    };

    despesas.push(novaDespesa);
    salvarDespesas();

    formularioCadastro.reset();
    modalCadastro.classList.remove("ativo");

    campoBusca.value = "";
    filtroStatus.value = "todos";
    paginaAtual = 1;
    renderizarTabela();
    mostrarNotificacao("Despesa cadastrada com sucesso!");
});


// ABRIR MODAL DE EDIÇÃO

function abrirModal(despesa) {

    pagamentoEmEdicao = despesa;

    // PREENCHER DADOS DA DESPESA

    descricaoDespesa.value = despesa.despesa;

    valorDespesa.value = formatarValor(despesa.valor);

    statusDespesa.value = despesa.status;

    dataPagamento.value = despesa.dataPagamento;

    // CONFIGURAR CAMPO DE DATA

    controlarCampoData();

    // ABRIR MODAL

    modalEdicao.classList.add("ativo");

}


// CONTROLAR CAMPO DE DATA

function controlarCampoData() {

    if (statusDespesa.value === "efetuado") {

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

statusDespesa.addEventListener("change", function () {

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

        pagamentoEmEdicao.status = statusDespesa.value;

        // ATUALIZAR DATA DE PAGAMENTO

        if (statusDespesa.value === "efetuado") {

            pagamentoEmEdicao.dataPagamento = dataPagamento.value;

        } else {

            pagamentoEmEdicao.dataPagamento = "";

        }

        // FECHAR MODAL

        fecharModal();

        salvarDespesas();

        // ATUALIZAR TABELA

        renderizarTabela();

        // NOTIFICAÇÃO

        mostrarNotificacao("Despesa atualizada com sucesso!");

    }

});


// RENDERIZAR TABELA

function renderizarTabela() {
    const pesquisa = campoBusca.value.trim().toLowerCase();
    const status = filtroStatus.value;

    const despesasFiltradas = despesas.filter(function (despesa) {
        const nomeCorresponde =
            despesa.despesa.toLowerCase().includes(pesquisa);
        const statusCorresponde =
            status === "todos" || despesa.status === status;
        return nomeCorresponde && statusCorresponde;
    });

    const totalPaginas = Math.max(
        1,
        Math.ceil(despesasFiltradas.length / pagamentosPorPagina)
    );

    if (paginaAtual > totalPaginas) {
        paginaAtual = totalPaginas;
    }

    const inicio = (paginaAtual - 1) * pagamentosPorPagina;
    const fim = inicio + pagamentosPorPagina;
    const despesasPagina = despesasFiltradas.slice(inicio, fim);

    corpoTabela.innerHTML = "";

    if (despesasPagina.length === 0) {
        const linha = document.createElement("tr");
        const coluna = document.createElement("td");
        coluna.textContent = "Nenhuma despesa encontrada.";
        coluna.setAttribute("colspan", "6");
        coluna.style.textAlign = "center";
        coluna.style.padding = "25px";
        linha.appendChild(coluna);
        corpoTabela.appendChild(linha);
    }

    despesasPagina.forEach(function (despesa) {
        const linha = document.createElement("tr");

        const colunaDespesa = document.createElement("td");
        const nome = document.createElement("strong");
        nome.textContent = despesa.despesa;
        colunaDespesa.appendChild(nome);

        const colunaValor = document.createElement("td");
        colunaValor.textContent = formatarValor(despesa.valor);
        colunaValor.classList.add("valor");

        const colunaVencimento = document.createElement("td");
        colunaVencimento.textContent = formatarData(
            obterVencimento(despesa.diaVencimento)
        );

        const colunaPagamento = document.createElement("td");
        if (despesa.status === "efetuado" && despesa.dataPagamento !== "") {
            colunaPagamento.textContent = formatarData(
                despesa.dataPagamento
            );
        } else {
            colunaPagamento.textContent = "Não pago";
            colunaPagamento.classList.add("nao-pago");
        }

        const colunaStatus = document.createElement("td");
        const seletorStatus = document.createElement("select");
        seletorStatus.classList.add("status-select");

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

        seletorStatus.value = despesa.status;
        atualizarEstiloStatus(seletorStatus);

        seletorStatus.addEventListener("change", function () {
            despesa.status = seletorStatus.value;
            if (despesa.status === "efetuado") {
                if (despesa.dataPagamento === "") {
                    despesa.dataPagamento = obterDataAtual();
                }
            } else {
                despesa.dataPagamento = "";
            }

            atualizarEstiloStatus(seletorStatus);
                salvarDespesas();
            renderizarTabela();
            mostrarNotificacao("Status da despesa atualizado!");
        });
        colunaStatus.appendChild(seletorStatus);

        const colunaAcoes = document.createElement("td");
        const divAcoes = document.createElement("div");
        divAcoes.classList.add("acoes");
        const botaoEditar = document.createElement("button");
        botaoEditar.type = "button";
        botaoEditar.setAttribute("aria-label", "Editar despesa");
        const imagemEditar = document.createElement("img");
        imagemEditar.src = "/Sistema-Finan/SistemaFinan/imgs/escrever.png";
        imagemEditar.classList.add("icon-actions-editar");
        botaoEditar.appendChild(imagemEditar);

        botaoEditar.addEventListener("click", function () {
            abrirModal(despesa);
        });
        divAcoes.appendChild(botaoEditar);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.setAttribute("aria-label", "Excluir despesa");

        const imagemExcluir = document.createElement("img");
        imagemExcluir.src = "/Sistema-Finan/SistemaFinan/imgs/excluir.svg";
        imagemExcluir.classList.add("icon-actions-excluir");
        botaoExcluir.appendChild(imagemExcluir);

        botaoExcluir.addEventListener("click", function () {
            despesaEmExclusao = despesa;
            mensagemExclusao.textContent =
                'Deseja excluir "' + despesa.despesa +
                '"? Esta ação não pode ser desfeita.';
            modalExcluir.classList.add("ativo");
        });

        divAcoes.appendChild(botaoExcluir);
        colunaAcoes.appendChild(divAcoes);

        linha.appendChild(colunaDespesa);
        linha.appendChild(colunaValor);
        linha.appendChild(colunaVencimento);
        linha.appendChild(colunaPagamento);
        linha.appendChild(colunaStatus);
        linha.appendChild(colunaAcoes);
        corpoTabela.appendChild(linha);
    });

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

    const despesasFiltradas = despesas.filter(function (despesa) {
        const nomeCorresponde =
            despesa.despesa.toLowerCase().includes(pesquisa);
        const statusCorresponde =
            status === "todos" || despesa.status === status;
        return nomeCorresponde && statusCorresponde;
    });

    const totalPaginas = Math.max(
        1,
        Math.ceil(despesasFiltradas.length / pagamentosPorPagina)
    );

    if (paginaAtual < totalPaginas) {

        paginaAtual++;

        renderizarTabela();

    }

});


// INICIALIZAR SISTEMA

configurarFiltros();

renderizarTabela();
