"use server"

import { db } from "@/db"
import { comments, commentVotes } from "@/db/schema"
import { auth } from "@/lib/auth"
import { and, eq } from "drizzle-orm"

export const createComment = async (text : string,gameId : string) => { 

    
    try { 
        const session = await auth()

        if (!session) { 
            return null
        }
        const comment = await db.insert(comments).values({
            text, 
            authorId : session.user.id, 
            gameId,

        }).returning()

        return comment[0]
    } catch { 
        return null
    }
}

export const getComments = async (gameId : string ,pageNum : number,take : number,) => { 

    
    try { 
        

        
        const result = await db.query.comments.findMany({
            where: (comments, { eq }) => eq(comments.gameId, gameId), 
            offset : take * pageNum, 
            limit : take,
            orderBy: (comments, { desc }) => [desc(comments.createdAt)],
            with : { 
                votes : true 
            }
    })

        if (!result) return null

        

      
        
        
      
        return result
    } catch(error) { 
        console.log("ERROR",error )
        return null
    }
}

export const voteComment = async (vote : "UP" | "DOWN" | null, commentId : number) => { 
    try { 
        const session = await auth()
        if (!session) { 
            return null
        }
        const result = await db.select().from(commentVotes).where(
            and(eq(commentVotes.authorId,session.user.id),eq(commentVotes.commentId,commentId),
        ))

        const currentVote = result[0]?.vote ?? null

        
        if (currentVote) { 
            await db.delete(commentVotes).where(eq(commentVotes.id,result[0].id))
            
        }
        
        if (vote !== null && vote !== currentVote) { 
            const comment = await db.insert(commentVotes).values({ 
                vote , 
                authorId : session.user.id, 
                commentId : commentId
            }).returning()


        }
        

        return vote
    } catch(error) { 
        return null
    }
}

export const deleteComment = async (id : number) => { 
    try { 
        const comment = await db.delete(comments).where(eq(comments.id,id)).returning()
        
        return comment[0]

    }catch(error) { 
        console.log(error)
        return null
    }
}
