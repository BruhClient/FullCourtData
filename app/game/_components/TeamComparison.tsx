
import { cn, getChartConfig } from '@/lib/utils'
import { Game, Team, Statistics } from '@/types/api'
import React from 'react'
import { BarGraph } from './BarGraph'

const TeamComparison = ({teams,game} : {game : Game,teams : {team : Team , statistics : Statistics[]}[]}) => {
    const home = teams[0]
    const visitors = teams[1]
    const chartData = getChartConfig(game.scores.home.linescore,game.scores.visitors.linescore)
    
  return (
    <div className='w-full flex justify-center flex-col items-center max-w-[400px] gap-4 '>
      <div className='text-xl font-bold flex flex-col'>
          Match Overview
          <div className='bg-primary w-1/3 h-2 self-center rounded-lg'/>
      </div>
      <BarGraph home={home.team.nickname} visitor={visitors.team.nickname} chartData={chartData}/>
      <TeamStats home={home.statistics[0]} visitors={visitors.statistics[0]}/>
      
      
    </div>
  )
}

const TeamStats = ({home,visitors} : {home : Statistics,visitors : Statistics}) => { 
  return <div className='w-full  flex flex-col gap-1'>
    <TeamStat home={home.fgp} name='Field Goal %' visitors={visitors.fgp}/>
    <TeamStat home={home.fgm} name='Field Goal Made' visitors={visitors.fgm}/>
    <TeamStat home={home.fga} name='Field Goal Attempted' visitors={visitors.fga}/>
    <TeamStat home={home.ftp} name='Free Throw %' visitors={visitors.ftp}/>
    <TeamStat home={home.ftm} name='Free Throws Made' visitors={visitors.ftm}/>
    <TeamStat home={home.fta} name='Free Throws Attempted' visitors={visitors.fta}/>
    <TeamStat home={home.blocks} name='Blocks' visitors={visitors.blocks}/>
    <TeamStat home={home.steals} name='Steals' visitors={visitors.steals}/>
    <TeamStat home={home.turnovers} name='Turnovers' visitors={visitors.turnovers} inverse/>
    <TeamStat home={home.totReb} name='Total Rebounds' visitors={visitors.totReb}/>
    <TeamStat home={home.offReb} name='Offensive Rebounds' visitors={visitors.offReb}/>
    <TeamStat home={home.defReb} name='Defensive Rebounds' visitors={visitors.defReb}/>
    <TeamStat home={home.pFouls} name='Personal Fouls' visitors={visitors.pFouls} inverse/>
  </div>
}

const determineColor =  (value1 : any ,value2 : any,inverse : boolean) => { 

  if (inverse) { 
    return (parseFloat(value1) < parseFloat(value2)) 
  }
  return (parseFloat(value1) >= parseFloat(value2)) 
    
  
}
const TeamStat = ({home,name,visitors,inverse = false} : {name : string , home : any , visitors : any,inverse? : boolean}) => {
  return <div className='flex w-full justify-between items-center text-lg'>
    <div className={cn(determineColor(home,visitors,inverse) ? "text-green-400" : "text-red-400")}>
      {home}
    </div>
    <div className='font-bold'>
      {name}
    </div>
    <div className={cn(determineColor(visitors,home,inverse) ? "text-green-400" : "text-red-400")}>
      {visitors}
    </div>
  </div>
}
export default TeamComparison
