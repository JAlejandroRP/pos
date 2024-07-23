'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Analysis } from '@/lib/database/models/analysis.model'
import { Delete, ShoppingCart, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const OptionsCard = ({
  title,
  href
}: {
  title: string,
  href: string,
}) => {
  return (
    <Link href={href}>
      <Card className="flex flex-col h-full !rounded-2xl" >
        <CardHeader className='flex-grow flex-row'>
          <CardTitle className='flex-grow line-clamp-2'>
            {title}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  )
}

export default OptionsCard