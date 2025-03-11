"use server"

import { print } from "graphql"
import { authFetchGraphQL, fetchGraphQL } from "../fetchGraphQL"
import { CREATE_POST_MUTATION, DELETE_POST_MUTATION, GET_POST_BY_ID, GET_POSTS, GET_USER_POSTS, UPDATE_POST_MUTATION } from "../gqlQueries"
import { Post } from "../types/modelTypes"
import { transformTakeSkip } from "../helpers"
import { PostFormState } from "../types/formState"
import { PostFormSchema } from "../zodSchemas/postFormSchema"
import { uploadThumbnail } from "../upload"
import { redirect } from "next/navigation"

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
    
    const { id, ...inputs} = validatedFields.data;

    // Todo: call graphQL API
    const data = await authFetchGraphQL(print(CREATE_POST_MUTATION), {
        input: {
           ...inputs,
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

export async function updatePost(
    state: PostFormState,
    formData: FormData
): Promise<PostFormState> {
    // const formData = new FormData();
    // if (state?.data?.id) {
    //     Object.entries(state.data).forEach(([key, value]) => {
    //         if (value !== undefined) {
    //             formData.append(key, value instanceof File ? value : String(value));
    //         }
    //     });
    // }

    const validatedFields = PostFormSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) return {
        data: Object.fromEntries(formData.entries()),
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Validation failed",
    };

    //Todo: check if thumbnail has been changed
    const { thumbnail, ...inputs } = validatedFields.data;
    console.log("validatedFields:", validatedFields.data);
    
    let thumbnailUrl = "";
    if (thumbnail) {
        thumbnailUrl = await uploadThumbnail(thumbnail);
    }

    const data = await authFetchGraphQL(print(UPDATE_POST_MUTATION), {
        input: {
            ...inputs,
            thumbnail: thumbnailUrl
        },
    });
    

    if (data) {
        return {
            message: "Post updated successfully",
            ok: true,
        }
    }

    return {
        data: Object.fromEntries(formData.entries()),
        message: "Oops, Failed to update a post",
    }
}

export async function deletePost(postId: number) {
    const data = await authFetchGraphQL(print(DELETE_POST_MUTATION), {
        postId
    });
    return data.deletePost;
}