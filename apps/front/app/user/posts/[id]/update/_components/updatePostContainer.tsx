"use client";

import { updatePost } from "@/lib/actions/postActions";
import { useActionState } from "react";
import { Post } from "@/lib/types/modelTypes";
import UpsertPostForm from "@/app/user/create-post/_components/upsertPostForm";

type Props = {
    post: Post;
}

const UpdatePostContainer = ({post}: Props) => {
  const [state, action] = useActionState(updatePost, {
      data: {
        id: post.id,
        title: post.title,
        content: post.content,
        previousThumbnailUrl: post.thumbnail ?? undefined,
        tags: post.tags?.map(tag => tag.name).join(','),
        published: post.published ? "on" : undefined,
      },
  });
  return <UpsertPostForm state={state} formAction={action} />;
};

export default UpdatePostContainer;