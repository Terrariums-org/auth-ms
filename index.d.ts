declare namespace NodeJS {
  interface ProcessEnv {
    HOST: string;
    PORT: number;
    USERDB: string;
    PASSWORD: string;
    DATABASE: string;
    JWT_SECRET: string;
    BCRYPT_JUMPS: number;
    BROKER_HOST: string;
  }
}

declare namespace Express {
  interface Request {
    idUser: number;
    username: string;
  }
}
