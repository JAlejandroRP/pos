"use client";
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { cleanCart, getCart } from './Cart';
import { useRouter } from 'next/navigation';

const CartSummary = () => {
  const router = useRouter()
  const cart = getCart();
  console.log(cart);

  return (
    <Card className='max-w-sm m-auto mt-8'>
      <CardHeader>
        <CardTitle>Cart Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-4">
            {cart.items.map(item => (
              <div key={item._id!.toString()} className="flex items-center gap-4">
                {/* <img
                  src="/placeholder.svg"
                  alt="Product Image"
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                /> */}
                <div className="flex-1">
                  <h4 className="font-medium">{item.code}</h4>
                  <p className="text-sm text-muted-foreground">{item.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${item.costPublic}</p>
                  <p className="text-sm text-muted-foreground">Qty: 1</p>
                </div>
              </div>
            ))}
          </div>
          <Separator />
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Subtotal</p>
              <p className="font-medium">${cart.subtotal.toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Discount</p>
              <p className="font-medium text-green-500">-$0.0</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Tax ({cart.tax})</p>
              <p className="font-medium">${(cart.subtotal * cart.tax).toLocaleString()}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-medium text-lg">
              <p>Total</p>
              <p>${(cart.subtotal + (cart.subtotal * cart.tax)).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex flex-row items-center justify-between'>
        <Button
          variant={'outline'}
          className="full text-red-500"
          onClick={() => {
            cleanCart()
            router.back()
          }}
        >
          Clean Cart
        </Button>
        <Button 
        className="max-w-40 text-green-500 !hover:text-green-500" 
        variant={'outline'}>
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CartSummary