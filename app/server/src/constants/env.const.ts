export const ENV_DEV = 'development';
export const ENV_PROD = 'production';
export const NODE_ENV = String(process.env.NODE_ENV ?? 'development');
export const APP_PORT = Number(process.env.APP_PORT ?? '3000');
export const OUTPUT_REQUEST_LOGS = process.env.OUTPUT_REQUEST_LOGS === 'true';

export const DATABASE_URL = String(process.env.DATABASE_URL);
const databaseUrl = new URL(DATABASE_URL);
export const DB_HOST = decodeURIComponent(databaseUrl.hostname);
export const DB_PORT = Number(decodeURIComponent(databaseUrl.port));
export const DB_USER = decodeURIComponent(databaseUrl.username);
export const DB_PASSWORD = decodeURIComponent(databaseUrl.password);
export const DB_NAME = decodeURIComponent(databaseUrl.pathname.slice(1));

export const REDIS_HOST = String(process.env.REDIS_HOST ?? '127.0.0.1');
export const REDIS_PORT = Number(process.env.REDIS_PORT ?? '6379');

export const SESSION_SECRET = String(process.env.SESSION_SECRET);
export const SESSION_NAME = process.env.SESSION_NAME ?? 'connect.sid';

export const MAX_RESUME_COUNT_PER_USER = 10;
export const MAX_FILE_SIZE_BYTES = 500 * 1024; // 500KB
export const ALLOWED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export const MAX_SIGNIN_FAIL_COUNT = 5;
export const SIGNIN_BLOCK_MINUTES = 10;
export const MAX_SIGNUP_FROM_SAME_IP_COUNT = 5;
export const SIGNUP_BLOCK_MINUTES = 10;