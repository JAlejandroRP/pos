import React from 'react'
import { getAllAnalysis, getAnalysisCount } from '@/lib/actions/analysis.actions'
import { getUserByMongoId } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { PatientData } from '@/components/shared/PatientData'
import ListItems from '@/components/shared/ListItems'
import Pagination from '@/components/shared/Pagination'
import CreateAnalysysPerfilsPanel from '@/components/shared/CreateAnalysysPerfilsPanel'

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
  const totalFilteredRows = analysis.length;
  const totalRows = (await getAnalysisCount()).data || 0;
  const totalFilteredPages = Math.ceil(totalFilteredRows / resultsPerPage) < 1 ? 1 : (totalFilteredRows / resultsPerPage);
  const totalPages = Math.ceil(totalRows / resultsPerPage);
  const user = await getUserByMongoId(id)

  if (!user.success || !user.data) redirect('/customers')

  return (
    <section>
      <CreateAnalysysPerfilsPanel
        analysis={analysis}
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