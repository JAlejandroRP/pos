'use client'
import React, { HTMLAttributes } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { deleteAnalysis } from '@/lib/actions/analysis.actions'
import { SearchIcon, Trash, Trash2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { AnalysisStatus } from '@/lib/database/models/analysisStatus.model'
import { Badge } from '../ui/badge'
import { analysisStatus } from '@/constants'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Perfil } from '@/lib/database/models/perfil.model'
import { deletePerfil } from '@/lib/actions/perfil.actions'

const colorStatus = (status: string) => {
  if (status === analysisStatus.in_progress) {
    return '!text-orange-500'
  }
  if (status === analysisStatus.canceled) {
    return '!text-red-500'
  }
  if (status === analysisStatus.collection_pending) {
    return '!text-yellow-500'
  }
  if (status === analysisStatus.received) {
    return '!text-green-500'
  }
  if (status === analysisStatus.other) {
    return '!text-gray-500'
  }
}

export const columns: ColumnDef<Perfil>[] = [
  // {
  //   accessorKey: "creationDate",
  //   header: "Creation Date",
  //   maxSize: 70,
  //   cell: ({ row }) => new Date(row.original.creationDate).toDateString()
  // },
  {
    accessorKey: "user.name",
    header: "Nombre empresa",
    maxSize: 70,
  },
  {
    accessorKey: "name",
    header: "Nombre perfil",
    size: 100,
    maxSize: 70,
  },
  // {
  //   accessorKey: "isParticular",
  //   header: "Es empresa?",
  //   size: 20,
  // },
  {
    maxSize: 30,
    minSize: 30,
    size: 30,
    id: 'detail',
    header: ({ table }) => {
      return (
        <div>
          Ver perfil
        </div>
      )
    },
    cell: ({ row }) => (
      <div className='flex flex-row max-w-sm justify-between w-12 m-auto'>
        <Link href={`/perfils/${row.original._id}`}>
          <SearchIcon className='h-4 w-4' />
        </Link>
      </div>
    ),
  },
  {
    maxSize: 30,
    minSize: 30,
    size: 30,
    id: 'delete',
    header: ({ table }) => {
      return (
        <div>
          Eliminar
        </div>
      )
    },
    cell: ({ row }) => (
      <div className='flex flex-row max-w-sm justify-between w-12 m-auto '>
        <label className='hover:cursor-pointer'
          htmlFor="" onClick={() => { deletePerfil(row.original._id!, '/perfils')}}>
          {/* <Link href={`/perfils/${row.original._id}`}> */}
          <Trash className='h-4 w-4' />
        </label>
        {/* </Link> */}
      </div>
    ),
  },
  // {
  //   maxSize: 30,
  //   minSize: 30,
  //   size:30,
  //   id: 'select-col',
  //   header: ({ table }) => {
  //     return (
  //       <div>
  //         Modificar
  //       </div>
  //     )
  //   },
  //   cell: ({ row }) => (
  //     <div className='flex flex-row max-w-sm justify-between w-12 m-auto'>
  //       <Link href={`/perfils/${row.original._id}`}>
  //         <SearchIcon className='h-4 w-4' />
  //       </Link>
  //     </div>
  //   ),
  // },
]

const PerfilsTable = ({
  perfils
}: {
  perfils: Perfil[]
}) => {
  return (
    <div className='shadow-lg'>
      <DataTable columns={columns} data={perfils} />
    </div>
  )
}

export default PerfilsTable