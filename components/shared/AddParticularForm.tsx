"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CustomField } from './CustomField';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from "zod";
import { useToast } from '@/components/ui/use-toast';
import { createClerkUser, createMongoDbUser } from '@/lib/actions/user.actions';
import { usePathname, useRouter } from 'next/navigation';
import { Roles } from '@/constants';
// const test

export const AddParticularFormSchema = z.object({
  name: z.string().min(1, { message: "Debes ingresar un nombre" }).max(50, { message: "Name can't be longer than 50 characters" }),
  email: z.string()
    .transform(e => e === '' ? undefined : e)
    .refine(e => e === undefined || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e), { message: "Debes ingresar un correo valido" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }).max(10, { message: "Phone number can't be longer than 10 digits" }).regex(/^[0-9]+$/, { message: "Phone number must contain only digits" }).optional(),
  direction: z.string().min(0, { message: "Must enter a direction" }).optional(),
})

type AddParticularFormValues = z.infer<typeof AddParticularFormSchema>;

const AddParticularForm = (
) => {
  const { replace } = useRouter()
  const { toast } = useToast();
  const initialValues: AddParticularFormValues = {
    name: '',
    email: '',
    phone: '',
    direction: '',
  }

  const form = useForm<z.infer<typeof AddParticularFormSchema>>({
    resolver: zodResolver(AddParticularFormSchema),
    defaultValues: initialValues
  })

  const onSubmit = async (values: z.infer<typeof AddParticularFormSchema>) => {
    try {
      const userToMongo = {
        ...values,
        role: Roles.client,
        sex: 'M',
        birthday: '2000/01/01',
        isParticular: true
      }
      const createMongoUser = await createMongoDbUser(userToMongo)

      if (createMongoUser.error) {
        toast({
          title: 'Something went wrong',
          description: createMongoUser.error,
          duration: 5000,
          className: 'error-toast',
          variant: 'destructive'
        })
        return;
      } 

      replace(`/customers`);

      toast({
        title: "Customer created!",
        description: "You now can see the new customer.",
        duration: 5000,
        className: "success-toast",
      });
      // }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again',
        duration: 5000,
        className: 'error-toast',
        variant: 'destructive'
      })
      console.log(error);
    }
  }

  return (
    <Card className='w-full max-w-4xl mx-auto shadow-lg'>
      <CardHeader>
        <CardTitle>
          Agregar nuevo particular
        </CardTitle>
        <CardDescription>
          Llena los campos para agregar un nuevo particular, para Empresas o Doctores privados
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          className='grid gap-6'
          onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className='grid md:grid-cols-2 gap-6'>
              <CustomField
                control={form.control}
                name='name'
                formLabel='Nombre'
                className='w-full'
                render={({ field }) =>
                  <Input
                    type='text'
                    {...field}
                  />
                }
              />
              <CustomField
                control={form.control}
                name='email'
                formLabel='Correo'
                className='w-full'
                render={({ field }) =>
                  <Input
                    type='text'
                    {...field}
                  />
                }
              />
              <CustomField
                control={form.control}
                name='phone'
                formLabel='Número telefónico'
                className='w-full'
                render={({ field }) =>
                  <Input
                    type='tel'
                    {...field}
                  />
                }
              />
              <CustomField
                control={form.control}
                name='direction'
                formLabel='Dirección'
                className='w-full'
                render={({ field }) =>
                  <Input {...field} placeholder='' />
                }
              />
            </div>
          </CardContent>
          <CardFooter className='flex flex-row justify-between items-center'>
            <div className=''>
            </div>
            <div className=''>
              <Button className='mt-8' type='submit' variant='outline'
              >
                Guardar particular
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card >
  )
}

export default AddParticularForm