import { getSession } from '@/lib/session'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import SignInPanel from './signInPanel'
import Profile from './profile'

type Props = PropsWithChildren

const Navbar = async (props: Props) => {

    const session = await getSession()
    const userId = session?.user.id;

  return (
    <>
        <Link href="/">
            <h1 className='text-2xl font-bold p-2'>
                My Modern Blog
            </h1>
        </Link>
        <div className='flex flex-col md:flex-row gap-2 ml-auto [&>a]:py-2 [&>a]:px-4 [&>a]:transition 
        [&>a]:rounded-md [&>a:hover]:text-sky-100 [&>a:hover]:bg-sky-400'
        >
            <Link href={`/`} className=''>
                Blog
            </Link>
            <Link href='#about' className=''>
                About
            </Link>
            <Link href='#contact' className=''>
                Contact
            </Link>
            {session && session.user ? (
                <Profile user={session.user} />
            ) : 
                <SignInPanel />
            }
        </div>
    </>
  )
}

export default Navbar