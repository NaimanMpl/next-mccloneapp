import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "./components/Header";
import HomeImage from "./components/home/HomeImage";
import HowItWorkCard from "./components/home/HowItWorkCard";
import Stat from "./components/home/Stat";

export default async function Home() {

  return (
    <>
      <div className="relative overflow-x-hidden">
        <Header />
        <span className="absolute -right-72 top-[40%] -translate-y-1/2 text-[10vw] -z-10 text-outline">ME N THE HOMIES</span>
        <section className="px-20 mt-20">
          <h1 className="text-6xl font-semibold max-w-[50%]">A Minecraft Clone made with love {"<3"}</h1>
          <p className="text-muted-foreground font-medium py-6 max-w-[50%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cupiditate atque temporibus ipsam optio beatae quia molestiae magnam nam minima.</p>
          <div className="flex items-center gap-4">
            <Link href='/register'>
              <Button className="px-6" variant='outline'>S'inscrire</Button>
            </Link>
            <Link href='/play'>
              <Button className="px-8 py-2">Jouer</Button>
            </Link>
          </div>
          <img
            className='mt-20 w-full h-[70vh] object-cover'
            src='/hero.png'
            alt='Hero Background'
          />
        </section>
      </div>
      <section className="px-20 py-28">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <h2 className="text-4xl font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing.</h2>
            <p className="text-muted-foreground max-w-[60%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque omnis porro ullam ipsum reiciendis inventore blanditiis animi obcaecati id praesentium.</p>
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
          <p className="text-muted-foreground text-lg mt-24">L'un des aspects les plus frappants du jeu est son esthétique visuelle, ce qui rend Minecraft précieux malgré la décennie du jeu, est qu’il ne vieillit jamais. Il ne devient pas cette expérience que notre imaginaire bonifie avec le temps mais reste pour chaque joueur, un morceau de notre passé plus simple.</p>
        </div>
      </section>
    </>
  );
}