"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"


import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"




export function BarGraph({home,visitor,chartData}: {home : string , visitor : string ,chartData : any}) {
    const chartConfig = {
        home: {
          label: home,
          color: "#68bced",
        },
        visitor: {
          label: visitor,
          color: "#ed2f42",
        },
      } satisfies ChartConfig
     
  return (
    <div className="max-w-[500px] w-full">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="quater"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent/>}
            />
            
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="home" fill="#68bced" radius={4} />
            <Bar dataKey="visitor" fill="#ed2f42" radius={4} />
          </BarChart>
        </ChartContainer>
    </div>
        
      
  )
}
