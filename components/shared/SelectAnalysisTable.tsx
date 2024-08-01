'use client'
import React, { HTMLAttributes, useRef, useState } from 'react'
import { ColumnDef, Row } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { Download, Plus, Upload } from 'lucide-react'
import { AnalysisStatus } from '@/lib/database/models/analysisStatus.model'
import { analysisStatus } from '@/constants'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Input } from '../ui/input'
import { uploadAnalysisStatus, uploadPdf } from '@/lib/actions/google.actions'
import { upsertAnalysisStatus } from '@/lib/actions/status.actions'
import { usePathname } from 'next/navigation'
import { Analysis } from '@/lib/database/models/analysis.model'
import { addItem, getCart, removeItem } from '@/lib/actions/cart.actions'

const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, status: AnalysisStatus, setIsLoading: Function) => {
  if (event.target.files) {
    const file = event.target.files[0];
    if (file.type === 'application/pdf') {
      setIsLoading(true)
      const file = event.target.files[0];
      const data = new FormData()
      data.append('file', file)
      const response = await uploadPdf(`${status._id}`, data)
      if (response.docId) {
        await upsertAnalysisStatus({
          ...status,
          pdfUrl: `https://drive.google.com/uc?export=download&id=${response.docId}`,
          status: analysisStatus.completed
        }, '/analysis-status')
        setIsLoading(false)
      }
      setIsLoading(false)
    }
  }
};

const colorStatus = (status: string): { color: string, label: string } => {
  if (status === analysisStatus.in_progress) {
    return { color: '!text-orange-500', label: 'En progreso' }
  }
  if (status === analysisStatus.canceled) {
    return { color: '!text-red-500', label: 'Cancelado' }
  }
  if (status === analysisStatus.collection_pending) {
    return { color: '!text-yellow-500', label: 'Pendiente' }
  }
  if (status === analysisStatus.received) {
    return { color: '!text-green-500', label: 'Recibido' }
  }
  if (status === analysisStatus.completed) {
    return { color: '!text-green-500', label: 'Completado' }
  }
  return { color: '!text-gray-500', label: 'Otro' }
}

const getPerfilUser = (status: AnalysisStatus) => {
  if (status.perfils.length > 0)
    return status.perfils[0].user.name
  return ''
}

const handleDownload = (url: string) => {
  if (url) {

    const downloadUrl = url;
    const link = document.createElement('a');

    link.href = downloadUrl;
    link.target = '_blank';
    link.download = 'resultados.pdf'; // Puedes personalizar el nombre del archivo descargado
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const columns: ColumnDef<Analysis>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    maxSize: 70,
  },
  {
    accessorKey: "type",
    header: "Tipo",
    maxSize: 70,
  },
  {
    accessorKey: "costPublic",
    header: "Costo",
    maxSize: 70,
  },
  {
    id: "actions",
    maxSize: 70,
    cell: ({ row }) => (
      <div>
        <input
          type='checkbox'
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      </div>
    )
  },
]

const SelectAnalysisTable = ({
  analysis
}: {
  analysis: Analysis[]
}) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())

  const handleRowSelect = (row: Row<Analysis>) => {
    setSelectedRows((prev) => {
      const newSelectedRows = new Set(prev)
      if (newSelectedRows.has(row.original._id!.toString())) {
        newSelectedRows.delete(row.original._id!.toString())
      } else {
        newSelectedRows.add(row.original._id!.toString())
      }
      return newSelectedRows
    })
  }

  const handleSelectAll = () => {
    setSelectedRows((prev) => {
      const newSelectedRows = new Set(prev)
      if (newSelectedRows.size === analysis.length) {
        newSelectedRows.clear()
      } else {
        analysis.forEach((item) => newSelectedRows.add(item._id!.toString()))
      }
      return newSelectedRows
    })
  }

  return (
    <div className='shadow-lg'>
      <DataTable
        columns={columns}
        data={analysis}
      />
    </div>
  )
}

export default SelectAnalysisTable