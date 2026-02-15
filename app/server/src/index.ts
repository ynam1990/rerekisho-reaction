import 'dotenv/config';
import './utils/before_shutdown.js'
import cron from 'node-cron';
import { runDailyBatches } from './batches/daily.js';
import { APP_PORT } from './constants/env.const.js';
import { createApp } from './app.js';

// バッチ処理を予約
cron.schedule('0 0 * * *', async () => {
  await runDailyBatches();
}, {
  timezone: 'Asia/Tokyo',
});

const app = createApp();

app.listen(APP_PORT, () => {
  console.log(`Server has started on port ${ APP_PORT }`)
});
