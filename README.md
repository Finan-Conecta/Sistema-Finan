# Sistema Finan 💰

**Sistema de Gerenciamento Financeiro da AMAQ**

<text-placeholder></text-placeholder>

O Finan é um sistema desenvolvido para auxiliar a gestão financeira da Associação de Mães Atípicas de Quixadá (AMAQ), centralizando o controle de associados, pagamentos e despesas em uma única plataforma.

A aplicação tem como objetivo facilitar o acompanhamento das movimentações financeiras da instituição, proporcionar maior organização dos registros e oferecer uma visão geral da situação financeira por meio de um painel de controle (*dashboard*).

**Status do projeto:** Em desenvolvimento 🚧

---

## 📋 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Objetivos](#-objetivos)
- [Funcionalidades](#-funcionalidades)
- [Módulos do sistema](#-módulos-do-sistema)
- [Regras de negócio](#-regras-de-negócio)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e execução](#-instalação-e-execução)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Acesso ao sistema](#-acesso-ao-sistema)
- [Testes](#-testes)
- [Equipe de desenvolvimento](#-equipe-de-desenvolvimento)

---

## 📖 Sobre o projeto

O Finan surgiu da necessidade de organizar e facilitar o gerenciamento financeiro da AMAQ, oferecendo uma alternativa centralizada para o controle das informações relacionadas aos associados, seus pagamentos e às despesas da instituição.

Por meio do sistema, os responsáveis financeiros podem registrar e consultar informações, acompanhar a situação dos pagamentos e monitorar o saldo disponível no caixa da associação.

O acesso à plataforma é restrito aos responsáveis autorizados, mediante código de acesso, garantindo que as funcionalidades de gerenciamento financeiro não fiquem disponíveis publicamente.

## 🎯 Objetivos

O desenvolvimento do Finan busca:

- Centralizar as informações financeiras da instituição.
- Facilitar o gerenciamento dos associados.
- Organizar o controle dos pagamentos realizados pelos associados.
- Permitir o registro e acompanhamento das despesas institucionais.
- Atualizar o saldo do caixa conforme as movimentações financeiras.
- Disponibilizar informações financeiras de maneira clara e organizada.
- Reduzir a dependência de controles manuais e registros dispersos.

## ⚙️ Funcionalidades

O sistema contempla as seguintes funcionalidades:

- Autenticação por código de acesso.
- Encerramento da sessão do usuário.
- Cadastro, consulta, edição e desvinculação de associados.
- Consulta dos pagamentos dos associados.
- Visualização dos detalhes de cada pagamento.
- Atualização da situação dos pagamentos.
- Pesquisa e filtragem dos registros de pagamentos.
- Cadastro, consulta, edição e exclusão de despesas.
- Visualização do saldo atual do caixa.
- Visualização do total de despesas da instituição.

## 🧩 Módulos do sistema

O Finan está organizado em cinco módulos principais:

### 1. Gestão de Acesso

Responsável pelo controle de entrada e saída da plataforma.

Funcionalidades:
- Entrar no sistema utilizando um código de acesso válido.
- Sair do sistema, encerrando a sessão.

### 2. Gestão dos Associados

Responsável pelo gerenciamento dos dados dos associados da AMAQ.

Funcionalidades:
- Cadastrar novos associados.
- Visualizar a lista de associados.
- Consultar os detalhes de um associado.
- Editar informações cadastradas.
- Excluir ou desvincular associados do sistema.

### 3. Pagamentos dos Associados

Responsável pelo acompanhamento dos pagamentos realizados pelos associados.

Funcionalidades:
- Visualizar a lista de pagamentos.
- Consultar os detalhes de cada pagamento.
- Atualizar o status dos pagamentos.
- Pesquisar pagamentos por meio de uma barra de pesquisa.
- Filtrar pagamentos por ano, mês e situação.

### 4. Despesas

Responsável pelo gerenciamento das despesas da instituição.

Funcionalidades:
- Cadastrar despesas.
- Visualizar a lista de despesas.
- Consultar os detalhes de uma despesa.
- Editar informações de despesas.
- Excluir despesas cadastradas.

### 5. Dashboard

Responsável por apresentar uma visão geral da situação financeira da AMAQ.

Informações disponibilizadas:
- **Saldo atual do caixa:** apresenta o valor disponível na instituição, considerando o saldo inicial, as entradas recebidas e as despesas efetivamente pagas.
- **Total de despesas:** apresenta o valor correspondente às despesas da instituição, conforme o critério de contabilização definido pelo sistema.

## 📌 Regras de negócio

O funcionamento do Finan considera as seguintes regras:

1. **Acesso restrito:** somente responsáveis autorizados podem acessar as funcionalidades de gerenciamento financeiro.
2. **Autenticação:** o acesso à plataforma depende da validação de um código de acesso previamente cadastrado.
3. **Controle de pagamentos:** os pagamentos dos associados podem apresentar os status pendente, efetuado ou atrasado.
4. **Atualização de pagamentos:** um pagamento deve ser marcado como efetuado após a confirmação de seu recebimento.
5. **Identificação de atrasos:** pagamentos não efetuados após a data de vencimento podem ser identificados como atrasados.
6. **Controle de entradas:** somente pagamentos efetivamente recebidos devem ser contabilizados como entradas no caixa.
7. **Controle de saídas:** somente despesas efetivamente pagas devem ser descontadas do saldo do caixa.
8. **Atualização do saldo:** o saldo do caixa deve ser atualizado conforme as entradas recebidas e as despesas pagas.
9. **Despesas pendentes:** despesas cadastradas, mas ainda não pagas, não devem reduzir o saldo atual do caixa.
10. **Exclusão de registros:** operações de exclusão devem respeitar as regras estabelecidas para cada módulo.

## 🛠️ Tecnologias utilizadas

O desenvolvimento do Finan utiliza as seguintes tecnologias:

| Tecnologia | Aplicação |
|---|---|
| HTML5 | Estruturação das páginas e elementos da interface. |
| CSS3 | Estilização, organização visual e responsividade da aplicação. |
| JavaScript | Implementação da lógica e das funcionalidades do sistema. |
| Git | Controle de versão do código-fonte. |
| GitHub | Hospedagem e gerenciamento do repositório. |

**Banco de dados:** o projeto não utiliza um banco de dados. Portanto, não há configuração de conexão ou instalação de um SGBD para executar a aplicação.

## 💻 Pré-requisitos

Para acessar e executar o projeto localmente, é necessário possuir:

- Um computador com navegador atualizado, como Google Chrome, Mozilla Firefox ou Microsoft Edge.
- Git instalado, caso queira clonar o repositório.
- Um editor de código, como Visual Studio Code, para visualizar ou modificar os arquivos.

Não é necessária a instalação de dependências ou de um banco de dados para a execução de uma aplicação HTML, CSS e JavaScript sem ferramentas adicionais de compilação.

## 🚀 Instalação e execução

### 1. Clonar o repositório

Abra o terminal e execute:

```bash
git clone https://github.com/Finan-Conecta/Sistema-Finan.git
```

### 2. Acessar a pasta do projeto

```bash
cd Sistema-Finan/SistemaFinan
```

### 3. Abrir o projeto

Abra a pasta `SistemaFinan` no Visual Studio Code ou em outro editor de código de sua preferência.

### 4. Executar a aplicação

Localize o arquivo HTML principal do projeto, geralmente chamado `index.html`.

Há duas maneiras simples de executar:

- **Pelo navegador:** abra o arquivo `index.html` diretamente no navegador.
- **Pelo Visual Studio Code:** utilize a extensão Live Server, caso esteja disponível, para iniciar um servidor local e visualizar a aplicação.

Após a abertura, o sistema poderá ser utilizado conforme as funcionalidades implementadas.

> Caso o projeto passe a utilizar Node.js ou outras ferramentas de execução no servidor, os comandos de inicialização deverão ser atualizados nesta seção.

## 📁 Estrutura do projeto

A estrutura abaixo representa uma organização sugerida para uma aplicação desenvolvida com HTML, CSS e JavaScript. Os nomes e diretórios devem corresponder aos arquivos efetivamente existentes no repositório.

```text
SistemaFinan/
│
├── index.html              # Página principal
│
├── css/
│   └── style.css           # Estilos da aplicação
│
├── js/
│   ├── script.js           # Lógica principal
│   ├── associados.js       # Funcionalidades dos associados
│   ├── pagamentos.js       # Funcionalidades dos pagamentos
│   ├── despesas.js         # Funcionalidades das despesas
│   └── dashboard.js        # Informações do painel financeiro
│
├── assets/
│   ├── img/                # Imagens e ícones
│   └── fonts/              # Fontes utilizadas
│
└── README.md               # Documentação do projeto
```

## 🔐 Acesso ao sistema

O acesso ao Finan é destinado aos responsáveis financeiros autorizados da AMAQ.

A autenticação ocorre por meio de um código de acesso previamente cadastrado pela equipe responsável pelo desenvolvimento e configuração da instituição na plataforma.

Os associados não possuem acesso direto ao sistema. O gerenciamento de seus dados e pagamentos é realizado pelos responsáveis autorizados.

## 🧪 Testes

Os testes do Finan devem verificar o funcionamento correto das funcionalidades e o cumprimento das regras de negócio.

Entre os cenários que devem ser validados, destacam-se:

- Validação de códigos de acesso.
- Bloqueio de acesso para códigos inválidos ou inativos.
- Cadastro, edição, consulta e desvinculação de associados.
- Consulta e atualização dos status de pagamentos.
- Funcionamento dos filtros e da pesquisa de pagamentos.
- Cadastro, edição, consulta e exclusão de despesas.
- Atualização correta do saldo após entradas e saídas efetivadas.
- Manutenção do saldo quando houver movimentações pendentes.
- Funcionamento da interface em diferentes tamanhos de tela e navegadores.

## 👥 Equipe de desenvolvimento

O Finan é desenvolvido por:

- **Bruna Viana**
- **Kauã Barreto**
- **Myllene Barbosa**
- **Samyra Torres**

**Instituição:** AMAQ

**Projeto:** Finan

**Status:** Em desenvolvimento 🚧

---

<p align="center">
  <strong>Finan 💰</strong><br>
  Organização e controle financeiro para a AMAQ.
</p>
