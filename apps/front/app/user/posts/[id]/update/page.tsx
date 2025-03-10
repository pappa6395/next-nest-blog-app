import React from 'react'
import UpdatePostContainer from './_components/updatePostContainer'
import { fetchPostById } from '@/lib/actions/postActions';


type Props = {
    params: {
        id: string;
    }
}

const UpdatePostPage = async (props: Props) => {

  const params = await props.params
  const post = await fetchPostById(parseInt(params.id))
  console.log("Existing Post:", post);
  
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