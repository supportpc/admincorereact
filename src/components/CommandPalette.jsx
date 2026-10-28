
import { useEffect, useRef, useState } from 'react';
import { useAdmin } from './AdminProvider';
import { commandItems } from '@/lib/nav';

export default function CommandPalette() {
  const { cmdOpen, closeCommandPalette, goTo, openUserModal } = useAdmin();
  const [q, setQ] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!cmdOpen) return;
    setQ('');
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [cmdOpen]);

  const query = q.toLowerCase();
  const rows = commandItems.filter((x) => (x.title + ' ' + x.desc).toLowerCase().includes(query));

  const run = (item) => {
    if (item.target) goTo(item.target);
    if (item.action === 'addUser') openUserModal();
    closeCommandPalette();
  };

  return (
    <div
      className={`command-backdrop${cmdOpen ? ' show' : ''}`}
      id="commandPalette"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCommandPalette();
      }}
    >
      <div className="command-modal">
        <div className="command-input">
          <i className="fa-solid fa-magnifying-glass" />
          <input
            ref={inputRef}
            id="commandSearch"
            placeholder="Cari menu, user, invoice, action..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && rows[0]) run(rows[0]);
            }}
          />
          <button onClick={closeCommandPalette}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="command-list" id="commandList">
          {rows.length === 0 && <div className="empty-state">Tidak ada hasil command.</div>}
          {rows.map((x) => (
            <div className="command-item" key={x.title} onClick={() => run(x)}>
              <div className="command-item-icon">
                <i className={`fa-solid ${x.icon}`} />
              </div>
              <div>
                <b>{x.title}</b>
                <p className="text-xs text-muted">{x.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="command-footer">
          <span>Shortcut: Ctrl + K</span>
          <span>Enter untuk pilih • Esc untuk tutup</span>
        </div>
      </div>
    </div>
  );
}
