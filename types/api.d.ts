export type Game = {
    date : {
        start : Date , 
    } , 
    id : string, 
    season : string , 
    
    arena : { 
        name : string , 
        city  : string , 
        state : string , 
    }, 
    status : { 
        long : string , 
    }, 
    stage : number ,
    periods : { 
        current : number, 
        total : number,
    }
    teams : { 
        visitors : { 
            id : string , 
            name: string , 
            logo : string,
            nickname : string,
        }, 
        home : { 
            id : string , 
            name: string ,
            nickname : string, 
            logo : string,
        }
    },
    scores : { 
        visitors : { 
            win : number , 
            loss : number , 
            linescore : string[],
            points : number ,

        }, 
        home : { 
            win : number , 
            loss : number , 
            linescore : string[],
            points : number
        }

    }, 
    officials : string, 


}



export type TeamStandings = {
        team : { 
            id : string , 
            name : string , 
            displayName : string ,
            shortDisplayName : string, 
            logos : { 
                href : string
            }[], 

        },
        
        stats : {
            name : string , 
            displayName : string ,
            shortDisplayName : string , 
            value : string | number, 
            displayValue?: string,
        }[]

    }

export type Standings = { 
    id : string , 
    name: string ,
    standings : { 
        season : string , 
        entries : TeamStandings[]
    }
}

export type Team =  { 
    id : string , 
    name : string , 
    logo : string ,
    nickname : string, 
    abbreviation : string ,  
    leagues : { 
        standard : { 
            conference : string,
            division : string , 
        }
    }
}

export type Statistics = { 
    games : number , 
    points : number , 
    fgp : string , 
    ftp : string , 
    totReb : number , 
    defReb : number , 
    offReb : number , 
    blocks : number , 
    turnovers : number , 
    assists : number , 
    pFouls : number , 
    steals : number 
    fta : number , 
    ftm : number , 
    fga : number ,
    fgm : number , 
    
    


}

export type PlayerStatistics = {
    player : Player , 
    team : Team , 
    game : { 
        id : string
    } ,
    points : number , 
    fgp : string , 
    ftp : string , 
    totReb : number , 
    defReb : number , 
    offReb : number , 
    blocks : number , 
    turnovers : number , 
    assists : number , 
    pFouls : number , 
    steals : number 
    fta : number , 
    ftm : number , 
    fga : number ,
    fgm : number , 
    plusMinus : string , 
    pos : string , 

}

export type Statistics = { 
    points : number , 
    fgp : string , 
    ftp : string , 
    totReb : number , 
    defReb : number , 
    offReb : number , 
    blocks : number , 
    turnovers : number , 
    assists : number , 
    pFouls : number , 
    steals : number 
    fta : number , 
    ftm : number , 
    fga : number ,
    fgm : number , 
    plusMinus : string , 
    pos : string , 
}

export type Player = { 
    id : string ,
    firstname : string , 
    lastname : string , 
    height : { 
        feets : string ,
        inches : string , 
        meters : string ,
    }, 
    college : string , 
    weight : { 
        pounds : string , 
        kilograms : string ,
    }
    leagues : { 
        pos : string
    }
}


