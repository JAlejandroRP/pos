import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const CustomersPage = () => {
  return (
    <div className='w-full flex justify-between'>
      CustomersPage
      <Link href={'/customers/add'}>
        <Button>
          Add New Customer
        </Button>
      </Link>
    </div>
  )
}

export default CustomersPage