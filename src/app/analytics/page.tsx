"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, Line, LineChart as RechartsLineChart, Pie, PieChart as RechartsPieChart, XAxis, YAxis, Tooltip as RechartsTooltip, Legend } from "recharts"

const jobTrendsData = [
  { month: 'Jan', Agriculture: 400, Teaching: 240, Healthcare: 240 },
  { month: 'Feb', Agriculture: 300, Teaching: 139, Healthcare: 221 },
  { month: 'Mar', Agriculture: 200, Teaching: 980, Healthcare: 229 },
  { month: 'Apr', Agriculture: 278, Teaching: 390, Healthcare: 200 },
  { month: 'May', Agriculture: 189, Teaching: 480, Healthcare: 218 },
  { month: 'Jun', Agriculture: 239, Teaching: 380, Healthcare: 250 },
  { month: 'Jul', Agriculture: 349, Teaching: 430, Healthcare: 210 },
];

const skillDemandData = [
  { name: 'Computer Skills', value: 400, fill: "hsl(var(--chart-1))" },
  { name: 'Farming Techniques', value: 300, fill: "hsl(var(--chart-2))" },
  { name: 'Construction', value: 200, fill: "hsl(var(--chart-3))" },
  { name: 'Healthcare Assistance', value: 278, fill: "hsl(var(--chart-4))" },
  { name: 'Teaching', value: 189, fill: "hsl(var(--chart-5))" },
];

const jobsByRegionData = [
  { region: 'Pune', jobs: 1200 },
  { region: 'Mumbai', jobs: 950 },
  { region: 'Nagpur', jobs: 700 },
  { region: 'Nashik', jobs: 550 },
  { region: 'Satara', jobs: 400 },
  { region: 'Aurangabad', jobs: 300 },
];


const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  jobs: {
    label: "Jobs",
    color: "hsl(var(--chart-1))",
  }
};

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Policy & Trends Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">Insights into the rural job market.</p>
      </header>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-6 w-6" /> Job Trends by Category
            </CardTitle>
            <CardDescription>Monthly job postings across top categories.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsLineChart data={jobTrendsData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <RechartsTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="Agriculture" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                <Line type="monotone" dataKey="Teaching" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                <Line type="monotone" dataKey="Healthcare" stroke="hsl(var(--chart-3))" strokeWidth={2} />
              </RechartsLineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-6 w-6" /> Skill Demand
            </CardTitle>
            <CardDescription>Distribution of in-demand skills.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsPieChart>
                 <RechartsTooltip content={<ChartTooltipContent nameKey="name" />} />
                <Pie data={skillDemandData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label />
              </RechartsPieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-6 w-6" /> Jobs by Region
            </CardTitle>
             <CardDescription>Job concentration across different regions.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
               <RechartsBarChart data={jobsByRegionData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="region" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis />
                  <RechartsTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="jobs" fill="hsl(var(--chart-1))" radius={4} />
               </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
