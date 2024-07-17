'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AnalysisStatus } from '@/lib/database/models/analysisStatus.model'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const AnalysisSatusCard = ({ analysisStatus }: { analysisStatus: AnalysisStatus }) => {
  return (
    <div className="bg-background text-foreground p-6 rounded-lg shadow-lg">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <h2 className="text-2xl font-bold">Información del paciente</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-1">
              <label className="text-muted-foreground text-sm font-medium">Nombre</label>
              <p className="font-medium">John Doe</p>
            </div>
            <div className="grid gap-1">
              <label className="text-muted-foreground text-sm font-medium">Edad</label>
              <p className="font-medium">35</p>
            </div>
            <div className="grid gap-1">
              <label className="text-muted-foreground text-sm font-medium">Teléfono</label>
              <p className="font-medium">+1 (555) 123-4567</p>
            </div>
            <div className="grid gap-1">
              <label className="text-muted-foreground text-sm font-medium">Correo electrónico</label>
              <p className="font-medium">john.doe@example.com</p>
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <h2 className="text-2xl font-bold">Historial de análisis</h2>
          <div className="grid gap-4">
            <div className="grid gap-2 border-b pb-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">Análisis de sangre</p>
                <p className="text-muted-foreground">2023-04-15</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <label className="text-muted-foreground text-sm font-medium">Análisis realizados</label>
                  <p className="font-medium">
                    - Hemograma completo
                    <br />- Perfil lipídico
                    <br />- Pruebas de función hepática
                  </p>
                </div>
                <div className="grid gap-1">
                  <label className="text-muted-foreground text-sm font-medium">Costo total</label>
                  <p className="font-medium">$150.00</p>
                </div>
              </div>
            </div>
            <div className="grid gap-2 border-b pb-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">Análisis de orina</p>
                <p className="text-muted-foreground">2023-03-20</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <label className="text-muted-foreground text-sm font-medium">Análisis realizados</label>
                  <p className="font-medium">
                    - Examen general de orina
                    <br />- Cultivo de orina
                  </p>
                </div>
                <div className="grid gap-1">
                  <label className="text-muted-foreground text-sm font-medium">Costo total</label>
                  <p className="font-medium">$80.00</p>
                </div>
              </div>
            </div>
            <div className="grid gap-2 border-b pb-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">Análisis de COVID-19</p>
                <p className="text-muted-foreground">2023-01-10</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-1">
                  <label className="text-muted-foreground text-sm font-medium">Análisis realizados</label>
                  <p className="font-medium">- Prueba PCR de COVID-19</p>
                </div>
                <div className="grid gap-1">
                  <label className="text-muted-foreground text-sm font-medium">Costo total</label>
                  <p className="font-medium">$120.00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Costo total de los análisis</p>
            <p className="font-medium text-primary">$350.00</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisSatusCard