# Code Connect

> Aplicação React para consumo de uma API REST com autenticação de usuários, gerenciamento de publicações e arquitetura organizada por responsabilidades.

![React](https://img.shields.io/badge/React-19-61DAFB)
![Vite](https://img.shields.io/badge/Vite-7-646CFF)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4)
![Docker](https://img.shields.io/badge/API-Docker-2496ED)
![Status](https://img.shields.io/badge/status-Concluído-success)

Aplicação Front-end desenvolvida em **React** para consumo de uma API REST, permitindo autenticação de usuários, publicação de conteúdos e interação com postagens.

O projeto foi desenvolvido com foco na organização do código, componentização e boas práticas de desenvolvimento Front-end, utilizando uma arquitetura simples e escalável baseada em responsabilidades.

---

## ✨ Funcionalidades

- Cadastro de usuários
- Login e Logout
- Autenticação
- Feed de publicações
- Visualização de posts
- Interações com publicações
- Exclusão de postagens
- Tratamento de rotas inexistentes (404)

---

## 🚀 Tecnologias utilizadas

- React 19
- Vite
- React Router
- Axios
- React Markdown
- ESLint
- Docker (API)

---

## 🏗 Arquitetura

O projeto foi organizado buscando separar responsabilidades entre interface, regras de negócio e comunicação com a API.

```

src/

├── api/ # Comunicação com a API

├── assets/ # Arquivos estáticos

├── components/ # Componentes reutilizáveis

├── hooks/ # Hooks customizados

├── layouts/ # Layouts da aplicação

├── pages/ # Páginas

├── router/ # Configuração das rotas

└── main.jsx

```

Essa estrutura facilita a manutenção do projeto, além de tornar a aplicação mais escalável conforme novas funcionalidades são adicionadas.

---

## 🔐 Autenticação

A autenticação da aplicação foi abstraída em um Hook customizado (`useAuth`), centralizando toda a lógica relacionada ao usuário autenticado.

---

## 📡 Comunicação com API

Toda a comunicação com o backend foi centralizada na pasta **api**, utilizando **Axios** para realizar requisições HTTP.

O backend utilizado neste projeto pode ser executado através do Docker conforme a documentação disponibilizada pela Alura.

---

## 💡 Conceitos praticados

Durante o desenvolvimento deste projeto foram exercitados diversos conceitos importantes do ecossistema React:

- Componentização
- Hooks customizados
- Consumo de APIs REST
- Requisições assíncronas
- Gerenciamento de autenticação
- Organização por responsabilidades
- Navegação entre páginas
- Tratamento de erros
- Estrutura escalável de projetos
- Integração Front-end / Back-end

---

## 🛠 Como executar o projeto

### Clone o repositório

```bash
git clone https://github.com/MeloMatheus89/code-connect-main-consumindo-API.git
```

### Instale as dependências

```bash
npm install
```

### Execute o Front-end

```bash
npm run dev
```

### Execute a API

Siga as instruções disponíveis no repositório da API para subir o ambiente utilizando Docker.
[API](https://github.com/viniciosneves/4870--api-com-docker)

---

## 📚 Aprendizados

Este projeto foi desenvolvido com o objetivo de consolidar conhecimentos em:

- React
- React Router
- Consumo de APIs REST
- Axios
- Organização de aplicações Front-end
- Comunicação entre Front-end e Back-end
- Docker para ambientes de desenvolvimento

---

## 🔮 Melhorias futuras

- Paginação
- Busca de publicações
- Testes automatizados
- Loading states
- Feedback visual para erros
- Refresh Token
- Internacionalização

---

## 👨‍💻 Autor

**Matheus Melo**

Desenvolvedor Front-end em formação, apaixonado por arquitetura de software, RPG e desenvolvimento de aplicações web.
