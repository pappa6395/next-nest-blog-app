"use client"
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, useEffect } from 'react'


type Props = PropsWithChildren
const DesktopNavbar = (props: Props) => {

    const [scrollPosition, setScrollPosition] = React.useState(0);
    const pathname = usePathname();
    const isHome = pathname === '/';

    const handleScroll = () => {
        setScrollPosition(window.scrollY)
    }

    useEffect(() => {
        // Add event listener for resize event
        window.addEventListener('scroll', handleScroll)

        // Remove event listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll)
    })

    const isScrollDown = scrollPosition > 10;

  return (

    <nav className={cn("hidden fixed transition-colors w-full z-50 text-white top-0 md:block", {
        "bg-white text-gray-700 shadow-md": isScrollDown || !isHome,
    })}>
        <div className='flex items-center px-4 py-4 container'>
            {props.children}
        </div>
        <hr className='border-b border-gray-100 opacity-25' />
    </nav>

  )
}

export default DesktopNavbar