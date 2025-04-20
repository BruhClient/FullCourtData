"use server"

import { auth } from "@/lib/auth"
import { createComment as createCommentDb } from "../db/comments"
export const createComment = async (text: string , gameId : string) => { 
    const session = await auth()

    if (!session){ 
        return {
            error : "Unauthorized"
        }
    }

    const comment = await createCommentDb(text,gameId)
    if (!comment){ 
        return {
            error : "Failed to create comment"
        }
    } 
    return { 
        success : "Comment created" , 
        comment : comment
    }



}

