

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Standings } from '@/types/api';
import FallbackImage from './FallbackImage';
import { cn, decimalToPercentage, findStat } from '@/lib/utils';
import Link from 'next/link';
import { getStandings } from '@/server/actions/api';


const ConferenceStandings = async () => {
    

    const data = await getStandings()
    
    
    
    if (!data?.response) { 
        return null
    }
	const standings = await data.response.standings as Standings[];
    const easternConference = standings[0]
    const westernConference = standings[1]
    
    
    return <div className='flex lg:flex-row flex-col gap-2 w-full items-center justify-center max-w-[1200px]'>
            <ConferenceStanding conferenceStanding={easternConference} conference='Eastern'/>
            <ConferenceStanding conferenceStanding={westernConference} conference='Western'/>
    
        </div>

}
export default ConferenceStandings

const ConferenceStanding = ({conferenceStanding,conference ,} : {conferenceStanding :Standings,conference : "Western" | "Eastern"}) => { 
    
    return <Card className='w-full'>
    <CardHeader>
        <CardTitle>
            {conference} Conference Standings
        </CardTitle>
    </CardHeader>
    <CardContent className='lg:h-[500px] lg:overflow-y-scroll px-4'>
        <div className='flex flex-col gap-2'>
            {conferenceStanding.standings.entries.map(({team,stats},index) => 
            
            <div key={team.id} className='flex items-center gap-2'>
                <div>{index + 1}.</div>
                <FallbackImage 
                    src={team.logos[0].href} 
                    alt='team logo'
                    fallbackSrc="/default-profile.png"
                    width={30}
                    height={30}

                />
                <div className='flex flex-col justify-between w-full'>
                    <Link href={`/team/${team.shortDisplayName.toLowerCase()}`} className='text-lg font-bold hover:underline'>
                        {team.name}
                    </Link>
                    <div >
                        {findStat(stats,"overall")}
                    </div>
                
                </div>
                <div className={cn(decimalToPercentage(findStat(stats,"winPercent") as number) < 50 ? "text-red-400" : "text-green-400" ,"font-bold")}>
                    {decimalToPercentage(findStat(stats,"winPercent") as number)}%
                </div>
                
            </div>)}
        </div>
       
    </CardContent>
</Card>

}
