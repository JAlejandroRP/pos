'use client'
import { Analysis } from '@/lib/database/models/analysis.model'
import { Perfil } from '@/lib/database/models/perfil.model'
import React from 'react'

const getTypes = (analysis: Analysis[]) => {
  const types: string[] = []
  analysis.forEach(analysis => {
    if (!types.find(e => e.trim() === analysis.type.trim()))
      types.push(analysis.type.trim())
  });

  return types
}

const getAnalysisByType = (type: string, analysis: Analysis[], date: Date) => {
  return <div className="grid gap-2 border-b pb-4">
    <div className="flex items-center justify-between">
      <p className="font-medium capitalize">{type.toLowerCase()}</p>
      <p className="text-muted-foreground">{new Date(date).toDateString()}</p>
    </div>
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="grid gap-1">
        <label className="text-muted-foreground text-sm font-medium">Análisis realizados</label>
        <p className='font-medium capitalize'>
          {analysis.map((an, i) => {
            if (an.type.trim() === type) {
              if (i > 0) {
                return <React.Fragment key={i}>
                  - {an.name.toLowerCase()} <br />
                </React.Fragment>
              }
              return <React.Fragment key={i}>
                - {an.name.toLowerCase()}
              </React.Fragment>
            }
          })}
        </p>
      </div>
      <div className="grid gap-1">
        <label className="text-muted-foreground text-sm font-medium">Costo total</label>
        <p className='font-medium'>
          {analysis.map((an, i) => {
            if (an.type.trim() === type) {
              return <React.Fragment key={i}>
                ${an.costPublic.toLocaleString()}<br />
              </React.Fragment>
            }
          })}
        </p>
      </div>
    </div>
  </div>
}

const AnalysisItems = ({ analysis, date }: { analysis: Analysis[], date: Date }) => {
  const types = getTypes(analysis)

  const htmlItems = types.map((t, i) => {
    return <div key={i}>
      {getAnalysisByType(t, analysis, date)}
    </div>
  })


  return <>{htmlItems}</>
}

const PerfilCard = ({ perfil }: { perfil: Perfil }) => {
  return (
    <div className="bg-background text-foreground p-6 rounded-lg shadow-lg">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <h2 className="text-2xl font-bold">Información de la empresa</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-1">
              <label className="text-muted-foreground text-sm font-medium">Nombre</label>
              <p className="font-medium">{perfil.user.name}</p>
            </div>
            <div className="grid gap-1">
              <label className="text-muted-foreground text-sm font-medium">Teléfono</label>
              <p className="font-medium">+52 ({perfil.user.phone?.substring(0, 3)}) {perfil.user.phone?.substring(3, 6)}-{perfil.user.phone?.substring(6, 10)}</p>
            </div>
            <div className="grid gap-1">
              <label className="text-muted-foreground text-sm font-medium">Correo electrónico</label>
              <p className="font-medium">{perfil.user.email}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <h2 className="text-2xl font-bold">{perfil.name}</h2>
          <h2 className="text-xl font-bold"></h2>
          <div className="grid gap-4">
            <AnalysisItems
              analysis={perfil.analysis}
              date={new Date()}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Costo total de los análisis (+IVA)</p>
            <p className="font-medium text-primary">$ {perfil.total.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfilCard