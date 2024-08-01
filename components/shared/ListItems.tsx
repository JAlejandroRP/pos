"use client"
import { Analysis } from '@/lib/database/models/analysis.model'
import React from 'react'
import AnalysisListItem from './AnalysisListItem'
// import { addItem, removeItem } from '@/lib/actions/cart.actions'
import { Cart } from '@/types'
import { Perfil } from '@/lib/database/models/perfil.model'
import useCart from '@/lib/hooks/Cart'

const ListItems = ({
  data,
  addItem,
  removeItem,
  cartHasItem
}: {
  data: (Analysis | Perfil)[],
  shoppingCart: Cart,
  addItem: Function,
  removeItem: Function
  cartHasItem: Function
}) => {

  return (
    <div
      // className={`grid grid-cols-2 ${!asList ? 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6' : 'max-w-2xl m-auto'}`}
      className={`grid grid-cols-1`}
    >
      {data.map(currAnalysis => {
        return <AnalysisListItem
          selected={cartHasItem}
          key={currAnalysis._id!.toString()}
          data={currAnalysis}
          addCartItem={addItem}
          removeCartItem={removeItem}
        />
      })}
    </div>
  )
}

export default ListItems