import MobileNav from '@/components/shared/admin/MobileNav'
import Sidebar from '@/components/shared/admin/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import { getClerkCurrentUser } from '@/lib/utils'
import { redirect } from 'next/navigation'
import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getClerkCurrentUser();

  if(!user) redirect('/sign-in');

  return (
    <main className="flex min-h-screen w-full flex-col bg-white lg:flex-row">
      <Sidebar user={user} />
      <MobileNav user={user}/>
      <div className="flex-1 overflow-auto lg:mt-0 lg:max-h-screen">
        <div className="max-w-7xl mx-auto px-1 md:px-10 w-full text-dark-400 p-16-regular">
          {children}
        </div>
      </div>
      <Toaster />
    </main>
  )
}

export default Layout