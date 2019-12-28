<h3 align="center">
  Desafio final fullstack - Gympoint
</h3>

## Informações

A aplicação fullstack foi desenvolvida em React no front, Nodejs no back e React Native no mobile (Android), para testa-lá você vai precisar ter instalado o [Git], [Node.js] + [Yarn]. Foram utilizados os bancos de dados [Mongo], [Postgres] e [Redis], instale as imagens através do [Docker].

## Iniciando o projeto

# Clone o repositório

```bash
git clone https://github.com/SamuelFerracini/Gympoint
```

## Backend

# Entre na pasta do backend

```bash
cd Gympoint/backend/
```

# Instale as dependências

```bash
yarn install
```

Faça uma cópia do arquivo .env.example, renomeie para .env e altere as variáveis de acordo com o seu ambiente.

# Crie a estrutura do banco de dados Postgres

```bash
yarn sequelize db:migrate
```

# Popule o banco de dados

```bash
yarn sequelize db:seed:all
```

# Inicie o servidor

```bash
yarn dev
```

# Em outra aba do terminal, inicie o serviço de email

```bash
yarn queue
```

## Frontend

# Entre na pasta do frontend

```bash
cd Gympoint/frontend/
```

# Instale as dependências

```bash
yarn install
```

# Inicie o frontend

```bash
yarn start
```

## Mobile

O app foi testado na plataforma Android 9.0 utilizando o emulador Genymotion

# Entre na pasta do mobile

```bash
cd Gympoint/mobile/
```

# Instale as dependências

```bash
yarn install
```

# Inicie o aplicativo

```bash
react-native run-android
```

OBS: Caso não comunique com a API, rode o comando `adb reserve tcp:3333 tcp:3333`
