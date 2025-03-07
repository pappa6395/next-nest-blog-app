import { fetchPostById } from '@/lib/actions/postActions';
import Image from 'next/image';
import React from 'react'
import SanitizedContent from './_components/SanitizedContent';

type Props = {
    params: {
        id: string;
    }
}


const PostPage = async ({params}: Props) => {

    const postId = (await params).id;
    const post = await fetchPostById(+postId);

  return (
    
    <main className='container mx-auto px-4 py-8 mt-16'>
        <h1 className='text-4xl font-bold mb-4 text-slate-700'>
            {post.title}
        </h1>
        <p className='text-slate-500 text-sm mb-4'>
            By {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <div className='relative h-60 w-80'>
            <Image 
                src={post.thumbnail || '/no-image.png'}
                alt={post.title}
                fill
                className='rounded-md object-cover'
            />
        </div>
        <SanitizedContent content={post.content} className=''/>

        {/* Post Comment Here */}
    </main>

  )
}

export default PostPage