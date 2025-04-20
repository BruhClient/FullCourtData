import { getComments } from "@/server/db/comments";
import { useInfiniteQuery } from "@tanstack/react-query";

const DEFAULT_FETCH_LIMIT=5
export const useComments = (gameId : string) =>  useInfiniteQuery({ 
    queryKey : ["comments",gameId],
    queryFn : async({pageParam =0 }) => {
        const comments = await getComments(gameId,pageParam,DEFAULT_FETCH_LIMIT)

        
        
        return comments ?? []
    }, 
    getNextPageParam : (lastPage,allPages,lastPageParam) => {
       
        if (lastPage && lastPage.length < DEFAULT_FETCH_LIMIT) { 
            return undefined
        }

        
        return lastPageParam + 1
    }, 
    initialPageParam : 0, 
    
    


})