# Base Ecommerce

Este projeto é uma plataforma de e-commerce base desenvolvida com as tecnologias mais modernas do ecossistema React e Next.js. O objetivo é fornecer uma estrutura robusta, performática e escalável para lojas virtuais, incluindo autenticação, gerenciamento de carrinho, banco de dados e UI responsiva.

## 🚀 Tecnologias Utilizadas

O projeto utiliza uma stack atualizada e focada em performance e experiência do desenvolvedor:

- **Framework:** [Next.js 16](https://nextjs.org/) (App Directory)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **UI & Estilização:**
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Shadcn UI](https://ui.shadcn.com/)
  - [Lucide React](https://lucide.dev/) (Ícones)
- **Banco de Dados & ORM:**
  - [PostgreSQL](https://www.postgresql.org/) (via [Neon Database](https://neon.tech/))
  - [Prisma ORM](https://www.prisma.io/)
- **Autenticação:** [NextAuth.js (v5 Beta)](https://authjs.dev/)
- **Validação:** [Zod](https://zod.dev/)
- **Utilitários:** `clsx`, `tailwind-merge`

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 20 ou superior recomendada)
- [npm](https://www.npmjs.com/) ou gerenciador de pacotes equivalente
- Conta no [Neon](https://neon.tech/) (para o banco de dados PostgreSQL)

## 🛠️ Instalação e Configuração

Siga os passos abaixo para configurar o projeto localmente:

1. **Clone o repositório:**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd base-ecommerce
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configuração de Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias (baseado no `.env.example` se houver, ou nas configurações do Prisma e Auth). Exemplos comuns:

   ```env
   DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
   NEXTAUTH_SECRET="seu-segredo-gerado-com-openssl" # gere com: openssl rand -base64 32
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Configuração do Banco de Dados (Prisma):**

   Gere o cliente do Prisma:

   ```bash
   npx prisma generate
   ```

   Realize a migração inicial para criar as tabelas:

   ```bash
   npx prisma migrate dev --name init
   ```

   (Opcional) Envie o schema diretamente se não estiver usando migrações:

   ```bash
   npx prisma db push
   ```

5. **Popular o Banco de Dados (Seed):**
   Para inserir dados iniciais de teste (produtos, usuários de exemplo):
   ```bash
   npx tsx ./db/seed
   ```

## ▶️ Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto estará acessível em [http://localhost:3000](http://localhost:3000).

## 📂 Estrutura do Projeto

- `/app`: Páginas e rotas da aplicação (Next.js App Router).
- `/components`: Componentes reutilizáveis da UI (Botões, Inputs, Cards, etc.).
- `/db`: Scripts de seed e configurações de banco.
- `/lib`: Funções utilitárias, actions do servidor, verificadores e constantes.
- `/prisma`: Schema do banco de dados (modelos User, Product, Cart, etc.).
- `/public`: Arquivos estáticos (imagens, favicons).
- `/types`: Definições de tipos TypeScript globais ou compartilhados.

## ✨ Funcionalidades Principais

- **Catálogo de Produtos:** Listagem dinâmica com banco de dados.
- **Carrinho de Compras:** Gerenciamento de itens, cálculo de subtotal.
- **Autenticação:** Login, Registro e Sessão de usuários.
- **Admin/Seed:** Scripts para popular o banco de dados com dados de teste.
- **Design Responsivo:** Adaptado para mobile e desktop com temas (Dark/Light mode).

## 📝 Scripts Disponíveis

- `npm run dev`: Inicia o ambiente de desenvolvimento.
- `npm run build`: Cria a build de produção.
- `npm run start`: Inicia o servidor de produção.
- `npm run lint`: Executa a verificação de lint (ESLint).
- `npx prisma studio`: Abre interface visual para gerenciar o banco de dados.

---

Desenvolvido como parte do projeto de Ecommerce Base.
