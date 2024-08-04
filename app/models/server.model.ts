export type ServerStatus = 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';

export interface ChatMessage {}

export interface Server {
  id: number;
  ip: string;
  port: number;
  primary: boolean;
  status: ServerStatus;
  onlinePlayers: number;
  lastUpdate: string;
  onlineSince: string;
  token: string;
  chatMessages: ChatMessage[];
}
