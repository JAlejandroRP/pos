import { redirect } from "next/navigation";
import PerfilCard from "@/components/shared/PerfilCard";
import { getPerfilById } from "@/lib/actions/perfil.actions";

const AnalysisPage = async (
  { params: { id } }:
    { params: { id: string } }
) => {
  // console.log(id);

  const perfil = await getPerfilById(id)
  console.log(perfil);
  

  if (!perfil.success || !perfil.data)
    redirect('/analysis')

  return (
    <div className="py-8">
      <PerfilCard
        perfil={perfil.data}
      />
    </div>
  )
}

export default AnalysisPage