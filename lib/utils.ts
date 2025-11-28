import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Converte obj prisma em obj Js
export function convertObjPrismaToObjJs<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}