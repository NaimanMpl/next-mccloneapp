import Image from "next/image";
import Header from "./components/Header";
import ServerInfoCard from "./components/home/ServerInfoCard";
import ServerInfosContainer from "./components/home/ServerInfosContainer";
import Timer from "./components/home/Timer";
import PlayButton from "./components/PlayButton";

export default function Home() {

  const serverOpenDate = new Date(2024, 3, 3);

  return (
    <div className="h-screen bg-hero bg-cover bg-no-repeat relative">
      <Header />
      <main className="absolute center bottom-0 w-full">
        <div className="flex flex-col gap-12 items-center w-full pb-16">
          <h1 className="text-white text-6xl font-bold text-center">A Minecraft Clone made with love {"<3"}</h1>
          <ServerInfosContainer>
            <ServerInfoCard title="Etat du serveur" status="OK" label="En ligne" />
            <ServerInfoCard title="Date d'ouverture" status="OK" label="3 avril 2024" />
            <ServerInfoCard title="Joueurs" status="OK" label="0/100" />
          </ServerInfosContainer>
        </div>
        <div className="px-20 py-16 bg-gold-0 w-full h-28 flex justify-between items-center">
          <Timer initialDate={serverOpenDate} />
          <div>
            <p className="font-bold text-lg">Et oui, le serveur existe depuis tout ce temps</p>
            <p>Stylé, non?</p>
          </div>
          <PlayButton background="black" color="neutral-50" />
        </div>
      </main>
    </div>
  );
}