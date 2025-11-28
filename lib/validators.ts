import { z } from 'zod';
import { formatNumberToDecimal } from './utils';

//Vai ser reaproveitado em outros schemas
const currency = z
    .string()
    .refine((value) => /^\d+(\.\d{2})?$/.test(formatNumberToDecimal(Number(value))),
    { message: 'Price deve ser um número com até duas casas decimais' });

// Esquema para inserir produtos
export const productSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(255),
  slug: z.string().min(3, 'Slug deve ter no mínimo 3 caracteres').max(255),
  category: z.string().min(3, 'Category deve ter no mínimo 3 caracteres').max(255),
  brand: z.string().min(3, 'Brand deve ter no mínimo 3 caracteres').max(255),
  Description: z.string().min(3, 'Description deve ter no mínimo 3 caracteres').max(255),
  stock: z.coerce.number('Stock deve ser um número'),
  images: z.array(z.string().min(1, 'Deve haver pelo menos uma imagem')),
  isFeature: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});
