"use client";
// import type { User } from '@clerk/backend';
import { navLinks } from '@/constants';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button';
import { ModeToggle } from './ThemeSelector';
import { User } from '@/lib/database/models/user.model';
import { Label } from '../ui/label';
import Image from 'next/image';

const Sidebar = ({ user }: { user: User }) => {
  const pathname = usePathname();

  return (
    // oculto siempre a no ser que sea lg
    <aside className="hidden h-screen w-58 p-5 shadow-md lg:flex shadow-xl">
      <div className="flex size-full flex-col gap-4">
        {/* <Link href='/' className='sidebar-logo'/> */}
        <nav className='h-full flex-col justify-between md:flex md:gap-4'>
          <SignedIn>
            <ul className="">
              <li>
                <div className='flex size-full gap-3 pl-4'>
                  {/* <div className='pl-4 flex flex-row'> */}
                  <>
                    <Image
                      src='/assets/icons/sislab.png'
                      alt='Add Image'
                      width={24}
                      height={20}
                      className=''
                    />
                    <h1 className='m-auto ml-1'>Sislab</h1>
                  </>
                </div>
              </li>
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
                      <>
                        <div className='my-auto '>
                          {link.icon}
                        </div>
                        <span className='text-md'>
                          {link.label}
                        </span>
                      </>
                    </Link>
                  </li>
                )
              })
              }
              <li
                className='flex justify-center items-center cursor-pointer gap-4 p-4'
              >
                <div className=''>
                  <UserButton />
                </div>
                <span className='mr-auto'>{user.name || user.phone}</span>
                <ModeToggle />
              </li>
            </ul>
          </SignedIn>
          <SignedOut>
            <Button className=''>
              <Link href='/sign-in'>Sign In</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside >
  )
}

export default Sidebar