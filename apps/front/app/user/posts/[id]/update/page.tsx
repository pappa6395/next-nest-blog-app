import React from 'react'
import UpdatePostContainer from './_components/updatePostContainer'
import { fetchPostById } from '@/lib/actions/postActions';
//import { PageProps } from '@/.next/types/app/user/posts/[id]/update/page';

type Props ={
  params: Promise<{ id: string }>;
}

const UpdatePostPage = async ({params}: Props) => {

  const postId = (await params).id;
  const post = await fetchPostById(parseInt(postId))
  
  return (

    <div className='bg-white shadow-md rounded-md p-6 mx-auto max-w-2xl'>
        <h2 className='text-2xl font-bold text-center text-slate-700'>
          Update your Post
        </h2>
        <UpdatePostContainer post={post} />
    </div>

  )
}

export default UpdatePostPage