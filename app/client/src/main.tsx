import { createRoot } from 'react-dom/client'
import '../node_modules/destyle.css'
import { StoreProvider } from './app/providers/StoreProvider'
import { App } from './app/App';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

dayjs.locale('ja');

createRoot(document.getElementById('root')!).render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
