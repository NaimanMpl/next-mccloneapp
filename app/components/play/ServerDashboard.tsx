'use client';
import { useGetServerQuery } from '@/app/api/slice';
import { useServerInfo } from '@/app/contexts/ServerInfoProvider';
import { ServerInfo } from '@/app/models/serverinfo.model';
import { getServerInfo } from '@/app/services/serverservice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { error } from 'console';
import { Activity, Circle, Eye, Globe, MessageCircle, PartyPopper, Users } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

const chartData = [
  { date: "2024-04-01", windows: 222, macos: 150, linux: 100 },
  { date: "2024-04-02", windows: 97, macos: 180, linux: 120 },
  { date: "2024-04-03", windows: 167, macos: 120, linux: 90 },
  { date: "2024-04-04", windows: 242, macos: 260, linux: 200 },
  { date: "2024-04-05", windows: 373, macos: 290, linux: 250 },
  { date: "2024-04-06", windows: 301, macos: 340, linux: 280 },
  { date: "2024-04-07", windows: 245, macos: 180, linux: 150 },
  { date: "2024-04-08", windows: 409, macos: 320, linux: 290 },
  { date: "2024-04-09", windows: 59, macos: 110, linux: 70 },
  { date: "2024-04-10", windows: 261, macos: 190, linux: 160 },
  { date: "2024-04-11", windows: 327, macos: 350, linux: 300 },
  { date: "2024-04-12", windows: 292, macos: 210, linux: 190 },
  { date: "2024-04-13", windows: 342, macos: 380, linux: 320 },
  { date: "2024-04-14", windows: 137, macos: 220, linux: 160 },
  { date: "2024-04-15", windows: 120, macos: 170, linux: 130 },
  { date: "2024-04-16", windows: 138, macos: 190, linux: 140 },
  { date: "2024-04-17", windows: 446, macos: 360, linux: 310 },
  { date: "2024-04-18", windows: 364, macos: 410, linux: 350 },
  { date: "2024-04-19", windows: 243, macos: 180, linux: 160 },
  { date: "2024-04-20", windows: 89, macos: 150, linux: 110 },
  { date: "2024-04-21", windows: 137, macos: 200, linux: 150 },
  { date: "2024-04-22", windows: 224, macos: 170, linux: 180 },
  { date: "2024-04-23", windows: 138, macos: 230, linux: 190 },
  { date: "2024-04-24", windows: 387, macos: 290, linux: 250 },
  { date: "2024-04-25", windows: 215, macos: 250, linux: 220 },
  { date: "2024-04-26", windows: 75, macos: 130, linux: 90 },
  { date: "2024-04-27", windows: 383, macos: 420, linux: 370 },
  { date: "2024-04-28", windows: 122, macos: 180, linux: 140 },
  { date: "2024-04-29", windows: 315, macos: 240, linux: 210 },
  { date: "2024-04-30", windows: 454, macos: 380, linux: 330 },
  { date: "2024-05-01", windows: 165, macos: 220, linux: 180 },
  { date: "2024-05-02", windows: 293, macos: 310, linux: 270 },
  { date: "2024-05-03", windows: 247, macos: 190, linux: 210 },
  { date: "2024-05-04", windows: 385, macos: 420, linux: 380 },
  { date: "2024-05-05", windows: 481, macos: 390, linux: 420 },
  { date: "2024-05-06", windows: 498, macos: 520, linux: 450 },
  { date: "2024-05-07", windows: 388, macos: 300, linux: 350 },
  { date: "2024-05-08", windows: 149, macos: 210, linux: 160 },
  { date: "2024-05-09", windows: 227, macos: 180, linux: 190 },
  { date: "2024-05-10", windows: 293, macos: 330, linux: 280 },
  { date: "2024-05-11", windows: 335, macos: 270, linux: 300 },
  { date: "2024-05-12", windows: 197, macos: 240, linux: 210 },
  { date: "2024-05-13", windows: 197, macos: 160, linux: 180 },
  { date: "2024-05-14", windows: 448, macos: 490, linux: 420 },
  { date: "2024-05-15", windows: 473, macos: 380, linux: 410 },
  { date: "2024-05-16", windows: 338, macos: 400, linux: 360 },
  { date: "2024-05-17", windows: 499, macos: 420, linux: 470 },
  { date: "2024-05-18", windows: 315, macos: 350, linux: 310 },
  { date: "2024-05-19", windows: 235, macos: 180, linux: 210 },
  { date: "2024-05-20", windows: 177, macos: 230, linux: 190 },
  { date: "2024-05-21", windows: 82, macos: 140, linux: 100 },
  { date: "2024-05-22", windows: 81, macos: 120, linux: 90 },
  { date: "2024-05-23", windows: 252, macos: 290, linux: 240 },
  { date: "2024-05-24", windows: 294, macos: 220, linux: 200 },
  { date: "2024-05-25", windows: 201, macos: 250, linux: 210 },
  { date: "2024-05-26", windows: 213, macos: 170, linux: 190 },
  { date: "2024-05-27", windows: 420, macos: 460, linux: 410 },
  { date: "2024-05-28", windows: 233, macos: 190, linux: 200 },
  { date: "2024-05-29", windows: 78, macos: 130, linux: 90 },
  { date: "2024-05-30", windows: 340, macos: 280, linux: 260 },
  { date: "2024-05-31", windows: 178, macos: 230, linux: 190 },
  { date: "2024-06-01", windows: 178, macos: 200, linux: 180 },
  { date: "2024-06-02", windows: 470, macos: 410, linux: 390 },
]

const chartConfig = {
  visitors: {
    label: "Visiteurs",
  },
  windows: {
    label: "Windows",
    color: "hsl(var(--chart-3))",
  },
  macos: {
    label: "MacOS",
    color: "hsl(var(--chart-4))",
  },
  linux: {
    label: "Linux",
    color: "hsl(var(--chart-2))"
  }
} satisfies ChartConfig;


const ServerDashboard = () => {

  const { data: session } = useSession();
  const [ timeRange, setTimeRange ] = useState('90d');
  const { serverInfo, loading } = useServerInfo();

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    now.setDate(now.getDate() - daysToSubtract)
    return date >= now
  });

  return (
    <>
      {(!session || loading) &&
      <>
        <Card className='mt-6 h-[70vh]'>
          <CardHeader>
            <Skeleton className='w-96 h-5' />
            <Skeleton className='w-[30rem] h-4' />
          </CardHeader>
          <CardContent>
            <Skeleton className='w-32 h-5'/>
            <div className='grid grid-cols-4 gap-4 mt-4'>
              {Array.from({ length: 4 }).map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className='w-40 h-3'/>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className='w-10 h-4'/>
                    <Skeleton className='w-72 h-4 mt-2'/>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Skeleton className='w-60 h-5 mt-10'/>
            <Skeleton className='w-96 h-4 mt-2'/>
          </CardContent>
        </Card>
      </>
      }
      {session &&
        <Card className='mt-6 border-transparent'>
          <>
            <CardContent>
              <div className='grid grid-cols-4 gap-4 mt-4'>
                {
                  serverInfo &&
                  <>
                    <Card>
                      <CardHeader className='flex flex-row justify-between space-y-0 items-center pb-2'>
                        <CardTitle className='text-sm font-medium'>État du serveur</CardTitle>
                        <Activity className='w-4 h-4' />
                      </CardHeader>
                      <CardContent>
                        <div className='flex items-center gap-2'>
                          <div className='text-xl font-bold'>{serverInfo.status}</div>
                          <Circle fill='green' className='w-2 h-2 text-transparent' />
                        </div>
                        <p className='text-xs text-muted-foreground'>Lorem ipsum dolor sit amet.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className='flex flex-row justify-between space-y-0 items-center pb-2'>
                        <CardTitle className='text-sm font-medium'>Joueurs en ligne</CardTitle>
                        <Globe className='w-4 h-4' />
                      </CardHeader>
                      <CardContent>
                        <div className='text-2xl font-bold'>{serverInfo?.onlinePlayers}</div>
                        <p className='text-xs text-muted-foreground'>+20.1% par rapport au mois dernier</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className='flex flex-row justify-between space-y-0 items-center pb-2'>
                        <CardTitle className='text-sm font-medium'>IP</CardTitle>
                        <Eye className='w-4 h-4' />
                      </CardHeader>
                      <CardContent>
                        <div className='text-2xl font-bold'>{serverInfo?.ip}</div>
                        <p className='text-xs text-muted-foreground'>+20.1% par rapport au mois dernier</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className='flex flex-row justify-between space-y-0 items-center pb-2'>
                        <CardTitle className='text-sm font-medium'>Messages dans le chat</CardTitle>
                        <MessageCircle className='w-4 h-4' />
                      </CardHeader>
                      <CardContent>
                        <div className='text-2xl font-bold'>0</div>
                        <p className='text-xs text-muted-foreground'>+0.0% par rapport au mois dernier</p>
                      </CardContent>
                    </Card>
                  </>
                }
              </div>
              <div className='mt-4'>
                <Card className='border-transparent shadow-none'>
                  <CardHeader className='px-0 flex flex-row items-center justify-between gap-2 space-y-0 py-5'>
                    <div className='flex-1 gap-1'>
                      <CardTitle>Nombres de joueurs total</CardTitle>
                      <CardDescription>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur, ad!</CardDescription>
                    </div>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger
                        className='w-[160px] rounded-lg'
                        aria-label='Sélectionner une valeur'
                      >
                        <SelectValue placeholder='3 derniers mois' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='90d' className='rounded-lg'>
                          3 derniers mois
                        </SelectItem>
                        <SelectItem value='30d' className='rounded-lg'>
                          30 derniers jours
                        </SelectItem>
                        <SelectItem value='7d' className='rounded-lg'>
                          Cette semaine
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </CardHeader>
                  <CardContent className='p-0'>
                    <ChartContainer
                      config={chartConfig}
                      className='aspect-auto h-[250px] w-full'
                    >
                      <AreaChart data={filteredData}>
                        <defs>
                          <linearGradient id="fillMacOS" x1="0" y1="0" x2="0" y2="1">
                            <stop 
                              offset='5%'
                              stopColor='var(--color-desktop)'
                              stopOpacity={0.8}
                            />
                            <stop 
                              offset='95%'
                              stopColor='var(--color-desktop)'
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                          <linearGradient id="fillWindows" x1="0" y1="0" x2="0" y2="1">
                            <stop 
                              offset='5%'
                              stopColor='var(--color-desktop)'
                              stopOpacity={0.8}
                            />
                            <stop 
                              offset='95%'
                              stopColor='var(--color-desktop)'
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                          <linearGradient id="fillLinux" x1="0" y1="0" x2="0" y2="1">
                            <stop 
                              offset='5%'
                              stopColor='var(--color-desktop)'
                              stopOpacity={0.8}
                            />
                            <stop 
                              offset='95%'
                              stopColor='var(--color-desktop)'
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis 
                          dataKey='date'
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          minTickGap={32}
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString('fr-FR', {
                              month: 'short',
                              day: 'numeric'
                            });
                          }}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={
                            <ChartTooltipContent 
                              labelFormatter={(value) => {
                                return new Date(value).toLocaleDateString('fr-FR', {
                                  month: 'short',
                                  day: 'numeric'
                                })
                              }}
                              indicator='dot'
                            />
                          }
                        />
                        <Area 
                          dataKey='macos'
                          type='natural'
                          fill='url(#fillMacOS)'
                          stroke='var(--color-macos)'
                          stackId='a'
                        />
                        <Area 
                          dataKey='linux'
                          type='natural'
                          fill='url(#fillLinux)'
                          stroke='var(--color-linux)'
                          stackId='a'
                        />
                        <Area 
                          dataKey='windows'
                          type='natural'
                          fill='url(#fillWindows)'
                          stroke='var(--color-windows)'
                          stackId='a'
                        />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </>
        </Card>
      }
    </>
  )
}

export default ServerDashboard;