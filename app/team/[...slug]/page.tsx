
import React from 'react'
import TeamHeader from '../_components/TeamDetails';
import { getTeam } from '@/server/actions/api';
import { redirect } from 'next/navigation';
import TeamStats from '../_components/TeamStats';
import Players from '../_components/Players';
import BackButton from '@/components/BackButton';

const TeamDetails = async ({params} : {params : Promise<{slug : string}>}) => {

    const slug = (await params).slug[0]
    
    const team = await getTeam(slug)
    
    if (!team) { 
        redirect("/")
    }
    
	
	
  return (
    <div className='flex w-full justify-center flex-col items-center gap-3 px-4'>
        <div className='absolute top-12 md:top-18 md:left-10 left-3'>
          <BackButton />
        </div>
        <TeamHeader name={team.name} logo={team.logo} division={team.leagues.standard.division} conference={team.leagues.standard.conference}/>
        <TeamStats id={team.id}/>
        <Players teamId={team.id}/>
      
    </div>
  )
}

export default TeamDetails
