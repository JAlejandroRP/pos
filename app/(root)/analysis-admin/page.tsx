import AnalysisTable, { columns } from '@/components/shared/AnalysisTable'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Search from '@/components/shared/Search';
import Pagination from '@/components/shared/Pagination';
import { getAllAnalysis, getAnalysisCount } from '@/lib/actions/analysis.actions';
import { DataTable } from '@/components/ui/data-table';

const AnalysisAdminPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string,
    page?: string,
    resultsPerPage?: string,
  },
}) => {
  // const params = new URLSearchParams(searchParams);
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const resultsPerPage = Number(searchParams?.resultsPerPage) || 10;
  const analysis = await getAllAnalysis('/analysis-admin', currentPage, resultsPerPage, query)
  console.log(analysis);
  
  const totalFilteredRows = analysis.length;
  const totalRows = (await getAnalysisCount()).data || 0;
  const totalFilteredPages = Math.ceil(totalFilteredRows / resultsPerPage) < 1 ? 1 : (totalFilteredRows / resultsPerPage);
  const totalPages = Math.ceil(totalRows / resultsPerPage);

  return (
    <div className='w-full py-8'>
      <h2 className="my-7 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Administracion Analisis
      </h2>
      <div className='flex justify-between'>
        <Link href='/analysis-admin/add' passHref className='shadow-lg'>
          <Button role='a' variant={'outline'} className='hover:bg-gray-200'>
            Agregar nuevo analisis
          </Button>
        </Link>
        <Link href='/analysis-admin/add/bulk' passHref className='shadow-lg'>
          <Button role='a' variant={'outline'}>
            Agregar analisis en lote
          </Button>
        </Link>
      </div>
      <div className="mt-6 flex flex-row items-center justify-between gap-2">
        <Search placeholder="Buscar analisis..." />
      </div>
      <div className='mt-6'>
        <DataTable columns={columns} data={analysis}/>
        {/* {analysis && <AnalysisTable
          page={currentPage}
          resultsPerPage={resultsPerPage}
          totalRows={totalFilteredRows}
          search={query}
          analysis={analysis}
        />} */}
        <Pagination totalPages={query === '' ? totalPages : totalFilteredPages} />
      </div>
    </div>
  )
}

export default AnalysisAdminPage