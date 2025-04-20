
import { getGameStats } from '@/server/actions/api'
import React from 'react'
import GameHeader from '../_components/GameHeader'
import { redirect } from 'next/navigation'
import TeamComparison from '../_components/TeamComparison'
import Comments from '../_components/Comments'
import PlayerStatistics from '../_components/PlayerStatistics'
import BackButton from '@/components/BackButton'

const GameDetails = async ({params} : {params : Promise<{slug : string}>}) => {

    const slug = (await params).slug[0]

    const data = await getGameStats(slug)

    const status = data?.game.status.long
    
    console.log(data)
    if (!data) redirect("/")


    
  return (
    <div className='flex justify-center w-full px-5 flex-col items-center gap-5 py-5'>
      <div className='absolute top-12 md:top-18 md:left-10 left-3'>
        <BackButton />
      </div>
        
        <GameHeader teams={data.teams} game={data.game}/>
        {status === "Finished" && <TeamComparison teams={data.teams} game={data.game}/>}
        
        <PlayerStatistics gameId={slug} home={data.game.teams.home.name} visitors={data.game.teams.visitors.name} />
        <Comments id={slug}/> 
    </div>
  )
}

export default GameDetails
