//import sampleData from '@/db/sample-data';
import ProductList from '@/components/shared/product/product-list';

import { getLatestProducts } from '@/lib/actions/product.actions';//Importar a ação do servidor
import { LATEST_PRODUCTS_LIMIT } from '@/lib/constants';

export const metadata = {
  title: 'Home',
  description: 'E-commerce criado com Next.js e Tailwind CSS',
};

//const dalay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

{
  /* Tela do meio */
}
export default async function Home() {
  //await dalay(2000); // Simula um atraso de 2 segundos
  const latestProducts = await getLatestProducts(); //Chama a ação do servidor para obter os produtos mais recentes

  return (
    <div>
      <ProductList 
        data={latestProducts} //Passa os produtos mais recentes como props
        title="Novos Produtos" 
        limit={LATEST_PRODUCTS_LIMIT}/> {/* Limita a qtd de produtos mostrados */}
    </div>
  );
}
