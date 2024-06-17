"use client";

import { navLinks } from '@/constants';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from '../../ui/button';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    // oculto siempre a no ser que sea lg
    <aside className="hidden h-screen w-72 bg-white p-5 shadow-md lg:flex">
      <div className="flex size-full flex-col gap-4">
        {/* <Link href='/' className='sidebar-logo'/> */}
        <nav className='h-full flex-col justify-between md:flex md:gap-4'>
          <SignedIn>
            <ul className="">
              {navLinks.map(link => {
                const isActive = link.route === pathname;
                return (
                  <li
                    key={link.route}
                  >
                    <Link
                      className={`flex p-16-semibold size-full gap-4 p-4 ${isActive ? 'underline text-gray-400' : ''}`}
                      href={link.route}
                    >
                      {link.icon}{link.label}
                    </Link>
                  </li>
                )
              })}
              <li
                className='justify-center items-center cursor-pointer gap-4 p-4'
              >
                <UserButton afterSignOutUrl='/' showName />
              </li>
            </ul>
          </SignedIn>
          <SignedOut>
            <Button asChild className=''>
              <Link href='/sign-in'>Sign In</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar