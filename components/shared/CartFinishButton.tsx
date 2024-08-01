'use client'
import { User } from "@/lib/database/models/user.model"
import { Cart } from "@/types"
import Link from "next/link"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"

export const CartFinishButton = ({ user, userId, cart, saveCart }: { user: User, userId: string, cart: Cart, saveCart: Function }) => {
  return <Link href={`/checkout/${userId}`} className='shadow-lg'>
    <Button
      className='ml-auto shrink-0 text-md'
      variant='outline'
      onClick={() => saveCart(cart)}
    >
      <ShoppingCart className='w-5 h-5 mr-2' />
      {user.isParticular ? 'Crear Perfil' : 'Pedir Analisis'} ({cart.items.analysis.length + cart.items.perfils.length})
    </Button>
  </Link>
}