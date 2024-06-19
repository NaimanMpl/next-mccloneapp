import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Globe, Heart, Infinity } from 'lucide-react'
import { FeatureCard, FeatureCardContainer, FeatureCardDescription, FeatureCardTitle } from './FeatureCard'

const HowItWorkCard = () => {
  return (
    <Card className='flex px-10 justify-center'>
      <div className='py-28'>
        <Card className='border-transparent border-r border-r-border rounded-none md:px-12'>
          <CardHeader className='p-0'>
            <CardTitle className='text-4xl'>Et si... Il suffisait juste d'avoir un compte.</CardTitle>
            <CardDescription className='text-lg'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, reprehenderit.</CardDescription>
          </CardHeader>
          <CardFooter className='mt-52 p-0'>
            <Button className='font-bold text-base py-6'>J'ai envie d'essayer !</Button>
          </CardFooter>
        </Card>
      </div>
      <div className='flex flex-col justify-between py-28 items-center w-1/2 px-24 md:px-12'>
        <FeatureCard>
          <FeatureCardContainer>
            <FeatureCardTitle>Multijoueur en ligne</FeatureCardTitle>
            <FeatureCardDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</FeatureCardDescription>
          </FeatureCardContainer>
          <Globe className='bg-[#B6D7FF] rounded-md p-3 text-black w-14 h-14' />
        </FeatureCard>
        <FeatureCard>
          <FeatureCardContainer>
            <FeatureCardTitle>Monde infini</FeatureCardTitle>
            <FeatureCardDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</FeatureCardDescription>
          </FeatureCardContainer>
          <Infinity className='bg-[#DBB6FF] rounded-md p-3 text-black w-14 h-14' />
        </FeatureCard>
        <FeatureCard>
          <FeatureCardContainer>
            <FeatureCardTitle>Écrit avec amour</FeatureCardTitle>
            <FeatureCardDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</FeatureCardDescription>
          </FeatureCardContainer>
          <Heart className='bg-[#FFC0C0] rounded-md p-3 text-black w-14 h-14' />
        </FeatureCard>
      </div>
    </Card>
  )
}

export default HowItWorkCard