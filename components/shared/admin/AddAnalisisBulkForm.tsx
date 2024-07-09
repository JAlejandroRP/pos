"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import React, { FormEvent, FormEventHandler, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import * as z from "zod"
import { useToast } from '@/components/ui/use-toast';
import { insertAnalisis, insertAnalisisBulk } from '@/lib/actions/analisis.actions';
import { Analisis } from '@/lib/database/models/analisis.model';
import { Textarea } from '@/components/ui/textarea';
import { usePathname } from 'next/navigation'

const AddAnalisisBulkForm = (
) => {
  const pathname = usePathname()
  const [bulkData, setBulkData] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  // const initialValues: Analisis = {
  //   lab: '',
  //   noIktan: 0,
  //   code: '',
  //   name: '',
  //   deliveryTime: 0,
  //   type: '',
  //   cost: 0,
  //   costUrgent: 0,
  //   costPublic: 0,
  //   costPublicUrgent: 0,
  //   addUrgentPrice: false,
  //   promo: '',
  // }

  const onChangeHandler = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBulkData(event.target.value)
  }

  // const form = useForm<z.infer<typeof addAnalisisFormSchema>>({
  //   resolver: zodResolver(addAnalisisFormSchema),
  //   defaultValues: initialValues
  // })

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true);
    try {
      const objects: Analisis[] = bulkData.split('\n').map(row => {
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
      console.log('objects', objects);

      const bulkInsertResponse = await insertAnalisisBulk(objects, pathname)
      console.log(bulkInsertResponse);


      if (bulkInsertResponse.error) {
        toast({
          title: 'Something went wrong',
          description: bulkInsertResponse.error,
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
      {/* <Form> */}
      <form
        className='grid gap-6'
        onSubmit={onSubmit}>
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
      {/* </Form> */}
    </Card >
  )
}

export default AddAnalisisBulkForm