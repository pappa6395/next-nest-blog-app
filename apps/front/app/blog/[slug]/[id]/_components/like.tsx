"use client"

import { getPostLikeData, likesPost, unlikesPost } from '@/lib/actions/like';
import { SessionUser } from '@/lib/session';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery } from '@tanstack/react-query';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/20/solid'
import React from 'react'

type Props = {
    postId: number;
    user?: SessionUser;
}

const Like = ({postId, user}: Props) => {

    const { data, refetch: refetchPostLikeData } = useQuery({
        queryKey: ["GET_POST_LIKE_DATA", postId],
        queryFn: async () => await getPostLikeData(postId),
    })
    const likeMutation = useMutation({
        mutationFn: () => likesPost(postId),
        onSuccess: () => refetchPostLikeData()
    })
    const unlikeMutation = useMutation({
        mutationFn: () => unlikesPost(postId),
        onSuccess: () => refetchPostLikeData()
    })


  return (
    <div className="mt-3 flex items-center justify-start gap-2">
      {data?.userLikedPost ? (
        <button className='cursor-pointer' onClick={() => unlikeMutation.mutate()}>
          <SolidHeartIcon className="w-6 text-rose-600" />
        </button>
      ) : (
        <button className="cursor-pointer" onClick={() => likeMutation.mutate()}>
          <HeartIcon className="w-6" />
        </button>
      )}
      <p className="text-slate-600">{data?.postlikesCount}</p>
    </div>
  )
}

export default Like