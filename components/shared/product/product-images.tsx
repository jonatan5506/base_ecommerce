'use client';

// Componente para exibir as imagens do produto
// As imagens vem de public/images/sample-products 
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const ProducImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);
  return <div className='space-y-4'>
    <Image src={images[current]} alt='Imagem do produto' width={1000} height={1000} className='min-h-[300px] object-cover object-center'/>
    <div className='flex'>
        {/*Imagens menores */}
        {images.map((img, index) => (
          <div key={img} 
            onClick={() => setCurrent(index)}
            className={ cn('border mr-2 cursor-pointer hover:border-orange-600', current === index && 'border-orange-500')}>
            <Image src={img} alt='imagens' width={125} height={125}/>
          </div>
        ))}
    </div>
  </div>;
};

export default ProducImages;
