/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodError } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Converte obj prisma em obj Js
export function convertObjPrismaToObjJs<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

//Formatar numeros com casas decimais
export function formatNumberToDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}

//Formata Erros SignUp
export function formatError(error: unknown): string {

  // ✅ ZOD v4+
  if (error instanceof ZodError) {
    return error.issues
      .map(issue => issue.message)
      .join('. ');
  }

  // ✅ PRISMA
  if (
    typeof error === 'object' &&
    error !== null &&
    (error as any).name === 'PrismaClientKnownRequestError' &&
    (error as any).code === 'P2002'
  ) {
    return 'Esse e-mail já está cadastrado.';
  }

  // ✅ fallback
  return 'Erro inesperado ao processar sua solicitação.';
}

// Arredonda para duas casas decimais
export function roundToTwo(value: number | string) {
  try {
    if (typeof value === 'number') {
      return Math.round((value + Number.EPSILON) * 100) / 100;
    }
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } catch (error) {
    throw new Error('O valor deve ser um número ou string');
  }
}

