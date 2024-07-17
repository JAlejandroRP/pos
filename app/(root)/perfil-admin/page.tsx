import { Button } from '@/components/ui/button'
import { getAllPerfils, getPerfilsCount } from '@/lib/actions/analysis.actions'
import Link from 'next/link'
import React from 'react'
import Search from '@/components/shared/Search';
import Pagination from '@/components/shared/Pagination';
import AnalysisTable from '@/components/shared/AnalysisTable';

const PATHNAME = '/perfil-admin'

const PerfilAdminPage = async ({
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
  const analysis = await getAllPerfils(PATHNAME, currentPage, resultsPerPage, query)
  const totalFilteredRows = analysis.length;
  const totalRows = (await getPerfilsCount()).data || 0;
  const totalFilteredPages = Math.ceil(totalFilteredRows / resultsPerPage) < 1 ? 1 : (totalFilteredRows / resultsPerPage);
  const totalPages = Math.ceil(totalRows / resultsPerPage);

  return (
    <div className='w-full py-8'>
      <div className='flex justify-between'>
        {/* <Link href='/Analysis-admin/add/bulk' passHref>
          <Button role='a' variant={'outline'}>
            Add Bulk Analysis
          </Button>
        </Link> */}
        <Link href='/perfil-admin/add' passHref>
          <Button role='a' variant={'outline'} className='hover:bg-gray-200 shadow-md'>
            Add New Perfil
          </Button>
        </Link>
      </div>
      <div className="mt-4 flex flex-row items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Analysis..." />
      </div>
      <div className='mt-8'>
        {analysis && <AnalysisTable
          page={currentPage}
          resultsPerPage={resultsPerPage}
          totalRows={totalFilteredRows}
          search={query}
          Analysis={analysis}
        />}
        <Pagination totalPages={query === '' ? totalPages : totalFilteredPages} />
      </div>
    </div>
  )
}

export default PerfilAdminPage