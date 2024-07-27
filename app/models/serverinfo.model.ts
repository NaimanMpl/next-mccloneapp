export type ServerStatus = 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';

export interface ServerInfo {
  id: number;
  status: ServerStatus;
  ip: string;
  onlinePlayers: number;
  totalPlayers: number;
}
