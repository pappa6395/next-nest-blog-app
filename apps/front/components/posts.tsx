import { Post } from '@/lib/types/modelTypes'
import React from 'react'
import PostCard from './postCard';
import Pagination from './pagination';

type Props = {
    posts: Post[];
    currentPage: number;
    totalPages: number;
}

const posts = (props: Props) => {
  return (

    <section className='container m-8 max-w-5xl mx-auto'>
        <h2 className='text=5xl font-bold text-center text-gray-600 leading-tight'>
            Latest Posts
        </h2>
        <div className='h1 mx-auto bg-gradient-to-r from-sky-500 
        to-indigo-500 w-96 mb-9 rounded-t-md mt-5'></div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {props.posts.map((post, index) => (
              <PostCard key={index} {...post} />
            ))}
        </div>
        <Pagination 
          totalPages={props.totalPages} 
          currentPage={props.currentPage}
          className='mt-4 mb-4' 
        />
    </section>

  )
}

export default posts