import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../node_modules/destyle.css'
import { StoreProvider } from './app/providers/StoreProvider'
import { App } from './app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>,
);
