"use client";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import { Menu } from 'lucide-react';
import { navLinks } from '@/constants';
import { ModeToggle } from './ThemeSelector';
import Image from 'next/image';
import { Label } from '../ui/label';

const MobileNav = ({ user }: { user: any }) => {
  const pathname = usePathname();
  return (
    <div className='bg-white dark:bg-gray-900 flex justify-between bg-background  w-full fixed top-50 z-50 items-center h-16 w-full p-5 lg:hidden fixed'>
      <div className='flex justify-between bg-background  w-full items-center w-full lg:hidden '>
        <Link
          href='/'
          className='flex items-center'
        >
          <Image
            src='/assets/icons/sislab.png'
            alt='Add Image'
            width={20}
            height={20}
            className='mr-4'
          />
          <Label>Sislab</Label>
        </Link>
        <nav className="flex gap-6">
          <SignedIn>
            <ModeToggle />
            <UserButton />
            <Sheet>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent className='sm:w-64'>
                <>
                  <div className='pl-4 flex flex-row'>
                    <Image
                      src='/assets/icons/sislab.png'
                      alt='Add Image'
                      width={20}
                      height={20}
                      className='mr-4'
                    />
                    <Label className='m-auto ml-2'>Sislab</Label>
                  </div>
                  <ul className='mt-8 flex w-full flex-col items-start gap-5'>
                    {navLinks.map((link) => {
                      const isActive = link.route === pathname;

                      return (
                        <li key={link.route}
                          className={`${isActive ? 'bg-gray-400' : ''} p-18 flex whitespace-nowrap text-dark-700 w-full rounded-lg`}
                        >
                          <SheetClose>
                            <Link
                              className='p-16-semibold flex size-full gap-4 p-4'
                              href={link.route}>
                              <div className='my-auto'>
                                {link.icon}

                              </div>
                              {link.label}
                            </Link>
                          </SheetClose>
                        </li>
                      )
                    })}
                  </ul>
                </>
              </SheetContent>
            </Sheet>
          </SignedIn>
        </nav>
      </div>
    </div>
  )
}

export default MobileNav