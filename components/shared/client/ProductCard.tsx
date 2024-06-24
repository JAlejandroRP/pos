import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Product } from '@/lib/database/models/product.model'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ProductCard = ({ product }: { product: Product }) => {
  console.log(product);

  return (
    <Card className="flex flex-col h-full">
      <div className='h-48 max-h-48 m-auto flex flex-col flex-grow'>
        <Image
          alt={product.name}
          src={product.image}
          width={200}
          height={300}
          className="m-auto p-6 max-h-48 object-contain"
        />
      </div>
      <CardHeader className='flex-grow'>
        <CardTitle className='flex-grow line-clamp-2'>{product.name}</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-grow flex-col pb-1'>
        <div className='line-clamp-3'>
          {product.details}
        </div>
      </CardContent>
      <CardFooter className='mt-auto flex items-center justify-between py-6'>
        <span className="text-primary font-bold my-auto">${product.price.toFixed(2)}</span>
        <Button size="sm" className="hover:bg-secondary my-auto px-2">
          <ShoppingCart className='h-6 w-6 m-1' />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard