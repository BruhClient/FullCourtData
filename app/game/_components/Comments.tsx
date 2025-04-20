"use client"


import React, { useState } from 'react'
import CreateCommentForm from './CreateCommentForm'
import { useComments } from '@/hooks/use-comments'
import { Button } from '@/components/ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getUserById } from '@/server/db/users'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronDown, ThumbsDown, ThumbsUp, User } from 'lucide-react'
import { comments, commentVotes } from '@/db/schema'
import { cn, formatTimeToNow } from '@/lib/utils'
import useSessionUser from '@/hooks/use-session-user'
import { voteComment } from '@/server/db/comments'
import {usePrevious} from "@mantine/hooks"
import toast from 'react-hot-toast'
import DeleteCommentButton from './DeleteCommentButton'
import { Skeleton } from '@/components/ui/skeleton'

const CommentVote = ({id,initialVote,currentLikeAmt,currentDislikeAmt} : {id : number,initialVote : "UP" | "DOWN" | null ,currentLikeAmt : number , currentDislikeAmt : number}) => {

  
  const [vote,setVote] = useState<"UP"| "DOWN"|null>(initialVote) 

  const [likeAmt , setLikeAmt ] =useState(currentLikeAmt)

  const [dislikeAmt , setDislikeAmt] = useState(currentDislikeAmt)


  const prevLikeAmt = usePrevious(likeAmt)
  const prevVote = usePrevious(vote)
  const prevDislikeAmt = usePrevious(dislikeAmt)
  const {mutate} = useMutation({ 
    mutationKey : ["vote",id], 
    mutationFn : async (voteType :  "UP" | "DOWN"  ) => {
      const res = await voteComment(voteType,id)
      if (res?.error) { 
        throw Error(res.error)
      }
      return res
    },

    onMutate (voteType : "UP" | "DOWN" ) {
   
    
      if (vote === voteType) { 
        if (vote === "UP") { 
          setLikeAmt((prev) => prev -1)
        } else { 
          setDislikeAmt((prev) => prev -1)
        }
        setVote(null)
      } else { 
        if (vote === null) { 
     
          if (voteType === "UP") { 
          
            setLikeAmt((prev) => prev +1)
          } else { 
            setDislikeAmt((prev) => prev +1)
          } 
        } else { 
          if (vote === "UP" && voteType === "DOWN") { 
            setLikeAmt((prev) => prev -1)
            setDislikeAmt((prev) => prev +1)
          } else { 
            setLikeAmt((prev) => prev +1)
            setDislikeAmt((prev) => prev -1)
          } 
        }
        setVote(voteType)
      }
      
    },
    onError(error) { 
      toast.error(error.message)
      setVote(prevVote ?? null)
      setLikeAmt(prevLikeAmt ?? currentLikeAmt)
      setDislikeAmt(prevDislikeAmt ?? currentDislikeAmt)
    }

    
  })
  return <div className='flex gap-2 pt-1'>
          
  <button onClick={() => mutate("UP")} className='cursor-pointer flex items-center gap-1 '>{likeAmt}<ThumbsUp className={cn(vote ==="UP" ? "fill-green-400 stroke-0" :'stroke-muted-foreground',"mb-1")} size={14}/></button>
  <button onClick={() => mutate("DOWN")} className='cursor-pointer flex items-center gap-1'>{dislikeAmt}<ThumbsDown className={cn(vote ==="DOWN" ? "fill-red-400 stroke-0" :'stroke-muted-foreground',"mb-1")} size={14}/></button>
  
</div>
}

const Comment = ({comment} : {comment : typeof comments.$inferSelect & {votes : typeof commentVotes.$inferSelect[], isPending? : boolean}}) => { 
    const {data} = useQuery({ 
      queryKey : [comment.authorId], 
      queryFn : async () => await getUserById(comment.authorId), 

      
    })

    const user = useSessionUser()

    

    

    if (!data) return null

    let likes = 0 
    let dislikes = 0 
    let vote = null
   
    comment.votes.map((commentVote) => {

      if (commentVote.vote ==="DOWN") { 
        dislikes += 1 
      }
      if (commentVote.vote === "UP") { 
        likes += 1
      }

      if (commentVote.authorId === user?.id) { 
        
        vote = commentVote.vote
      }
    })

    return <div className='flex gap-4'>
        <Avatar className='h-7 w-7'>
          <AvatarImage src={data?.image ?? ''} alt='profile' ></AvatarImage>
          <AvatarFallback><User size={18}/></AvatarFallback>
        </Avatar>
        <div className='text-sm'>
          <div className='font-bold'>
            {data.username} <span className='text-muted-foreground text-xs'>{formatTimeToNow(comment.createdAt)}</span>
          </div>
          <div >
            {comment.text}
          </div>
            {!comment.isPending && <CommentVote id={comment.id} currentLikeAmt={likes} currentDislikeAmt={dislikes} initialVote={vote}/>}
            

        </div>

        <div className='flex-1 flex justify-end'>
        {!comment.isPending && user && user.id === comment.authorId &&  <DeleteCommentButton id={comment.id} gameId={comment.gameId}/>}
        </div>

        
        
    </div>
}
const Comments = ({id} : {id : string}) => {


  const {data,fetchNextPage,hasNextPage,isFetching} = useComments(id)

  const pages = data?.pages.flatMap((data) => data) ?? []
 
  
  
  return (
    <div className='w-full max-w-[600px]'>
        

        <CreateCommentForm gameId={id} />
          
          {!hasNextPage && !isFetching && pages.length === 0 && <div className='text-center py-4 text-muted-foreground text-sm'>No comments</div>}
        
        <div className='flex flex-col py-6 gap-5'>
          {pages.map((comment) => {
            if (!comment) return null
            return <Comment comment={comment} key={comment.id}/>
              
          })}
          {isFetching && <>
            <div className='flex gap-4'>
              <Skeleton className='w-7 h-7 rounded-full'/>
              <div className='flex flex-col gap-1'>
              <Skeleton className='w-[100px] h-4'/>
          
              <Skeleton className='w-[100px] h-3'/>
            
              <Skeleton className='w-[50px] h-3'/>
                

            </div>

            <div className='flex-1 flex justify-end'>
                <Skeleton className='w-7 h-7'/>
            </div>

            
            
              </div>
              <div className='flex gap-4'>
                    <Skeleton className='w-7 h-7 rounded-full'/>
                    <div className='flex flex-col gap-1'>
                    <Skeleton className='w-[100px] h-4'/>
                
                    <Skeleton className='w-[100px] h-3'/>
                  
                    <Skeleton className='w-[50px] h-3'/>
                      

                  </div>

                  <div className='flex-1 flex justify-end'>
                      <Skeleton className='w-7 h-7'/>
                  </div>

                  
                  
              </div>
              <div className='flex gap-4'>
                    <Skeleton className='w-7 h-7 rounded-full'/>
                    <div className='flex flex-col gap-1'>
                    <Skeleton className='w-[100px] h-4'/>
                
                    <Skeleton className='w-[100px] h-3'/>
                  
                    <Skeleton className='w-[50px] h-3'/>
                      

                  </div>

                  <div className='flex-1 flex justify-end'>
                      <Skeleton className='w-7 h-7'/>
                  </div>

                  
                  
              </div>
            </>
     }
        </div>
        <div>
          {hasNextPage && <Button className='w-full' variant={"ghost"} onClick={() => fetchNextPage()}><ChevronDown />View more</Button>}
        </div>
        



       
        
      
    </div>
  )
}

export default Comments
