import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Product } from '@/lib/database/models/product.model'
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
]

const CustomersTable = ({ customers }: {customers: User[] }) => {
  return (
    <div>
      <DataTable columns={columns} data={customers} />
    </div>
  )
}

export default CustomersTable