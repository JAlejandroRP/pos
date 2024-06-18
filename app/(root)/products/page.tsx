import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const ProductsPage = () => {

  return (
    <>
      <div>ProductsPage</div>
      <Link href='/products/add' passHref>
      <Button role='a'>
        Add New Product
      </Button>
      </Link>
    </>
  )
}

export default ProductsPage