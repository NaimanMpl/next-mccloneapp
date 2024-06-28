import DotPattern from "@/components/magicui/DotPattern";
import { Button } from "@/components/ui/button";
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
      <div className="relative overflow-x-hidden h-[80vh]">
        <Header />
        <section className="px-20 mt-40">            
          <div className="relative flex flex-col items-center justify-center">
            <div className="max-w-[55%]">
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
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <h2 className="text-4xl font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing.</h2>
            <p className="text-muted-foreground max-w-[60%] text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque omnis porro ullam ipsum reiciendis inventore blanditiis animi obcaecati id praesentium.</p>
          </div>
          <div>
            <h4 className="uppercase text-lg font-medium">Statistiques</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 mt-4">
              <Stat title="7.27M" description="Nombres de téléchargements" />
              <Stat title="200K" description="Nombres d'utilisateurs actifs" />
              <div className="space-y-4">
                <p className="uppercase">Plus de 20K <span className="underline">Reviews</span></p>
                <img src="/users-reviews.png" alt="Review d'utilisateurs" />
              </div>
            </div>
          </div>
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