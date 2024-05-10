import { Button } from "@/components/ui/button";
import { ServerInfo } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Header from "./components/Header";
import ServerInfoCard from "./components/home/ServerInfoCard";
import ServerInfosContainer from "./components/home/ServerInfosContainer";
import Timer from "./components/home/Timer";
import PlayButton from "./components/PlayButton";

export default async function Home() {

  const res = await fetch('http://localhost:3000/api/server/infos', { method: 'GET' });
  const serverInfo: ServerInfo = await res.json();
  const serverOpenDate = new Date(2024, 3, 3);
  const statusDict = {
    'ONLINE' : 'En ligne',
    'OFFLINE' : 'Hors ligne',
    'MAINTENANCE' : 'En maintenance'
  }

  return (
    <div className="h-screen bg-hero bg-cover bg-no-repeat relative">
      <Header />
      <main className="absolute center bottom-0 w-full">
        <div className="flex flex-col gap-12 items-center w-full pb-32">
          <h1 className="text-white text-6xl font-bold text-center w-5/12">A Minecraft Clone made with love {"<3"}</h1>
          <ServerInfosContainer>
            <ServerInfoCard title="Etat du serveur" status={serverInfo.status} label={statusDict[serverInfo.status]} />
            <ServerInfoCard title="Date d'ouverture" status={serverInfo.status} label="3 avril 2024" />
            <ServerInfoCard title="Joueurs" status={serverInfo.status} label={`${serverInfo.onlinePlayers}/100`} />
          </ServerInfosContainer>
        </div>
        <div className="px-20 py-16 bg-background w-full h-28 flex justify-between items-center">
          <Timer initialDate={serverOpenDate} />
          <div>
            <p className="font-bold text-lg">Et oui, le serveur existe depuis tout ce temps</p>
            <p>Stylé, non?</p>
          </div>
          <Button className="px-12 py-2">
            <Link href='/play'>
              Jouer
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}