'use client'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { deleteAnalysis } from '@/lib/actions/analysis.actions'
import { Trash2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Analysis } from '@/lib/database/models/analysis.model'

export const columns: ColumnDef<Analysis>[] = [
  // {
  //   accessorKey: "_id",
  //   header: "Id",
  //   maxSize: 70,
  //   enableHiding: true,
  // }, 
  {
    accessorKey: "noIktan",
    header: "Number IKTAN",
    maxSize: 70,
    sortDescFirst: true,
    enableSorting: true
  },
  {
    accessorKey: "name",
    header: "Name",
    // enableSorting: true,
    // enableResizing: true,
    // size: 250,
    maxSize: 250,
    cell: ({ row }) => (<div>
      <Link href={`/Analysis-admin/update/${row.original._id}`}>
        {row.original.name}
      </Link>
    </div>),
  },
  {
    accessorKey: "code",
    header: "Code",
    maxSize: 70,
  },
  {
    accessorKey: "type",
    header: "Type",
    maxSize: 70,
  },
  {
    accessorKey: "lab",
    header: "Laboratory",
    maxSize: 70,
  },
  {
    accessorKey: "deliveryTime",
    header: "Delivery Time",
    maxSize: 70,
  },
  {
    accessorKey: "cost",
    header: "Production Cost",
    maxSize: 70,
    cell: ({ row }) => (<div>
      $ {row.original.cost}
    </div>)
  },
  {
    accessorKey: "costPublic",
    header: "Price Public",
    maxSize: 50,
    cell: ({ row }) => (<div>
      $ {row.original.costPublic}
    </div>),
    sortDescFirst: true
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

const AnalysisTable = ({
  page,
  totalRows,
  search,
  resultsPerPage,
  Analysis
}: {
  page: number,
  totalRows: number,
  search: string,
  resultsPerPage: number,
  Analysis: Analysis[]
}) => {
  return (
    <div className='shadow-lg'>
      <DataTable columns={columns} data={Analysis} />
    </div>
  )
}

export default AnalysisTable