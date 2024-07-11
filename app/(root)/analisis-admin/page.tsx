import AnalisisTable from '@/components/shared/AnalisisTable'
import { Button } from '@/components/ui/button'
import { getAllAnalisis, getAnalisisCount } from '@/lib/actions/analisis.actions'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'
import React from 'react'
import Search from '@/components/shared/Search';
import Pagination from '@/components/shared/TablePagination';

const AnalisisAdminPage = async ({
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
  const resultsPerPage = Number(searchParams?.resultsPerPage) || 10;
  const analisis = await getAllAnalisis('/analisis', currentPage, resultsPerPage, query)
  const totalFilteredRows = analisis.length;
  const totalRows = (await getAnalisisCount()).data || 0;
  const totalFilteredPages = Math.ceil(totalFilteredRows / resultsPerPage) < 1 ? 1 : (totalFilteredRows / resultsPerPage);
  const totalPages = Math.ceil(totalRows / resultsPerPage);

  return (
    <div className='w-full py-8'>
      <div className='flex justify-between'>
        <Link href='/analisis-admin/add/bulk' passHref>
          <Button role='a' variant={'outline'}>
            Add Bulk Analisis
          </Button>
        </Link>
        <Link href='/analisis-admin/add' passHref>
          <Button role='a' variant={'outline'} className='hover:bg-gray-200'>
            Add New Analisis
          </Button>
        </Link>
      </div>
      <div className="mt-4 flex flex-row items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search analisis..." />
      </div>
      <div className='p-2'>Total Rows: {totalRows}, Total Pages {totalPages}</div>
      <div className='mt-2'>
        {analisis && <AnalisisTable
          page={currentPage}
          resultsPerPage={resultsPerPage}
          totalRows={totalFilteredRows}
          search={query}
          analisis={analisis}
        />}
        <Pagination totalPages={query === '' ? totalPages : totalFilteredPages} />
      </div>
    </div>
  )
}

export default AnalisisAdminPage