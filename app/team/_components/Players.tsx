import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { getPlayers } from '@/server/actions/api'
import { Player } from '@/types/api'
import Link from 'next/link'
import React from 'react'

const Players = async ({teamId } : {teamId : string}) => {

    const players = await getPlayers(teamId)
    
    
    if (!players) { 
        return null
    }
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-3  w-full max-w-[1000px] py-4'>
      {players.map((player) => <PlayerCard key={player.id} player={player}/>)}
    </div>
  )
}

const PlayerCard = ({player} : {player : Player}) => { 
    return <Link href={`/player/${player.id}`}><Card className='hover:bg-muted cursor-pointer duration-150 ease-in-out transition-colors'>
        <CardContent>
            <CardTitle className='flex justify-between w-full'>
                <div>
                    {player.firstname} {player.lastname}
                </div>
                <div className='text-sm text-muted-foreground'>
                    {player.college}
                </div>
                
            </CardTitle>
            <CardDescription>
                {player.height.inches && `${player.height.feets}' ${player.height.inches}'' ( ${player.height.meters}m )`}
                {!player.height.inches && "No recorded height"}
                
            </CardDescription>

            
            
            
        </CardContent>
    </Card></Link>
}
export default Players
