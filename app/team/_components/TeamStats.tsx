import { getTeamStats } from '@/server/actions/api'
import { Statistics } from '@/types/api'
import React from 'react'

const TeamStats = async ({id} : {id : string}) => {

    const stats = await getTeamStats(id) as Statistics

    if (!stats) { 
        return null
    }
  return (
    <div className='flex justify-between w-full max-w-[400px] gap-3'>
      <StatDisplay value={stats.games} name={"Games"}/>
      <StatDisplay value={stats.fgp} name={"Field Goal %"}/>
      <StatDisplay value={stats.ftp} name={"Free Throw %"}/>
    </div>
  )
}

export default TeamStats

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
