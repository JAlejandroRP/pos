import Cart from '@/components/shared/Cart'
import CartList from '@/components/shared/Cart'
import { Button } from '@/components/ui/button'
import { MAX_RESULTS, MIN_PAGE } from '@/constants'
import { getAllAnalisis } from '@/lib/actions/analisis.actions'
import { getCart, newCart } from '@/lib/actions/cart.actions'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AddAnalisisToCustomerPage = async (
  { params: { id } }:
    { params: { id: string } }
) => {
  const analisis = await getAllAnalisis('/analisis', MIN_PAGE, MAX_RESULTS, "")
  let cart = await getCart()

  if(!cart) {
    cart = await newCart()
  }

  return (
    <section>
      <main>
        <header className="sticky top-0 z-10 pt-8 shadow-sm backdrop-blur-sm">
          <div className='flex flex-row justify-between backdrop-blur-sm'>
            <h2 className="my-7 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Analisis for user {id}
            </h2>
            <Link href={`/checkout/${id}`}>
              <Button
                className='ml-auto shrink-0 text-md'
                variant='outline'
              >
                <ShoppingCart className='w-5 h-5 mr-2' />
                Checkout
              </Button>
            </Link>
          </div>
        </header>
        <Cart
          cart={cart}
          analisis={analisis}
          asList
        />
      </main>
    </section >
  )
}

export default AddAnalisisToCustomerPage