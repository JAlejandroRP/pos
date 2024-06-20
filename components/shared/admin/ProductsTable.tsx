import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Product } from '@/lib/database/models/product.model'
import { DataTable } from '@/components/ui/data-table'

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "initial_stock",
    header: "Stock",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "details",
    header: "Details",
  },
]

const ProductsTable = ({ products }: { products: Product[] }) => {
  return (
    <div>
      <DataTable columns={columns} data={products} />
    </div>
  )
}

export default ProductsTable