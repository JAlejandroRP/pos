import AnalisisTable from '@/components/shared/AnalisisTable'
import { Button } from '@/components/ui/button'
import { getAllAnalisis, getAnalisisCount } from '@/lib/actions/analisis.actions'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'
import React from 'react'

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
  const currentPage = Number(searchParams?.page) || 0;
  const resultsPerPage = Number(searchParams?.resultsPerPage) || 10;
  const analisisCount = (await getAnalisisCount()).data || 0;
  const analisis = await getAllAnalisis('/analisis', currentPage, resultsPerPage)

  return (
    <div className='w-full py-8'>
      {/* <h1>Analisis Admin Page</h1> */}
      <div className='flex justify-between'>
        <Link href='/analisis-admin/add/bulk' passHref>
          <Button role='a' variant={'outline'}>
            Add Bulk Analisis
          </Button>
        </Link>
        <Link href='/analisis-admin/add' passHref>
          <Button role='a' variant={'secondary'} className='hover:bg-gray-200'>
            Add New Analisis
          </Button>
        </Link>
      </div>
      <div className='mt-8'>
        {analisis && <AnalisisTable
        page={currentPage}
        resultsPerPage={resultsPerPage}
        totalRows={analisisCount}
        search={query}
        analisis={analisis}
        />}
      </div>
    </div>
  )
}

export default AnalisisAdminPage