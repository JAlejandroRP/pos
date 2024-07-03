import ProductCard from '@/components/shared/client/ProductCard';
import { getAllProducts } from '@/lib/actions/product.actions'
import React from 'react'


const AnalisisPage = async () => {
  const products = await getAllProducts('/products');


  return (
    <section>
      <div>
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Analisis
        </h2>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {products.map(product => <ProductCard product={product} />)}
      </div>
    </section>
  )
}

export default AnalisisPage