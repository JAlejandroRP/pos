'use client'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { AnalisisWithId } from '@/lib/database/models/analisis.model'
import { DataTable } from '@/components/ui/data-table'

export const columns: ColumnDef<AnalisisWithId>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    enableResizing: true,
    // size: 250,
    maxSize: 250,
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
    accessorKey: "noIktan",
    header: "Number IKTAN",
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
  },
  {
    accessorKey: "costPublic",
    header: "Price Public",
    maxSize: 70,
  },
  {
    maxSize: 50,
    id: 'select-col',
    header: ({ table }) => (
      <input
        type='checkbox'
        checked={table.getIsAllRowsSelected()}
        // indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
      />
    ),
    cell: ({ row }) => (
      <input
        type='checkbox'
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },
]

const AnalisisTable = ({ analisis }: { analisis: AnalisisWithId[] }) => {
  return (
    <div>
      <DataTable columns={columns} data={analisis} />
    </div>
  )
}

export default AnalisisTable