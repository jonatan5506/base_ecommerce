# Instalação - npx create-react-app@latest

# ERRO IMPORTAÇÃO CSS
* criar arquivo css.d.ts com o conteudo
// Adiciona a declaração de módulo para arquivos CSS
declare module '*.css';

## CRIAR FAVICON DO CLIENTE

## IMAGENS ESTÃO NO PUBLIC, SEPARA POR:
    * BANNER
    * LOGO
    * PROMO
    * SAMPLE-PRODUCTS

## npm i lucide-react

## Instalar themes - npm i next-themes
## Intalar menu Shadcn - npx shadcn@latest add dropdown-menu
## Intalar sheet Shadcn - npx shadcn@latest add sheet

## Componente do cartão **IMPORTANTE**
* npx shadcn@latest add card


                                                        ***BANCO DE DADOS***

* PostgreSql Neon


***PRISMA ORM***

1º Instalar prisma no projeto - npm i -D prisma
2º inicializar - npx prisma init
3º A pasta prisma/schema.prisma é criada e nela crio os modelos
4º Trocar a Base_url criada, pela base do Neon
5ª criar modelos em prisma/schema.prisma
6º Gerar o Generated Prisma Client - npx prisma generate
7º Iniciar migrations - npx prisma migrate dev --name init # O "Init" é o nome da migração
8º Rodar o  prisma studio para ver se a migration subiu - npx prisma studio
9º npx prisma db push
10º rodar npx prisma studio
11º criar dentro de lib/prisma.ts
12º npm i @prisma/adapter-pg


***SEED***

1º Criar arquivo seed.ts ma pasta db
OBS: tive que instalar : npm install @prisma/adapter-pg
2º Executa a seed manualmente - npx tsx ./db/seed

OBS: As imagens ficam na no caminho indicado em sample-data.ts

***SERVER ACTIONS*** funciona como api

1º criar arquivo /lib/actions/model.action.ts


***Converter obj prisma em obg JS***
1º criar uma função em lib/utils

***VALIDAÇÃO COM ZOD***

1º Criar arquivo do zod em types/index.ts ficam nosso tipos
2º Instalar - npm i zod
3º Criar arquivo lib/validators.ts - onde ficarão as configs do zod
4º precisamos inferir o zod no arquivo types/index.ts

***PACOTES PARA USAR O NEON***
PULEI ESSA PARTE, AULA 24, SE DER MERDA EU VOLTO AQUI!
npm i @neondatabase/serverless @prisma/adapter-neon ws
npm i -D @types/ws bufferutil

***PAGINA DE DETALHES DE PRODUTO***
npx shadcn@latest add badge

***DEPLOY INICIAL NA VERSEL***
1º Fazer o build localmente para verificar
