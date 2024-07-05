'use client'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { AnalisisWithId } from '@/lib/database/models/analisis.model'
import { DataTable } from '@/components/ui/data-table'
import { deleteAnalisis } from '@/lib/actions/analisis.actions'
import { Trash2 } from 'lucide-react'

export const columns: ColumnDef<AnalisisWithId>[] = [
  // {
  //   accessorKey: "_id",
  //   header: "Id",
  //   maxSize: 70,
  //   enableHiding: true,
  // },
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
    cell: ({ row }) => (<div>
      $ {row.original.cost}
    </div>)
  },
  {
    accessorKey: "costPublic",
    header: "Price Public",
    maxSize: 70,
    cell: ({ row }) => (<div>
      $ {row.original.costPublic}
    </div>)
  },
  {
    maxSize: 50,
    id: 'select-col',
    header: ({ table }) => (
      <div className='flex justify-between items-center py-2'>
        <input
          type='checkbox'
          checked={table.getIsAllRowsSelected()}
          // indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
        />
        {Object.keys(table.getState().rowSelection).length > 0 && <button onClick={async () => {
          const ids = table.getState().rowSelection as Object
          const deleteResponse = await deleteAnalisis(Object.keys(ids))

        }}>
          <Trash2 className='h-4 w-4' />
        </button>}
      </div>
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
      {/* <button onClick={columns.he}>hola</button> */}
      <DataTable columns={columns} data={analisis} />
    </div>
  )
}

export default AnalisisTable