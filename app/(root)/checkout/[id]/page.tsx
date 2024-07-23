import CartSummary from '@/components/shared/CartSummary'
import { getCart } from '@/lib/actions/cart.actions'
import { getUserByMongoId } from '@/lib/actions/user.actions'
import React from 'react'

const CheckoutPage = async (
  { params: { id } }:
    { params: { id: string } }
) => {
  const cart = await getCart()
  const user = await getUserByMongoId(id)
 
  if(!user.data || user.error) return <div>Error ocurred {user.error}</div>


  if (cart)
    return (
      <div>
        <CartSummary
          user={user.data}
          cart={cart}
        />
      </div>
    )
  return (
    <div>Please add items to the cart</div>
  )
}

export default CheckoutPage