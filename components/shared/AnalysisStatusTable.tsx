'use client'
import React, { HTMLAttributes } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { Upload } from 'lucide-react'
import { AnalysisStatus } from '@/lib/database/models/analysisStatus.model'
import { analysisStatus } from '@/constants'
import { Button } from '../ui/button'
import Link from 'next/link'

const colorStatus = (status: string): { color: string, label: string } => {
  if (status === analysisStatus.in_progress) {
    return { color: '!text-orange-500', label: 'En progreso' }
  }
  if (status === analysisStatus.canceled) {
    return { color: '!text-red-500', label: 'Cancelado' }
  }
  if (status === analysisStatus.collection_pending) {
    return { color: '!text-yellow-500', label: 'Pendiente' }
  }
  if (status === analysisStatus.received) {
    return { color: '!text-green-500', label: 'Recibido' }
  }
  return { color: '!text-gray-500', label: 'Otro' }
}

const getPerfilUser = (status: AnalysisStatus) => {
  if (status.perfils.length > 0)
    return status.perfils[0].user.name
  return ''
}

export const columns: ColumnDef<AnalysisStatus>[] = [
  {
    accessorKey: "creationDate",
    header: "Fecha",
    maxSize: 50,
    size: 50,
    cell: ({ row }) => new Date(row.original.creationDate).toDateString()
  },
  {
    // accessorKey: "isUrgent",
    header: "Empresa",
    size: 50,
    minSize: 50,
    cell: ({ row }) => getPerfilUser(row.original)
  },
  {
    accessorKey: "user.name",
    header: "Nombre Paciente",
    maxSize: 70,
  },
  {
    accessorKey: "status",
    header: "Estatus",
    maxSize: 50,
    cell: ({ row }) => {
      const { color, label } = colorStatus(row.original.status)
      return <Link
        href={`/analysis-status/${row.original._id}`}
      >
        <Button size={'sm'} variant={'outline'}
          className={`rounded-full ${color} `}>
          {label}
        </Button>
      </Link>
    }
  },
  {
    id: 'action-col',
    header: ({ table }) => (
      <div className='flex flex-row'>
        <span>Agregar resultado</span>
      </div>
    ),
    maxSize: 60,
    cell: ({ row }) => (
      <Link href={'#'} className='m-auto flex flex-col'>
        <Upload className='h-4 w-4 m-auto' />
      </Link>
    )
  }
]

const AnalysisStatusTable = ({
  analysis
}: {
  analysis: AnalysisStatus[]
}) => {
  return (
    <div className='shadow-lg'>
      <DataTable columns={columns} data={analysis} />
    </div>
  )
}

export default AnalysisStatusTable