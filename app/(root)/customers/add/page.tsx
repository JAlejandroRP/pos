import AddCustomerForm from '@/components/shared/AddCustomerForm'
import CartList from '@/components/shared/Cart'
import { Separator } from '@/components/ui/separator'
import { MAX_RESULTS, MIN_PAGE } from '@/constants'
import { getAllAnalysis } from '@/lib/actions/Analysis.actions'
import React from 'react'

const CUSTOMERS_ADD_PATHNAME = '/customers/add'

const CustomersAddPage = async () => {
  // const AnalysisList = await getAllAnalysis(CUSTOMERS_ADD_PATHNAME, MIN_PAGE, MAX_RESULTS, '', {});

  return (
    <div className='py-8 max-w-2xl m-auto'>
      <AddCustomerForm />
      {/* <Separator className='mt-4 mt-4'/>
      <Cart 
      Analysis={AnalysisList}
      asList
      /> */}
    </div>
  )
}

export default CustomersAddPage