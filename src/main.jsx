import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// third-party CSS first, so the theme overrides in globals.css win (same order as the original <link> tags)
import 'dropzone/dist/min/dropzone.min.css';
import 'quill/dist/quill.snow.css';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import './styles/globals.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
