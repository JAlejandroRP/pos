import AnalisisCardSmall from '@/components/shared/client/AnalisisCardSmall';
import { Button } from '@/components/ui/button';
import { getAllAnalisis } from '@/lib/actions/analisis.actions';
import { ShoppingCart } from 'lucide-react';

import React from 'react'


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
  const currentPage = Number(searchParams?.page) || 0;
  const resultsPerPage = Number(searchParams?.resultsPerPage) || 100;
  const analisis = await getAllAnalisis('/analisis', currentPage, resultsPerPage)

  return (
    <section>
      {/* <div className='py-8 bg-white'> */}
        <header className="sticky top-0 z-10 bg-white pt-8 shadow-sm">
          <div className='flex flex-row justify-between'>
            <h2 className="my-7 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Analisis
            </h2>
            <Button
              className='ml-auto shrink-0 text-md'
              variant='outline'
            >
              <ShoppingCart className='w-5 h-5 mr-2' />
              Checkout (2)
            </Button>
          </div>
        </header>
      {/* </div> */}
      <main>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {analisis.map(analisis => <AnalisisCardSmall key={analisis.code} analisis={analisis} />)}
        </div>

      </main>
    </section >
  )
}

export default AnalisisPage