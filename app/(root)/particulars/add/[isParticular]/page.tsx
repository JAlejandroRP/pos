import AddParticularForm from '@/components/shared/AddParticularForm'
import AddUserForm from '@/components/shared/AddUserForm'
import React from 'react'

const CUSTOMERS_ADD_PATHNAME = '/customers/add'

const CustomersAddPage = async ({
  params: { isParticular } }: {
    params: { isParticular: string }
  },) => {
  return (
    <div className='py-8 max-w-2xl m-auto'>
      {isParticular === 'false' ?
        <AddUserForm /> :
        <AddParticularForm />}
    </div>
  )
}

export default CustomersAddPage