import 'dotenv/config';
import express from 'express';
import { publicDirectoryPath } from './utils/path.js';
import { APP_PORT } from './constants/env.const.js';

// 作業ディレクトリ確認
console.log(`App has initiated in ${ process.cwd() }`);

const app = express();

// Nginxのプロキシを信頼
app.set('trust proxy', 1);

app.use(express.static(
  publicDirectoryPath()
));

app.use((req, res) => {
  if (req.method !== 'GET') {
    return res.status(404).json({
      error: `No api found for ${ req.path }`
    });
  }
  
  res.sendFile(
    publicDirectoryPath('index.html')
  );
});

app.listen(APP_PORT, () => {
  console.log(`Server has started on port ${ APP_PORT }`)
});
