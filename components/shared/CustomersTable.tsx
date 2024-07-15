'use client'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { User } from '@/lib/database/models/user.model'
import Link from 'next/link'
import { Microscope } from 'lucide-react'
import { Button } from '../ui/button'

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
      <div className='flex flex-row items-center justify-between'>
        <input
          type='checkbox'
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
        <Link href={`/customers/${row.original._id}/analisis/add`}>
          <Microscope className='h-5 w-5' />
        </Link>
      </div>
    ),
  },
]

const CustomersTable = ({ customers }: { customers: User[] }) => {
  return (
    <div>
      <Button onClick={() => {
        window.localStorage.removeItem("cart");
      }
      }>Clean cart</Button>
      <DataTable columns={columns} data={customers} />
    </div >
  )
}

export default CustomersTable