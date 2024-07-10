'use client'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { User } from '@/lib/database/models/user.model'

export const columns: ColumnDef<User>[] = [
  // {
  //   accessorKey: "image",
  //   header: "Image",
  //   enableResizing: true,
  //   size:200
  // },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    size: 250
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "direction",
    header: "Direction",
  },
  {
    accessorKey: "sex",
    header: "Sex",
  },
  {
    maxSize: 70,
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

const CustomersTable = ({ customers }: { customers: User[] }) => {
  return (
    <div>
      <DataTable columns={columns} data={customers} />
    </div>
  )
}

export default CustomersTable