import { Button } from '@/components/ui/button';
import { getAllAnalisis } from '@/lib/actions/analisis.actions';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import React from 'react'
import { CHECKOUT_PATH } from '../checkout/page';
import Cart from '@/components/shared/Cart';


const AnalisisPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string,
    page?: string,
    resultsPerPage?: string,
  },
}) => {
  const params = new URLSearchParams(searchParams);
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const resultsPerPage = Number(searchParams?.resultsPerPage) || 1000;
  const analisis = await getAllAnalisis('/analisis', currentPage, resultsPerPage, "")
  
  return (
    <section>
      <main>
        <header className="sticky top-0 z-10 pt-8 shadow-sm backdrop-blur-sm">
          <div className='flex flex-row justify-between backdrop-blur-sm'>
            <h2 className="my-7 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Analisis
            </h2>
            <Link href={CHECKOUT_PATH}>
              <Button
                className='ml-auto shrink-0 text-md'
                variant='outline'
              >
                <ShoppingCart className='w-5 h-5 mr-2' />
                Checkout
              </Button>
            </Link>
          </div>
        </header>
        <Cart analisis={analisis} />
      </main>
    </section >
  )
}

export default AnalisisPage