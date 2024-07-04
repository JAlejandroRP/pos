import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Analisis } from '@/lib/database/models/analisis.model'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const AnalisisCard = ({ analisis }: { analisis: Analisis }) => {

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className='flex-grow'>
        <CardTitle className='flex-grow line-clamp-2'>{analisis.code}</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-grow flex-col pb-1'>
        <div className='line-clamp-4 text-md capitalize'>
          {analisis.name.toLocaleLowerCase()}
        </div>
      </CardContent>
      <CardFooter className='mt-auto flex items-center justify-between py-6'>
        <span className="text-primary font-bold my-auto">${analisis.costPublic.toFixed(2)}</span>
        <Button size="sm" className="hover:bg-secondary my-auto px-2">
          <ShoppingCart className='h-6 w-6 m-1' />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AnalisisCard