import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const ProductsPage = () => {

  return (
    <div className='w-full flex justify-between'>
      ProductsPage
      <Link href='/products/add' passHref>
        <Button role='a'>
          Add New Product
        </Button>
      </Link>
    </div>
  )
}

export default ProductsPage