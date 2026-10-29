# NusaCore Admin - React (Vite + React Router)

    npm install
    npm run dev          # http://localhost:5173  (redirects to /dashboard)
    npm run build        # output in dist/
    npm run preview

Structure
- `index.html`            fonts, Font Awesome, theme pre-paint script
- `src/main.jsx`          entry (library CSS first, then styles/globals.css)
- `src/App.jsx`           all routes (lazy-loaded), page titles, shared admin layout, /login outside the layout
- `src/components/`       AdminProvider (theme, layout, toast, modals, users), AdminShell, DataGrid, invoice, library wrappers
- `src/components/views/` one file per page
- `src/lib/`              nav + dummy data (tableData, invoices, products ...). Replace with your API.

Invoices:  /invoice (list) and /invoice/:id  -> src/lib/invoices.js (getInvoices / getInvoiceById)
Data table: /data-table -> reusable <DataGrid/>

Deploy as a SPA: every URL must serve index.html (vercel.json and public/_redirects are included;
for nginx use `try_files $uri /index.html;`).

Email: /email  (src/components/views/EmailView.jsx, data: src/lib/emailData.js -> replace seedEmails() with your mail API)
Chat:  /chat   (src/components/views/ChatView.jsx,  data: src/lib/chatData.js  -> replace seedChats() + send/receive with your realtime backend)
Demo media for chat lives in public/media (demo-video.mp4, voice-sample.wav).
