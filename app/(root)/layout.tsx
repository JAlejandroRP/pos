import MobileNav from '@/components/shared/admin/MobileNav'
import Sidebar from '@/components/shared/admin/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import { getUserByClerkId } from '@/lib/actions/user.actions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth()

  if (!userId) redirect('/sign-in');

  const user = await getUserByClerkId(userId)

  return (
    <main className="flex min-h-screen w-full flex-col bg-white lg:flex-row">
      <Sidebar user={user} />
      <MobileNav />
      <div className="mt-16 flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-10">
        <div className="max-w-5xl mx-auto px-5 md:px-10 w-full text-dark-400 p-16-regular">
          {children}
        </div>
      </div>
      <Toaster />
    </main>
  )
}

export default Layout