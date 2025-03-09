import { SessionUser } from '@/lib/session'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ArrowRightStartOnRectangleIcon, ListBulletIcon, PencilSquareIcon, UserIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

type Props = {
    user: SessionUser;
}

const profile = ({user}: Props) => {
  return (
    <Popover>
        <PopoverTrigger>
            <Avatar>
                <AvatarImage 
                    src={`${user.avatar}`}
                    className='rounded-full w-14 border-2 border-white'
                />
                <AvatarFallback>
                    <UserIcon className='w-8 text-slate-500' />
                </AvatarFallback>
            </Avatar>
        </PopoverTrigger>
        <PopoverContent>
            <div className='flex flex-col justify-center items-center gap-2'>
                <UserIcon className='w-4' />
                <p className='text-sm text-gray-600'>
                    {user.name}
                </p>
            </div>
            <div className='*:grid *:grid-cols-5 *:gap-3 *:items-center *:my-2 *:py-2
            [&>*>span]:col-span-4 [&>*:hover]:bg-sky-400 &>*:hover]:text-white w-full
             *:transition *:rounded-md [&>*>*:nth-child(1)]:justify-self-end'>
                <Link href={"/api/auth/signout"}>
                    <ArrowRightStartOnRectangleIcon className='w-4 mr-2' />
                    <span className='col-span-4'>Sign Out</span>
                </Link>
                <Link href={"/user/create-post"}>
                    <PencilSquareIcon className="w-4 mr-2" />
                    <span className=''>Create New Post</span>
                </Link>
                <Link href={"/user/posts"}>
                    <ListBulletIcon className="w-4 mr-2" />
                    <span>Posts</span>
                </Link>
            </div>
        </PopoverContent>
    </Popover>
  )
}

export default profile