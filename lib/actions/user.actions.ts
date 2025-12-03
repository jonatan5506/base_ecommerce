'use server';

import { signInFormSchema } from '../validators';
import { signIn, signOut } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export async function signInWithCredentials(prevState: unknown, formData: FormData) {
  try {
    const parsed = signInFormSchema.parse({
      email: formData.get('email') ?? '',
      password: formData.get('password') ?? '',
    });

    await signIn('credentials', {
      email: parsed.email,
      password: parsed.password,
      //redirect: false,
    });

    return { success: true, message: 'Usuário autenticado com sucesso' };

  } catch (error) {
    if (isRedirectError(error)) throw error;

    console.error(error);
    return { success: false, message: 'Email ou senha incorretos' };
  }
}

// SignOut action
export async function signOutUser() {
    await signOut();
}

//v1
// 'use server';

// import { signInFormSchema } from "../validators";
// import { signIn, signOut } from "@/auth";
// import { isRedirectError } from "next/dist/client/components/redirect-error";

// //TODO criar signIn com providers (google, facebook, instagram,  etc)
// // SigIn action com credenciais
// export async function signInWithCredentials(prevState: unknown, formData: FormData) {
//     try {
//         const user = signInFormSchema.parse({
//             email: formData.get('email'),
//             password: formData.get('password'),
//         });
//         await signIn('credentials', user);  
//         return { success: true, message: 'Usuário autenticado com sucesso' };
//     } catch (error) {
//         if (isRedirectError(error)) {
//             throw error;
//         }
//         return { success: false, message: 'Email ou senha incorretos'  };
//     }
// }

// // SignOut action
// export async function signOutUser() {
//     await signOut();
// }
