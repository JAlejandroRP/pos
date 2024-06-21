import ProductsTable from '@/components/shared/admin/ProductsTable'
import { Button } from '@/components/ui/button'
import { getAllProducts } from '@/lib/actions/product.actions'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const ProductsPage = async () => {
  const pathname = usePathname();
  const products = await getAllProducts(pathname);

  return (
    <div className='w-full'>
      <div className='flex justify-between'>
        <h1>Products Page</h1>
        <Link href='/products/add' passHref>
          <Button role='a'>
            Add New Product
          </Button>
        </Link>
      </div>
      <div className='mt-8'>
        {products && <ProductsTable products={products} />}
      </div>
    </div>
  )
}

export default ProductsPage