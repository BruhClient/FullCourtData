"use server"

import { env } from "@/data/env/server";
import { getEasternDate } from "@/lib/utils";
import { Game, Player, Team, Statistics, PlayerStatistics } from "@/types/api";
import { format } from "date-fns";
import { unstable_cacheLife } from "next/cache";



export async function getTeam(team : string) { 
    "use cache"
    
    try { 
        const url = `https://api-nba-v1.p.rapidapi.com/teams?search=${team}`;
        const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': env.API_KEY,
                    'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
                }
        };
    
        
    
        
        
        
        const response = await fetch(url, options).then((data) => data.json())
       
        if (!response.response) return null
        const data = response?.response[0] as Team
    
    
        return data
    } catch { 
        return null
    }
    
}

export async function getTeamStats(id : string) { 
    "use cache"
    unstable_cacheLife("hours")

    
    try { 
        const season = await getCurrentSeason()
        const url = `https://api-nba-v1.p.rapidapi.com/teams/statistics?id=${id}&season=${season}`;
        const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': env.API_KEY,
                    'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
                }
        };
    
        
        
        
        const response = await fetch(url, options).then((data) => data.json())

        if (!response.response) return null
        
        const data = response?.response[0] as Statistics
    
    
        return data
    } catch { 
        return null
    }
    
    
}

export async function getCurrentSeason() { 
    "use cache"
    unstable_cacheLife("days")
    const url = 'https://api-nba-v1.p.rapidapi.com/seasons';
    const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': env.API_KEY,
		'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
	}
};

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (!result.response) return null
        return result.response.slice(-1).pop() as number
    } catch (error) {
        return null
    }
}


export async function getPlayers(teamId  : string) { 
    "use cache"
    unstable_cacheLife("hours")

    
    try { 
        const season = await getCurrentSeason()
        const url = `https://api-nba-v1.p.rapidapi.com/players?team=${teamId}&season=${season}`;
        const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': env.API_KEY,
                    'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
                }
        };
    
        
        
        
        const response = await fetch(url, options).then((data) => data.json())

        

        if (!response.response) return null
    
      
    
    
      
        const data = response?.response
    
    
        return data as Player[]
    } catch { 
        return null
    }
    
}

export async function getGameStats(id  : string) { 
    "use cache"
    unstable_cacheLife("minutes")
    
   
  
    try { 
        
        const url = `https://api-nba-v1.p.rapidapi.com/games/statistics?id=${id}`;
        const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': env.API_KEY,
                    'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
                }
        };
    
        
        
        
        const response = await fetch(url, options).then((data) => data.json())

        
        if (!response.response) return null
      
        const data = response?.response as {team : Team,statistics : Statistics[]}[]
        

        
        
        const gameUrl = `https://api-nba-v1.p.rapidapi.com/games?id=${id}`;

        const gameResponse = await fetch(gameUrl, options).then((data) => data.json())

   
        const gameData = gameResponse?.response[0] as Game
    
    
        return {game : gameData , teams : data} 
    } catch { 
        return null
    }
    
}

export async function getPlayerStats(id  : string) { 
    "use cache"
    unstable_cacheLife("minutes")


    try { 
        const season = await getCurrentSeason()
        const url = `https://api-nba-v1.p.rapidapi.com/players/statistics?id=${id}&season=${season}`;
        const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': env.API_KEY,
                    'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
                }
        };
    
        
        
        
        const response = await fetch(url, options).then((data) => data.json())
      
    
        if (!response.response) return null
      
        const data = response?.response as PlayerStatistics[]

       
        
        
    
    
        return data
    } catch { 
        return null
    }
    
}
export async function getPlayer(id  : string) { 
    "use cache"
    unstable_cacheLife("minutes")
    

    try { 
        
        const url = `https://api-nba-v1.p.rapidapi.com/players?id=${id}`;
        const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': env.API_KEY,
                    'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
                }
        };
    
        
        
        
        const response = await fetch(url, options).then((data) => data.json())
      
        if (!response.response) return null
    
      
        const data = response?.response[0] as Player

       
        
        
    
    
        return data
    } catch { 
        return null
    }
    
}

export async function getStandings() { 
    "use cache"
    unstable_cacheLife("hours")
    

    try { 
        
        const season = format(new Date(),"yyyy")
        
            
           
        const url = `https://nba-api-free-data.p.rapidapi.com/nba-conference-standings?year=${season}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': env.API_KEY,
                    'x-rapidapi-host': 'nba-api-free-data.p.rapidapi.com'
                }, 
                
            };
        
            
        
        const data = await fetch(url, options).then((data) => data.json() )
    
        return data
    } catch { 
        return null
    }
    
}


export async function getUpcomingGames() { 
    "use cache"
    unstable_cacheLife("minutes")
    

    try { 
        
        const url = `https://api-nba-v1.p.rapidapi.com/games?date=${getEasternDate()}`;
        const options = {
            method: 'GET',
            headers: {
            'x-rapidapi-key': env.API_KEY,
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com', 
            }, 
            
        };

        
        
        
        const data = await fetch(url, options).then((res) => res.json())

        
        
        let games = data.response.reverse() as Game[]


        const prev_url = `https://api-nba-v1.p.rapidapi.com/games?date=${getEasternDate(1)}`;
        const prev_data = await fetch(prev_url, options).then((res) => res.json())


        const prev_games = prev_data.response as Game[]
        
        games = [...games,...prev_games]
        return games
    } catch { 
        return null
    }
    
}
