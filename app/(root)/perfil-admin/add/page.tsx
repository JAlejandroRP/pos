import AddAnalisisForm, { AnalisisName } from '@/components/shared/AddAnalisisForm'
import { getAllAnalisis } from '@/lib/actions/analisis.actions'
import React from 'react'

const AddProductPage = async () => {
  const analisis:AnalisisName[] = (await getAllAnalisis('/analisis-admin/add', 1, 1000, '', { name: 1}) as AnalisisName[])
  
  return (
    <div className='py-8 m-auto'>
      <AddAnalisisForm analisisList={analisis} isPerfil
      />
    </div>
  )
}

export default AddProductPage