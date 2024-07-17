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
// import { set } from '@/lib/redis/redis'


const ListItems = ({ Analysis, asList, cart }: { Analysis: Analysis[], asList?: boolean, cart: Cart }) => {
  const cartHasItem = (item: Analysis) => {
    const exits = cart!.items.find(e => e._id === item._id)

    if (exits && exits._id) return true

    return false
  }

  return (
    <div
      className={`grid grid-cols-1 ${!asList ? 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6' : 'max-w-2xl m-auto'}`}
    >
      {Analysis.map(currAnalysis => {
        if (asList) {
          return <AnalysisListItem
            key={currAnalysis._id!.toString()}
            cartHasItem={cartHasItem(currAnalysis)}//cartHasItem(currAnalysis)}
            Analysis={currAnalysis}
            addCartItem={addItem}
            removeCartItem={removeItem}//removeCartItem}
          />
        }

        return <AnalysisCardSmall
          key={currAnalysis._id!.toString()}
          // cartHasItem={cartHasItem(currAnalysis)}
          Analysis={currAnalysis}
          addCartItem={addItem}
          removeCartItem={() => { }}//removeCartItem}
        />
      })}
    </div>
  )
}

export default ListItems