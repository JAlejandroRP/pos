"use client"
import { Analysis } from '@/lib/database/models/analysis.model'
import React from 'react'
import AnalysisListItem from './AnalysisListItem'
import { useToast } from '../ui/use-toast'
// import AnalysisCardSmall from './AnalysisCardSmall'
import { useRouter } from 'next/navigation'
import { addItem, removeItem } from '@/lib/actions/cart.actions'
import AnalysisCardSmall from './AnalysisCardSmall'
import { Cart } from '@/types'
import { Perfil } from '@/lib/database/models/perfil.model'
// import { set } from '@/lib/redis/redis'


const ListItems = ({ data, asList, cart }: { data: (Analysis | Perfil)[], asList?: boolean, cart: Cart }) => {
  const cartHasItem = (item: Analysis | Perfil) => {
    const exitsAnalysis = cart!.items.analysis?.find(e => e._id === item._id) || false
    const exitsPerfil = cart!.items.perfils?.find(e => e._id === item._id) || false

    return (exitsAnalysis || exitsPerfil)
  }

  return (
    <div
      className={`grid grid-cols-1 ${!asList ? 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6' : 'max-w-2xl m-auto'}`}
    >
      {data.map(currAnalysis => {
        return <AnalysisListItem
          key={currAnalysis._id!.toString()}
          cartHasItem={cartHasItem(currAnalysis)}//cartHasItem(currAnalysis)}
          data={currAnalysis}
          addCartItem={addItem}
          removeCartItem={removeItem}//removeCartItem}
        />
      })}
    </div>
  )
}

export default ListItems