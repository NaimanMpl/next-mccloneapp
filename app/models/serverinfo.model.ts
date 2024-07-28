export type ServerStatus = 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';

export interface ServerInfo {
  id: number;
  ip: string;
  status: ServerStatus;
  onlinePlayers: number;
  messagesCount: number;
  lastUpdate: string;
}
