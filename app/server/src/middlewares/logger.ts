import type { Request, Response, NextFunction } from 'express';
import { isDev } from '../utils/check.js';

export const createLogRequestMiddleware = () => {
  return (
    req: Request,
    _res: Response,
    next: NextFunction
  ): void => {
    if (isDev()) {
      let info = `[${ new Date().toISOString() }] ${ req.method } ${ req.url }`;
      console.log(info);
      console.log('Headers:', req.headers);
      console.log('Body:', req.body);
      console.log('Params:', req.params);
      console.log('Query:', req.query);
    }

    next();
  };
};
