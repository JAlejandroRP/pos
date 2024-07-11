"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CustomField } from './CustomField';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from "zod";
import { useToast } from '@/components/ui/use-toast';
import { getAllAnalisis, insertAnalisis } from '@/lib/actions/analisis.actions';
import { Analisis } from '@/lib/database/models/analisis.model';
import { Textarea } from '@/components/ui/textarea';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router'
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const

export const addAnalisisFormSchema = z.object({
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
  tests: z.string()
  // test: z.string().optional().array()
})

const AddAnalisisForm = (
  // pathname: string
) => {
  const [analisisList, setAnalisisList] = useState([])
  const pathname = usePathname()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const initialValues: Analisis = {
    lab: '',
    noIktan: 0,
    code: '',
    name: '',
    deliveryTime: 0,
    type: '',
    cost: 0,
    costUrgent: 0,
    costPublic: 0,
    costPublicUrgent: 0,
    addUrgentPrice: false,
    promo: '',
    tests: ''
  }

  useEffect(() => {
    const getAnalisisList = async () => {
      // const updatedViews = await getAllAnalisis(pathname)
      // setViews(updatedViews)
    }

    // updateViews()
  }, [])

  const form = useForm<z.infer<typeof addAnalisisFormSchema>>({
    resolver: zodResolver(addAnalisisFormSchema),
    defaultValues: initialValues
  })

  const onSubmit = async (values: z.infer<typeof addAnalisisFormSchema>) => {
    setIsSubmitting(true);
    try {
      const createAnalisisResponse = await insertAnalisis(values, pathname);

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
          title: "Customer created!",
          description: "You now can see the new customer.",
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
    setIsSubmitting(false)
  }

  return (
    <Card className='w-full max-w-4xl m-auto'>
      <CardHeader>
        <CardTitle>
          Add New Analisis
        </CardTitle>
        <CardDescription>
          Fill out the form below to add a new product to your inventory.
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
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? languages.find(
                                (language) => language.value === field.value
                              )?.label
                              : "Select language"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandList>
                            <CommandEmpty>No language found.</CommandEmpty>
                            <CommandGroup>
                              {languages.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue("tests", field.value)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      language.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {language.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is the language that will be used in the dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className='ml-auto' type='submit'>
              Save Analisis
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card >
  )
}

export default AddAnalisisForm