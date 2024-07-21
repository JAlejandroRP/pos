import { Cart, ClerkApiError } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from 'tailwind-merge'
import { Analysis } from "./database/models/analysis.model"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createUsername(name: string) {
  const username = name.trim().replaceAll(' ', '_')
  // ret
}

export function parseClerkApiError(error: ClerkApiError) {
  if (!error.clerkError) throw error

  const errors = error.errors?.map((error) => error.longMessage).join(', ');

  return errors;
}
export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const calculateSubtotal = (cart: Cart, isUrgent: boolean) => {
  const totalPerfils = cart.items.perfils?.reduce(
    (acumulator, current) => acumulator + (
      current.total
    ),
    0
  ) || 0
  const totalAnalysis = cart.items.analysis?.reduce(
    (acumulator, current) => acumulator + (current.costPublic),
    0
  ) || 0

  if (isUrgent) return (totalAnalysis + totalPerfils) * 1.2
  return (totalAnalysis + totalPerfils)
}

export const calculateTax = (subtotal: number) => {
  return subtotal * (Number(process.env.TAX_PCT) || 0.16)
}