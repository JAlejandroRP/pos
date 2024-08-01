'use client'
import { User } from "@/lib/database/models/user.model"
import { Cart } from "@/types"
import { Label } from "../ui/label"
import { CartFinishButton } from "./CartFinishButton"
import ViewSelector from "./ViewSelector"
import Search from "./Search"

export const PatientData = ({ user, userId, cart, saveCart }: { user: User, userId: string, cart: Cart, saveCart: Function }) => {
  const userAge = Math.abs(new Date(user.birthday).getFullYear() - new Date().getFullYear())

  return <div className="max-w-2xl m-auto pt-8 shadow-sm ">
    <div className='flex flex-row justify-between'>
      <div className="flex-auto my-2 scroll-m-20 pb-4 transition-colors first:mt-0 max-w-sm flex-grow">
        <div className='flex lg:flex-row flex-col justify-between'>
          <Label className='m-auto ml-2'>
            {user.isParticular ? 'Empresa: ' : 'Paciente'}
          </Label>
          <div className='font-medium ml-2'>
            {user.name}, {userAge} años
          </div>
        </div>
        <div className='flex lg:flex-row flex-col justify-between mt-2'>
          <Label className='m-auto ml-2'>
            Teléfono:
          </Label>
          <div className='font-medium ml-2'>
            {user.phone}
          </div>
        </div>
        <div className='flex lg:flex-row flex-col justify-between mt-2'>
          <Label className='m-auto ml-2'>
            Correo:
          </Label>
          <div className='font-medium ml-2'>
            {user.email}
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-between mb-2'>
        <CartFinishButton
          saveCart={saveCart}
          cart={cart}
          user={user}
          userId={userId}
        />
        {!user.isParticular && <div className='mb-4'>
          <ViewSelector />
        </div>}
      </div>
    </div>
    <Search
      underline
      placeholder='Buscar analisis'
    />
  </div>
}