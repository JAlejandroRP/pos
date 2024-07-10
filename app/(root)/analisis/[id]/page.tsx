// import React from 'react'
import { redirect } from "next/navigation";
import AnalisisCard from "@/components/shared/AnalisisCard"
import { getAllAnalisisById } from "@/lib/actions/analisis.actions"

const AnalisisPage = async (
  { params: { id } }:
    { params: { id: string } }
) => {
  // console.log(id);

  const analisis = await getAllAnalisisById('/analisis/', id)

  if (!analisis.success)
    redirect('/analisis')

  return (
    <div className="py-8">
      <AnalisisCard
        analisis={analisis.data!}
      />
    </div>
  )
}

export default AnalisisPage