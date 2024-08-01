'use client'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { User } from '@/lib/database/models/user.model'
import Link from 'next/link'
import { Microscope, Plus } from 'lucide-react'
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
    header: "Nombre",
    enableSorting: true,
    // size: 250
    maxSize: 150,
  },
  {
    accessorKey: "email",
    header: "Correo",
    enableSorting: true,
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
    maxSize: 80,
  },
  {
    accessorKey: "sex",
    header: "Genero",
    maxSize: 50,
  },
  {
    maxSize: 70,
    id: 'select-col',
    header: ({ table }) => (
      <span>
        Crear Perfil
      </span>
    ),
    cell: ({ row }) => (
      <div className='w-full m-auto'>
        <Link href={`/particulars/${row.original._id}/analysis/add`}>
          <Plus className='h-5 w-5 m-auto' />
        </Link>
      </div>
    ),
  },
]

const ParticularsTable = ({ users }: { users: User[] }) => {
  return (
    <div className='shadow-lg'>
      <DataTable columns={columns} data={users} />
    </div >
  )
}

export default ParticularsTable