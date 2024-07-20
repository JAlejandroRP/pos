import { Button } from '@/components/ui/button'
import { MAX_RESULTS, MIN_PAGE } from '@/constants'
import { getAllAnalysis, getAnalysisCount } from '@/lib/actions/analysis.actions'
import { getCart, newCart } from '@/lib/actions/cart.actions'
import { getUserByMongoId } from '@/lib/actions/user.actions'
import { PlusCircleIcon, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { redirect } from 'next/navigation'
import ListItems from '@/components/shared/ListItems'
import Search from '@/components/shared/Search'
import Pagination from '@/components/shared/Pagination'

const AddAnalysisToCustomerPage = async ({
  params: { id },
  searchParams
}: {
  params: { id: string }, searchParams?: {
    query?: string,
    page?: string,
    resultsPerPage?: string,
  }
}
) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const resultsPerPage = Number(searchParams?.resultsPerPage) || 10;
  const analysis = await getAllAnalysis('/analysis', currentPage, resultsPerPage, query)
  // const perfils = await getall
  const totalFilteredRows = analysis.length;
  const totalRows = (await getAnalysisCount()).data || 0;
  const totalFilteredPages = Math.ceil(totalFilteredRows / resultsPerPage) < 1 ? 1 : (totalFilteredRows / resultsPerPage);
  const totalPages = Math.ceil(totalRows / resultsPerPage);
  const user = await getUserByMongoId(id)
  let cart = await getCart()

  if (!cart) cart = await newCart()
  if (!user.success || !user.data) redirect('/customers')

  const userAge = Math.abs(new Date(user.data.birthday).getFullYear() - new Date().getFullYear())

  return (
    <section>
      <main>
        <header className="max-w-2xl m-auto sticky top-0 z-10 pt-8 shadow-sm backdrop-blur-sm">
          <div className='flex flex-row justify-between backdrop-blur-sm'>
            <div className="flex-auto my-2 scroll-m-20 pb-4 text-xl font-semibold tracking-tight transition-colors first:mt-0 max-w-sm">
              <div className='flex flex-row justify-between'>
                <div>
                  Empresa: 
                </div>
                <div className='font-normal'>
                  {user.data.name}
                </div>
              </div>
              <div className='flex flex-row justify-between'>
                <div>
                  Teléfono:
                </div>
                <div className='font-normal'>
                  {user.data.phone}
                </div>
              </div>
              <div className='flex flex-row justify-between'>
                <div>
                  Correo:
                </div>
                <div className='font-normal'>
                  {user.data.email}
                </div>
              </div>
            </div>
            <div className='flex-none'>
              <Link href={`/checkout/${id}`} className='shadow-lg'>
                <Button
                  className='ml-auto shrink-0 text-md'
                  variant='outline'
                >
                  {/* <PlusCircleIcon className='w-5 h-5 mr-2' /> */}
                  Crear perfil
                </Button>
              </Link>
            </div>
          </div>
          <Search
            underline
            placeholder='Buscar analisis'
          />
        </header>
        <div className='max-w-2xl m-auto pt-4'>
          <ListItems
            cart={cart}
            data={analysis}
            asList
          />
          <Pagination
            totalPages={query === '' ? totalPages : totalFilteredPages}
          />
        </div>
      </main>
    </section >
  )
}

export default AddAnalysisToCustomerPage