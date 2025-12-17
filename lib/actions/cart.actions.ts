'use server';

import { cookies } from 'next/headers';
import { CartItem } from '@/types';
import { convertObjPrismaToObjJs, formatError, roundToTwo } from '@/lib/utils';
import { auth } from '@/auth';
import { prisma } from "@/lib/prisma";
import { cartItemSchema } from '../validators';

//Calcula valores do carrinho
const calcPrice = (items: CartItem[]) => {
    const itemsPrice = roundToTwo(
        items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0),
    );
    //VERIFICAR A REGRA DE NEGÓCIO DO CLIENTE PARA CALCULAR O VALOR DO FRETE
    const shippingPrice = roundToTwo(itemsPrice > 100 ? 0 : 10);
    //VERIFICAR A REGRA DE NEGÓCIO DO CLIENTE PARA CALCULAR O IMPOSTO, NESTE CASO 15%
    const taxPrice = roundToTwo(itemsPrice * 0.15);
    const totalPrice = roundToTwo(itemsPrice + shippingPrice + taxPrice);

    return { 
        itemsPrice: itemsPrice.toFixed(2), 
        shippingPrice: shippingPrice.toFixed(2), 
        taxPrice: taxPrice.toFixed(2), 
        totalPrice: totalPrice.toFixed(2) 
    };
}

// VERSÃO COM CALCULO REAL MELHORES ENVIO, CORREIOS...

// const calcPrice = (
//   items: CartItem[],
//   shippingPrice: number
// ) => {
//   const itemsPrice = roundToTwo(
//     items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
//   );

//   const taxPrice = roundToTwo(itemsPrice * 0.15);
//   const totalPrice = roundToTwo(itemsPrice + shippingPrice + taxPrice);

//   return { 
//     itemsPrice: itemsPrice.toFixed(2), 
//     shippingPrice: shippingPrice.toFixed(2), 
//     taxPrice: taxPrice.toFixed(2), 
//     totalPrice: totalPrice.toFixed(2) 
//   };
// };

export async function addItemToCart(data: CartItem) {
    console.log('addItemToCart started');
    try {
        //checar o cookie do carrinho
        const sessionCartId = (await cookies()).get('sessionCartId')?.value;
        console.log('sessionCartId check:', sessionCartId);

        if (!sessionCartId) throw new Error('Carrinho não encontrado');

        //Pegar sesseion e user Id
        const session = await auth();
        const userId = session?.user?.id ? (session.user.id as string) : undefined;

        //Pega carrinho
        const cart = await getMyCart();

        //Converte e valida item
        const item = cartItemSchema.parse(data);

        //Encontra produto no Db
        const product = await prisma.product.findFirst({
            where: { id: item.productId }
        });
        
        console.log('sessionCartId: ', sessionCartId);
        console.log('userId: ', userId);
        console.log('item: ', item);
        console.log('product: ', product);
        
        return {
            success: true,
            message: 'Item adicionado ao carrinho',     
        }
    } catch (error) {
        console.error('addItemToCart error:', error);
        return {
            success: false,
            message: formatError(error),     
        }
    }
}

export async function getMyCart() {
    //checar o cookie do carrinho
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    console.log('sessionCartId check:', sessionCartId);

    if (!sessionCartId) throw new Error('Carrinho não encontrado');

    //Pegar sesseion e user Id
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    //Pega o carrinho do usuario na DB
    const cart = await prisma.cart.findFirst({
        where: userId ? { userId } : { sessionCartId } 
    });

    if (!cart) return undefined;

    //Converte decimais e retorna
    return convertObjPrismaToObjJs({
        ...cart,
        items: cart.items as CartItem[],
        totalPrice: cart.totalPrice.toString(),
        itemsPrice: cart.itemsPrice.toString(),
        shippingPrice: cart.shippingPrice.toString(),
        taxPrice: cart.taxPrice.toString()
    });
}