import CustomersTable from '@/components/shared/admin/CustomersTable';
import { Button } from '@/components/ui/button'
import { getAllCustomersMongoDb } from '@/lib/actions/user.actions';
import Link from 'next/link'
import React from 'react'

const CustomersPage = async () => {
  const customers = await getAllCustomersMongoDb();
    
  return (
    <div className='w-full py-8'>
      <div className='flex justify-between'>
        {/* <h1>Customers Admin Page</h1> */}
        <Link href='/customers/add' passHref>
          <Button role='a' variant='secondary' className='hover:bg-gray-200'>
            Add New Customer
          </Button>
        </Link>
      </div>
      <div className='mt-8'>
        {customers && <CustomersTable customers={customers} />}
      </div>
    </div>
    // <div className='w-full flex justify-between'>
    //   CustomersPage
    //   <Link href={'/customers/add'}>
    //     <Button>
    //       Add New Customer
    //     </Button>
    //   </Link>
    // </div>
  )
}

export default CustomersPage