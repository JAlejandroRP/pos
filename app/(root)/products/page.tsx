import ProductCard from '@/components/shared/client/ProductCard';
import { getAllProducts } from '@/lib/actions/product.actions'
import React from 'react'


const ProductsPage = async () => {
  const products = await getAllProducts('/products');


  return (
    <section>
      <div>ProductsPage</div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {products.map(product => <ProductCard product={product} />)}
      </div>
    </section>
  )
}

export default ProductsPage