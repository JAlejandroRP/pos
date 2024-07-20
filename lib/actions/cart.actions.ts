"use server";
// import Cart from "@/components/shared/Cart";
import { connectToRedis } from "../redis/redis"
import { Analysis } from "../database/models/analysis.model";
import { Cart } from "@/types";
import { Perfil } from "../database/models/perfil.model";

export const getCart = async (): Promise<Cart | null> => {
  const redis = await connectToRedis()
  const cart = await redis.get('cart')

  if (cart) {
    return JSON.parse(cart) as Cart
  }
  return null;
}

export const setCart = async (cart: Cart) => {
  const redis = await connectToRedis()
  const setResult = await redis.set('cart', JSON.stringify(cart))
  // console.log('new cart',cart);
  return setResult === 'OK'
}

export const removeCart = async () => {
  const redis = await connectToRedis()
  const setResult = await redis.del('cart')
  // console.log('cart removed');
  return setResult > 0;
}

export const addItem = async (item: (Analysis | Perfil)) => {
  const cart = await getCart()
  console.log(cart);
  

  if (cart) {
    if ((item as Perfil).total) {
      cart.items.perfils.push(item as Perfil)
    } else {
      cart.items.analysis.push(item as Analysis)
    }
    await setCart(cart);
  }
}

export const removeItem = async (item: Analysis) => {
  let cart = await getCart();
  if (cart) {

    cart.items.analysis = cart.items.analysis.filter(e => e._id?.toString() !== item._id?.toString());
    cart.items.perfils = cart.items.perfils.filter(e => e._id?.toString() !== item._id?.toString());
    await setCart(cart)
  }
}

export const newCart = async () => {
  const newCart: Cart = {
    items: {
      perfils: [],
      analysis: []
    },
    tax: Number(process.env.TAX_PCT) || 0.16,
  }

  await setCart(newCart)
  // console.log('created new cart');
  return newCart
}