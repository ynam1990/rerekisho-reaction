import { Router } from 'express';
import { authRouter } from './auth.routes.js';

const router = Router();

router.use('/auth', authRouter);

// 何もマッチしなかった場合※正規のリクエストでは無い想定
router.use((req, res) => {
  return res.status(404).json({
    code: 404,
    message: `No api found for ${ req.path }`,
    ok: false,
  });
});

export default router;
