'use server';

import { signInFormSchema, signUpFormSchema } from '../validators';
import { signIn, signOut } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { hashSync } from 'bcrypt-ts-edge';
import { prisma } from '../prisma';
import { formatErrors } from '../utils';

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData,
) {
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

//SigUp user
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    //salva a senha antes do hash
    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: 'Usuário criado com sucesso' };
  } catch (error) {    
    if (isRedirectError(error)) throw error;

    console.error(error);
    return { success: false, message: formatErrors(error) };//Erros tratados
  }
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
