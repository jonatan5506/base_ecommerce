import { NextResponse } from 'next/server';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    authorized({ request, auth }: any) {
      // check pelo cookie de session cart
      if (!request.cookies.get('sessionCartId')) {
        //criar novo cookie da session cart
        const sessionCartId = crypto.randomUUID();
        //Clona a request headers
        const newRequestHeaders = new Headers(request.headers);
        //Adiciona o cookie na request
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          }
        });
        //Adicona nova sessionCartId no cookie
        response.cookies.set('sessionCartId', sessionCartId);
        return response;
      } else {
        return true;
      }
    },
  },
  providers: [],
} satisfies NextAuthConfig;
