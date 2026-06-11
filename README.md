# Project Setup Instruction

## Initial Step

- npm init -y

## Package Install

- npm i express dotenv pg prisma @prisma/client @prisma/adapter-pg\

## For Development

- npm i -D nodemon
- npm i prisma --save-dev

```
DATABASE_URL = "postgresql://user:password@host:port/databaseName?schema=public"
```

## Podman Compose command

### To build, pull image and start container

- podman compose up

### To build, pull image and start container but silently

- podman compose up -d
-

# Prisma Setup Steps

- npx prisma init
- npx prisma migrate dev --name create_students_table

### to visualize the database tables

- npx prisma studio

### Note: if table already exists when migrating then

- npx prisma migrate reset

### Generating prisma client code

- npx prisma generate

### Things to rembere when importing prisma client on prisma.js

- prismalClient not found error can be solved by importing
  `import {prismaClient } from "../generated/prisma/clent.js:`
  -if `import {prismaClent} from '@prismal/clent'; ` is needed then we have to remove the `output = "../src/generated/prisma"` from the `Schema.prisma` file:
  ```
  Generate
  generator client {
   provider = "prisma-clent-js:
   output = "../src/generated/prisma"
   moduleFormat = "esm"
  }
  ```
  And regnerate the prisma code:
  `npx prisma generate`

### change prisma.cofig.ts into .js

and download the npm i @prisma/adapter-pg
npm i @prisma/client
