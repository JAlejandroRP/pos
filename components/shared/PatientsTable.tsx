'use client'
import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { User } from '@/lib/database/models/user.model'
import Link from 'next/link'
import { Microscope, Plus } from 'lucide-react'
import { Button } from '../ui/button'

export const columns: ColumnDef<User>[] = [
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
        Pedir analisis
      </span>
    ),
    cell: ({ row }) => (
      <div className='w-full m-auto'>
        <Link href={`/patients/${row.original._id}/analysis/add`}>
          <Plus className='h-5 w-5 m-auto' />
        </Link>
      </div>
    ),
  },
]

const PatientsTable = ({ users }: { users: User[] }) => {
  return (
    <div className='shadow-lg'>
      <DataTable columns={columns} data={users} />
    </div >
  )
}

export default PatientsTable