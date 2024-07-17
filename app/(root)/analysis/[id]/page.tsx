// import React from 'react'
import { redirect } from "next/navigation";
import { getById } from "@/lib/actions/analysisStatus.actions";
import AnalysisSatusCard from "@/components/shared/AnalysisStatusCard";
// import AnalysisSatusCard from "@/components/shared/AnalisisStatusCard";

const AnalysisPage = async (
  { params: { id } }:
    { params: { id: string } }
) => {
  // console.log(id);

  const analysisStatus = await getById(id)

  if (!analysisStatus.success || !analysisStatus.data)
    redirect('/Analysis')

  return (
    <div className="py-8">
      <AnalysisSatusCard
        analysisStatus={analysisStatus.data}
      />
    </div>
  )
}

export default AnalysisPage