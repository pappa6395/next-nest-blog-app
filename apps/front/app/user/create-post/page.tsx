
import React from 'react'
import CreatePostContainer from './_components/createPostContainer'

const CreatePostPage = () => {

  return (

    <div className='bg-white shadow-md rounded-md p-6 mx-auto max-w-2xl'>
        <h2 className='text-2xl font-bold text-center text-slate-700'>
          Create a New Post
        </h2>
        <CreatePostContainer />
    </div>

  )
}

export default CreatePostPage