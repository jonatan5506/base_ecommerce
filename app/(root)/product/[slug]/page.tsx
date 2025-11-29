import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductPrice from '@/components/shared/product/product-price';
import { getProductBySlug } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';
import ProducImages from '@/components/shared/product/product-images';

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Coluna de imagens */}
          <div className="col-span-2">
            {/* Componente imagem */}
            <ProducImages images={product.images} />
          </div>
          {/* Coluna de detalhes */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>
              <p>
                {String(product.rating)} de {product.numReviews} Avaliações
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <ProductPrice
                  value={Number(product.price)}
                  className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2"
                />
              </div>
            </div>
            <div className="mt-10">
              <p className="font-semibold">Descrição</p>
              <p>{product.description}</p>
            </div>
          </div>
          {/* Coluna Ação */}
          <div>
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex justify-between">
                  <div>Preço</div>
                  <div>
                    <ProductPrice value={Number(product.price)} />
                  </div>
                </div>
                <div className="mb-2 flex justify-between">
                  <div>Status</div>

                  {product.stock > 0 ? (
                    <Badge variant="outline">Em Estoque</Badge>
                  ) : (
                    <Badge variant="destructive">Indisponível</Badge>
                  )}
                </div>
                {product.stock > 0 && (
                  <Button className="w-full">Adicionar ao carrinho</Button>
                )}{/*Adicionar lógica do carrinho */}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;
