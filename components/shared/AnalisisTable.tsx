'use client'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { AnalisisWithId } from '@/lib/database/models/analisis.model'
import { DataTable } from '@/components/ui/data-table'
import { deleteAnalisis } from '@/lib/actions/analisis.actions'
import { Trash2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import TablePagination from './TablePagination'

export const columns: ColumnDef<AnalisisWithId>[] = [
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
                const deleteResponse = await deleteAnalisis(idsToDelete, pathname)
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

const AnalisisTable = ({
  page,
  totalRows,
  search,
  resultsPerPage,
  analisis
}: {
  page: number,
  totalRows: number,
  search: string,
  resultsPerPage: number,
  analisis: AnalisisWithId[]
}) => {
  return (
    <div>
      {/* <button onClick={columns.he}>hola</button> */}
      <DataTable columns={columns} data={analisis} />
      {/* <TablePagination
        totalPages={totalPages}
      /> */}
    </div>
  )
}

export default AnalisisTable