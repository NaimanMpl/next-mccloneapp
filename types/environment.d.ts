export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET_KEY: string;
      JWT_REFRESH_KEY: string;
      AUTH_SERVER: string;
      API_ENDPOINT: string;
      NEXT_PUBLIC_WEBSOCKET_ENDPOINT: string;
    }
  }
}
