import { Button } from '@/components/ui/button'
import { MAX_RESULTS, MIN_PAGE } from '@/constants'
import { getAllAnalysis, getAnalysisCount, getPerfilsCount } from '@/lib/actions/analysis.actions'
import { getCart, newCart } from '@/lib/actions/cart.actions'
import { getUserByMongoId } from '@/lib/actions/user.actions'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { redirect } from 'next/navigation'
import ListItems from '@/components/shared/ListItems'
import Search from '@/components/shared/Search'
import Pagination from '@/components/shared/Pagination'
import { getAllPerfils } from '@/lib/actions/perfil.actions'
import { Analysis } from '@/lib/database/models/analysis.model'
import { Perfil } from '@/lib/database/models/perfil.model'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import ViewSelector from '@/components/shared/ViewSelector'

const AddAnalysisToCustomerPage = async ({
  params: { id },
  searchParams
}: {
  params: { id: string }, searchParams?: {
    query?: string,
    page?: string,
    resultsPerPage?: string,
    type?: string,
  }
}
) => {
  if (!searchParams || !searchParams?.type) {
    searchParams = {
      type: 'analysis'
    }
  }

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const resultsPerPage = Number(searchParams?.resultsPerPage) || 10;

  const analysis = await getAllAnalysis('/analysis', currentPage, resultsPerPage, query)
  const perfils = await getAllPerfils('/analysis', currentPage, resultsPerPage, query)

  const totalFilteredRows = searchParams.type === 'perfils' ? perfils.length : analysis.length;
  const totalRows = searchParams.type === 'perfils' ?
    (await getPerfilsCount()).data! :
    (await getAnalysisCount()).data!
  const totalFilteredPages = Math.ceil(totalFilteredRows / resultsPerPage) < 1 ? 1 : (totalFilteredRows / resultsPerPage);
  const totalPages = Math.ceil(totalRows / resultsPerPage);
  const user = await getUserByMongoId(id)
  let cart = await getCart()

  if (!cart) cart = await newCart()
  if (!user.success || !user.data) redirect('/patients')

  const userAge = Math.abs(new Date(user.data.birthday).getFullYear() - new Date().getFullYear())

  return (
    <section>
      <main>
        <header className="max-w-2xl m-auto sticky top-0 z-10 pt-8 shadow-sm backdrop-blur-sm">
          <div className='flex flex-row justify-between backdrop-blur-sm'>
            <div className="flex-auto my-2 scroll-m-20 pb-4 text-xl font-semibold tracking-tight transition-colors first:mt-0 max-w-sm flex-grow">
              <div className='flex flex-row justify-between'>
                <div>
                  {user.data.isParticular ? 'Empresa: ' : 'Paciente'}
                </div>
                <div className='font-normal'>
                  {user.data.name}, {userAge} años
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
            <div className='flex flex-col justify-between mb-2'>
              <Link href={`/checkout/${id}`} className='shadow-lg'>
                <Button
                  className='ml-auto shrink-0 text-md'
                  variant='outline'
                >
                  <ShoppingCart className='w-5 h-5 mr-2' />
                  {user.data.isParticular ? 'Crear Analisis' : `Pedir Analisis (${cart.items.analysis.length + cart.items.perfils.length})`}
                </Button>
              </Link>
              <div>
                <ViewSelector />
              </div>
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
            data={searchParams.type === 'analysis' ? analysis : perfils}
            asList
          />
          {/* <ListItems
            cart={cart}
            data={analysis}
            asList
          /> */}
          <Pagination
            totalPages={query === '' ? totalPages : totalFilteredPages}
          />
        </div>
      </main>
    </section >
  )
}

export default AddAnalysisToCustomerPage