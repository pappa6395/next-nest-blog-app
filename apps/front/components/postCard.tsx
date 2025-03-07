import { Post } from '@/lib/types/modelTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = Partial<Post>

const PostCard = (props: Props) => {

    const { id, title, slug, thumbnail, content, createdAt } = props

  return (

    <div className='bg-white shadow-md rounded-lg p-4 overflow-hidden flex flex-col'>
        <div className='relative h-60'>
            <Image 
                src={thumbnail || "/no-image.png"} 
                alt={title || "thumbnail"} 
                fill
                className='object-cover'
                
            />
        </div>
        <div className='p-6 flex-grow'>
            <h3 className='text-lg font-bold mt-4 break-words text-center'>{title}</h3>
            <p className='mt-2 text-gray-500 text-sm'>{new Date(createdAt??"").toLocaleDateString()}</p>
            <p className='mt-2 text-gray-600 break-words'>{content?.slice(0,100)}...</p>
        </div>
        <Link 
            href={`/blog/${slug}/${id}`}
            className='block text-indigo-600 hover:underline mt-2 text-right'
        >
            Read More
        </Link>
    </div>

  )
}

export default PostCard