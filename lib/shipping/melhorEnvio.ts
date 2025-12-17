// Voltar no final do projeto
// import axios from 'axios';
// import { CartItem } from '@/types';

// const MELHOR_ENVIO_URL = 'https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate';

// export async function calculateMelhorEnvioShipping(
//   cepDestino: string,
//   items: CartItem[]
// ) {
//   const products = items.map(item => ({
//     id: item.productId,
//     width: item.width,
//     height: item.height,
//     length: item.length,
//     weight: item.weight,
//     insurance_value: Number(item.price),
//     quantity: item.qty,
//   }));

//   const response = await axios.post(
//     MELHOR_ENVIO_URL,
//     {
//       from: { postal_code: '01001-000' }, // seu CEP de origem
//       to: { postal_code: cepDestino },
//       products,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   );

//   return response.data;
// }
