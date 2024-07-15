'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Analisis } from '@/lib/database/models/analisis.model'
import { Delete, ShoppingCart, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useToast } from '../ui/use-toast'

const AnalisisListItem = ({
  analisis,
  cartHasItem,
  removeCartItem,
  addCartItem
}: {
  analisis: Analisis,
  cartHasItem?: boolean,
  removeCartItem: Function,
  addCartItem: Function,
}) => {
  const pathname = usePathname()
  const createAnalisisUrl = () => pathname + '/' + analisis._id;
  const { toast } = useToast()


  const toastSuccess = () => toast({
    title: "Item added to cart",
    duration: 5000,
    className: "success-toast",
  });

  return (
    <Card className="grid grid-cols-4 w-full mb-2" >
      <CardHeader className=''>
        <CardTitle className='text-md'>
          <div>
            {analisis.noIktan} - {analisis.code}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className='p-2 col-span-2 m-auto'>
        {analisis.name.toLowerCase()}
      </CardContent>
      <CardFooter className='p-2 flex flex-row justify-between items-center'>
        <span className="text-primary font-bold my-auto">
          ${analisis.costPublic.toFixed(2)}
        </span>
        <Link
          className='max-w-10'
          href={'#'}
        >
          {cartHasItem ?
            <Button size='sm' variant={'outline'} onClick={() => removeCartItem(analisis)} className='px-2 text-red-700'>
              <X
                className='h-5 w-5'
              />
            </Button> :
            <Button size="sm" variant='outline' className="text-green-400 my-auto px-2"
              onClick={() => addCartItem(analisis)}
            >
              <ShoppingCart
                className='h-5 w-5 '
              />
            </Button>}
        </Link>
      </CardFooter>
    </Card>
  )
}

export default AnalisisListItem