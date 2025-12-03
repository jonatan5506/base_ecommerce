import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';

export const authOptions: NextAuthConfig = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },

  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string},
        });

        if (!user || !user.password) return null;

        const isValid = compareSync(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name ?? undefined,
          email: user.email!,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async session({ session, trigger, user, token }) {
      session.user.id = token.sub!;

      if (trigger === 'update' && user?.name) {
        session.user.name = user.name;
      }

      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);


//v1
// import NextAuth from 'next-auth';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import { prisma } from '@/lib/prisma';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { compareSync } from 'bcrypt-ts-edge';
// import type { NextAuthConfig } from 'next-auth';

// export const authOptions: NextAuthConfig = {
//   pages: {
//     //Esse deve ser o mesmo nome da rota de autenticação
//     signIn: '/sign-in',
//     error: '/sign-in',
//     //v1
//     //signIn: 'sign-in',
//     //error: 'sign-in',
//   },
//   session: {
//     strategy: 'jwt',
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         //Credenciais que serão solicitadas no formulário de login - Github - Google
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       // Função para autorizar o usuário com base nas credenciais fornecidas
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         // Buscar o usuário no banco de dados pelo email
//         const user = await prisma.user.findFirst({
//           where: { email: credentials.email as string },
//         });

//         // Se o usuário não for encontrado ou não tiver senha, retorna null
//         if (user && user.password) {
//           // Verificar se a senha fornecida corresponde à senha armazenada
//           const isValid = compareSync(
//             credentials.password as string,
//             user.password,
//           );

//           if (isValid) {
//             // Retornar os dados do usuário se a autenticação for bem-sucedida
//             return {
//               id: user.id,
//               name: user.name ?? undefined,
//               email: user.email,
//               role: user.role,
//             };
//           }
//         }
//         // Retorna null se a autenticação falhar
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, user, trigger, token }: any) {
//       // Adiciona o ID do usuário e a função ao objeto de sessão
//       session.user.id = token.sub;
//       // Adiciona a role do usuário à sessão
//       if (trigger === 'update') {
//         session.user.name = user.name;
//       }
//       return session;
//     },
//   },
// };

// export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
