import type { RequestHandler } from "express";
import session from 'express-session';
import MySQLSessionFactory from "express-mysql-session";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, SESSION_NAME, SESSION_SECRET } from "../constants/env.const.js";
import { isProd } from "../utils/check.js";

declare module "express-session" {
  interface SessionData {
    userId?: number;
    username?: string;
    sessionVersion?: number;
    clientPrefsKey?: string;
    lastActiveAt?: Date;
  }
}

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7日間
const EXPIRATION_CHECK_INTERVAL = 15 * 60 * 1000; // 15分毎
const MySQLStore = MySQLSessionFactory(session);

export const createSessionMiddleware = () : RequestHandler => {
  const sessionMiddleware: RequestHandler = session({
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProd(),
      sameSite: 'lax',
      // 7日間有効
      maxAge: COOKIE_MAX_AGE
    },
    store: new MySQLStore(
      {
        checkExpirationInterval: EXPIRATION_CHECK_INTERVAL,
        expiration: COOKIE_MAX_AGE,
        createDatabaseTable: false,
        schema: {
          tableName: 'sessions',
          columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
          },
        },
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
      },
    )
  });

  return sessionMiddleware;
};
