import { z } from 'zod';

export const CommentFormSchema = z.object({
    postId: z.number(),
    content: z.string().min(5, { message: 'Content must contain at least 5 character.' }),
    
})