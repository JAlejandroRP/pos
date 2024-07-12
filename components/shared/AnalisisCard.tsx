'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Analisis } from '@/lib/database/models/analisis.model'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const AnalisisCard = ({ analisis }: { analisis: Analisis }) => {
  const pathname = usePathname()
  const createAnalisisUrl = () => pathname + '/' + analisis._id;

  return (
    <Card className="flex flex-col h-full max-w-2xl m-auto" >
      <CardHeader className='flex-grow flex-row'>
        <CardTitle className='flex-grow capitalize'>{analisis.name.toLowerCase()}</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-grow flex-col pb-1'>
        <div className='line-clamp-4 text-md capitalize'>
          Code: {analisis.code}
        </div>
      </CardContent>
      <CardFooter className='mt-auto flex items-center justify-between py-6'>
        <span className="text-primary font-bold my-auto">${analisis.costPublic.toFixed(2)}</span>
        <Link
          href={'#'}
        >
          <Button size="sm" variant='outline' className="hover:bg-green-600 my-auto px-2"
          >
            <ShoppingCart
              className='h-6 w-6 m-1'
            />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default AnalisisCard