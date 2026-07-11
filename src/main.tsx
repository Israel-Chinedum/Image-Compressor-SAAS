import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { UploadProvider } from '@/contexts/UploadContext';
import '@/styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UploadProvider>
          <App />
        </UploadProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
