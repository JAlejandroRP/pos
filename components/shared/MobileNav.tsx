"use client";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import { Menu } from 'lucide-react';
import { navLinks } from '@/constants';
// import type { User } from '@clerk/backend';

const MobileNav = ({ user }: { user: any }) => {
  const pathname = usePathname();
  return (
    <header className='flex justify-between items-center fixed h-16 w-full border-b-4 bg-white p-5 lg:hidden'>
      <Link
        href='/'
        className='flex items-center grap-2 md:py-2'
      >
        logo
      </Link>
      <nav className="flex gap-2">
        <SignedIn>
          <UserButton/>
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent className='sm:w-64'>
              <>
                <a href="#">LOGO</a>
                <ul className='mt-8 flex w-full flex-col items-start gap-5'>
                  {navLinks.customer.map((link) => {
                    const isActive = link.route === pathname;

                    return (
                      <li key={link.route}
                        className='p-18 flex whitespace-nowrap text-dark-700'
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
    </header>
  )
}

export default MobileNav