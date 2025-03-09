"use client"

import { getPostComments } from '@/lib/actions/commentActions';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import { useQuery } from'@tanstack/react-query';
import React, { useState } from 'react'
import CommentCard from './commentCard';
import CommentPagination from './commentPaginate';
import CommentCardSkeleton from './commentCardSkeleton';
import { SessionUser } from '@/lib/session';
import AddComment from './addComment';


type Props = {
    postId: number;
    user?: SessionUser;
}

const Comments = ({postId, user}: Props) => {

    const [page, setPage] = useState(1);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["GET_POST_COMMENTS", postId],
        queryFn: async () => await getPostComments({ 
            postId, 
            skip: (page-1) * DEFAULT_PAGE_SIZE, 
            take: DEFAULT_PAGE_SIZE 
        }),
    });

    const totalPages = Math.ceil((data?.totalComments ?? 0) / DEFAULT_PAGE_SIZE);

  return (

    <div className='p-2 rounded-md shadow-md'>
        <h6 className='text-lg text-slate-700'>Comments</h6>
        {!!user && <AddComment user={user} postId={postId} refetch={refetch} />}
        <div className='flex flex-col gap-4'>
            {isLoading ? Array.from({length: 12}).map((_,index) => 
            <CommentCardSkeleton key={index} />) 
            : data?.comments.map((comment) => (
                <React.Fragment key={comment.id}>
                    <CommentCard comment={comment} />
                </React.Fragment>
                )) 
            }
        </div>
        <CommentPagination 
            className='p-2' 
            currentPage={page} 
            setCurrentPage={(p) => setPage(p)}
            totalPages={totalPages} 
        />
    </div>

  )
}

export default Comments