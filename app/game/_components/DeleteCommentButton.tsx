"use client"

import { Button } from '@/components/ui/button'
import { comments } from '@/db/schema'
import { deleteComment } from '@/server/db/comments'
import { useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import React, { useTransition } from 'react'
import toast from 'react-hot-toast'

const DeleteCommentButton = ({id,gameId} : {id : number,gameId : string}) => {

    const [isPending,startTransition] = useTransition()
    const queryClient = useQueryClient()
    const handleDelete = () => {
        queryClient.setQueryData(["comments",gameId],(oldData : any) => { 
            
            const pages = [] as typeof comments.$inferSelect[][]
            oldData.pages.forEach((page : typeof comments.$inferSelect[]) => { 
                const comments = [] as any[]

                page.forEach((comment) => { 
                    if (comment.id !== id) { 
                        comments.push(comment)
                    }
                })
                pages.push(comments)
             })

            return { 
                pageParams : [oldData.pageParams],
                pages : pages,

            }
        })
        startTransition(() => { 
            deleteComment(id).then((data) => { 

               
                if (!data) { 
                    
                    toast.error("Something went wrong")
                }
            })
        })
    }
  return (
    <Button size={"icon"} variant={"ghost"} onClick={() => handleDelete()}>
      <Trash />
    </Button>
  )
}

export default DeleteCommentButton