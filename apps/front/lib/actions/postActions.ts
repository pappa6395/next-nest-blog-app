"use server"

import { print } from "graphql"
import { authFetchGraphQL, fetchGraphQL } from "../fetchGraphQL"
import { CREATE_POST_MUTATION, GET_POST_BY_ID, GET_POSTS, GET_USER_POSTS } from "../gqlQueries"
import { Post } from "../types/modelTypes"
import { transformTakeSkip } from "../helpers"
import { PostFormState } from "../types/formState"
import { PostFormSchema } from "../zodSchemas/postFormSchema"
import { uploadThumbnail } from "../upload"

export async function fetchPosts(
    {page, pageSize}: {page?: number; pageSize?: number}
) {
    const { skip, take } = transformTakeSkip({ page, pageSize });
    const data = await fetchGraphQL(print(GET_POSTS), { skip, take });
    
    return {
        posts: data.posts as Post[], 
        totalPosts: data.postCount as number};
    
}

export async function fetchPostById (id: number) {
    const data = await fetchGraphQL(print(GET_POST_BY_ID),{id});

    return data.getPostById as Post;
}

export async function fetchUserPosts({ 
    page, 
    pageSize
}: {
    page?: number; 
    pageSize: number
}) {
    const { skip, take } = transformTakeSkip({ page, pageSize });
    const data = await authFetchGraphQL(print(GET_USER_POSTS), { take, skip });
    
    return {
        posts: data.getUserPosts as Post[], 
        totalPosts: data.userPostCount as number
    };
}

export async function saveNewPost(state: PostFormState , formData: FormData): Promise<PostFormState> {
    const validatedFields = PostFormSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validatedFields.success) return {
        data: Object.fromEntries(formData.entries()),
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Validation failed",
    };

    let thumbnailUrl = ""
    // Todo: upload Thumbnail to supabase
    if (validatedFields.data.thumbnail)
        thumbnailUrl = await uploadThumbnail(validatedFields.data.thumbnail)  // uploadThumbnail function is defined in upload.ts file

    if (!thumbnailUrl) {
        return {
            data: Object.fromEntries(formData.entries()),
            message: "Failed to upload thumbnail",
        }  // Todo: handle thumbnail upload error properly in production code. For now, just return error message.
    }
    

    // Todo: call graphQL API
    const data = await authFetchGraphQL(print(CREATE_POST_MUTATION), {
        input: {
           ...validatedFields.data,
            thumbnail: thumbnailUrl,
        }
    });

    if (data) {
        return {
            message: "Post created successfully",
            ok: true,
        }
    }

    return {
        data: Object.fromEntries(formData.entries()),
        message: "Oops, Failed to create post",
    }
}