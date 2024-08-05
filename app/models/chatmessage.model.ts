export interface ChatMessage {
  id: number;
  author: {
    id: string;
    name: string;
    profileIconUrl: string;
  };
  message: string;
  timestamp: number;
}
