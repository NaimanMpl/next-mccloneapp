'use client';
import { ServerInfoProvider } from "@/app/contexts/ServerInfoProvider";
import ServerDashboard from "./ServerDashboard";

const ServerDashboardContainer = () => {
  return (
    <ServerInfoProvider>
      <ServerDashboard />
    </ServerInfoProvider>
  )
}

export default ServerDashboardContainer;