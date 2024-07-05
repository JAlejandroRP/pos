import AnalisisCard from '@/components/shared/client/AnalisisCard';
import { getAllAnalisis } from '@/lib/actions/analisis.actions';

import React from 'react'


const AnalisisPage = async () => {
  const analisis = await getAllAnalisis('/analisis');
  
  return (
    <section>
      <div>
        <h2 className="my-7 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Analisis
        </h2>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
      >
        {analisis.map(analisis => <AnalisisCard key={analisis.code} analisis={analisis} />)}
      </div>
    </section>
  )
}

export default AnalisisPage