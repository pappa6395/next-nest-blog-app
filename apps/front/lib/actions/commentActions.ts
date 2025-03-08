"use server"

import { print } from "graphql";
import { authFetchGraphQL, fetchGraphQL } from "../fetchGraphQL";
import { CREATE_COMMENT_MUTATION, GET_POST_COMMENTS } from "../gqlQueries";
import { CommentEntity } from "../types/modelTypes";
import { CreateCommentFormState } from "../types/formState";
import { CommentFormSchema } from "../zodSchemas/commentFormSchema";

export async function getPostComments({
    postId, 
    take, 
    skip
}: {
    postId: number; 
    take: number;
    skip: number;
}) {
    
    const data = await fetchGraphQL(print(GET_POST_COMMENTS), {
        postId, 
        take, 
        skip
    });
    
    return {
        comments: data.getPostComments as CommentEntity[], 
        totalComments: data.postCommentCount as number
    }
    
}

export async function saveComment(
    state: CreateCommentFormState, 
    formData: FormData
): Promise<CreateCommentFormState> {

    const validatedFields = CommentFormSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            data: Object.fromEntries(formData.entries()),
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Validation failed",
            open: true
        }
    }

    const data = await authFetchGraphQL(print(CREATE_COMMENT_MUTATION), {
        input: {
            ...validatedFields.data,
        }
    });

    if (data) {
        return {
            message: "Comment created successfully",
            ok: true,
            open: false,
        }
    }

    return {
        data: Object.fromEntries(formData.entries()),
        message: "Failed to create comment",
        open: true,
        ok: false,
    }
}