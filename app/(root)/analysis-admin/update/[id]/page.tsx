import AddAnalysisForm from '@/components/shared/AddAnalysisForm'
import { EMPTY_QUERY, MAX_RESULTS, MIN_PAGE } from '@/constants'
import { getAllAnalysis, getAllAnalysisById } from '@/lib/actions/analysis.actions'
import { redirect } from 'next/navigation'
import React from 'react'

const PATHNAME = '/Analysis-admin/update'
const PREV_PATHNAME = '/Analysis-admin'

const UpdateAnalysisPage = async (
  { params: { id } }:
    { params: { id: string } }
) => {
  const analysisData = await getAllAnalysisById(PATHNAME, id);

  if (!analysisData.success || !analysisData.data) redirect(PREV_PATHNAME);

  // const test = {
  //   ...AnalysisData.data,
  //   tests: []
  // }

  return (
    <div>
      <div className='mt-8'>
        <AddAnalysisForm
          // perfilData={AnalysisData.data}
          analysisData={analysisData.data}
          // analysisList={AnalysisList as AnalysisName[]}
        />
      </div>
    </div>
  )
}

export default UpdateAnalysisPage