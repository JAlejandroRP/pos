import ProductsTable from '@/components/shared/admin/ProductsTable'
import { Button } from '@/components/ui/button'
import { getAllProducts } from '@/lib/actions/product.actions'
import Link from 'next/link'
import React from 'react'

const AnalisisAdminPage = async () => {
  const products = await getAllProducts('/products/');

  return (
    <div className='w-full'>
      <div className='flex justify-between'>
        <h1>Analisis Admin Page</h1>
        <Link href='/products-admin/add' passHref>
          <Button role='a'>
            Add New Analisis
          </Button>
        </Link>
      </div>
      <div className='mt-8'>
        {products && <ProductsTable products={products} />}
      </div>
    </div>
  )
}

export default AnalisisAdminPage