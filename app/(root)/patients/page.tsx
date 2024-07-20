import Pagination from '@/components/shared/Pagination';
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
import { getPacients, getPatientsCount } from '@/lib/actions/user.actions';
import Link from 'next/link'
import React from 'react'
import PatientsTable from '@/components/shared/PatientsTable';

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
  const patients = await getPacients(pathname, currentPage, resultsPerPage, query, {});
  const totalFilteredRows = patients.data?.length || 0;
  const totalRows = (await getPatientsCount()).data || 0;
  const totalFilteredPages = Math.ceil(totalFilteredRows / resultsPerPage) < 1 ? 1 : (totalFilteredRows / resultsPerPage);
  const totalPages = Math.ceil(totalRows / resultsPerPage);

  return (
    <div className='w-full py-8'>
      <h2 className="my-7 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Pacientes
      </h2>
      <div className='flex justify-between'>
        <Link href='/patients/add/false' passHref className='shadow-lg'>
          <Button role='a' variant='outline' className='hover:bg-gray-200'>
            Agregar nuevo paciente
          </Button>
        </Link>
      </div>
      <div className="mt-6 flex flex-row items-center justify-between gap-2">
        <Search placeholder="Buscar pacientes..." />
      </div>
      <div className='mt-6'>
        {patients && <PatientsTable users={patients.data || []} />}
        <Pagination totalPages={query === '' ? totalPages : totalFilteredPages} />
      </div>
    </div>
  )
}

export default CustomersPage