"use client";
import React, { FormEvent, FormEventHandler, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { usePathname, useRouter } from 'next/navigation';
import { Cart } from '@/types';
import { getUserByMongoId } from '@/lib/actions/user.actions';
import { insert } from '@/lib/actions/analysisStatus.actions';
import { AnalysisStatus } from '@/lib/database/models/analysisStatus.model';
import { analysisStatus } from '@/constants';

const calculateSubtotal = (cart: Cart, isUrgent: boolean) => {
  return cart.items.reduce(
    (acumulator, current) => acumulator + (isUrgent ? current.costPublic * 1.2 : current.costPublic),
    0
  )
}

const calculateTax = (subtotal: number) => {
  return subtotal * (Number(process.env.TAX_PCT) || 0.16)
}

const CartSummary = ({ userId, cart }: { userId: string, cart: Cart }) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isUrgent, setIsUrgent] = useState(false)
  const [subtotal, setSubtotal] = useState(calculateSubtotal(cart, false))
  const [tax, setTax] = useState(calculateTax(subtotal))

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const user = await getUserByMongoId(userId);

    if(user.data){
      const newStatus:AnalysisStatus = {
        analysis: cart.items,
        completedDate: new Date(),
        creationDate: new Date(),
        pdfUrl: '',
        status: analysisStatus.in_progress,
        user: user.data,
        isUrgent
      }
      const response = await insert(newStatus, pathname)
      console.log(response);
    }

    return ''
  }

  if (!cart) {
    router.back()
  }
  else {
    return (
      <form
      onSubmit={onSubmit}
      >

        <Card className='max-w-sm m-auto mt-8'>
          <CardHeader>
            <CardTitle>Cart Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-4">
                {cart.items?.map(item => (
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
                      <p className="font-medium">${isUrgent ? item.costPublic * 1.2 : item.costPublic}</p>
                      <p className="text-sm text-muted-foreground">Qty: 1</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-medium">${subtotal.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Discount</p>
                  <p className="font-medium text-green-500">-$0.0</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Tax ({cart.tax.toLocaleString()} %)</p>
                  <p className="font-medium">${tax.toLocaleString()}</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium text-lg">
                  <p>Total</p>
                  <p>${(subtotal + tax).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex flex-row items-center justify-between'>
            <div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="isUrgent"
              >
                Mark as urgent
              </label>
              <input type='checkbox' id="isUrgent"
                onChange={(e) => {
                  setIsUrgent(prev => !prev)
                  setSubtotal((prev: number) => {
                    if (e.target.checked) {
                      const sub = calculateSubtotal(cart, true)
                      setTax(calculateTax(sub))
                      return sub
                    } else {
                      const sub = calculateSubtotal(cart, false)
                      setTax(calculateTax(sub))
                      return sub
                    }
                  })
                }}
                className='ml-4'
              />
            </div>
            {/* <Button
            variant={'outline'}
            className="full text-red-500"
            onClick={async () => {
              console.log(await removeCart())
            }}
          >
            Clean Cart
          </Button> */}
            <Button
              type='submit'
              className="max-w-40 text-green-500 !hover:text-green-500"
              variant={'outline'}>
              Proceed to Checkout
            </Button>
          </CardFooter>
        </Card>
      </form>
    )
  }
}

export default CartSummary