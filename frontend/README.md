# 🖥️ Frontend - Dashboard de Controle de Estoque

Aplicação web SPA (*Single Page Application*) desenvolvida em **React** com **Vite** para visualização, monitoramento em tempo real, busca, ordenação e análise de reposição do estoque, consumindo os dados da API REST do backend.

---

## 🚀 Tecnologias Utilizadas

- **[React](https://react.dev/)** (v19): Biblioteca para construção de interfaces declarativas baseadas em componentes
- **[Vite](https://vite.dev/)** (v8): Ferramenta de build de alta performance e servidor de desenvolvimento com *Hot Module Replacement (HMR)*
- **Vanilla CSS Moderno**: Estilização pura com variáveis CSS (*Design Tokens*), Flexbox, CSS Grid e responsividade total para desktop e dispositivos móveis (sem dependência de bibliotecas de CSS pesadas)
- **Fetch API nativo**: Comunicação assíncrona com os endpoints da API Backend
- **ESLint**: Garantia de padronização e boas práticas de código

---

## 📁 Estrutura de Pastas

A aplicação foi organizada seguindo uma arquitetura modular por responsabilidades (*Component-Driven* com camada de serviços):

```text
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx         # Cabeçalho, indicador de status da API e botão de atualização
│   │   ├── ResumoCards.jsx    # Cards com indicadores-chave (Total, Valor em Estoque, Reposição)
│   │   ├── FiltroBar.jsx      # Busca textual por nome, tabs de situação e dropdown de ordenação
│   │   └── TabelaProdutos.jsx # Tabela com listagem, badges (OK / Repor) e destaques de estoque baixo
│   ├── services/
│   │   └── api.js             # Camada de comunicação HTTP com os endpoints do backend
│   ├── utils/
│   │   └── formatters.js      # Utilitários de formatação de valores monetários (R$) e numéricos
│   ├── App.jsx                # Orquestrador principal (estado, dados da API, filtros e layout)
│   ├── App.css                # Estilos visuais dos componentes, layout e responsividade
│   ├── index.css              # Tokens de design globais, reset e tipografia
│   └── main.jsx               # Ponto de entrada e montagem do React no DOM
├── index.html                 # Estrutura HTML principal
├── vite.config.js             # Configurações do Vite e proxy reverso para o backend
├── package.json               # Dependências e scripts do projeto
└── README.md
```

---

## ⚙️ Pré-requisitos

- **Node.js** (versão 18 ou superior instalada)
- Gerenciador de pacotes **npm**
- **Backend em execução** na porta **3000** (veja as instruções no `backend/README.md`)

---

## 📥 Instalação

Abra o terminal na pasta `frontend` e instale as dependências:

```bash
cd frontend
npm install
```

---

## ▶️ Como Executar

### Modo de Desenvolvimento (com recarregamento instantâneo via Vite HMR):
```bash
npm run dev
```

A aplicação será iniciada na porta **5173**:
> **URL da Aplicação:** `http://localhost:5173`

---

### Outros Scripts Úteis:

- **Build de Produção:**
  ```bash
  npm run build
  ```
- **Visualizar Build de Produção Localmente:**
  ```bash
  npm run preview
  ```
- **Verificar Qualidade do Código com Linter:**
  ```bash
  npm run lint
  ```

---

## 🎯 Funcionalidades da Aplicação

### 1. Indicadores em Tempo Real (*Dashboard Cards*)
- **Total de Produtos:** Contagem total de itens distintos cadastrados no sistema.
- **Valor Total em Estoque:** Patrimônio acumulado calculado a partir do `preço * quantidade` de todos os produtos, formatado em moeda brasileira (`R$`).
- **Necessitam Reposição:** Contagem destacada em tom de alerta para produtos com estoque crítico (`quantidade < 5`). Clicar neste card filtra automaticamente a tabela.

### 2. Tabela Dinâmica de Produtos
- Listagem com `# ID`, `Produto`, `Preço Unitário`, `Quantidade`, `Valor Total` e `Situação`.
- **Badges Semânticas:** Destaque visual verde para itens com situação `✓ OK` e vermelho/âmbar para itens `⚠️ Repor`.
- Linhas destacadas com aviso quando o item possuir menos de 5 unidades.

### 3. Filtros e Busca Inteligente
- **Busca por Nome:** Campo com busca em tempo real à medida que o usuário digita.
- **Abas de Situação:** Filtragem com um clique entre *Todos os Produtos*, *Estoque OK* ou *Necessitam Reposição*.
- **Ordenação Dinâmica:** Permite ordenar por:
  - ID (ordem padrão)
  - Nome (A-Z ou Z-A)
  - Menor Estoque (urgentes primeiro)
  - Maior Estoque
  - Maior Valor Total
  - Menor Valor Total

### 4. Monitoramento da Conexão com o Backend
- O cabeçalho exibe uma pílula de status (*Status Pill*) indicando se a API do Backend está **Conectada** ou **Sem Conexão**.
- Botão **Atualizar** para forçar a recarga dos dados da planilha a qualquer momento.
- Caso o servidor backend esteja desligado, a aplicação exibe um alerta explicativo amigável com botão para tentar reconectar.

---

## 🔗 Integração com o Backend (Proxy Reverso)

No arquivo `vite.config.js`, está configurado um proxy reverso para desenvolvimento:

```javascript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true
    }
  }
}
```

Isso permite que o frontend realize chamadas diretamente para rotas relativas (`/api/produtos` e `/api/estoque/resumo`), eliminando problemas de CORS e URLs fixas no código.
