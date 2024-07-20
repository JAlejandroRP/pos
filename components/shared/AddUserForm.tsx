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

export const AddUserFormSchema = z.object({
  name: z.string().min(1, { message: "Must enter a name" }).max(50, { message: "Name can't be longer than 50 characters" }),
  birthday: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Must enter a valid date" }),
  sex: z.enum(["M", "F"], { message: "Must select either 'M' or 'F'" }),
  email: z.string()
    .optional()
    .transform(e => e === '' ? undefined : e)
    .refine(e => e === undefined || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e), { message: "Must enter a valid email" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }).max(10, { message: "Phone number can't be longer than 10 digits" }).regex(/^[0-9]+$/, { message: "Phone number must contain only digits" }),
  direction: z.string().min(0, { message: "Must enter a direction" }).optional(),
  isEntity: z.boolean(),
})

type AddUserFormValues = z.infer<typeof AddUserFormSchema>;

const AddUserForm = (
) => {
  const { replace } = useRouter()
  const { toast } = useToast();
  const initialValues: AddUserFormValues = {
    name: '',
    birthday: '',
    sex: 'M',
    email: '',
    phone: '',
    direction: '',
    isEntity: false
  }

  const form = useForm<z.infer<typeof AddUserFormSchema>>({
    resolver: zodResolver(AddUserFormSchema),
    defaultValues: initialValues
  })

  const onSubmit = async (values: z.infer<typeof AddUserFormSchema>) => {
    try {
      const userToMongo = {
        ...values,
        role: Roles.client,
        isParticular: false
      }
      const createMongoUser = await createMongoDbUser(userToMongo)

      if(!createMongoUser.success) throw createMongoUser.error

      replace(`/patients/${createMongoUser.data!.insertedId.toString()}/analysis/add`);

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
          Agregar nuevo paciente
        </CardTitle>
        <CardDescription>
          Llena los campos para agregar un nuevo paciente
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
              <div className='grid md:grid-cols-2 gap-6'>
                <CustomField
                  control={form.control}
                  name='birthday'
                  formLabel='Año de nacimiento'
                  className='w-full'
                  render={({ field }) =>
                    <Input
                      type='date'
                      {...field}
                    />
                  }
                />
                <CustomField
                  control={form.control}
                  name='sex'
                  formLabel='Género'
                  className='w-full'
                  render={({ field }) =>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col"
                    // className="flex flex-row h-10 justify-between items-center px-10"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="M" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Masculino
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="F" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Femenino
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  }
                />
              </div>
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
                Guardar paciente
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card >
  )
}

export default AddUserForm