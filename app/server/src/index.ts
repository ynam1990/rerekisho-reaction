import express from 'express';

const app = express();
const APP_PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello!')
});

app.listen(APP_PORT, () => {
  console.log(`Server has started on port ${ APP_PORT }`)
});
