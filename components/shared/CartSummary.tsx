"use client";
import React, { FormEvent, FormEventHandler, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { usePathname, useRouter } from 'next/navigation';
import { Cart } from '@/types';
import { getUserByMongoId } from '@/lib/actions/user.actions';
import { insertPerfil } from '@/lib/actions/perfil.actions';
import { AnalysisStatus } from '@/lib/database/models/analysisStatus.model';
import { analysisStatus } from '@/constants';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { User } from '@/lib/database/models/user.model';
import { useToast } from '../ui/use-toast';
import { Perfil } from '@/lib/database/models/perfil.model';
import { Analysis } from '@/lib/database/models/analysis.model';
import { insertAnalysisStatus } from '@/lib/actions/status.actions';

const AnalysisItem = ({ analysis, isUrgent }: { analysis: Analysis, isUrgent: boolean }) => {
  return <div key={analysis._id!.toString()} className="flex items-center gap-4">
    <div className="flex-1">
      <h4 className="font-medium capitalize">{analysis.type.toLowerCase()}</h4>
      <p className="text-xs text-muted-foreground capitalize">{analysis.name.toLowerCase()}</p>
    </div>
    <div className="text-right">
      <p className="font-medium">${isUrgent ? analysis.costPublic * 1.2 : analysis.costPublic}</p>
      <p className="text-sm text-muted-foreground">Cantidad: 1</p>
    </div>
  </div>
}

const PerfilItem = ({ perfil, isUrgent }: { perfil: Perfil, isUrgent: boolean }) => {
  const analysis = perfil.analysis.map(a => a.name.toLowerCase())

  return <div key={perfil._id!.toString()} className="flex items-center gap-4">
    <div className="flex-1">
      <h4 className="font-medium">{perfil.name}</h4>
      <ul className=''>

        {analysis.map(a =>
          <li key={a} className="text-xs capitalize">{a}</li>
        )}
      </ul>
    </div>
    <div className="text-right">
      <p className="font-medium">${isUrgent ? Number(perfil.total * 1.2).toLocaleString() : Number(perfil.total).toLocaleString()}</p>
      <p className="text-sm text-muted-foreground">Cantidad: 1</p>
    </div>
  </div>
}

const calculateSubtotal = (cart: Cart, isUrgent: boolean) => {
  const totalPerfils = cart.items.perfils?.reduce(
    (acumulator, current) => acumulator + (
      current.total
    ),
    0
  ) || 0
  const totalAnalysis = cart.items.analysis?.reduce(
    (acumulator, current) => acumulator + (current.costPublic),
    0
  ) || 0

  if (isUrgent) return (totalAnalysis + totalPerfils) * 1.2
  return (totalAnalysis + totalPerfils)
}

const calculateTax = (subtotal: number) => {
  return subtotal * (Number(process.env.TAX_PCT) || 0.16)
}

const CartSummary = ({ user, cart }: { user: User, cart: Cart }) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isUrgent, setIsUrgent] = useState(false)
  const [subtotal, setSubtotal] = useState(Number(calculateSubtotal(cart, false)))
  const [tax, setTax] = useState(calculateTax(subtotal))
  const { toast } = useToast();
  const [perfilName, setPerfilName] = useState("")

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if ((cart.items.perfils.length + cart.items.analysis.length) === 0
    ) {
      toast({
        title: 'Perfil vacio',
        description: 'Primero agrega pruebas al perfil',
        duration: 5000,
        className: 'error-toast',
        variant: 'destructive'
      })
      return;
    }

    if (perfilName === '' && user.isParticular) {
      toast({
        title: 'Perfil sin nombre/descripción',
        description: 'Primero agrega un nombre o descripción al perfil',
        duration: 5000,
        className: 'error-toast',
        variant: 'destructive'
      })
      return;
    }

    if (user.isParticular) {
      const subtotal = calculateSubtotal(cart, isUrgent)
      const tax = calculateTax(subtotal)
      const total = subtotal + tax
      const newPerfil: Perfil = {
        analysis: cart.items.analysis,
        total: total,
        name: perfilName,
        user: user
      }

      const response = await insertPerfil(newPerfil, pathname)
      console.log(response);
      if (!response.success)
        toast({
          title: 'Error',
          description: 'No se ha podido crear el nuevo perfil',
          duration: 5000,
          className: 'success-toast',
          variant: 'default'
        })
      if (response.success)
        toast({
          title: 'Exito',
          description: 'Se ha creado el nuevo perfil',
          duration: 5000,
          className: 'success-toast',
          variant: 'default'
        })
    } else {


      const newStatus: AnalysisStatus = {
        analysis: cart.items.analysis,
        perfils: cart.items.perfils,
        completedDate: new Date(),
        creationDate: new Date(),
        pdfUrl: '',
        status: analysisStatus.in_progress,
        user: user,
        isUrgent,
      }
      const response = await insertAnalysisStatus(newStatus, pathname)
      if (!response.success)
        toast({
          title: 'Error',
          description: 'No se han creado los analisis',
          duration: 5000,
          className: 'error-toast',
          variant: 'destructive'
        })
      if (response.success)
        toast({
          title: 'Exito',
          description: 'Se han creado los analisis',
          duration: 5000,
          className: 'success-toast',
          variant: 'default'
        })
      // console.log(response);
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
            <CardTitle>Resumen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-4">
                {cart.items.perfils?.map(item => {
                  return <PerfilItem key={item.name} isUrgent={isUrgent} perfil={item} />
                })}
                {cart.items.analysis?.map(item => {
                  return <AnalysisItem key={item._id} isUrgent={isUrgent} analysis={item} />
                })}
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
          <CardFooter className='flex flex-col'>
            {user.isParticular &&
              <div className='flex flex-row items-center justify-between w-full'>
                <Label>
                  Descripción*
                </Label>
                <Input
                  onChange={(e) => setPerfilName(e.target.value)}
                  className='ml-2'
                  placeholder='Descripción/nombre'
                >
                </Input>
              </div>}
            <div className='flex items-center justify-between w-full mt-4'>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="isUrgent"
              >
                Es urgente?
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
              <Button
                type='submit'
                className="max-w-40 text-green-500 !hover:text-green-500"
                variant={'outline'}>
                Realizar pedido
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    )
  }
}

export default CartSummary