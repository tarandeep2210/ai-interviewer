'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

function Header() {

    const path = usePathname();
    useEffect(() => {
        console.log(path);
    }, []);
  return (
    <div className='flex p-2 justify-between items-center bg-secondary shadow-sm'>
        <Image src={"/logo.png"} alt="logo" width={70} height={50} />
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${path === '/dashboard' ? 'text-primary font-bold' : ''}`}>
                Dashboard
            </li>
            <li className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${path === '/dashboard/questions' ? 'text-primary font-bold' : ''}`}>
                Questions
            </li>
            <li className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${path === '/dashboard/upgrade' ? 'text-primary font-bold' : ''}`}>
                Upgrade
            </li>
            <li className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${path === '/dashboard/how-it-works' ? 'text-primary font-bold' : ''}`}>
                How it works?
            </li>
        </ul>
        <UserButton />
    </div>
  )
}

export default Header