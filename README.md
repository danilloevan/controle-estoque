# Trabalho 2 - Aplicação Fullstack com React e Express

Disciplina: **Linguagem de Programação Script**  
Tema: **Automação de planilhas Excel**
Professor: Luis Sérgio da Silva Junior
Aluno: Danillo Evangelista Cabral
Matrícula: 387967

## 📦 Sistema de Controle de Estoque

Aplicação full stack desenvolvida para controle, análise e monitoramento de estoque. O sistema processa dados de uma planilha Excel via API REST em **Node.js/Express** e os exibe em um painel interativo em tempo real construído com **React** e **Vite**.

---

## 🏗️ Arquitetura do Projeto

O repositório é organizado em dois módulos independentes:

```text
controle-estoque/
├── backend/            # API REST em Node.js + Express (leitura da planilha e regras de negócio)
│   ├── src/
│   ├── package.json
│   └── README.md       # Documentação detalhada da API
├── frontend/           # Aplicação Web SPA em React + Vite (dashboard e interface do usuário)
│   ├── src/
│   ├── package.json
│   └── README.md       # Documentação detalhada da interface
├── .gitignore
├── LICENSE
└── README.md           # Este guia geral de inicialização
```

---

## ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em seu computador:

- **[Node.js](https://nodejs.org/)** (versão 18.x ou superior recomendada)
- **npm** (geralmente instalado junto com o Node.js)
- Um navegador web moderno (Chrome, Firefox, Edge, etc.)

---

## 🚀 Como Rodar a Aplicação

Para executar o projeto completo, você precisará abrir **dois terminais** (um para o servidor backend e outro para a interface frontend).

### 1️⃣ Passo 1: Iniciar o Backend (API)

No **primeiro terminal**, navegue até a pasta `backend`, instale as dependências e inicie o servidor:

```bash
# 1. Acesse o diretório do backend
cd backend

# 2. Instale as dependências
npm install

# 3. Inicie o servidor em modo de desenvolvimento (com nodemon)
npm run dev
```

> 💡 **Nota:** Se preferir rodar sem o nodemon, utilize `npm start`.  
> O backend estará disponível em: **`http://localhost:3000`**  
> Verifique se a mensagem `Servidor rodando em http://localhost:3000` apareceu no terminal.

---

### 2️⃣ Passo 2: Iniciar o Frontend (Interface Web)

Abra um **segundo terminal**, navegue até a pasta `frontend`, instale as dependências e inicie o servidor de desenvolvimento:

```bash
# 1. Acesse o diretório do frontend
cd frontend

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

> 🌐 O Vite iniciará a aplicação e exibirá a URL no terminal (geralmente **`http://localhost:5173`**).  
> Abra o link indicado no seu navegador para acessar o dashboard de controle de estoque.

---

## 🔗 Endpoints da API

Abaixo estão os principais endpoints disponibilizados pelo backend para consulta e validação:

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/` | Status da API |
| `GET` | `/api/produtos` | Lista completa de produtos com valor total calculado e situação |
| `GET` | `/api/produtos/reposicao` | Apenas produtos que precisam de reposição (`quantidade < 5`) |
| `GET` | `/api/estoque/resumo` | Indicadores gerais (total de itens, valor total e itens para reposição) |

---

## 🖥️ Funcionalidades do Frontend

- **Cards de Indicadores**: Exibe o total de produtos cadastrados, o valor total do estoque em reais (R$) e a contagem de produtos que requerem reposição.
- **Filtro por Situação**: Alternância rápida entre visualização de todos os produtos, apenas produtos com estoque normal (`OK`) ou com estoque crítico (`Repor`).
- **Busca em Tempo Real**: Campo de pesquisa textual para localizar produtos pelo nome instantaneamente.
- **Ordenação Dinâmica**: Permite ordenar a tabela por Nome (A-Z ou Z-A), Quantidade, Preço Unitário ou Valor Total em Estoque.
- **Feedback Visual e Status**: Destaque com cores e badges para produtos com estoque baixo (`< 5`) e monitor de status da conexão com o backend.

---

## ❓ Resolução de Problemas Comuns

1. **Erro de conexão no Frontend ("Erro ao conectar com a API")**:
   - Certifique-se de que o backend foi iniciado **antes** ou está rodando na porta `3000`.
   - Acesse `http://localhost:3000` no navegador para verificar se a API responde.

2. **Porta 3000 ou 5173 já em uso**:
   - Encerre qualquer processo que esteja ocupando as portas ou configure uma porta diferente no arquivo `.env` (backend) ou no arquivo `vite.config.js` (frontend).

3. **Arquivo de produtos não encontrado (`produtos.xlsx`)**:
   - Verifique se a planilha está localizada no caminho `backend/src/data/produtos.xlsx`.
   - Certifique-se de que a planilha não está aberta e bloqueada para edição em outro programa (como o Microsoft Excel).

---

## 📖 Documentações Específicas

Para mais detalhes sobre as implementações técnicas de cada módulo, consulte:

- [README do Backend](./backend/README.md)
- [README do Frontend](./frontend/README.md)
