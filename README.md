# Trybe Futebol Clube

Esse repositório contém uma aplicação desenvolvida para o projeto Blogs API na Trybe. É formado por um banco de dados MySQL, um back end desenvolvido em Node.Js com Express e manipulando o banco através da ORM Sequelize. Além disso, a biblioteca JWT é utilizada para fazer a autenticação do usuário.

---

## Tecnologias

* Docker

* MySQL

* Node.js

* Express

* Sequelize

* JsonWebToken

---

## Instalação

Inicialmente, abra o terminal e cole o seguinte código para clonar o repositório em sua máquina:

```
git clone git@github.com:rafaeldejesusl/ProjectBlogsAPI.git
```

Após clonado, entre na pasta do projeto:

```
cd ProjectBlogsAPI
```

Na pasta raiz do projeto, rode os contâineres:

```
docker-compose up -d
```

Entre no contâiner de backend:

```
docker exec -it store_manager bash
```

Instale as dependências dentro do contâiner:

```
npm install
```

Inicie a aplicação:

```
npm start
```

Após isso, as rotas podem ser acessadas através do seguinte endereço:

```
http://localhost:3000/
```

**⚠ OBS: O processo de iniciação pode ser demorado, espere até sua conclusão para evitar erros.**

---

## Banco de Dados

O banco de dados roda num contâiner MySQL, e a interação com o backend é realizada através da ORM Sequelize. O nome do banco é blogs-api, e contém quatro tabelas:

* "Users" que contém as informações dos usuários registrados;

* "Categories" que contém as informações das categorias registradas;

* "BlogPosts" que contém as informações dos posts registrados;

* "PostCategories" que faz a ligação entre as tabelas BlogPosts e Categories.

---

## Back End

O back end roda num contâiner criado a partir do Dockerfile na pasta "backend", e realiza as operações das tabelas do banco de dados através do Sequelize. As rotas disponíveis são:

* Método POST `/login`, verifica o usuário e retorna o token;

* Método POST `/user`, cria um novo usuário;

* Método GET `/user`, retorna todos os usuários;

* Método GET `/user/:id`, retorna o usuário pelo seu id;

* Método POST `/categories`, cria uma nova categoria;

* Método GET `/categories`, lista todas as categorias;

* Método POST `/post`, cria uma nova publicação;

* Método GET `/post`, lista todas as publicações;

* Método GET `/post/search?`, pesquisa publicações através da query string `q`;

* Método GET `/post/:id`, retorna uma publicação pelo deu id;

* Método PUT `/post/:id`, edita uma publicação;

* Método DELETE `/post/:id`, apaga uma determinada publicação;

* Método DELETE `/user/me`, apaga um determinado usuário;

**⚠ OBS: Com exceção das rotas de criação de usuário e de login, todas elas requerem um token válido**

---

## Feedbacks

Caso tenha alguma sugestão ou tenha encontrado algum erro no código, estou disponível para contato no meu [LinkedIn](https://www.linkedin.com/in/rafael-de-jesus-lima/)