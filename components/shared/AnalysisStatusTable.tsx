'use client'
import React, { HTMLAttributes, useRef, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { Upload } from 'lucide-react'
import { AnalysisStatus } from '@/lib/database/models/analysisStatus.model'
import { analysisStatus } from '@/constants'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Input } from '../ui/input'
import { uploadAnalysisStatus, uploadPdf } from '@/lib/actions/gdrive.actions'
import { upsertAnalysisStatus } from '@/lib/actions/status.actions'
import { usePathname } from 'next/navigation'

const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, status: AnalysisStatus, setIsLoading: Function) => {
  if (event.target.files) {
    const file = event.target.files[0];
    if (file.type === 'application/pdf') {
      setIsLoading(true)
      const file = event.target.files[0];
      const data = new FormData()
      data.append('file', file)
      const response = await uploadPdf(`${status._id}`, data)
      if (response.docId) {
        await upsertAnalysisStatus({
          ...status,
          status: analysisStatus.completed
        }, '/analysis-status')
        setIsLoading(false)
      }
      setIsLoading(false)
    }
  }
};

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
  if (status === analysisStatus.completed) {
    return { color: '!text-green-500', label: 'Completado' }
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
    // header: ({ table }) => (
    //   <div className='flex flex-row'>
    //     <span>Agregar resultado</span>
    //   </div>
    // ),
    size: 55,
    maxSize: 60,
    cell: ({ row }) => {
      const [isLoading, setIsLoading] = useState(false)

      if(row.original.status === analysisStatus.completed)
        return <span>Cambiar resultados</span>

      return <div className=''>
        {isLoading ? 'Subiendo archivo...' :
          <label htmlFor={`resultado-${row.original._id}`}>
            <Upload className='cursor-pointer h-4 w-4 m-auto' />
            <Input className='hidden' type='file' accept='application/pdf' placeholder='Resultados' id={`resultado-${row.original._id}`} onChange={e => handleFileUpload(e, row.original, setIsLoading)} />
          </label>
        }
      </div>
    }
  },
  // {
  //   id: 'download',
  //   header: ({ table }) => (
  //     <div className='flex flex-row'>
  //       <span>Descargar resultados</span>
  //     </div>
  //   ),
  //   size: 55,
  //   maxSize: 60,
  //   cell: ({ row }) => (
  //     <div className=''>
  //       <label htmlFor='resultado'>
  //         <Upload className='cursor-pointer h-4 w-4 m-auto' />
  //       </label>
  //       <Input className='hidden' type='file' accept='application/pdf' placeholder='Resultados' id='resultado' onChange={e => handleFileUpload(e, row.original)} />
  //     </div>
  //   )
  // }
]

const AnalysisStatusTable = ({
  analysis
}: {
  analysis: AnalysisStatus[]
}) => {
  const formRef = useRef<HTMLFormElement>(null);


  const onSubmit = (formData: FormData) => {
    console.log(formData);

  }
  return (
    <div className='shadow-lg'>
      <DataTable columns={columns} data={analysis} />
    </div>
  )
}

export default AnalysisStatusTable