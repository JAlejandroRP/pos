"use client"
import { Analisis } from '@/lib/database/models/analisis.model'
import React from 'react'
import AnalisisListItem from './AnalisisListItem'
import { useToast } from '../ui/use-toast'
import AnalisisCardSmall from './AnalisisCardSmall'
import { useRouter } from 'next/navigation'
import { addItem, removeItem } from '@/lib/actions/cart.actions'
// import { set } from '@/lib/redis/redis'

type Cart = {
  tax: number,
  items: Analisis[]
}

const Cart = ({ analisis, asList, cart }: { analisis: Analisis[], asList?: boolean, cart: Cart }) => {
  const cartHasItem = (item: Analisis) => {
    const exits = cart!.items.find(e => e._id === item._id)

    if (exits && exits._id) return true

    return false
  }

  return (
    <div
      className={`grid grid-cols-1 ${!asList ? 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6' : 'max-w-2xl m-auto'}`}
    >
      {analisis.map(currAnalisis => {
        if (asList) {
          return <AnalisisListItem
            key={currAnalisis._id!.toString()}
            cartHasItem={cartHasItem(currAnalisis)}//cartHasItem(currAnalisis)}
            analisis={currAnalisis}
            addCartItem={addItem}
            removeCartItem={removeItem}//removeCartItem}
          />
        }

        return <AnalisisCardSmall
          key={currAnalisis._id!.toString()}
          // cartHasItem={cartHasItem(currAnalisis)}
          analisis={currAnalisis}
          addCartItem={addItem}
          removeCartItem={() => { }}//removeCartItem}
        />
      })}
    </div>
  )
}

export default Cart