import { getAllAnalysis, getAnalysisCount, getPerfilsCount } from '@/lib/actions/analysis.actions'
import { getCart, newCart } from '@/lib/actions/cart.actions'
import { getUserByMongoId } from '@/lib/actions/user.actions'
import React from 'react'
import { redirect } from 'next/navigation'
import ListItems from '@/components/shared/ListItems'
import Pagination from '@/components/shared/Pagination'
import { getAllPerfils } from '@/lib/actions/perfil.actions'
import { PatientData } from '@/components/shared/PatientData'
import CreateAnalysysPerfilsPanel from '@/components/shared/CreateAnalysysPerfilsPanel'

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


  return (
    <section>
      <CreateAnalysysPerfilsPanel
        analysis={searchParams.type === 'analysis' ? analysis : perfils}
        query={query}
        totalFilteredPages={totalFilteredPages}
        totalPages={totalPages}
        user={user.data}
        userId={id}
      />
    </section >
  )
}

export default AddAnalysisToCustomerPage