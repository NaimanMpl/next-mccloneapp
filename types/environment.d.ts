export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET_KEY: string,
      JWT_REFRESH_KEY: string
    }
  }
}