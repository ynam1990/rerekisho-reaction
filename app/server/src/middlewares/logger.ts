import type { Request, Response, NextFunction } from 'express';
import { isDev } from '../utils/check.js';

export const createLogRequestMiddleware = () => {
  return (
    req: Request,
    _res: Response,
    next: NextFunction
  ): void => {
    if (isDev()) {
      const info = `[${ new Date().toISOString() }] ${ req.method } ${ req.url }`;
      console.log(info);
      console.log('Headers:', req.headers);
      console.log('Body:', maskPasswordIfExists(req.body));
      console.log('Params:', req.params);
      console.log('Query:', req.query);
    }

    next();
  };
};

const maskPasswordIfExists = (body: any) => {
  if (body && typeof body === 'object' && 'password' in body) {
    return { ...body, password: '****' };
  }
  
  return body;
};
