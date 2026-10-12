# 📦 Backend - API de Controle de Estoque

API REST desenvolvida em **Node.js** com **Express** para leitura, processamento e disponibilização de dados de estoque a partir de uma planilha Excel (`produtos.xlsx`).

---

## 🚀 Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)** (v18+)
- **[Express](https://expressjs.com/)**: Framework HTTP para roteamento e middlewares
- **[xlsx](https://www.npmjs.com/package/xlsx)**: Leitura e manipulação de arquivos Excel
- **[nodemon](https://www.npmjs.com/package/nodemon)**: Reinicialização automática em ambiente de desenvolvimento

---

## 📁 Estrutura de Pastas

A aplicação foi estruturada em camadas seguindo boas práticas de arquitetura (Separação de Responsabilidades):

```text
backend/
├── src/
│   ├── data/
│   │   └── produtos.xlsx        # Planilha com os dados de produtos
│   ├── utils/
│   │   └── excelHelper.js       # Módulo genérico para leitura e escrita em Excel
│   ├── repositories/
│   │   └── produtoRepository.js # Acesso aos dados da planilha de produtos
│   ├── services/
│   │   └── estoqueService.js    # Regras de negócio e cálculos de estoque
│   ├── routes/
│   │   ├── produtos.routes.js   # Rotas de produtos (/api/produtos)
│   │   ├── estoque.routes.js    # Rotas de resumo (/api/estoque)
│   │   └── index.js             # Agregador central de rotas
│   └── index.js                 # Inicialização do servidor Express e CORS
├── package.json
└── README.md
```

---

## ⚙️ Pré-requisitos

- **Node.js** (versão 18 ou superior instalada)
- Gerenciador de pacotes **npm**

---

## 📥 Instalação

Abra o terminal na pasta `backend` e instale as dependências:

```bash
cd backend
npm install
```

---

## ▶️ Como Executar

### Modo de Desenvolvimento (com recarregamento automático via Nodemon):
```bash
npm run dev
```

### Modo de Produção:
```bash
npm start
```

O servidor será iniciado na porta **3000**:
> **URL Base:** `http://localhost:3000`

---

## 🌐 Endpoints da API

### 1. Status da API
- **Rota:** `GET /`
- **Descrição:** Informa o status de funcionamento da aplicação.

---

### 2. Listar Todos os Produtos
- **Rota:** `GET /api/produtos`
- **Descrição:** Retorna a listagem completa dos produtos com valor total calculado (`preco * quantidade`) e situação (`OK` ou `Repor`).
- **Exemplo de Resposta:**
```json
[
  {
    "id": 1,
    "produto": "Mouse",
    "preco": 50,
    "quantidade": 12,
    "valorTotal": 600,
    "situacao": "OK"
  },
  {
    "id": 2,
    "produto": "Teclado",
    "preco": 120,
    "quantidade": 4,
    "valorTotal": 480,
    "situacao": "Repor"
  }
]
```

---

### 3. Listar Produtos para Reposição
- **Rota:** `GET /api/produtos/reposicao`
- **Descrição:** Filtra e retorna apenas produtos com quantidade em estoque **inferior a 5** (`quantidade < 5`).
- **Exemplo de Resposta:**
```json
[
  {
    "id": 2,
    "produto": "Teclado",
    "preco": 120,
    "quantidade": 4,
    "valorTotal": 480,
    "situacao": "Repor"
  },
  {
    "id": 3,
    "produto": "Monitor",
    "preco": 900,
    "quantidade": 3,
    "valorTotal": 2700,
    "situacao": "Repor"
  },
  {
    "id": 5,
    "produto": "Headset",
    "preco": 150,
    "quantidade": 2,
    "valorTotal": 300,
    "situacao": "Repor"
  }
]
```

---

### 4. Resumo Geral do Estoque
- **Rota:** `GET /api/estoque/resumo`
- **Descrição:** Retorna os indicadores consolidados do estoque.
- **Exemplo de Resposta:**
```json
{
  "totalProdutos": 5,
  "valorTotalEstoque": 5520,
  "produtosReposicao": 3
}
```

---

## 🔒 CORS
A API já possui suporte a CORS habilitado em todas as rotas, permitindo requisições vindas da aplicação Frontend rodando em portas distintas (ex: `http://localhost:5173` ou `http://localhost:3001`).
