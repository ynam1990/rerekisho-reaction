import express, { type Express } from 'express';
import routes from './routes/index.js';
import { publicDirectoryPath } from './utils/file_path.js';
import { createSessionMiddleware } from './middlewares/session.js';
import { createLogRequestMiddleware } from './middlewares/logger.js';

export const createApp = (): Express => {
  const app = express();

  // リクエストボディのパース設定
  app.use(express.json(
    { limit: '1mb' },
  ));
  // Formデータは受け取らない想定
  // app.use(express.urlencoded({ extended: true }));

  // Nginxのプロキシを信頼
  app.set('trust proxy', 1);

  // ミドルウェア設定
  app.use(createLogRequestMiddleware());
  app.use(createSessionMiddleware());

  // API用のパス
  app.use('/api', routes);

  // 静的ファイル配信
  app.use(express.static(publicDirectoryPath()));
  app.use((_req, res) => {
    res.sendFile(
      publicDirectoryPath('index.html')
    );
  });

  return app;
};
