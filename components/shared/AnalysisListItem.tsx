'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Analysis } from '@/lib/database/models/analysis.model'
import { Delete, Plus, ShoppingCart, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { useToast } from '../ui/use-toast'
import { Perfil } from '@/lib/database/models/perfil.model'

const AnalysisListItem = ({
  data,
  removeCartItem,
  addCartItem,
  selected
}: {
  data: Analysis | Perfil
  removeCartItem: Function,
  addCartItem: Function,
  selected: Function
}) => {
  // const [selected, setSelected] = useState(false)
  const Total = () => {
    if ((data as Analysis).costPublic)
      return <>
        {(data as Analysis).costPublic.toLocaleString()}
      </>
    if ((data as Perfil).total) return <>
      {(data as Perfil).total.toLocaleString()}
    </>
  }
  // const createAnalysisUrl = () => pathname + '/' + analysis._id;
  const { toast } = useToast()

  const toastSuccess = () => toast({
    title: "Item added to cart",
    duration: 5000,
    className: "success-toast",
  });


  return (
    <Card className="grid grid-cols-3 w-full mb-3 shadow-lg" >
      <CardContent
        className='col-span-2 p-0 ml-2 flex flex-row'
      >
        <span className='pl-4 w-full m-auto capitalize'>
          {data.name.toLowerCase()}
        </span>
      </CardContent>
      <CardFooter className='p-2 flex flex-row justify-between items-center'>
        <span className="text-primary font-bold my-auto">
          $ <Total />
        </span>
        <div
          className='max-w-10'
        >
          {selected(data) ?
            <Button size='sm' variant={'outline'} onClick={() => {
              removeCartItem(data)
            }} className='px-2 text-red-700'>
              <X
                className='h-4 w-4'
              />
            </Button> :
            <Button size="sm" variant='outline' className="text-green-400 my-auto px-2"
              onClick={() => {
                addCartItem(data)
              }}
            >
              <Plus
                className='h-4 w-4 '
              />
            </Button>}
        </div>
      </CardFooter>
    </Card>
  )
}

export default AnalysisListItem