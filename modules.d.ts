declare namespace NodeJS {
  export interface ProcessEnv {
    AUTH0_DOMAIN: string;
    AUTH0_ACCOUNTS_SERVICE_CLIENT_ID?: string;
    AUTH0_ACCOUNTS_SERVICE_CLIENT_SECRET?: string;
  }
}
