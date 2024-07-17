'use client'
import React, { HTMLAttributes } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { deleteAnalysis } from '@/lib/actions/analysis.actions'
import { Trash2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { AnalysisStatus } from '@/lib/database/models/analysisStatus.model'
import { Badge } from '../ui/badge'
import { analysisStatus } from '@/constants'
import { Button } from '../ui/button'
import Link from 'next/link'

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

export const columns: ColumnDef<AnalysisStatus>[] = [
  {
    accessorKey: "creationDate",
    header: "Creation Date",
    maxSize: 70,
    cell: ({ row }) => new Date(row.original.creationDate).toUTCString()
  },
  {
    accessorKey: "user.name",
    header: "Patient name",
    maxSize: 70,
  },
  {
    accessorKey: "status",
    header: "Status",
    maxSize: 50,
    cell: ({ row }) => (
      <Link
        href={`/analysis/${row.original._id}`}
      >
        <Button size={'sm'} variant={'outline'}
          className={`rounded-full ${colorStatus(row.original.status)} `}>
          {row.original.status}
        </Button>
      </Link>
    )
  },
  {
    accessorKey: "isUrgent",
    header: "Is Urgent?",
    size: 20,
  },
  {
    maxSize: 60,
    id: 'select-col',
    header: ({ table }) => {
      const rowsSelected = Object.keys(table.getState().rowSelection).length > 0;
      const pathname = usePathname()
      return (
        <div className={`flex ${rowsSelected ? 'justify-between' : 'flex-col'} items-center py-2`}>
          <input
            type='checkbox'
            checked={table.getIsAllRowsSelected()}
            // indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
          />
          {rowsSelected &&
            <button
              onClick={async () => {
                const ids = table.getState().rowSelection as Object
                const idsToDelete = Object.keys(ids)
                const deleteResponse = await deleteAnalysis(idsToDelete, pathname)
                table.setRowSelection({})
              }}
              className='hover:scale-110'
            >
              <Trash2 className='h-5 w-5' color='red' />
            </button>
          }
        </div>
      )
    },
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <input
          type='checkbox'
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      </div>
    ),
  },
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