import DotPattern from "@/components/magicui/DotPattern";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Box, Heart } from "lucide-react";
import Link from "next/link";
import Header from "./components/Header";
import { GlobeDemo } from "./components/home/GlobeDemo";
import HomeImage from "./components/home/HomeImage";
import HowItWorkCard from "./components/home/HowItWorkCard";
import GradientTitle from "./components/ui/GradientTitle";

export default async function Home() {

  return (
    <>
      <div className="relative overflow-x-hidden h-[90vh] mobile:h-screen">
        <Header />
        <section className="px-20 mt-40 mobile:px-5 mobile:mt-36">          
          <div className="relative flex flex-col items-center justify-center">
            <div className="max-w-[60%] mobile:max-w-full">
              <div className="relative">
                <GradientTitle className="mobile:text-left">
                  Un clone de Minecraft fait avec amour {"<3"}
                </GradientTitle>
                <div className="absolute -top-10 -left-44 -rotate-12 flex items-center gap-2 mobile:right-0 mobile:left-0 mobile:-top-20 mobile:-rotate-6 mobile:gap-1">
                  <p className="font-playwrite font-semibold">Codé avec nos petites mains</p>
                  <img className="max-w-12" src="/curved-arrow.svg" alt="Flèche" />
                </div>
              </div>
            </div>
            <p className="text-center font-medium py-6 max-w-[50%] md:text-lg z-10 mobile:text-left mobile:max-w-full mobile:font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cupiditate atque temporibus ipsam optio beatae quia molestiae magnam nam minima.</p>
            <div className="flex items-center gap-4 mobile:flex-col mobile:w-full mobile:gap-2">
              <Link href='/register' className="w-full">
                <Button className="block px-8 z-10 mobile:w-full" variant='outline'>S'inscrire</Button>
              </Link>
              <Link href='/play' className="w-full">
                <Button className="block px-10 py-2 z-10 mobile:w-full">Jouer</Button>
              </Link>
            </div>
            <div className="flex items-center gap-8 mt-6 mobile:gap-4 mobile:mt-10">
              <img className="max-w-16 mobile:max-w-12" src="/java-logo-dark.svg" alt="Java" />
              <img className="max-w-16 mobile:max-w-12" src="/opengl-logo-dark.svg" alt="OpenGL" />
              <img className="max-w-12 mobile:max-w-8" src="/apple-logo-dark.svg" alt="MacOS" />
              <img className="max-w-12 mobile:max-w-8" src="/linux-logo-dark.svg" alt="Linux" />
              <img className="max-w-12 mobile:max-w-8" src="/windows-logo-dark.svg" alt="Windows" />
            </div>
          </div>
        </section>
      </div>
      <section className="px-20 pb-28 mobile:px-5">
        <div className="grid grid-cols-3 mt-10 gap-x-4 gap-y-4 mobile:grid-cols-1">
          <Card className="py-10 relative flex flex-col justify-center items-center">
            <CardHeader>
              <CardTitle className="relative flex flex-col items-center justify-center gap-6">
                <div className="relative w-[34rem]">
                  <GradientTitle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl mobile:text-5xl">
                    100%
                  </GradientTitle>
                  <img className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mobile:w-1/2" src="/oval-dark.svg" alt="Oval" />
                </div>
                <span className="text-4xl mt-4 mobile:text-4xl">Open Source</span>
              </CardTitle>
              <DotPattern
                className={cn(
                  "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]",
                )}
              />
            </CardHeader>
          </Card>
          <GlobeDemo />
          <Card className="relative py-10">
            <CardHeader className="flex flex-col justify-center items-center">
              <CardTitle className="text-5xl flex flex-col items-center justify-center mobile:text-4xl">
                <p>Redécouvrez</p>
                <p>Minecraft</p>
              </CardTitle>
              <DotPattern
                className={cn(
                  "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]",
                )}
              />
            </CardHeader>
          </Card>
        </div>
        <div className="grid grid-cols-2 gap-x-4 mt-4 mobile:grid-cols-1 mobile:gap-y-4">
          <Card className="relative pt-20">
            <CardHeader>
              <div className="ml-10 mt-10 absolute top-0 left-0 mb-auto border border-muted-foreground rounded-full w-14 h-14">
                <Heart className="w-full h-full p-3" />
              </div>
            </CardHeader>
            <CardFooter className="flex flex-col items-start px-10">
              <CardTitle className="text-5xl mobile:text-4xl">
                C'est chez vous...
              </CardTitle>
              <CardDescription className="text-lg mobile:text-base mobile:mt-2">
                N'oubliez pas que même si votre maison est en dirt, s'il y a un lit, une table de craft et un four c'est chez vous...
              </CardDescription>
            </CardFooter>
            <DotPattern
              className={cn(
                "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              )}
            />
          </Card>
          <Card className="relative pt-20">
            <CardHeader>
              <div className="ml-10 mt-10 absolute top-0 left-0 mb-auto border border-muted-foreground rounded-full w-14 h-14">
                <Box className="w-full h-full p-3" />
              </div>
            </CardHeader>
            <CardFooter className="flex flex-col items-start px-10">
              <CardTitle className="text-5xl mobile:text-4xl">
                Codé par Me and the hoes
              </CardTitle>
              <CardDescription className="text-lg mobile:text-base mobile:mt-2">
                Ex-fans de la version 1.7.10 de Minecraft, on a tenté de reproduire le notre ! Aujourd'hui on repense aux bons vieux blocs avec un sourire.
              </CardDescription>
            </CardFooter>
            <DotPattern
              className={cn(
                "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              )}
            />
          </Card>
        </div>
      </section>
      <section className="px-20 flex gap-4 justify-between mobile:px-5 mobile:flex-col-reverse">
        <div className="relative w-1/2 mobile:w-full">
          <h2 className="text-5xl font-semibold leading-none tracking-tight mobile:text-4xl mobile:mt-2">
            {"Un monde qu'on a construit blocs par blocs.".split(' ').map((word, index) => (
              <span className="relative inline-flex" key={index}>
                {word}
                {word.includes('blocs') && <img className="absolute -bottom-3" src="/double-underline.svg" alt="" />}
                {index !== "Un monde qu'on a construit blocs par blocs.".split(' ').length - 1 && <>&nbsp;</>}
              </span>
            ))}
          </h2>
          <div className="mt-20 mobile:mt-12">
            <h3 className="font-playwrite font-semibold text-2xl">Objectifs du projet</h3>
            <p className="text-muted-foreground text-lg mt-6 mobile:text-base">
              Nous avons souhaité
              développer un jeu qui puisse offrir une expérience de jeu agréable et immersive en respectant les codes
              de bases du jeu originel et son esthétique rudimentaire.
            </p>
          </div>
          <div className="mt-10">
            <h3 className="font-playwrite font-semibold text-2xl">Notre plus belle déclaration</h3>
            <p className="text-muted-foreground text-lg mt-6 mobile:text-base">Parce que ça nous tient à coeur.</p>
            <Card className="mt-6 max-w-[35em] mobile:w-full">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/raygunito.png" />
                    <AvatarFallback>R</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Raygunito</CardTitle>
                    <CardDescription className="font-medium">@raygunito</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  De toute façon, vous êtes déjà très loin {"<3"}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="relative max-w-[40em]">
          <img src="/zelphixmolox.png" alt="Minecraft Clone Game Image" className="rounded-xl w-full object-cover" />
          <div className="absolute bottom-0 -left-[35rem] flex items-center mobile:hidden">
            <span className="font-playwrite font-semibold mb-16 ml-10 -rotate-6 max-w-96">Photo des développeurs touchant de l'herbe.</span>
            <img className="max-w-24 -scale-x-[1] rotate-[220deg]" src="/curved-arrow.svg" alt="Curved Arrow" />
          </div>
        </div>
      </section>
      <section className="px-20 pb-28 mt-44 mobile:mt-16 mobile:px-5 mobile:pb-20">
        <h2 className="text-center text-6xl font-semibold pb-20 mobile:text-4xl mobile:pb-16">Comment ça marche ?</h2>
        <HowItWorkCard />
      </section>
      <section className="px-20 pb-28 flex gap-28 mobile:px-5 mobile:flex-col mobile:gap-10 mobile:pb-10">
        <div className="w-1/2 mobile:w-full">
          <span className="uppercase text-muted-foreground">Pourquoi un clone de Minecraft ?</span>
          <h2 className="text-6xl font-semibold mt-16 pb-36 mobile:text-4xl mobile:mt-6 mobile:pb-0">Pour revivre des souvenirs d'un passé plus simple...</h2>
          <div className="mobile:hidden">
            <HomeImage src="/home-1.png" alt="Minecraft Clone Game Image 1" />
          </div>
        </div>
        <div className="w-1/2 mobile:w-full">
          <HomeImage src="/home-2.png" alt="Minecraft Clone Game Image 2"/>
          <p className="text-muted-foreground text-lg mt-24 mobile:mt-10 mobile:text-base">L'un des aspects les plus frappants du jeu est son esthétique visuelle. Ce qui rend Minecraft précieux, malgré ses dix ans, c'est qu'il ne vieillit jamais. Il ne devient pas cette expérience que notre imaginaire embellit avec le temps, mais reste pour chaque joueur un morceau de notre passé plus simple.</p>
        </div>
      </section>
    </>
  );
}