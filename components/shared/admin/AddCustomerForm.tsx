"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CustomField } from '../CustomField';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from "zod";
import { useToast } from '@/components/ui/use-toast';

export const addCustomerFormSchema = z.object({
  name: z.string().min(1, { message: "Must enter a name" }).max(50, { message: "Name can't be longer than 50 characters" }),
  birthday: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Must enter a valid date" }),
  sex: z.enum(["M", "F"], { message: "Must select either 'M' or 'F'" }),
  email: z.string().email({ message: "Must enter a valid email" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }).max(15, { message: "Phone number can't be longer than 15 digits" }).regex(/^[0-9]+$/, { message: "Phone number must contain only digits" }),
  direction: z.string().min(1, { message: "Must enter a direction" }).optional(),
})

type AddCustomerFormValues = z.infer<typeof addCustomerFormSchema>;

const AddClientForm = (
  // productData?: AddProductParams
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const initialValues: AddCustomerFormValues = {
    name: '',
    birthday: '',
    sex: 'M',
    email: '',
    phone: '',
    direction: ''
  }

  const form = useForm<z.infer<typeof addCustomerFormSchema>>({
    resolver: zodResolver(addCustomerFormSchema),
    defaultValues: initialValues
  })

  const onSubmit = async (values: z.infer<typeof addCustomerFormSchema>) => {
    console.log(values);
    setIsSubmitting(true);
    try {
      // const newProduct = await createProduct(values);
      console.log(values);

      toast({
        title: "Product created!",
        description: "You now can see the product.",
        duration: 5000,
        className: "success-toast",
      });

    } catch (error) {
      toast({
        title: 'Something went wrong while uploading',
        description: 'Please try again',
        duration: 5000,
        className: 'error-toast'
      })
    }

    setIsSubmitting(false)
  }

  return (
    <Card className='w-full max-w-4xl'>
      <CardHeader>
        <CardTitle>
          Add New Customer
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
                formLabel='Customer Full Name'
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
                name='birthday'
                formLabel='Birthday'
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
                name='email'
                formLabel='Email'
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
                formLabel='Phone Number'
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
                formLabel='Direction'
                className='w-full'
                render={({ field }) =>
                  <Input {...field} placeholder='' />
                }
              />
              <CustomField
                control={form.control}
                name='sex'
                formLabel='Sex'
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
                        Masculine
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="F" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Femenine
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                }
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className='ml-auto' type='submit'>
              Save Customer
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card >
  )
}

export default AddClientForm