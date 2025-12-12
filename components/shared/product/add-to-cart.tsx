'use client';

import { CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { addItemToCart } from '@/lib/actions/cart.actions';

const AddToCart = ({item}: {item: CartItem}) => {
    const router = useRouter();
    const { toast } = useToast();
    const handleAddToCart = async () => {
        const res = await addItemToCart(item);

        if (!res.success) {
            toast({
                variant: 'destructive',
                description: res.message,
                title: 'Erro ao adicionar ao carrinho',
            });
            return;
        }
        //Item adicionado ao carrinho
        toast({
            title: `${item.name} adicionado ao carrinho`,
            action: (
            <ToastAction className='bg-primary text-white hover:bg-gray-800' altText='Ver carrinho' 
            onClick={() => router.push('/cart')}>
                Vá para o carrinho
            </ToastAction>)
        });
        router.refresh();
    }
    return (<Button className='w-full' type='button' onClick={handleAddToCart}><Plus />Adicionar ao carrinho</Button> );
};

export default AddToCart;
