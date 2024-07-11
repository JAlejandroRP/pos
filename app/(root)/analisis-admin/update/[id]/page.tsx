import AddAnalisisForm, { AnalisisName } from '@/components/shared/AddAnalisisForm'
import { EMPTY_QUERY, MAX_RESULTS, MIN_PAGE } from '@/constants'
import { getAllAnalisis, getAllAnalisisById } from '@/lib/actions/analisis.actions'
import { redirect } from 'next/navigation'
import React from 'react'

const PATHNAME = '/analisis-admin/update'
const PREV_PATHNAME = '/analisis-admin'

const UpdateAnalisisPage = async (
  { params: { id } }:
    { params: { id: string } }
) => {
  const analisisList = await getAllAnalisis(PATHNAME, MIN_PAGE, MAX_RESULTS, EMPTY_QUERY, { name: 1 });
  const analisisData = await getAllAnalisisById(PATHNAME, id);

  if(!analisisData.success || !analisisData.data) redirect(PREV_PATHNAME);

  // const test = {
  //   ...analisisData.data,
  //   tests: []
  // }

  return (
    <div>
      <div>
        UpdateAnalisisPage
      </div>
      <div>
        {id}
      </div>
      <div>
        <AddAnalisisForm
          analisisData={analisisData.data}
          analisisList={analisisList as AnalisisName[]}
        />
      </div>
    </div>
  )
}

export default UpdateAnalisisPage