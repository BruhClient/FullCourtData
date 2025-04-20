

import { env } from '@/data/env/server';
import { getEasternDate, getStageName } from '@/lib/utils';
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Game } from '@/types/api';
import FallbackImage from './FallbackImage';
import { format } from 'date-fns-tz';
import { unstable_cacheLife } from 'next/cache';
import Link from 'next/link';

const TeamScore = ({team,score} : {team : Game["teams"]["home" | "visitors"],score : Game["scores"]["visitors" | "home"] }) => {
  return <div className='flex gap-3 items-center'>
      <FallbackImage
      src={team.logo}
      fallbackSrc="/default-profile.png"
      alt="Team logo"
      width={50}
      height={50}
      />
      <div className='flex flex-col'>
        <div className='text-xl font-bold'>
          {score.points}
        </div>
        
        <div className='text-sm text-wrap '>
          {team.nickname} 
        </div>
        
      </div>
  </div>
}
const GameOverview = ({game} : {game :Game}) => { 
  
  const status = game.status?.long

  
  return <Link href={`/game/${game.id}`} className='border-2 border-muted rounded-lg py-3 px-4 flex flex-col gap-3 hover:bg-muted cursor-pointer ease-in-out duration-150 transition-all '>
      <div className='flex flex-col gap-1'>
          {game.status?.long === "In Play" && <div className='flex gap-2 items-center text-sm'><div className='bg-red-400 w-2 animate-pulse aspect-square rounded-full'/>Live</div>}
          {game.status?.long !== "In Play" && <div className='text-sm font-semibold'>{game.status.long}</div>}
          <div className='font-bold flex justify-between w-full'>
            {format(game.date.start, 'dd-MM-yyyy')}
            <div className='text-sm text-muted-foreground'>
            {game.arena.name} 
          </div> 
          </div>
          <div className='text-sm'>
            {format(game.date.start, 'HH:mm')} {status === "Finished" && ( game.periods.total > 4 ? "OT" + (game.periods.total -4) : "Q4") }
          </div>
          
           
      </div>
      
      <div className='flex justify-between gap-2'>

        {
          status === "Scheduled" ? <div className='flex flex-col w-full '>
            <div className='flex  justify-between w-full items-center'>
            
            
                <FallbackImage
                src={game.teams.home.logo}
                fallbackSrc="/default-profile.png"
                alt="Team logo"
                width={70}
                height={70}
                />
                
                
           
              
              <div className='text-xl font-bold'>
                vs
              </div>

              
                <FallbackImage
                src={game.teams.visitors.logo}
                fallbackSrc="/default-profile.png"
                alt="Team logo"
                width={70}
                height={70}
                />
                
              

              
              
          </div>
          
          </div>
            : <div className='flex justify-between w-full min-h-[85px] h-full'><TeamScore team={game.teams.home} score={game.scores.home}/>
          <TeamScore team={game.teams.visitors} score={game.scores.visitors}/></div> 
        }
        
      </div>

      <div className='text-center text-muted-foreground text-sm flex-1 flex flex-col justify-end'>
        {getStageName(game.stage)}
      </div>
      
      
      
    
      
      
    </Link>
}

const UpcomingGames = async () => {
  "use cache"
  unstable_cacheLife("minutes")
  
  const url = `https://api-nba-v1.p.rapidapi.com/games?date=${getEasternDate()}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': env.API_KEY,
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com', 
    }, 
    
  };

  
  
  
  const data = await fetch(url, options).then((res) => res.json()).catch(() => null);

  
  if (!data?.response) return null 
  let games = data.response.reverse() as Game[]


  const prev_url = `https://api-nba-v1.p.rapidapi.com/games?date=${getEasternDate(1)}`;
  const prev_data = await fetch(prev_url, options).then((res) => res.json()).catch(() => null);


  const prev_games = prev_data.response as Game[]
  if (!prev_data?.response) return null 
  games = [...games,...prev_games]

  
  
  
 
  return (
    <Card className='max-w-[1200px] w-full '>
      <CardHeader>
        <CardTitle>
          Today's Games
        </CardTitle>
        <CardDescription>
        {format(new Date(), 'dd-MM-yyyy')}
        </CardDescription>
      </CardHeader>
      <CardContent className='grid md:grid-cols-3 grid-cols-1 gap-2 '>
          {
            games.map((game,index) => {
              
            return <GameOverview game={game} key={index}/>
          })
          }
      </CardContent>
    </Card>
  )
}

export default UpcomingGames


