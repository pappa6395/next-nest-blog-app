"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/actions/postActions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { use, useState } from "react";

type Props = {
    params: Promise<{
        id: string;
    }>

}

const InterceptorDeletePostPage = (props: Props) => {

    const params = use(props.params);
    const postId = parseInt(params.id);
    const [showModal, setShowModal] = useState(false);
    const handleCancel = () => {
        setShowModal((prev) => !prev);
        redirect('/user/posts')
    }

    return (
        <AlertDialog open={!showModal}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete This Post!
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your post
                        and remove its data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button
                            type="button" 
                            onClick={handleCancel} 
                            variant="outline"
                        >
                            Cancel
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button 
                            onClick={() => deletePost(postId)} 
                            variant="destructive"
                            asChild
                        >
                            <Link href={'/user/posts'}>
                                Delete
                            </Link>
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default InterceptorDeletePostPage;