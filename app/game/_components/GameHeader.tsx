import FallbackImage from '@/components/FallbackImage'
import { getStageName } from '@/lib/utils'
import { Game, Team, Statistics } from '@/types/api'
import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'

const GameHeader = ({game,teams,} : { game : Game,teams : {team : Team, statistics : Statistics[] }[]}) => {
    const home = game.teams.home
    const visitors = game.teams.visitors

    const homeStatistics = teams[0]
    const visitorsStatistics = teams[1]
    
    
  return (

    <div className='w-full max-w-[400px] text-center'>
        {game.status.long === "In Play" && <div className='flex text-sm items-center gap-2 my-4 bg-muted w-fit px-4 py-1 rounded-lg font-bold'>
            <div className='bg-red-400 animate-pulse w-2 aspect-square rounded-full'/> Live
        </div>}
        
        <div className='flex items-end justify-between w-full'>
            <div className='flex flex-col justify-center items-center gap-1'>
                <FallbackImage src={home.logo} alt='home logo' fallbackSrc={"/default-profile.png"} width={100} height={100}/>
                <div className='text-2xl font-bold'>
                    {homeStatistics?.statistics[0].points}
                </div>
                <Link href={`/team/${home.nickname.toLowerCase()}`} className='underline-offset-4 hover:underline text-lg font-semibold'>
                    {home.name}
                </Link>
                
            </div>
            <div className='font-bold self-center text-lg'>
                VS
            </div>
            <div className='flex flex-col justify-center items-center gap-1'>
                <FallbackImage src={visitors.logo} alt='home logo' fallbackSrc={"/default-profile.png"} width={100} height={100}/>
                <div className='text-2xl font-bold'>
                    {visitorsStatistics?.statistics[0].points} 
                </div>
                <Link href={`/team/${visitors.nickname.toLowerCase()}`} className='underline-offset-4 hover:underline text-lg font-semibold'>
                    {visitors.name}
                </Link>
                
            </div>

      
        </div>

        <div className='text-center pt-3 font-bold'>{getStageName(game.stage)}</div>
        
        <div className='text-center text-sm text-muted-foreground'>{format(game.date.start,"dd-MM-yyyy")}</div>
        
    </div> 

    
  )
}

export default GameHeader
