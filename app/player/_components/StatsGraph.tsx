"use client"

import { Bar, BarChart, CartesianGrid } from "recharts"


import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PlayerStatistics } from "@/types/api"




export function StatsGraph({games }: {games : PlayerStatistics[]}) {
    const chartConfig = {
        points: {
          label: "points",
          color: "#68bced",
        },
        assists: {
          label: "assists",
          color: "#ed2f42",
        },
        rebounds : { 
            label : "rebounds", 
            color : "green"
        }
      } satisfies ChartConfig
    
    const chartData = [] as {gameId : string , points : number , assists : number , rebounds : number }[]

    games.map((game) => { 
        chartData.push({gameId : game.game.id,points : game.points, assists : game.assists, rebounds : game.totReb})
    })


  return (
    <div className="max-w-[600px] w-full">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent/>}
            />
            
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="points" fill="#68bced" radius={4} />
            <Bar dataKey="assists" fill="#ed2f42" radius={4} />
            <Bar dataKey="rebounds" fill="#f5ae58" radius={4} />
          </BarChart>
        </ChartContainer>
    </div>
        
      
  )
}
