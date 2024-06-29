import DotPattern from "@/components/magicui/DotPattern";
import Globe from "@/components/magicui/globe";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Link from "next/link";
import Header from "./components/Header";
import HomeImage from "./components/home/HomeImage";
import HowItWorkCard from "./components/home/HowItWorkCard";
import Stat from "./components/home/Stat";
import GradientTitle from "./components/ui/GradientTitle";

export default async function Home() {

  return (
    <>
      <div className="relative overflow-x-hidden h-screen">
        <Header />
        <section className="px-20 mt-40">            
          <div className="relative flex flex-col items-center justify-center">
            <div className="max-w-[60%]">
              <div className="relative">
                <GradientTitle>
                  Un clone de Minecraft fait avec amour {"<3"}
                </GradientTitle>
                <div className="absolute -top-10 -left-44 -rotate-12 flex items-center gap-2">
                  <p className="font-playwrite font-semibold">Codé avec nos petites mains</p>
                  <img className="max-w-12" src="/curved-arrow.svg" alt="Flèche" />
                </div>
              </div>
            </div>
            <p className="text-center font-medium py-6 max-w-[50%] md:text-lg z-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cupiditate atque temporibus ipsam optio beatae quia molestiae magnam nam minima.</p>
            <div className="flex items-center gap-4">
              <Link href='/register'>
                <Button className="px-8 z-10" variant='outline'>S'inscrire</Button>
              </Link>
              <Link href='/play'>
                <Button className="px-10 py-2 z-10">Jouer</Button>
              </Link>
            </div>
            <div className="flex items-center gap-8 mt-6">
              <img className="max-w-16" src="/java-logo-dark.svg" alt="Java" />
              <img className="max-w-16" src="/opengl-logo-dark.svg" alt="OpenGL" />
              <img className="max-w-12" src="/apple-logo-dark.svg" alt="MacOS" />
              <img className="max-w-12" src="/linux-logo-dark.svg" alt="Linux" />
              <img className="max-w-12" src="/windows-logo-dark.svg" alt="Windows" />
            </div>
          </div>
        </section>
      </div>
      <section className="px-20 py-10">
        <GradientTitle className="py-2 text-6xl">
          Rejoignez la communauté !
        </GradientTitle>
        <div className="grid grid-cols-3 mt-10 gap-x-4">
          <Card className="relative flex flex-col justify-center items-center">
            <CardHeader>
              <CardTitle className="relative flex flex-col items-center justify-center gap-6">
                <div className="relative w-[34rem]">
                  <GradientTitle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl">
                    100%
                  </GradientTitle>
                  <img className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" src="/oval-dark.svg" alt="Oval" />
                </div>
                <span className="text-4xl mt-4">Open Source</span>
              </CardTitle>
              <DotPattern
                className={cn(
                  "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]",
                )}
              />
            </CardHeader>
          </Card>
          <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border border-border bg-background px-40 pb-40 pt-8 md:pb-30 md:shadow-xl">
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-r from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
              Multijoueur
            </span>
            <Globe className="top-20" />
            <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
          </div>
          <Card className="relative py-10">
            <CardHeader>
              <CardTitle className="text-4xl flex items-center justify-center">Lorem ipsum</CardTitle>
              <CardDescription className="text-lg text-center">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, eligendi?
              </CardDescription>
              <DotPattern
                className={cn(
                  "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]",
                )}
              />
            </CardHeader>
          </Card>
        </div>
      </section>
      <section className="px-20 pb-28">
        <h2 className="text-center text-6xl font-semibold pb-20">Comment ça marche ?</h2>
        <HowItWorkCard />
      </section>
      <section className="px-20 pb-28 flex gap-28">
        <div className="w-1/2">
          <span className="uppercase text-muted-foreground">Pourquoi un clone de Minecraft ?</span>
          <h2 className="text-6xl font-semibold mt-16 pb-36">Pour revivre des souvenirs d'un passé plus simple...</h2>
          <HomeImage src="/home-1.png" alt="Minecraft Clone Game Image 1" />
        </div>
        <div className="w-1/2">
          <HomeImage src="/home-2.png" alt="Minecraft Clone Game Image 2"/>
          <p className="text-muted-foreground text-lg mt-24">L'un des aspects les plus frappants du jeu est son esthétique visuelle. Ce qui rend Minecraft précieux, malgré ses dix ans, c'est qu'il ne vieillit jamais. Il ne devient pas cette expérience que notre imaginaire embellit avec le temps, mais reste pour chaque joueur un morceau de notre passé plus simple.</p>
        </div>
      </section>
    </>
  );
}