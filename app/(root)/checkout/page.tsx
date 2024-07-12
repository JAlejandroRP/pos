import CartSummary from '@/components/shared/CartSummary'
import React from 'react'

export const CHECKOUT_PATH = '/checkout'

const CheckoutPage = () => {
  // const cart = getCart()
  return (
    <div>
      <CartSummary/>
    </div>
  )
}

export default CheckoutPage