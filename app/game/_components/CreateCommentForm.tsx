"use client"

import React, { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateCommentPayload, CreateCommentSchema } from '@/schema/create-comment'
import { createComment } from '@/server/actions/comment'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import useSessionUser from '@/hooks/use-session-user'
import {nanoid} from "nanoid"

const CreateCommentForm = ({gameId} : {gameId : string}) => {

    const form = useForm({ 
        resolver : zodResolver(CreateCommentSchema), 
        defaultValues : { 
            text : ""
        }
    })

    const [isPending,startTransition] = useTransition()
    const queryClient = useQueryClient()
    const user = useSessionUser()
    const onSubmit = (values : CreateCommentPayload) => {
        const id = nanoid(7)
        queryClient.setQueryData(["comments",gameId],(oldData : any ) => {
            
            return { 
                pageParams : [oldData.pageParams], 
                pages : [[{id : id,text : values.text, gameId , authorId : user?.id, createdAt : Date.now() , votes : [], isPending : true  }],...oldData.pages]
            }
        })
        form.reset()
        startTransition(() => {
             
            createComment(values.text,gameId).then((data) => { 
                if (data.success) { 
                    
                    queryClient.setQueryData(["comments",gameId],(oldData : any ) => {
                            
                      
                        const formattedPages = oldData.pages.map((page : any[]) => { 

                           
                            if (page.length !== 0 && page[0].id === id) { 
                                return [{id : data.comment.id,text : values.text, gameId , authorId : user?.id, createdAt : Date.now() , votes : []  }]
                            }
                            return page
                        })
                        
                        
                        return { 
                            pageParams : [oldData.pageParams], 
                            pages : formattedPages
                        }
                    })
                    
                }
                if (data.error) { 
                    toast.error(data.error)
                    queryClient.setQueryData(["comments",gameId],(oldData : any ) => {
                        const pages = oldData?.pages.flatMap((data : any) => data) ?? []
                        pages.shift()
                        return { 
                            pageParams : [oldData.pageParams], 
                            pages,
                        }
                    })
                }
            })
        })
    }
  return (
    <Form {...form}>
        <form  onSubmit={form.handleSubmit(onSubmit)} className='flex w-full gap-2'>
            <FormField
                        control={form.control}
                        name ="text"
                        render={({field}) => (
                            <FormItem  className='w-full'>
                                <FormControl>
                              
                                    <Input {...field} placeholder='Enter comment..'/>
                                    
                             
                                    
                                </FormControl>
                            

                                <FormMessage />
                            </FormItem> 

                            
                            
                        )}
                    />
                <Button size={"icon"} disabled={!user}><Send /></Button>
            
        </form>
    
    </Form>
    
  )
}

export default CreateCommentForm
