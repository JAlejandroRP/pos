'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Analysis } from '@/lib/database/models/analysis.model'
import { AnalysisStatus } from '@/lib/database/models/analysisStatus.model'
import { Perfil } from '@/lib/database/models/perfil.model'
import { calculateSubtotal, calculateTax } from '@/lib/utils'
import { Cart } from '@/types'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const getTypes = (analysis: Analysis[]) => {
  const types: string[] = []
  analysis.forEach(analysis => {
    if (!types.find(e => e === analysis.type))
      types.push(analysis.type)
  });

  return types
}

const getAnalysisByType = (type: string, analysis: Analysis[], date: Date, isUrgent: boolean) => {
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
            if (an.type === type) {
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
            if (an.type === type) {
              return <React.Fragment key={i}>
                ${isUrgent ? Number(an.costPublic * 1.2).toLocaleString() : an.costPublic.toLocaleString()}<br />
              </React.Fragment>
            }
          })}
        </p>
      </div>
    </div>
  </div>
}
const PerfilsCostsHtml = ({ cost }: { cost: number }) => {
  return <React.Fragment>
    ${cost.toLocaleString()} <br />
  </React.Fragment>

}

const PerfilsHtml = ({ perfil }: { perfil: Perfil }) => {
  return <React.Fragment>
    - {perfil.name.toLowerCase()} < br />
    <>
      {perfil.analysis.map((analysis, i) => <React.Fragment key={i}>
        &nbsp; &nbsp;- {analysis.name.toLowerCase()} <br />
      </React.Fragment>)}
    </>
  </React.Fragment >
}

const PerfilsItems = ({ perfils, date }: { perfils: Perfil[], date: Date }) => {
  if (perfils.length === 0) return <></>

  const htmlAnalysis = perfils.map((p, i) => {
    return <p key={i} className='font-medium capitalize'>
      {/* <label className="text-muted-foreground text-sm font-medium">Análisis realizados</label><br/> */}
      {<PerfilsHtml
        perfil={p}
      />}
    </p>
  })

  const HtmlCosts = perfils.map((p, i) => {
    return <p key={i} className='font-medium capitalize'>
      {<PerfilsCostsHtml
        key={i}
        cost={p.total}
      />}
    </p>
  })


  return <div className="grid gap-2 border-b pb-4">
    <div className="flex items-center justify-between">
      <p className="font-medium capitalize">Perfiles</p>
      <p className="text-muted-foreground">{new Date(date).toDateString()}</p>
    </div>
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="grid gap-1">
        {htmlAnalysis}
        {/* <label className="text-muted-foreground text-sm font-medium">Análisis realizados</label> */}
      </div>
      <div className="grid gap-1">
        <label className="text-muted-foreground text-sm font-medium">Costo total</label>
        {HtmlCosts}
      </div>
    </div>
  </div>
}

const AnalysisItems = ({ analysis, date, isUrgent }: { analysis: Analysis[], date: Date, isUrgent: boolean }) => {
  if (analysis.length === 0) return <></>
  const types = getTypes(analysis)
  console.log(types);


  const htmlItems = types.map((type, i) => {
    return <div key={i}>
      {getAnalysisByType(type, analysis, date, isUrgent)}
    </div>
  })


  return <>{htmlItems}</>
}

const AnalysisSatusCard = ({ analysisStatus }: { analysisStatus: AnalysisStatus }) => {
  const userAge = Math.abs(new Date(analysisStatus.user.birthday).getFullYear() - new Date().getFullYear());
  const temporalCart: Cart = {
    items: {
      analysis: analysisStatus.analysis,
      perfils: analysisStatus.perfils
    },
    tax: 0
  }
  const subTotal = calculateSubtotal(temporalCart, analysisStatus.isUrgent);
  const total = Number(subTotal + calculateTax(subTotal));
  console.log('status', analysisStatus);


  return (
    <div className="bg-background text-foreground p-6 rounded-lg shadow-lg">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <h2 className="text-2xl font-bold">Información del paciente</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-1">
              <label className="text-muted-foreground text-sm font-medium">Nombre</label>
              <p className="font-medium">{analysisStatus.user.name}</p>
            </div>
            <div className="grid gap-1">
              <label className="text-muted-foreground text-sm font-medium">Edad</label>
              <p className="font-medium">{userAge}</p>
            </div>
            <div className="grid gap-1">
              <label className="text-muted-foreground text-sm font-medium">Teléfono</label>
              <p className="font-medium">+52 ({analysisStatus.user.phone?.substring(0, 3)}) {analysisStatus.user.phone?.substring(3, 6)}-{analysisStatus.user.phone?.substring(6, 10)}</p>
            </div>
            <div className="grid gap-1">
              <label className="text-muted-foreground text-sm font-medium">Correo electrónico</label>
              <p className="font-medium">{analysisStatus.user.email}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <h2 className="text-2xl font-bold">Historial de análisis</h2>
          <div className="grid gap-4">
            <AnalysisItems
              analysis={analysisStatus.analysis}
              date={analysisStatus.creationDate}
              isUrgent={analysisStatus.isUrgent}
            />
            <PerfilsItems
              date={analysisStatus.creationDate}
              perfils={analysisStatus.perfils}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Costo total de los análisis (+IVA)</p>
            <p className="font-medium text-primary">$ {total.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisSatusCard