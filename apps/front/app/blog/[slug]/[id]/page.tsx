import { fetchPostById } from '@/lib/actions/postActions';
import Image from 'next/image';
import React from 'react'
import SanitizedContent from './_components/SanitizedContent';
import Comments from '@/app/blog/[slug]/[id]/_components/comments';
import { getSession } from '@/lib/session';
import Like from './_components/like';


type Props = {
    params: Promise<{
        id: string;
        slug: string;
    }>;
};

const PostPage = async ({params}: Props) => {

    //const { id } = await ParamsPromise
    const postId = (await params).id;
    const post = await fetchPostById(parseInt(postId));
    const session = await getSession();
    console.log("PostId:", postId);
    

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

        <Like postId={parseInt(postId)} user={session?.user} />
        {/* Post Comment Here */}
        <Comments user={session?.user} postId={post.id} />
    </main>

  )
}

export default PostPage