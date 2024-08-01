import { redirect } from "next/navigation";
import AnalysisSatusCard from "@/components/shared/AnalysisStatusCard";
import { getAnalysisStatusById } from "@/lib/actions/status.actions";
import { Button } from "@/components/ui/button";
import { listFiles } from "@/lib/actions/google.actions";
// import AnalysisSatusCard from "@/components/shared/AnalisisStatusCard";

const AnalysisPage = async (
  { params: { id } }:
    { params: { id: string } }
) => {
  const analysisStatus = await getAnalysisStatusById(id)

  if (!analysisStatus.success || !analysisStatus.data)
    redirect('/analysis-status')

  return (
    <div className="py-8">
      <AnalysisSatusCard
        analysisStatus={analysisStatus.data}
      />
    </div>
  )
}

export default AnalysisPage