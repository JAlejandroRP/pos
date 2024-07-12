"use client"
import { Analisis } from '@/lib/database/models/analisis.model'
import React from 'react'
import AnalisisCardSmall from './AnalisisCardSmall'
import { useToast } from '../ui/use-toast'

type Cart = {
  total: number,
  subtotal: number,
  tax: number,
  items: Analisis[]
}

export const cleanCart = () => {
  window.localStorage.removeItem("myCart");
}

export const getCart = (): Cart => {
  // object
  const cart = window.localStorage.getItem("myCart");

  if (cart)
    return JSON.parse(cart) as Cart;

  const newCart: Cart = {
    items: [],
    subtotal: 0,
    total: 0,
    tax: Number(process.env.TAX_PCT) || 0.16,
  }

  localStorage.setItem("myCart", JSON.stringify(newCart));

  return newCart;
}

const Cart = ({ analisis }: { analisis: Analisis[] }) => {
  const { toast } = useToast();

  const removeCartItem = (item: Analisis) => {
    let cart = getCart()

    if (cart.items.length === 0) return;

    cart.items = cart.items.filter(e => e._id !== item._id)
    cart.subtotal = cart.items.reduce(
      (accumulator, currentValue) => accumulator + currentValue.costPublic,
      0,
    )

    localStorage.setItem("myCart", JSON.stringify(cart))
    toast({
      title: "Item removed from cart",
      duration: 5000,
      className: '',
    });
  }


  const cartHasItem = (item: Analisis) => {
    const cart = getCart()
    const exits = cart.items.find(e => e._id === item._id)

    if (exits && exits._id) return true

    return false
  }

  const addCartItem = (item: Analisis) => {
    let cart = getCart()

    if (!cartHasItem(item)) {
      cart.items.push(item);
      cart.subtotal += item.costPublic;

      localStorage.setItem("myCart", JSON.stringify(cart));
      toast({
        title: "Item added to cart",
        duration: 5000,
        className: "success-toast",
      });
    } else {
      toast({
        title: "Item is already in cart",
        duration: 5000,
        className: "success-toast",
      });
    }
    console.log(cart);

  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {analisis.map(analisis =>
        <AnalisisCardSmall
          key={analisis._id!.toString()}
          cartHasItem={cartHasItem(analisis)}
          analisis={analisis}
          addCartItem={addCartItem}
          removeCartItem={removeCartItem}
        />)}
    </div>
  )
}

export default Cart