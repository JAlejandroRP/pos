"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import * as z from "zod"
import { useToast } from '@/components/ui/use-toast';
import { insertAnalisis, insertAnalisisBulk } from '@/lib/actions/analisis.actions';
import { Analisis } from '@/lib/database/models/analisis.model';
import { Textarea } from '@/components/ui/textarea';

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
})

const AddAnalisisBulkForm = (
  // productData?: AddProductParams
) => {
  const [bulkData, setBulkData] = useState('')
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
  }

  const onChangeHandler = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      setBulkData(event.target.value)
      const data = event.target.value
      const objects: Analisis[] = data.split('\n').map(row => {
        const columns = row.split(',')
        return {
          lab: columns[0],
          noIktan: Number(columns[1]),
          code: columns[2],
          name: columns[3],
          deliveryTime: Number(columns[4]),
          type: columns[5],
          cost: Number(columns[6]),
          costUrgent: Number(columns[7]),
          costPublic: Number(columns[8]),
          costPublicUrgent: Number(columns[12]),
          addUrgentPrice: false,
          promo: '',
        }
      })
      const bulkInsertResponse = await insertAnalisisBulk(objects)

      if (bulkInsertResponse.error) {
        toast({
          title: 'Something went wrong',
          description: bulkInsertResponse.error.toString(),
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
  }

  const form = useForm<z.infer<typeof addAnalisisFormSchema>>({
    resolver: zodResolver(addAnalisisFormSchema),
    defaultValues: initialValues
  })

  const onSubmit = async (values: z.infer<typeof addAnalisisFormSchema>) => {
    setIsSubmitting(true);
    try {
      const createAnalisisResponse = await insertAnalisis(values);

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

    setIsSubmitting(false)
  }

  return (
    <Card className='w-full max-w-4xl'>
      <CardHeader>
        <CardTitle>
          Add Bulk Analisis
        </CardTitle>
        <CardDescription>
          Enter comma separated values
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          className='grid gap-6'
          onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className='grid  gap-6'>
              <Textarea
                value={bulkData}
                onChange={onChangeHandler}
                placeholder='name, code, lab, noIktan, deliveryTime, type, cost, costUrgent, costPublic, costPublicUrgent'
              />
              {/* <CustomField
                control={form.control}
                name='name'
                formLabel='name, code, lab, noIktan, deliveryTime, type, cost, costUrgent, costPublic, costPublicUrgent'
                className='w-full'
                render={({ field }) =>
                  <Textarea
                    {...field}
                    placeholder='Enter analisis name'
                  />
                  // <Input
                  //   type=''
                  //   {...field}
                  // />
                }
              /> */}
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

export default AddAnalisisBulkForm