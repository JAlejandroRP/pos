import AnalisisTable from '@/components/shared/admin/AnalisisTable'
import { Button } from '@/components/ui/button'
import { getAllAnalisis } from '@/lib/actions/analisis.actions'
import Link from 'next/link'
import React from 'react'

const AnalisisAdminPage = async () => {
  const analisis = await getAllAnalisis('/analisis/');

  return (
    <div className='w-full'>
      <h1>Analisis Admin Page</h1>
      <div className='flex justify-between'>
        <Link href='/analisis-admin/add/bulk' passHref>
          <Button role='a'>
            Add Bulk Analisis
          </Button>
        </Link>
        <Link href='/analisis-admin/add' passHref>
          <Button role='a'>
            Add New Analisis
          </Button>
        </Link>
      </div>
      <div className='mt-8'>
        {analisis && <AnalisisTable analisis={analisis} />}
      </div>
    </div>
  )
}

export default AnalisisAdminPage