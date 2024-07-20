import Pagination from '@/components/shared/Pagination';
import Search from '@/components/shared/Search';
import ParticularsTable from '@/components/shared/ParticularsTable';
import { Button } from '@/components/ui/button'
import { getPacients, getParticulars, getParticularsCount } from '@/lib/actions/user.actions';
import Link from 'next/link'
import React from 'react'

const pathname = '/customers'

const CustomersPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string,
    page?: string,
    resultsPerPage?: string,
  },
}) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const resultsPerPage = Number(searchParams?.resultsPerPage) || 10;
  const customers = await getParticulars(pathname, currentPage, resultsPerPage, query, {});
  const totalFilteredRows = customers.data?.length || 0;
  const totalRows = (await getParticularsCount()).data || 0;
  const totalFilteredPages = Math.ceil(totalFilteredRows / resultsPerPage) < 1 ? 1 : (totalFilteredRows / resultsPerPage);
  const totalPages = Math.ceil(totalRows / resultsPerPage);

  return (
    <div className='w-full py-8'>
      <h2 className="my-7 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Particulares
      </h2>
      <div className='flex justify-between'>
        <Link href='/particulars/add/true' passHref className='shadow-lg'>
          <Button role='a' variant='outline' className='hover:bg-gray-200'>
            Agregar nuevo particular
          </Button>
        </Link>
      </div>
      <div className="mt-6 flex flex-row items-center justify-between gap-2">
        <Search placeholder="Buscar pacientes..." />
      </div>
      <div className='mt-6'>
        {customers && <ParticularsTable users={customers.data || []} />}
        <Pagination totalPages={query === '' ? totalPages : totalFilteredPages} />
      </div>
    </div>
  )
}

export default CustomersPage