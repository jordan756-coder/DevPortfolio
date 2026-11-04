
# 🚀 DevPortfolio

Sistema de portfólio de desenvolvedor com gerenciamento de projetos, desenvolvido para apresentar meus projetos e minhas habilidades em desenvolvimento de software.

## 📌 Sobre o projeto

O DevPortfolio é uma aplicação web que permite cadastrar, visualizar, editar e excluir projetos por meio de uma interface integrada a uma API REST.

Este projeto foi desenvolvido com o objetivo de colocar em prática conhecimentos de desenvolvimento Front-End e Back-End, integração com banco de dados e organização de código.

## 🛠️ Tecnologias utilizadas

### Front-End
- HTML5
- CSS3
- JavaScript

### Back-End
- Node.js
- API REST utilizando o módulo HTTP nativo
- PostgreSQL
- Node.js `pg` para conexão com o banco de dados
- dotenv para gerenciamento de variáveis de ambiente

## ✨ Funcionalidades

- Listagem de projetos cadastrados
- Cadastro de novos projetos
- Atualização de projetos existentes
- Exclusão de projetos
- Armazenamento de dados no PostgreSQL
- Validação de dados enviados pela API
- Tratamento de erros HTTP
- Integração entre Front-End e Back-End

## 📂 Estrutura do projeto

```text
DevPortfolio/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   ├── DATABASE.sql
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/jordan756-coder/DevPortfolio.git
```

### 2. Configure o banco de dados

Crie o banco de dados PostgreSQL com o nome:

```sql
CREATE DATABASE devportifolio;
```

Execute o script `backend/DATABASE.sql` para criar a estrutura necessária.

### 3. Configure o Back-End

Entre na pasta:

```bash
cd DevPortfolio/backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` dentro da pasta `backend`:

```env
DB_PASSWORD=sua_senha_do_postgres
```

Substitua pelo valor da sua senha do PostgreSQL.

### 4. Inicie o servidor

```bash
node server.js
```

O servidor estará disponível em:

```text
http://localhost:3000
```

### 5. Execute o Front-End

Abra o arquivo `frontend/index.html` utilizando o Live Server do VS Code.

## 🔗 Endpoints da API

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/projetos` | Lista todos os projetos |
| POST | `/api/projetos` | Cadastra um projeto |
| PUT | `/api/projetos/:id` | Atualiza um projeto |
| DELETE | `/api/projetos/:id` | Exclui um projeto |

## 👨‍💻 Desenvolvedor

Desenvolvido por **Jordan Alves**.

- GitHub: [jordan756-coder](https://github.com/jordan756-coder)
- Portfólio: [DevPortfolio](https://github.com/jordan756-coder/DevPortfolio)

---

⭐ Se gostou do projeto, fique à vontade para explorar o repositório!
