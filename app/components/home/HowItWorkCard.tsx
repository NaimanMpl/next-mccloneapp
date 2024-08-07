import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Globe, Heart, Infinity } from 'lucide-react'
import Link from 'next/link'
import { FeatureCard, FeatureCardContainer, FeatureCardDescription, FeatureCardTitle } from './FeatureCard'

const HowItWorkCard = () => {
  return (
    <Card className='flex px-10 justify-center mobile:flex-col'>
      <div className='py-28 mobile:py-10'>
        <Card className='border-transparent border-r border-r-border rounded-none shadow-none md:px-12 mobile:border-r-transparent mobile:border-l-transparent mobile:border-t-transparent mobile:border-b mobile:border-b-border mobile:pb-10'>
          <CardHeader className='p-0'>
            <CardTitle className='text-4xl mobile:text-2xl'>Et si... Il suffisait juste d'avoir un compte.</CardTitle>
            <CardDescription className='text-lg mobile:text-base'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, reprehenderit.</CardDescription>
          </CardHeader>
          <CardFooter className='mt-52 p-0 mobile:mt-40'>
            <Link href='/play'>
              <Button className='text-base py-6'>J'ai envie d'essayer !</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      <div className='flex flex-col justify-between py-28 items-center w-1/2 px-24 md:px-12 mobile:px-0 mobile:w-full mobile:gap-8 mobile:pt-0 mobile:pb-10'>
        <FeatureCard>
          <FeatureCardContainer>
            <FeatureCardTitle>Multijoueur en ligne</FeatureCardTitle>
            <FeatureCardDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</FeatureCardDescription>
          </FeatureCardContainer>
          <Globe className='bg-[#B6D7FF] rounded-md p-3 text-black w-14 h-14 mobile:p-4 mobile:w-16' />
        </FeatureCard>
        <FeatureCard>
          <FeatureCardContainer>
            <FeatureCardTitle>Monde infini</FeatureCardTitle>
            <FeatureCardDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</FeatureCardDescription>
          </FeatureCardContainer>
          <Infinity className='bg-[#DBB6FF] rounded-md p-3 text-black w-14 h-14 mobile:p-4 mobile:w-16' />
        </FeatureCard>
        <FeatureCard>
          <FeatureCardContainer>
            <FeatureCardTitle>Écrit avec amour</FeatureCardTitle>
            <FeatureCardDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</FeatureCardDescription>
          </FeatureCardContainer>
          <Heart className='bg-[#FFC0C0] rounded-md p-3 text-black w-14 h-14 mobile:p-4 mobile:w-16' />
        </FeatureCard>
      </div>
    </Card>
  )
}

export default HowItWorkCard