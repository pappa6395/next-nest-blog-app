import { Post } from "@/lib/types/modelTypes";
import PostListItem from "./postListItem";
import Pagination from "@/components/pagination";

type Props = {
  posts: Post[];
  currentPage: number;
  totalPages: number;
};
const PostList = ({ posts, currentPage, totalPages }: Props) => {
  return (
    <>
      <div className="grid grid-cols-8 rounded-md shadow-md m-3 p-3 text-center">
        <div className="col-span-2"></div>
        <div></div>
        <div>Date</div>
        <div className="mr-4">Published</div>
        <div className="mr-4">Likes</div>
        <div className="mr-4">Comments</div>
        <div></div>
      </div>

      {posts.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}
      <Pagination {...{ currentPage, totalPages }} className="my-4" />
    </>
  );
};

export default PostList;