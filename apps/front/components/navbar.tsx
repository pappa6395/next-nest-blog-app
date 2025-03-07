import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren

const Navbar = (props: Props) => {
  return (
    <>
        <h1 className='text-2xl font-bold p-2'>
            My Modern Blog
        </h1>
        <div className='flex flex-col md:flex-row gap-2 ml-auto [&>a]:py-2 [&>a]:px-4 [&>a]:transition 
        [&>a]:rounded-md [&>a:hover]:text-sky-100 [&>a:hover]:bg-sky-400'
        >
            <Link href='/' className=''>
                Blog
            </Link>
            <Link href='#about' className=''>
                About
            </Link>
            <Link href='#contact' className=''>
                Contact
            </Link>
        </div>
    </>
  )
}

export default Navbar