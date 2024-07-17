import AnalysisTable from '@/components/shared/AnalysisTable'
import { Button } from '@/components/ui/button'
import { getAllAnalysis, getAnalysisCount } from '@/lib/actions/analysis.actions'
import Link from 'next/link'
import React from 'react'
import Search from '@/components/shared/Search';
import Pagination from '@/components/shared/Pagination';

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
      <div className='flex justify-between'>
        <Link href='/Analysis-admin/add' passHref className='shadow-lg'>
          <Button role='a' variant={'outline'} className='hover:bg-gray-200'>
            Add New Analysis
          </Button>
        </Link>
        <Link href='/Analysis-admin/add/bulk' passHref className='shadow-lg'>
          <Button role='a' variant={'outline'}>
            Add Bulk Analysis
          </Button>
        </Link>
      </div>
      <div className="mt-4 flex flex-row items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Analysis..." />
      </div>
      {/* <div className='p-2'>Total Rows: {totalRows}, Total Pages {totalPages}</div> */}
      <div className='mt-6'>
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

export default AnalysisAdminPage