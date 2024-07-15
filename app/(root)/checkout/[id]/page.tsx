import CartSummary from '@/components/shared/CartSummary'
import { getCart } from '@/lib/actions/cart.actions'
import React from 'react'

export const CHECKOUT_PATH = '/checkout'

const CheckoutPage = async (
  { params: { id } }:
    { params: { id: string } }
) => {
  const cart = await getCart()
  

  if (cart)
    return (
      <div>
        <CartSummary
          userId={id}
          cart={cart}
        />
      </div>
    )
  return (
    <div>No cart found</div>
  )
}

export default CheckoutPage