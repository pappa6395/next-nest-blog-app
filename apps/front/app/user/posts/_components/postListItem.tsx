import { formatCreatedDate } from "@/lib/helpers";
import { Post } from "@/lib/types/modelTypes";
import { CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import PostActions from "./postActions";
//import PostActions from "./postActions";
type Props = {
  post: Post;
};
const PostListItem = ({ post }: Props) => {
  return (
    <div className="grid grid-cols-12 m-2 rounded-md overflow-hidden border shadow hover:scale-[101%] transition text-center bg-white">
        <div className="relative w-48 h-32 col-span-2">
            <Image src={post.thumbnail || "/no-image.png"} alt={post.title} fill />
        </div>
        <div className="flex flex-col gap-2 col-span-3 mr-1.5">
            <p className="text-lg line-clamp-1 px-2 text-slate-700">{post.title}</p>
            <p className="text-sm line-clamp-3 px-1  text-slate-500">
            {post.content}
            </p>
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center gap-4">
            <p className="flex justify-center items-center">
                {formatCreatedDate(new Date(post.createdAt))}
            </p>
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center ml-2">
            {post.published && <CheckIcon className="w-5" />}
        </div>
        <div className="col-span-2 flex flex-col items-center justify-center">
            {post._count.likes}
        </div>
        <div className="col-span-1 flex justify-center items-center">
            {post._count.comments}
        </div>
        <div className="col-span-1 flex justify-center items-center ml-3">
            <PostActions postId={post.id} />
        </div>
    </div>
  );
};

export default PostListItem;