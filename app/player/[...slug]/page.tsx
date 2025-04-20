import { getAverageStats } from '@/lib/utils'
import { getCurrentSeason, getPlayer, getPlayerStats } from '@/server/actions/api'
import { redirect } from 'next/navigation'
import React from 'react'
import { StatsGraph } from '../_components/StatsGraph'
import BackButton from '@/components/BackButton'

const PlayerDetails = async ({params} : {params : Promise<{slug : string}>}) => {

    const slug = (await params).slug[0]

    const stats = await getPlayerStats(slug)
    const player = await getPlayer(slug)
    if (!stats || !player) { 
      redirect('/')
    }

    const averages = getAverageStats(stats)

    const averagesLast10Games = getAverageStats(stats.slice(-10))

    
    const season = await getCurrentSeason()
    
  return (
    <div className='flex justify-center flex-col items-center w-full h-[90vh] px-3'>
      <div className='absolute top-12 md:top-18 md:left-10 left-3'>
        <BackButton />
      </div>
      <div className='text-2xl font-bold'>
        {player.firstname} {player.lastname}
      </div>
      <div className='flex gap-3 text-lg text-muted-foreground'>
        <div>
          {player.height.feets}'{player.height.inches}''
        </div>
        <div>
          {player.weight.pounds}lbs
        </div>
        
      </div>

      <div className='text-lg font-bold py-3'>
        Average Stats for {season}-{season! + 1} season
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <StatDisplay name='Points' value={averages.points.toFixed(2)}/>
        <StatDisplay name='Assists' value={averages.assists.toFixed(2)}/>
        <StatDisplay name='Rebounds' value={averages.rebounds.toFixed(2)}/>
        <StatDisplay name='Blocks' value={averages.blocks.toFixed(2)}/>
        <StatDisplay name='Turnovers' value={averages.turnovers.toFixed(2)}/>
        <StatDisplay name='Steals' value={averages.steals.toFixed(2)}/>
        <StatDisplay name='Personal Fouls' value={averages.pFouls.toFixed(2)}/>
        <StatDisplay name='Free Throw %' value={averages.ftp.toFixed(2)}/>
        <StatDisplay name='Field Goal %' value={averages.fgp.toFixed(2)}/>
      </div>

      <div className='w-full flex justify-center items-center flex-col'>
        <div className='text-xl pt-4 font-bold'>Last 10 games</div>
        <StatsGraph games={stats.slice(-10)}/>

        <div className='flex justify-between w-full max-w-[500px] py-2 gap-3'>
          <StatDisplay name='Points per game' value={averagesLast10Games.points.toFixed(2)}/>
          <StatDisplay name='Assists per game' value={averagesLast10Games.assists.toFixed(2)}/>
          <StatDisplay name='Rebounds per game' value={averagesLast10Games.rebounds.toFixed(2)}/>
        </div>
      </div>
      
      
    </div>
  )
}

const StatDisplay = ({name , value} : {name : string , value : string | number}) => { 
  return <div className='flex flex-col items-center'>
      <div className='text-xl font-bold'>
          {value}
      </div>
      <div className='text-sm text-muted-foreground '>
          {name}
      </div>
  </div>
}

export default PlayerDetails
