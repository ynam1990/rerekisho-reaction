export const ENV_DEV = 'development';
export const ENV_PROD = 'production';
export const NODE_ENV = String(process.env.NODE_ENV ?? 'development');
export const APP_PORT = Number(process.env.APP_PORT ?? '3000');

export const DATABASE_URL = String(process.env.DATABASE_URL);
const databaseUrl = new URL(DATABASE_URL);
export const DB_HOST = databaseUrl.hostname;
export const DB_PORT = Number(databaseUrl.port);
export const DB_USER = databaseUrl.username;
export const DB_PASSWORD = databaseUrl.password;
export const DB_NAME = databaseUrl.pathname.slice(1);

export const SESSION_SECRET = String(process.env.SESSION_SECRET);
export const SESSION_NAME = process.env.SESSION_NAME ?? 'connect.sid';
