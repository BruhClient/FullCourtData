import {z} from "zod"

export const CreateCommentSchema = z.object({ 
    text : z.string().min(1,{message : "Comment is required."}).max(100,{message : "Comment cannot exceed 100 characters."}),

})

export type CreateCommentPayload = z.infer<typeof CreateCommentSchema>