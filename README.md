# IGNITE - CHALLENGE FIND FRIEND - SOLID

Nesse desafio desenvolveremos uma API para a adoção de animais, a FindAFriend API, utilizando SOLID e testes.

### Regras da aplicação

- [x] - Deve ser possível cadastrar um pet
- [x] - Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] - Deve ser possível filtrar pets por suas características
- [x] - Deve ser possível visualizar detalhes de um pet para adoção
- [x] - Deve ser possível se cadastrar como uma ORG
- [x] - Deve ser possível realizar login como uma ORG

### Regras de negócio

- [x] - Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] - Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] - Um pet deve estar ligado a uma ORG
- [x] - O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] - Todos os filtros, além da cidade, são opcionais
- [x] - Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Requisitos da aplicação

- Docker
- Node

## Instalação

Duplique e renomeie o arquivo `.env.example` para `.env`

```sh
  npm install
```

Execute o comando abaixo para criar o banco de dados:

```sh
  docker-compose up
```

Execute o comando abaixo para rodar as migrations

```sh
  npx prisma migrate dev
```

Após rodar as migrations, rode o script SQL dentro do postgres que está na pasta `prisma/dump.sql`

Execute aplicação:

```sh
  npm run start:dev
```
