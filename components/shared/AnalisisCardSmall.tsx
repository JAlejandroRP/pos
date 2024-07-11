'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AnalisisWithId } from '@/lib/database/models/analisis.model'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const AnalisisCardSmall = ({ analisis }: { analisis: AnalisisWithId }) => {
  const pathname = usePathname()
  const createAnalisisUrl = () => pathname + '/' + analisis._id;

  return (
    <Card className="flex flex-col h-full" >
      <Link
        href={createAnalisisUrl()}
      >
        <CardHeader className='flex-grow flex-row'>
          <CardTitle className='flex-grow line-clamp-2'>
            <div>
              {analisis.noIktan} - {analisis.code}
            </div></CardTitle>
        </CardHeader>
        <CardContent className='flex flex-grow flex-col pb-1'>
          <div className='line-clamp-4 text-md capitalize'>
            {analisis.name.toLowerCase()}
          </div>
        </CardContent>
      </Link>
      <CardFooter className='mt-auto flex items-center justify-between py-6'>
        <span className="text-primary font-bold my-auto">${analisis.costPublic.toFixed(2)}</span>
        <Link
          // href={createAnalisisUrl()}
          href={'#'}
        >
          <Button size="sm" variant='outline' className="hover:bg-green-400 my-auto px-2"
          >
            <ShoppingCart
              className='h-5 w-5 '
            />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default AnalisisCardSmall