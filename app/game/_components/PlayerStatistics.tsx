import { Separator } from '@/components/ui/separator';
import { env } from '@/data/env/server';
import { Player, Statistics, Team } from '@/types/api';
import Link from 'next/link';
import React from 'react'

const PlayerStatistics = async ({gameId,home,visitors} : {gameId : string,home : string ,visitors : string}) => {
    const url = `https://api-nba-v1.p.rapidapi.com/players/statistics?game=${gameId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': env.API_KEY,
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
        }
    };

    let result = null
    try {
        const response = await fetch(url, options).then((data) => data.json());
        const data = await response.response as ({player : Player,team : Team, game : { id : number},} & Statistics)[];

        const homeStats = [] as ({player : Player,team : Team, game : { id : number},} & Statistics)[];
        const visitorsStats = [] as ({player : Player,team : Team, game : { id : number},} & Statistics)[];

        data?.forEach((stats) => { 

            if (stats.blocks === null) { 
                return null
            }
            if (stats.team.name === home) { 
                homeStats.push(stats)
            } else { 
                visitorsStats.push(stats)
            }
        })

        result = { 
            visitors: visitorsStats, 
            home : homeStats
        }
        
        
    } catch (error) {
        console.log(error)
    }

    if (!result || result.visitors.length === 0 || result.home.length === 0) { 
        return null
    }

    


  return (
    <div className='w-full flex justify-center gap-6 flex-col items-center'>
            <div className='flex flex-col justify-between max-w-[600px] gap-2 w-full h-fit '>

            <div className='text-muted-foreground'>
                Player Stats - {result.home[0].team.name}
            </div>
            <StatHeader />
            <Separator/>
            {result.home.map((stats) => { 
                return <PlayerStats key={stats.player.id} player={stats.player} stats={stats}/>
            })}

            </div>
            <div className='flex flex-col justify-between max-w-[600px] gap-2 w-full h-fit '>

                <div className='text-muted-foreground'>
                    Player Stats - {result.visitors[0].team.name}
                </div>
                <StatHeader />
                <Separator/>
                {result.visitors.map((stats) => { 
                    return <PlayerStats key={stats.player.id} player={stats.player} stats={stats}/>
                })}

            </div>
    </div>
    
  )
}

export default PlayerStatistics

const StatHeader = () => { 
    return <div className='flex text-muted-foreground'>
    <div className='flex-1'>PLAYERS</div>
    <div className='grid-cols-5 gap-3 grid max-w-[180px] w-full'>
        <div>
            PTS
        </div>
        <div>
            AST
        </div>
        <div>
            REB
        </div>
        <div>
            STL
        </div>
        <div>
            BLK
        </div>
    </div>
  </div>
}
const PlayerStats = ({player ,stats} : {player : Player , stats : Statistics}) => {
    return <><div className='flex'>
    <div className='flex-1'><Link className='hover:underline underline-offset-4 ' href={`/player/${player.id}`}>{player.firstname} {player.lastname}</Link></div>
    <div className='grid-cols-5 gap-3 grid max-w-[180px] w-full place-items-center'>
        <div>
            {stats.points}
        </div>
        <div>
        {stats.assists}
        </div>
        <div>
        {stats.totReb}
        </div>
        <div>
        {stats.steals}
        </div>
        <div>
        {stats.blocks}
        </div>
    </div>
  </div>
  <Separator />
  </>
}