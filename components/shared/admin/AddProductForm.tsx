"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { AddProductDefaultValues, ItemsCategories } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { CustomField } from '../CustomField';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import * as z from "zod";
import { createProduct } from '@/lib/actions/product.actions';
import { useToast } from '@/components/ui/use-toast';

export const addProductFormSchema = z.object({
  name: z.string().min(1, "Must enter a name"),
  image: z.string(),
  price: z.preprocess((value) => {
    if (typeof value === "string" || typeof value === "number") return Number(value);
  }, z.number().min(1, 'Must enter a price')),
  initial_stock: z.preprocess((value) => {
    if (typeof value === "string" || typeof value === "number") return Number(value);
  }, z.number().min(1, 'Must indicate the stock')),
  category: z.string().min(1, "Must select a category."),
  details: z.string().optional()
})

const AddProductForm = (
  // productData?: AddProductParams
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const initialValues = {
    name: '',
    image: '',
    price: 0,
    initial_stock: 0,
    category: '',
    details: ''
  }

  const form = useForm<z.infer<typeof addProductFormSchema>>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: initialValues
  })

  const onSubmit = async (values: z.infer<typeof addProductFormSchema>) => {
    setIsSubmitting(true);
    try {
      const newProduct = await createProduct(values);
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
          Add New Product
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
                name='image'
                formLabel='Product Image Url'
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
                name='name'
                formLabel='Product Name'
                className='w-full'
                render={({ field }) =>
                  <Input
                    {...field}
                  />
                }
              />

            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <CustomField
                control={form.control}
                name='price'
                formLabel='Price'
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
                name='initial_stock'
                formLabel='Initial Stock'
                className='w-full'
                render={({ field }) =>
                  <Input
                    type='number'
                    {...field}
                  />
                }
              />
              {/* <CustomField
                control={form.control}
                name='category'
                formLabel='Category'
                className='w-full'
                render={({ field }) =>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                    ref={field.ref}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {ItemsCategories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                }
              /> */}
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Category'></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* <SelectGroup> */}
                        {/* <SelectLabel>Categories</SelectLabel> */}
                        {ItemsCategories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                        {/* </SelectGroup> */}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

            </div>
            <CustomField
              control={form.control}
              name='details'
              formLabel='Aditional Details'
              className='w-full'
              render={({ field }) =>
                <Textarea {...field} placeholder='Enter product description, SKU, tags, etc.' />
              }
            />
          </CardContent>
          <CardFooter>
            <Button className='ml-auto' type='submit'>
              Save Product
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card >
  )
}

export default AddProductForm