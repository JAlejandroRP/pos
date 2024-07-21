// import { getAllAnalysis, getAnalysisCount } from '@/lib/actions/Analysis.actions';
import React from 'react'
import Pagination from '@/components/shared/Pagination';
import AnalysisStatusTable from '@/components/shared/AnalysisStatusTable';
import { getPerfilsCount } from '@/lib/actions/perfil.actions';
import { getAllAnalysisStatus } from '@/lib/actions/status.actions';


const AnalysisPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string,
    page?: string,
    resultsPerPage?: string,
  },
}) => {
  // const cart = await getCart()
  // const params = new URLSearchParams(searchParams);
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const resultsPerPage = Number(searchParams?.resultsPerPage) || 10;
  const analysis = await getAllAnalysisStatus('/analysis', currentPage, resultsPerPage, query)
  const totalFilteredRows = analysis.length;
  const totalRows = (await getPerfilsCount()).data || 0;
  const totalFilteredPages = Math.ceil(totalFilteredRows / resultsPerPage) < 1 ? 1 : (totalFilteredRows / resultsPerPage);
  const totalPages = Math.ceil(totalRows / resultsPerPage);
  
  // const query = searchParams?.query || '';
  // const currentPage = Number(searchParams?.page) || 1;
  // const resultsPerPage = Number(searchParams?.resultsPerPage) || 1000;
  // const Analysis = await getAllAnalysis('/Analysis', currentPage, resultsPerPage, "")

  return (
    <section>
      <main>
        <header className="sticky top-0 z-10 pt-8 shadow-sm backdrop-blur-sm">
          <div className='flex flex-row justify-between backdrop-blur-sm'>
            <h2 className="my-7 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Estado Pruebas
            </h2>
            {/* <Link href={CHECKOUT_PATH}>
              <Button
                className='ml-auto shrink-0 text-md'
                variant='outline'
              >
                <ShoppingCart className='w-5 h-5 mr-2' />
                Checkout
              </Button>
            </Link> */}
          </div>
        </header>
        <div>
          <AnalysisStatusTable
            analysis={analysis}
          />
        <Pagination totalPages={query === '' ? totalPages : totalFilteredPages} />
        </div>
        {/* <Cart
          cart={cart}
          Analysis={Analysis}
          asList
        /> */}
      </main>
    </section >
  )
}

export default AnalysisPage