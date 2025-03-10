import { PageProps } from "@/.next/types/app/user/posts/[id]/delete/page";
import SubmitButton from "@/components/submitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deletePost, fetchPostById } from "@/lib/actions/postActions";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { redirect } from "next/navigation";


const DeletePostPage = async ({params: paramsPromise}: PageProps) => {

  const { id } = await paramsPromise;
  const post = await fetchPostById(+id);

  const formAction = async () => {
    "use server";
    await deletePost(+id);
    redirect("/user/posts");
  };

  return (
    <Card className="mx-auto w-96 mt-36 px-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center font-thin">
          <p className="text-red-500 font-bold text-xl">Delete The Post</p>
          <ExclamationCircleIcon className="w-8 text-red-500" />
        </CardTitle>
      </CardHeader>
      <CardDescription>
        <p>
          This action cannot be undone. This will permanently delete your post
          and remove its data from our servers.
        </p>
        <hr className="m-3" />
        <p className="text-slate-400 font-bold">Title of the Post</p>
        <p>{post.title}</p>
      </CardDescription>
      <CardContent>
        <form action={formAction} className="flex justify-end gap-2">
          <Button variant={"secondary"} asChild>
            <Link href={"/user/posts"}>Cancel</Link>
          </Button>
          <SubmitButton variant={"destructive"}>Delete</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default DeletePostPage;