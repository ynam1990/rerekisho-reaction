import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const APP_PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(
  path.join(__dirname, '../../client/dist')
));

app.all('*', (req, res) => {
  if (req.method !== 'GET') {
    return res.status(404).json({
      error: `No api found for ${ req.path }`
    });
  }
  
  res.sendFile(
    path.join(__dirname, '../../client/dist', 'index.html')
  );
});

app.listen(APP_PORT, () => {
  console.log(`Server has started on port ${ APP_PORT }`)
});
