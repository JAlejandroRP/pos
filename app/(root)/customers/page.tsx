import CustomersTable from '@/components/shared/CustomersTable';
import { Button } from '@/components/ui/button'
import { getAllCustomersMongoDb } from '@/lib/actions/user.actions';
import Link from 'next/link'
import React from 'react'

const CustomersPage = async () => {
  const customers = await getAllCustomersMongoDb();
  console.log(customers);
  
    
  return (
    <div className='w-full py-8'>
      <div className='flex justify-between'>
        <Link href='/customers/add' passHref>
          <Button role='a' variant='outline' className='hover:bg-gray-200'>
            Add New Customer
          </Button>
        </Link>
      </div>
      <div className='mt-8'>
        {customers && <CustomersTable customers={customers} />}
      </div>
    </div>
  )
}

export default CustomersPage