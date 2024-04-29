import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="h-screen bg-hero bg-cover bg-no-repeat">
      <Header />
      <main className="pt-64">
        <h1 className="text-white text-6xl font-bold text-center">A Minecraft Clone made with love {"<3"}</h1>
      </main>
    </div>
  );
}