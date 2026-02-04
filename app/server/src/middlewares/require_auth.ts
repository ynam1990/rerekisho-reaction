import type { Request, Response, NextFunction } from 'express';

export const createRequireAuthMiddleware = () => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const { userId, username } = req.session;
    const isAuthenticated = !!(userId && username);

    if (!isAuthenticated) {
      res.status(401).json({
        code: 401,
        message: "Unauthorized",
        ok: false,
      });
      return;
    }

    next();
  };
};
