"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React  from 'react'
import { useForm } from 'react-hook-form';
import { CustomField } from './CustomField';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from "zod";
import { useToast } from '@/components/ui/use-toast';
import { Analysis } from '@/lib/database/models/analysis.model';
import { usePathname } from 'next/navigation';
import { insertAnalysis } from '@/lib/actions/analysis.actions';

export const addAnalysisFormSchema = z.object({
  // _id: z.string(),
  // _id: z.preprocess((value) => {
  //   return new ObjectId(value )
  // }),
  name: z
    .string()
    .trim() // Remove leading/trailing whitespace
    .min(1, { message: "Must enter a name" })
    .max(500, { message: "Name can't be longer than 500 characters" }),
  // lab: z
  //   .string()
  //   .toUpperCase()
  //   .trim()
  //   .min(1, { message: "Must enter a lab" })
  //   .max(50, { message: "Name can't be longer than 50 characters" }),
  // noIktan: z.preprocess((value) => {
  //   if (typeof value === "string" || typeof value === "number") return Number(value);
  // }, z.number().min(1, { message: "Must enter a number" })),
  // code: z
  //   .string()
  //   .toUpperCase()
  //   .trim()
  //   .min(1, { message: "Must enter a code" })
  //   .max(10, { message: "Code can't be longer than 10 characters" }),
  // deliveryTime: z.preprocess((value) => {
  //   if (typeof value === "string" || typeof value === "number") return Number(value);
  // }, z.number().min(0, { message: "Must enter a number" }).max(24, { message: "Delivery time can't be longer than 24 hrs" })),
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
  // promo: z.string().trim(),
  // addUrgentPrice: z.boolean(),
  // tests: z.string()
  // tests: z.string().array()
})

const AddAnalysisForm = ({
  analysisData
}: {
  isPerfil?: boolean,
  analysisData?: Analysis
}
) => {
  const pathname = usePathname()
  const { toast } = useToast();
  const initialValues: Analysis = {
    // lab: AnalysisData?.lab || '',
    // noIktan: AnalysisData?.noIktan || 0,
    // code: AnalysisData?.code || '',
    // deliveryTime: AnalysisData?.deliveryTime || 0,
    // tests: AnalysisData?.tests || [],
    // promo: AnalysisData?.promo || '',
    name: analysisData?.name || '',
    type: analysisData?.type || '',
    cost: analysisData?.cost || 0,
    costPublic: analysisData?.costPublic || 0,
    // _id: AnalysisData?._id || new ObjectId()
  }

  // const addAnalysisToPerfil = (Analysis: string) => {
  //   let currAnalysis = form.getValues().tests

  //   const index = currAnalysis.indexOf(Analysis)

  //   if (index >= 0) {
  //     currAnalysis = currAnalysis.filter(e => e !== Analysis)
  //     console.log('filtered', currAnalysis);

  //     form.setValue("tests", currAnalysis)
  //     // console.log(form.getValues().tests);
  //     return;
  //   }

  //   currAnalysis.push(Analysis)
  //   form.setValue("tests", currAnalysis)
  //   console.log(form.getValues().tests)
  // }

  const form = useForm<z.infer<typeof addAnalysisFormSchema>>({
    resolver: zodResolver(addAnalysisFormSchema),
    defaultValues: initialValues
  })

  const onSubmit = async (values: z.infer<typeof addAnalysisFormSchema>) => {
    try {
      const createAnalysisResponse = await insertAnalysis({
        _id: analysisData?._id,
        ...values
      }, pathname);
      console.log(createAnalysisResponse);


      if (createAnalysisResponse.error) {
        toast({
          title: 'Something went wrong',
          description: createAnalysisResponse.error,
          duration: 5000,
          className: 'error-toast',
          variant: 'destructive'
        })
      }
      else {
        toast({
          title: "Analysis created!",
          description: "You now can see the new Analysis.",
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
    <Card className='w-full max-w-4xl m-auto shadow-lg'>
      <CardHeader>
        <CardTitle>
          Add
          {/* Add New {`${isPerfil ? 'Perfil' : 'Analysis'}`} */}
        </CardTitle>
        <CardDescription>
          Fill out the form below to add a new Analysis to your inventory.
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
                formLabel='Analysis Name/Profile'
                className='w-full'
                render={({ field }) =>
                  <Input
                    {...field}
                    placeholder='Enter Analysis name'
                  />
                  // <Input
                  //   type=''
                  //   {...field}
                  // />
                }
              />
              {/* <CustomField
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
              /> */}
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
                name='costPublic'
                formLabel='Cost Public'
                className='w-full'
                render={({ field }) =>
                  <Input
                    type='number'
                    {...field} placeholder='' />
                }
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className='ml-auto' type='submit' variant={'outline'}
              onClick={() => console.log(form.getValues())
              }
            >
              Save Analysis
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card >
  )
}

export default AddAnalysisForm