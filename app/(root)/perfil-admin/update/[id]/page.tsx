import AddAnalysisForm, { AnalysisName } from '@/components/shared/AddAnalysisForm'
import { EMPTY_QUERY, MAX_RESULTS, MIN_PAGE } from '@/constants'
import { getAllAnalysis, getAllAnalysisById } from '@/lib/actions/Analysis.actions'
import { redirect } from 'next/navigation'
import React from 'react'

const PATHNAME = '/Analysis-admin/update'
const PREV_PATHNAME = '/Analysis-admin'

const UpdateAnalysisPage = async (
  { params: { id } }:
    { params: { id: string } }
) => {
  const AnalysisList = await getAllAnalysis(PATHNAME, MIN_PAGE, MAX_RESULTS, EMPTY_QUERY, { name: 1 });
  const AnalysisData = await getAllAnalysisById(PATHNAME, id);

  if (!AnalysisData.success || !AnalysisData.data) redirect(PREV_PATHNAME);

  // const test = {
  //   ...AnalysisData.data,
  //   tests: []
  // }

  return (
    <div>
      <div className='mt-8'>
        <AddAnalysisForm
          perfilData={AnalysisData.data}
          AnalysisList={AnalysisList as AnalysisName[]}
        />
      </div>
    </div>
  )
}

export default UpdateAnalysisPage