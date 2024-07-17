import AddAnalysisForm, { AnalysisName } from '@/components/shared/AddAnalysisForm'
import { getAllAnalysis } from '@/lib/actions/Analysis.actions'
import React from 'react'

const AddProductPage = async () => {
  const Analysis:AnalysisName[] = (await getAllAnalysis('/Analysis-admin/add', 1, 1000, '', { name: 1}) as AnalysisName[])
  
  return (
    <div className='py-8 m-auto'>
      <AddAnalysisForm AnalysisList={Analysis}
      />
    </div>
  )
}

export default AddProductPage