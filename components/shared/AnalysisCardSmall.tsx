'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Analysis } from '@/lib/database/models/analysis.model'
import { Delete, ShoppingCart, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const AnalysisCardSmall = ({
  analysis,
  // cartHasItem,
  removeCartItem,
  addCartItem
}: {
  analysis: Analysis,
  // cartHasItem: boolean,
  removeCartItem: Function,
  addCartItem: Function,
}) => {
  const pathname = usePathname()
  const createAnalysisUrl = () => pathname + '/' + analysis._id;

  return (
    <Card className="flex flex-col h-full" >
      <Link
        href={createAnalysisUrl()}
      >
        <CardHeader className='flex-grow flex-row'>
          <CardTitle className='flex-grow line-clamp-2'>
            <div>
              {analysis.name}
            </div></CardTitle>
        </CardHeader>
        <CardContent className='flex flex-grow flex-col pb-1'>
          <div className='line-clamp-4 text-md capitalize'>
            {analysis.name.toLowerCase()}
          </div>
        </CardContent>
      </Link>
      <CardFooter className='mt-auto flex items-center justify-between py-6'>
        <span className="text-primary font-bold my-auto">${analysis.costPublic.toFixed(2)}</span>
        <Link
          // href={createAnalysisUrl()}
          className='max-w-10'
          href={'#'}
        >
          {/* {cartHasItem ?
            <Button size='sm' variant={'outline'} onClick={() => removeCartItem(Analysis)} className='px-2 text-red-700'>
              <X
                className='h-5 w-5'
              />
            </Button> :
            <Button size="sm" variant='outline' className="text-green-400 my-auto px-2"
              onClick={() => addCartItem(Analysis)}
            >
              <ShoppingCart
                className='h-5 w-5 '
              />
            </Button>} */}
        </Link>
      </CardFooter>
    </Card>
  )
}

export default AnalysisCardSmall