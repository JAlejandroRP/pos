'use client'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import Link from 'next/link'
import { Analysis } from '@/lib/database/models/analysis.model'

export const columns: ColumnDef<Analysis>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    // enableSorting: true,
    // enableResizing: true,
    // size: 250,
    maxSize: 250,
    // cell: ({ row }) => (<div>
    //   <Link href={`/analysis-admin/update/${row.original._id}`}>
    //     {row.original.name}
    //   </Link>
    // </div>),
  },
  {
    accessorKey: "type",
    header: "Tipo",
    maxSize: 70,
  },
  {
    accessorKey: "cost",
    header: "Costo de producción",
    maxSize: 70,
    cell: ({ row }) => (<div>
      $ {row.original.cost}
    </div>)
  },
  {
    accessorKey: "costPublic",
    header: "Costo público",
    maxSize: 50,
    cell: ({ row }) => (<div>
      $ {row.original.costPublic}
    </div>),
    sortDescFirst: true
  },
  {
    maxSize: 60,
    id: 'select-col',
    header: ({ table }) => (<div>Seleccionar</div>
      )
    ,
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
  analysis
}: {
  page: number,
  totalRows: number,
  search: string,
  resultsPerPage: number,
  analysis: Analysis[]
}) => {
  return (
    <div className='shadow-lg'>
      <DataTable columns={columns} data={analysis} />
    </div>
  )
}

export default AnalysisTable