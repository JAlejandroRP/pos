'use client'
import React from 'react'
import { PatientData } from './PatientData'
import useCart from '@/lib/hooks/Cart'
import ListItems from './ListItems'
import Pagination from './Pagination'
import { Analysis } from '@/lib/database/models/analysis.model'
import { User } from '@/lib/database/models/user.model'
import { Perfil } from '@/lib/database/models/perfil.model'

const CreateAnalysysPerfilsPanel = ({
  user,
  query,
  totalPages,
  totalFilteredPages,
  analysis,
  userId
}: {
  user: User,
  query: string,
  totalPages: number,
  totalFilteredPages: number,
  analysis: Analysis[] | Perfil[],
  userId: string
}) => {
  const { cart, addItem, removeItem, cartHasItem, saveCart } = useCart()

  if (!cart) return <>Cargando...</>

  return (
    <main>
      <PatientData
        cart={cart!}
        user={user}
        userId={userId}
        saveCart={saveCart}
      />
      <div className='max-w-2xl m-auto pt-4'>
        <ListItems
          cartHasItem={cartHasItem}
          shoppingCart={cart!}
          data={analysis}
          addItem={addItem}
          removeItem={removeItem}
        />
        <Pagination
          totalPages={query === '' ? totalPages : totalFilteredPages}
        />
      </div>
    </main>
  )
}

export default CreateAnalysysPerfilsPanel