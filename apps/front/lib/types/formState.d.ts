
export type SignUpFormState = 

| {
    data: {
        name?: string;
        email?: string;
        password?: string;
    };
    errors: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string;
} | undefined;

export type CreateCommentFormState = {
    data?: {
        postId?: number;
        content?: string;
    };
    errors?: {
        content?: string[];
    };
    message?: string;
    ok?: boolean;
    open?: boolean;
} | undefined;


export type PostFormState = | {
    data?: {
        id?: number;
        title?: string;
        content?: string;
        thumbnail?: File | null;
        tags?: string;
        published?: string;
        previousThumbnailUrl?: string;
    },
    errors?: {
        id?: string[];
        title?: string[];
        content?: string[];
        thumbnail?: string[];
        tags?: string[];
        isPublished?: string[];
    },
    message?: string;
    ok?: boolean;
} | undefined;