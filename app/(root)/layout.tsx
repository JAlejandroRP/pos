import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import { auth } from "@clerk/nextjs/server"
import { getClerkCurrentUser } from '@/lib/actions/user.actions'
// import { currentUser } from '@clerk/nextjs/server';

// import { getClerkCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getClerkCurrentUser();
  // const user = await currentUser();
  // let user = {id: 1}
  
  if(!user.data) {
    redirect('/sign-in');
  }

  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row">
      <Sidebar user={user.data} />
      <MobileNav user={user.data}/>
      <div className="flex-1 overflow-auto lg:mt-0 lg:max-h-screen ">
        <div className="max-w-7xl mx-auto px-4 md:px-10 w-full text-dark-400 p-16-regular pt-16 lg:pt-0">
          {children}
        </div>
      </div>
      <Toaster />
    </main>
  )
}

export default Layout