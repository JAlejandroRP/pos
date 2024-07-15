"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Label } from "@/components/ui/label"
import { CustomField } from './CustomField';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from "zod";
import { useToast } from '@/components/ui/use-toast';
import { getAllAnalisis, insertAnalisis } from '@/lib/actions/analisis.actions';
import { Analisis } from '@/lib/database/models/analisis.model';
import { usePathname } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { ObjectId } from 'mongodb';

export const addAnalisisFormSchema = z.object({
  // _id: z.string(),
  // _id: z.preprocess((value) => {
  //   return new ObjectId(value )
  // }),
  name: z
    .string()
    .trim() // Remove leading/trailing whitespace
    .min(1, { message: "Must enter a name" })
    .max(500, { message: "Name can't be longer than 500 characters" }),
  lab: z
    .string()
    .toUpperCase()
    .trim()
    .min(1, { message: "Must enter a lab" })
    .max(50, { message: "Name can't be longer than 50 characters" }),
  noIktan: z.preprocess((value) => {
    if (typeof value === "string" || typeof value === "number") return Number(value);
  }, z.number().min(1, { message: "Must enter a number" })),
  code: z
    .string()
    .toUpperCase()
    .trim()
    .min(1, { message: "Must enter a code" })
    .max(10, { message: "Code can't be longer than 10 characters" }),
  deliveryTime: z.preprocess((value) => {
    if (typeof value === "string" || typeof value === "number") return Number(value);
  }, z.number().min(0, { message: "Must enter a number" }).max(24, { message: "Delivery time can't be longer than 24 hrs" })),
  type: z
    .string()
    .toUpperCase()
    .trim()
    .min(1, { message: "Must enter a type" })
    .max(50, { message: "Type can't be longer than 50 characters" }),
  cost: z.preprocess((value) => {
    if (typeof value === "string" || typeof value === "number") return Number(value);
  }, z.number().min(50, { message: "Must enter a cost" }).max(9999, { message: "Cost can't be greater than 9999" })),
  costUrgent: z.preprocess((value) => {
    if (typeof value === "string" || typeof value === "number") return Number(value);
  }, z.number().min(50, { message: "Must enter a cost" }).max(9999, { message: "Cost can't be greater than 9999" })),
  costPublic: z.preprocess((value) => {
    if (typeof value === "string" || typeof value === "number") return Number(value);
  }, z.number().min(50, { message: "Must enter a cost" }).max(9999, { message: "Cost can't be greater than 9999" })),
  costPublicUrgent: z.preprocess((value) => {
    if (typeof value === "string" || typeof value === "number") return Number(value);
  }, z.number().min(50, { message: "Must enter a cost" }).max(9999, { message: "Cost can't be greater than 9999" })),
  promo: z.string().trim(),
  addUrgentPrice: z.boolean(),
  // tests: z.string()
  tests: z.string().array()
})

export type AnalisisName = {
  name: string,
  _id: ObjectId
}

const AddAnalisisForm = ({
  isPerfil,
  analisisList,
  analisisData
}: {
  isPerfil?: boolean,
  analisisList: AnalisisName[],
  analisisData?: Analisis
}
) => {
  const pathname = usePathname()
  const { toast } = useToast();
  const initialValues: Analisis = {
    lab: analisisData?.lab || '',
    noIktan: analisisData?.noIktan || 0,
    code: analisisData?.code || '',
    name: analisisData?.name || '',
    deliveryTime: analisisData?.deliveryTime || 0,
    type: analisisData?.type || '',
    cost: analisisData?.cost || 0,
    costUrgent: analisisData?.costUrgent || 0,
    costPublic: analisisData?.costPublic || 0,
    costPublicUrgent: analisisData?.costPublicUrgent || 0,
    addUrgentPrice: analisisData?.addUrgentPrice || false,
    promo: analisisData?.promo || '',
    tests: analisisData?.tests || [],
    // _id: analisisData?._id || new ObjectId()
  }

  const addAnalisisToPerfil = (analisis: string) => {
    let currAnalisis = form.getValues().tests

    const index = currAnalisis.indexOf(analisis)

    if (index >= 0) {
      currAnalisis = currAnalisis.filter(e => e !== analisis)
      console.log('filtered', currAnalisis);

      form.setValue("tests", currAnalisis)
      // console.log(form.getValues().tests);
      return;
    }

    currAnalisis.push(analisis)
    form.setValue("tests", currAnalisis)
    console.log(form.getValues().tests)
  }

  const form = useForm<z.infer<typeof addAnalisisFormSchema>>({
    resolver: zodResolver(addAnalisisFormSchema),
    defaultValues: initialValues
  })

  const onSubmit = async (values: z.infer<typeof addAnalisisFormSchema>) => {
    try {
      const createAnalisisResponse = await insertAnalisis({
        _id: analisisData?._id,
        ...values
      }, pathname);

      if (createAnalisisResponse.error) {
        toast({
          title: 'Something went wrong',
          description: createAnalisisResponse.error,
          duration: 5000,
          className: 'error-toast',
          variant: 'destructive'
        })
      }
      else {
        toast({
          title: "Analisis created!",
          description: "You now can see the new analisis.",
          duration: 5000,
          className: "success-toast",
        });
      }
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
    form.reset()
  }

  return (
    <Card className='w-full max-w-4xl m-auto'>
      <CardHeader>
        <CardTitle>
          Add New {`${isPerfil ? 'Perfil' : 'Analisis'}`}
        </CardTitle>
        <CardDescription>
          Fill out the form below to add a new analisis to your inventory.
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
                formLabel='Analisis Name/Profile'
                className='w-full'
                render={({ field }) =>
                  <Input
                    {...field}
                    placeholder='Enter analisis name'
                  />
                  // <Input
                  //   type=''
                  //   {...field}
                  // />
                }
              />
              <CustomField
                control={form.control}
                name='code'
                formLabel='Code'
                className='w-full'
                render={({ field }) =>
                  <Input
                    {...field}
                  />
                }
              />
              <CustomField
                control={form.control}
                name='lab'
                formLabel='Laboratory'
                className='w-full'
                render={({ field }) =>
                  <Input
                    {...field}
                  />
                }
              />
              <CustomField
                control={form.control}
                name='noIktan'
                formLabel='Iktan Number'
                className='w-full'
                render={({ field }) =>
                  <Input
                    type='number'
                    {...field}
                  />
                }
              />
              <CustomField
                control={form.control}
                name='deliveryTime'
                formLabel='Delivery Time'
                className='w-full'
                render={({ field }) =>
                  <Input
                    type='number'
                    {...field} placeholder='' />
                }
              />
              <CustomField
                control={form.control}
                name='type'
                formLabel='Type'
                className='w-full'
                render={({ field }) =>
                  <Input
                    {...field} placeholder='' />
                }
              />
              <CustomField
                control={form.control}
                name='cost'
                formLabel='Cost'
                className='w-full'
                render={({ field }) =>
                  <Input
                    type='number'
                    {...field} placeholder='' />
                }
              />
              <CustomField
                control={form.control}
                name='costUrgent'
                formLabel='Cost Urgent'
                className='w-full'
                render={({ field }) =>
                  <Input
                    type='number'
                    {...field} placeholder='' />
                }
              />
              <CustomField
                control={form.control}
                name='costPublic'
                formLabel='Cost Public'
                className='w-full'
                render={({ field }) =>
                  <Input
                    type='number'
                    {...field} placeholder='' />
                }
              />
              <CustomField
                control={form.control}
                name='costPublicUrgent'
                formLabel='Cost Public Urgent'
                className='w-full'
                render={({ field }) =>
                  <Input
                    type='number'
                    {...field} placeholder='' />
                }
              />
              <FormField
                control={form.control}
                name='tests'
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Perfil Tests</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            Select analisis
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search analisis..." />
                          <CommandList>
                            <CommandEmpty>No analisis found.</CommandEmpty>
                            <CommandGroup>
                              {analisisList.map((anlisis) => (
                                <CommandItem
                                  className='text-xs'
                                  value={anlisis.name}
                                  key={anlisis._id.toString()}
                                  onSelect={() => {
                                    addAnalisisToPerfil(anlisis.name)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      form.getValues().tests.includes(anlisis.name)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {anlisis.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {form.getValues('tests').length > 0 &&
                      <Label className='pt-1'>Perfil will have:</Label>
                    }
                    <FormDescription className='flex flex-col'>
                      {form.getValues('tests').map(test => (
                        <Label key={test} className='capitalize'>{test.toLowerCase()}</Label>
                      ))}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className='ml-auto' type='submit' variant={'outline'}>
              Save Analisis
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card >
  )
}

export default AddAnalisisForm