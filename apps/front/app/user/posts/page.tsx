import { fetchUserPosts } from '@/lib/actions/postActions'
import { DEFAULT_PAGE_SIZE } from '@/lib/constants'
import React from 'react'
import NoPost from './_components/noposts'
import PostList from './_components/postList'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const UserPostsPage = async ({ searchParams }: Props) => {

  const { page } = await searchParams;
  const { totalPosts, posts } = await fetchUserPosts({
    page: page ? +page : 1,
    pageSize: DEFAULT_PAGE_SIZE
  })
  
  return (
    <div>
        {(!posts || !posts.length) 
        ? <NoPost /> 
        : <PostList 
          posts={posts} 
          currentPage={page ? +page : 1} 
          totalPages={Math.ceil(totalPosts / DEFAULT_PAGE_SIZE)} 
        /> }
    </div>
  )
}

export default UserPostsPage