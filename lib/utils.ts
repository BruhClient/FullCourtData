import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns-tz';
import { PlayerStatistics } from "@/types/api";
import { formatDistanceToNowStrict } from "date-fns";
import {enUS} from 'date-fns/locale/en-US'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function extractFileKey(fileUrl: string): string | null {
  const match = fileUrl.match(/\/f\/([^/]+)/);
  return match ? match[1] : null;
}



export function getEasternDate(offset?: number): string {
  const timeZone = 'America/New_York';
  const originalDate = new Date(); // or any Date object
  const newDate = new Date(originalDate);
  newDate.setDate(newDate.getDate() - (offset ?? 0));

  // Format as ISO 8601 (e.g., 2025-04-16T15:24:00-04:00)
  return format(newDate, "yyyy-MM-dd", { timeZone });
}

export function findStat(stats : {
  name : string , 
  displayName : string ,
  shortDisplayName : string , 
  value : string | number, 
  displayValue?: string,
}[], stat : string) { 

  const statistic = stats.find((statistics) => statistics.name === stat)

  return statistic?.value ?? statistic?.displayValue
}

export function getStageName(stageNumber : number) {
  switch(stageNumber) {
    case 1:
      return "Pre-Season";
    case 2:
      return "Regular Season";
    case 3:
      return "Playoffs";
    case 4:
      return "Confernece Finals";
    default:
      return "NBA Finals";
  }
}
export function decimalToPercentage(decimal : number) {
  return parseFloat((decimal * 100).toFixed(2))
}
const quaters = [
  "Q1", 
  "Q2", 
  "Q3", 
  "Q4", 
  "OT1", 
  "OT2", 
  "OT3",
]
export const getChartConfig = (home_line_score : string[],visitor_line_score : string[]) => { 

  const h_linescore = home_line_score.map((ls) => parseInt(ls))
  const v_linescore = visitor_line_score.map((ls) => parseInt(ls))
  const chartData = []
  for (let i = 0 ; i < h_linescore.length ; i ++) { 
    chartData.push({quater : quaters[i] , home : h_linescore[i] , visitor : v_linescore[i] })
  }
  
  return chartData
}
export const getAverageStats = (games : PlayerStatistics[]) => { 
  const data = {
    assists : 0,
    blocks : 0, 
    steals : 0 , 
    turnovers : 0, 
    rebounds : 0, 
    pFouls : 0, 
    ftp : 0 , 
    fgp : 0, 
    points : 0, 

  }
  const totalGames = games.length


  games.map((game) => { 
    data["assists"] += game.assists
    data["blocks"] += game.blocks
    data["steals"] += game.steals
    data["turnovers"] += game.turnovers
    data["rebounds"] += game.totReb
    data["pFouls"] += game.pFouls
    data["points"] += game.points
    data["ftp"] += parseFloat(game.ftp)
    data["fgp"] += parseFloat(game.fgp)
    
    
  })


    data["assists"] /= totalGames
    data["blocks"] /= totalGames
    data["steals"] /= totalGames
    data["turnovers"] /= totalGames
    data["rebounds"] /=totalGames
    data["pFouls"] /= totalGames
    data["points"] /= totalGames
    data["ftp"] /= totalGames
    data["fgp"] /= totalGames

    return data
}


const formatDistanceLocale = {
  lessThanXSeconds: 'just now',
  xSeconds: 'just now',
  halfAMinute: 'just now',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace('{{count}}', count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      if (result === 'just now') return result
      return result + ' ago'
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...enUS,
      formatDistance,
    },
  })
}
