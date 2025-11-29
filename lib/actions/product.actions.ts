'use server';

import { prisma } from "@/lib/prisma";
//import { convertObjPrismaToObjJs } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

// export async function getLatestProducts() {
//   const data = await prisma.product.findMany({
//     take: LATEST_PRODUCTS_LIMIT,
//     orderBy: { createdAt: "desc" }
//   });
//   return convertObjPrismaToObjJs(data);
// }

export async function getLatestProducts() {
  const products = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  return products.map(product => ({
    ...product,
    price: product.price.toString(),
    rating: product.rating.toString(),
  }));
}

//Pega o pruduto pelo slug da url
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug }
  });
}
