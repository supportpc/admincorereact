import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAdmin } from '@/components/AdminProvider';
import {
  ME,
  FOLDERS,
  LABELS,
  CONTACTS,
  seedEmails,
  sanitize,
  stripHtml,
  fmtShort,
  fmtFull,
  fmtSize,
  initials,
  colorFor,
  fileIcon,
} from '@/lib/emailData';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Avatar = ({ name, size = 36 }) => (
  <div className="em-avatar" style={{ width: size, height: size, background: colorFor(name), fontSize: size * 0.38 }}>
    {initials(name)}
  </div>
);

/* ------------------------------------------------------------------ */
/* Recipient chips input                                              */
/* ------------------------------------------------------------------ */
function RecipientInput({ label, values, onChange, id }) {
  const [text, setText] = useState('');
  const commit = (raw) => {
    const parts = raw
      .split(/[,;\s]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length) onChange([...values, ...parts.filter((p) => !values.includes(p))]);
    setText('');
  };
  return (
    <div className="em-field">
      <label>{label}</label>
      <div className="em-chips">
        {values.map((v) => (
          <span key={v} className={`em-chip${EMAIL_RE.test(v) ? '' : ' bad'}`}>
            {v}
            <button type="button" onClick={() => onChange(values.filter((x) => x !== v))}>
              <i className="fa-solid fa-xmark" />
            </button>
          </span>
        ))}
        <input
          list={id}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => text && commit(text)}
          onKeyDown={(e) => {
            if (['Enter', ',', ';', 'Tab'].includes(e.key) && text.trim()) {
              e.preventDefault();
              commit(text);
            } else if (e.key === 'Backspace' && !text && values.length) onChange(values.slice(0, -1));
          }}
          placeholder={values.length ? '' : 'nama@email.com'}
        />
        <datalist id={id}>
          {CONTACTS.map((c) => (
            <option key={c.email} value={c.email}>
              {c.name}
            </option>
          ))}
        </datalist>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Compose window (docked bottom-right, like Gmail)                    */
/* ------------------------------------------------------------------ */
function ComposeWindow({ init, onSend, onSaveDraft, onDiscard, showToast }) {
  const [to, setTo] = useState(init.to || []);
  const [cc, setCc] = useState(init.cc || []);
  const [bcc, setBcc] = useState(init.bcc || []);
  const [showCc, setShowCc] = useState((init.cc || []).length > 0);
  const [subject, setSubject] = useState(init.subject || '');
  const [files, setFiles] = useState(init.attachments || []);
  const [mode, setMode] = useState('normal'); // normal | min | max
  const editor = useRef(null);
  const fileInput = useRef(null);

  useEffect(() => {
    if (editor.current) editor.current.innerHTML = init.html || '';
    if (!init.to?.length) document.getElementById('em-to-input')?.querySelector('input')?.focus();
    else editor.current?.focus();
  }, [init]);

  const read = () => ({ to, cc, bcc, subject, html: editor.current?.innerHTML || '', attachments: files });
  const empty = () => !to.length && !subject && !stripHtml(editor.current?.innerHTML || '') && !files.length;

  const send = () => {
    const data = read();
    const all = [...data.to, ...data.cc, ...data.bcc];
    if (!data.to.length) return showToast('Tambahkan minimal satu penerima');
    const bad = all.find((e) => !EMAIL_RE.test(e));
    if (bad) return showToast(`Alamat email tidak valid: ${bad}`);
    if (!data.subject.trim() && !window.confirm('Kirim tanpa subjek?')) return;
    onSend(data, init);
  };

  const close = () => (empty() ? onDiscard(init) : onSaveDraft(read(), init));
  const fmt = (cmd, val) => {
    editor.current?.focus();
    document.execCommand(cmd, false, val);
  };
  const tb = (icon, cmd, title, val) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        fmt(cmd, val);
      }}
    >
      <i className={`fa-solid ${icon}`} />
    </button>
  );

  const pick = (e) => {
    const added = [...e.target.files].map((f) => ({ name: f.name, size: f.size }));
    setFiles((l) => [...l, ...added]);
    e.target.value = '';
  };

  return (
    <div className={`em-compose ${mode}`}>
      <div className="em-compose-head" onClick={() => mode === 'min' && setMode('normal')}>
        <b>{init.title || 'Pesan Baru'}</b>
        <div>
          <button
            title="Minimalkan"
            onClick={(e) => {
              e.stopPropagation();
              setMode(mode === 'min' ? 'normal' : 'min');
            }}
          >
            <i className="fa-solid fa-minus" />
          </button>
          <button
            title="Perbesar"
            onClick={(e) => {
              e.stopPropagation();
              setMode(mode === 'max' ? 'normal' : 'max');
            }}
          >
            <i className={`fa-solid ${mode === 'max' ? 'fa-compress' : 'fa-expand'}`} />
          </button>
          <button
            title="Simpan & tutup"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      </div>
      {mode !== 'min' && (
        <>
          <div className="em-compose-body">
            <div id="em-to-input" className="em-to-row">
              <RecipientInput id="dl-to" label="Kepada" values={to} onChange={setTo} />
              {!showCc && (
                <button type="button" className="em-link" onClick={() => setShowCc(true)}>
                  Cc/Bcc
                </button>
              )}
            </div>
            {showCc && (
              <>
                <RecipientInput id="dl-cc" label="Cc" values={cc} onChange={setCc} />
                <RecipientInput id="dl-bcc" label="Bcc" values={bcc} onChange={setBcc} />
              </>
            )}
            <div className="em-field">
              <label>Subjek</label>
              <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subjek" />
            </div>
            <div className="em-editor" ref={editor} contentEditable suppressContentEditableWarning data-placeholder="Tulis pesan..." />
            {files.length > 0 && (
              <div className="em-attach-list">
                {files.map((f, i) => (
                  <span className="em-attach" key={f.name + i}>
                    <i className={`fa-solid ${fileIcon(f.name)}`} /> {f.name} <small>{fmtSize(f.size)}</small>
                    <button onClick={() => setFiles((l) => l.filter((_, j) => j !== i))}>
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="em-compose-foot">
            <button className="btn btn-primary" onClick={send}>
              <i className="fa-solid fa-paper-plane" /> Kirim
            </button>
            <div className="em-tools">
              {tb('fa-bold', 'bold', 'Tebal')}
              {tb('fa-italic', 'italic', 'Miring')}
              {tb('fa-underline', 'underline', 'Garis bawah')}
              {tb('fa-list-ul', 'insertUnorderedList', 'Daftar')}
              {tb('fa-list-ol', 'insertOrderedList', 'Daftar angka')}
              <button
                type="button"
                title="Tautan"
                onMouseDown={(e) => {
                  e.preventDefault();
                  const u = window.prompt('URL tautan');
                  if (u) fmt('createLink', u);
                }}
              >
                <i className="fa-solid fa-link" />
              </button>
              <button type="button" title="Lampirkan file" onClick={() => fileInput.current?.click()}>
                <i className="fa-solid fa-paperclip" />
              </button>
              <input ref={fileInput} type="file" multiple hidden onChange={pick} />
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <button
                className="em-icon"
                title="Simpan draft"
                onClick={() => {
                  onSaveDraft(read(), init, true);
                }}
              >
                <i className="fa-regular fa-floppy-disk" />
              </button>
              <button className="em-icon" title="Buang" onClick={() => onDiscard(init)}>
                <i className="fa-solid fa-trash" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */
export default function EmailView() {
  const { showToast } = useAdmin();
  const [now, setNow] = useState(null);
  const [threads, setThreads] = useState(null);
  const [folder, setFolder] = useState('inbox');
  const [label, setLabel] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(() => new Set());
  const [openId, setOpenId] = useState(null);
  const [collapsed, setCollapsed] = useState({}); // messageId -> bool (true = collapsed)
  const [compose, setCompose] = useState(null);
  const timers = useRef([]);
  const seq = useRef(100);

  useEffect(() => {
    const n = new Date();
    setNow(n);
    setThreads(seedEmails(n));
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const uid = (p) => `${p}${++seq.current}`;
  const last = (t) => t.messages[t.messages.length - 1];

  const list = useMemo(() => {
    if (!threads) return [];
    const q = search.trim().toLowerCase();
    return threads
      .filter((t) => {
        const inF =
          folder === 'inbox'
            ? t.folder === 'inbox'
            : folder === 'starred'
              ? t.starred && !['trash', 'spam'].includes(t.folder)
              : folder === 'sent'
                ? !['trash', 'spam', 'drafts'].includes(t.folder) && t.messages.some((m) => m.from.email === ME.email && !m.draft)
                : t.folder === folder;
        if (!inF) return false;
        if (label && !t.labels.includes(label)) return false;
        if (
          q &&
          !(t.subject + ' ' + t.messages.map((m) => m.from.name + ' ' + m.from.email + ' ' + stripHtml(m.html)).join(' '))
            .toLowerCase()
            .includes(q)
        )
          return false;
        return true;
      })
      .sort((a, b) => new Date(last(b).ts) - new Date(last(a).ts));
  }, [threads, folder, label, search]);

  useEffect(() => {
    setSelected(new Set());
  }, [folder, label, search]);

  if (!threads)
    return (
      <section className="page-view active">
        <div className="empty-state">
          <div className="loading-spinner" style={{ margin: '0 auto' }} />
        </div>
      </section>
    );

  const counts = {
    inbox: threads.filter((t) => t.folder === 'inbox' && t.unread).length,
    drafts: threads.filter((t) => t.folder === 'drafts').length,
    spam: threads.filter((t) => t.folder === 'spam' && t.unread).length,
  };
  const openThread = threads.find((t) => t.id === openId);

  const upd = (ids, fn) => setThreads((l) => l.map((t) => (ids.has(t.id) ? fn(t) : t)));
  const act = (ids, kind) => {
    const set = new Set(ids);
    if (kind === 'archive') upd(set, (t) => ({ ...t, folder: 'archive' }));
    if (kind === 'spam') upd(set, (t) => (t.folder === 'spam' ? { ...t, folder: 'inbox' } : { ...t, folder: 'spam' }));
    if (kind === 'read') upd(set, (t) => ({ ...t, unread: false }));
    if (kind === 'unread') upd(set, (t) => ({ ...t, unread: true }));
    if (kind === 'restore') upd(set, (t) => ({ ...t, folder: t.prev || 'inbox' }));
    if (kind === 'trash') {
      if (folder === 'trash') setThreads((l) => l.filter((t) => !set.has(t.id)));
      else upd(set, (t) => ({ ...t, folder: 'trash', prev: t.folder }));
    }
    setSelected(new Set());
    if (set.has(openId) && kind !== 'read' && kind !== 'unread') setOpenId(null);
    const msg = {
      archive: 'Dipindahkan ke Arsip',
      spam: 'Dipindahkan ke Spam / dipulihkan',
      trash: folder === 'trash' ? 'Dihapus permanen' : 'Dipindahkan ke Sampah',
      restore: 'Dipulihkan',
      read: 'Ditandai sudah dibaca',
      unread: 'Ditandai belum dibaca',
    }[kind];
    showToast(`${ids.length || ids.size} percakapan: ${msg}`);
  };
  const toggleStar = (id) => setThreads((l) => l.map((t) => (t.id === id ? { ...t, starred: !t.starred } : t)));

  const open = (t) => {
    if (t.folder === 'drafts') return openDraft(t);
    setOpenId(t.id);
    if (t.unread) upd(new Set([t.id]), (x) => ({ ...x, unread: false }));
  };

  /* ---------- compose flows ---------- */
  const quote = (m) =>
    `<br><br><blockquote class="em-quote">Pada ${fmtFull(m.ts)}, ${m.from.name} &lt;${m.from.email}&gt; menulis:<br>${m.html}</blockquote>`;
  const rePrefix = (s, p) => (new RegExp('^' + p + ':', 'i').test(s) ? s : `${p}: ${s}`);

  const startCompose = (init) => setCompose({ ...init, key: uid('c') });
  const reply = (t, all = false) => {
    const m = last(t);
    const other = m.from.email === ME.email ? m.to : [m.from.email];
    const cc = all ? [...m.to, ...m.cc].filter((e) => e !== ME.email && !other.includes(e)) : [];
    startCompose({
      title: all ? 'Balas Semua' : 'Balas',
      threadId: t.id,
      to: all ? [...new Set([...other])] : other,
      cc,
      subject: rePrefix(t.subject, 'Re'),
      html: quote(m),
    });
  };
  const forward = (t) => {
    const m = last(t);
    startCompose({
      title: 'Teruskan',
      to: [],
      subject: rePrefix(t.subject, 'Fwd'),
      attachments: m.attachments,
      html: `<br><br><blockquote class="em-quote">---------- Pesan diteruskan ----------<br>Dari: ${m.from.name} &lt;${m.from.email}&gt;<br>Tanggal: ${fmtFull(m.ts)}<br>Subjek: ${t.subject}<br><br>${m.html}</blockquote>`,
    });
  };
  const openDraft = (t) => {
    const m = last(t);
    startCompose({
      title: 'Draft',
      draftId: t.id,
      to: m.to,
      cc: m.cc,
      bcc: m.bcc || [],
      subject: t.subject,
      html: m.html,
      attachments: m.attachments,
    });
  };

  const saveDraft = (data, init, stay) => {
    const msg = { id: uid('m'), from: { name: ME.name, email: ME.email }, ts: new Date().toISOString(), draft: true, ...data };
    if (init.draftId) setThreads((l) => l.map((t) => (t.id === init.draftId ? { ...t, subject: data.subject, messages: [msg] } : t)));
    else {
      const id = uid('t');
      setThreads((l) => [
        { id, subject: data.subject || '(tanpa subjek)', folder: 'drafts', unread: false, starred: false, labels: [], messages: [msg] },
        ...l,
      ]);
      init.draftId = id; // keep editing the same draft
    }
    showToast('Draft disimpan');
    if (!stay) setCompose(null);
  };
  const discard = (init) => {
    if (init.draftId) setThreads((l) => l.filter((t) => t.id !== init.draftId));
    setCompose(null);
  };

  const send = (data, init) => {
    const msg = {
      id: uid('m'),
      from: { name: ME.name, email: ME.email },
      ts: new Date().toISOString(),
      ...data,
      html: sanitize(data.html),
    };
    const subject = data.subject.trim() || '(tanpa subjek)';
    if (init.threadId) {
      setThreads((l) => l.map((t) => (t.id === init.threadId ? { ...t, unread: false, messages: [...t.messages, msg] } : t)));
      setCollapsed((c) => ({ ...c, [msg.id]: false }));
    } else if (init.draftId) {
      setThreads((l) => l.map((t) => (t.id === init.draftId ? { ...t, folder: 'sent', subject, messages: [msg] } : t)));
    } else {
      setThreads((l) => [{ id: uid('t'), subject, folder: 'sent', unread: false, starred: false, labels: [], messages: [msg] }, ...l]);
    }
    setCompose(null);
    showToast(`Email terkirim ke ${data.to.join(', ')}`);

    // simulated auto-reply from the first recipient (demo of an incoming mail)
    const rcpt = data.to[0];
    const known = CONTACTS.find((c) => c.email === rcpt);
    timers.current.push(
      setTimeout(() => {
        const from = { name: known?.name || rcpt.split('@')[0], email: rcpt };
        const incoming = {
          id: uid('m'),
          from,
          to: [ME.email],
          cc: [],
          ts: new Date().toISOString(),
          html: `<p>Terima kasih, email Anda "<b>${subject}</b>" sudah kami terima. Kami akan segera menindaklanjuti.</p><p>Salam,<br>${from.name}</p>`,
          attachments: [],
        };
        setThreads((l) => [
          {
            id: uid('t'),
            subject: rePrefix(subject, 'Re'),
            folder: 'inbox',
            unread: true,
            starred: false,
            labels: [],
            messages: [incoming],
          },
          ...l,
        ]);
        showToast(`Email baru dari ${from.name}`);
      }, 9000),
    );
  };

  const allSelected = list.length > 0 && list.every((t) => selected.has(t.id));
  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(list.map((t) => t.id)));
  const toggleSel = (id) =>
    setSelected((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const sel = [...selected];
  const folderLabel = FOLDERS.find((f) => f.id === folder)?.label;

  return (
    <section id="page-email" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Email</h1>
          <p className="page-desc">Kotak masuk, kirim, tulis, balas, teruskan, draft, dan arsip dalam satu tempat.</p>
        </div>
      </div>

      <div className={`em card${openThread ? ' has-open' : ''}`}>
        {/* ---------- sidebar ---------- */}
        <aside className="em-side">
          <button className="btn btn-primary em-compose-btn" onClick={() => startCompose({})}>
            <i className="fa-solid fa-pen" /> Tulis Email
          </button>
          <nav>
            {FOLDERS.map((f) => (
              <button
                key={f.id}
                className={`em-folder${folder === f.id ? ' active' : ''}`}
                onClick={() => {
                  setFolder(f.id);
                  setOpenId(null);
                }}
              >
                <i className={`fa-solid ${f.icon}`} /> <span>{f.label}</span>
                {counts[f.id] > 0 && <b>{counts[f.id]}</b>}
              </button>
            ))}
          </nav>
          <div className="em-side-title">Label</div>
          {LABELS.map((l) => (
            <button
              key={l.id}
              className={`em-folder${label === l.id ? ' active' : ''}`}
              onClick={() => setLabel(label === l.id ? '' : l.id)}
            >
              <i className="fa-solid fa-circle" style={{ color: l.color, fontSize: 10 }} /> <span>{l.label}</span>
            </button>
          ))}
        </aside>

        {/* ---------- list ---------- */}
        <div className="em-list">
          <div className="em-search">
            <i className="fa-solid fa-magnifying-glass" />
            <input placeholder="Cari email, pengirim, isi pesan..." value={search} onChange={(e) => setSearch(e.target.value)} />
            {search && (
              <button onClick={() => setSearch('')}>
                <i className="fa-solid fa-xmark" />
              </button>
            )}
          </div>
          <div className="em-listbar">
            <input className="form-check-input" type="checkbox" checked={allSelected} onChange={toggleAll} aria-label="Pilih semua" />
            {sel.length === 0 ? (
              <>
                <button className="em-icon" title="Muat ulang" onClick={() => showToast('Kotak surat diperbarui')}>
                  <i className="fa-solid fa-rotate" />
                </button>
                <span className="em-count">
                  {folderLabel}
                  {label && ` · ${LABELS.find((l) => l.id === label).label}`} · {list.length}
                </span>
                {folder === 'trash' && list.length > 0 && (
                  <button
                    className="em-link"
                    onClick={() =>
                      act(
                        list.map((t) => t.id),
                        'trash',
                      )
                    }
                  >
                    Kosongkan sampah
                  </button>
                )}
              </>
            ) : (
              <>
                <b className="em-count">{sel.length} dipilih</b>
                {folder === 'trash' && (
                  <button className="em-icon" title="Pulihkan" onClick={() => act(sel, 'restore')}>
                    <i className="fa-solid fa-rotate-left" />
                  </button>
                )}
                <button className="em-icon" title="Arsipkan" onClick={() => act(sel, 'archive')}>
                  <i className="fa-solid fa-box-archive" />
                </button>
                <button className="em-icon" title="Spam" onClick={() => act(sel, 'spam')}>
                  <i className="fa-solid fa-ban" />
                </button>
                <button className="em-icon" title={folder === 'trash' ? 'Hapus permanen' : 'Hapus'} onClick={() => act(sel, 'trash')}>
                  <i className="fa-solid fa-trash" />
                </button>
                <button className="em-icon" title="Tandai dibaca" onClick={() => act(sel, 'read')}>
                  <i className="fa-solid fa-envelope-open" />
                </button>
                <button className="em-icon" title="Tandai belum dibaca" onClick={() => act(sel, 'unread')}>
                  <i className="fa-solid fa-envelope" />
                </button>
              </>
            )}
          </div>
          <div className="em-rows">
            {list.map((t) => {
              const m = last(t);
              const who =
                folder === 'sent' || folder === 'drafts'
                  ? `Kepada: ${m.to.join(', ') || '(tanpa penerima)'}`
                  : t.messages.find((x) => x.from.email !== ME.email)?.from.name || m.from.name;
              const hasAtt = t.messages.some((x) => x.attachments?.length);
              return (
                <div
                  key={t.id}
                  className={`em-row${t.unread ? ' unread' : ''}${openId === t.id ? ' active' : ''}${selected.has(t.id) ? ' sel' : ''}`}
                  onClick={() => open(t)}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selected.has(t.id)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => toggleSel(t.id)}
                  />
                  <button
                    className={`em-star${t.starred ? ' on' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(t.id);
                    }}
                    title="Bintangi"
                  >
                    <i className={`${t.starred ? 'fa-solid' : 'fa-regular'} fa-star`} />
                  </button>
                  <div className="em-row-main">
                    <div className="em-row-top">
                      <span className="em-who">
                        {folder === 'drafts' ? <span style={{ color: 'var(--danger)' }}>Draft</span> : who}
                        {t.messages.length > 1 && <small> ({t.messages.length})</small>}
                      </span>
                      <span className="em-time">
                        {hasAtt && <i className="fa-solid fa-paperclip" />} {fmtShort(m.ts, now)}
                      </span>
                    </div>
                    <div className="em-subject">{t.subject}</div>
                    <div className="em-snippet">
                      {t.labels.map((id) => {
                        const l = LABELS.find((x) => x.id === id);
                        return (
                          <span key={id} className="em-label" style={{ background: l.color + '22', color: l.color }}>
                            {l.label}
                          </span>
                        );
                      })}
                      {stripHtml(m.html).slice(0, 110)}
                    </div>
                  </div>
                </div>
              );
            })}
            {list.length === 0 && (
              <div className="empty-state">
                <i className="fa-solid fa-inbox icon-lg mb-3" />
                <div>Tidak ada email di sini.</div>
              </div>
            )}
          </div>
        </div>

        {/* ---------- reading pane ---------- */}
        <div className="em-read">
          {!openThread ? (
            <div className="em-placeholder">
              <i className="fa-regular fa-envelope-open" />
              <p>Pilih email untuk dibaca</p>
            </div>
          ) : (
            <>
              <div className="em-read-head">
                <button className="em-icon em-back" onClick={() => setOpenId(null)} title="Kembali">
                  <i className="fa-solid fa-arrow-left" />
                </button>
                <h2>{openThread.subject}</h2>
                <div className="em-read-tools">
                  {openThread.folder === 'trash' && (
                    <button className="em-icon" title="Pulihkan" onClick={() => act([openThread.id], 'restore')}>
                      <i className="fa-solid fa-rotate-left" />
                    </button>
                  )}
                  <button className="em-icon" title="Arsipkan" onClick={() => act([openThread.id], 'archive')}>
                    <i className="fa-solid fa-box-archive" />
                  </button>
                  <button className="em-icon" title="Spam" onClick={() => act([openThread.id], 'spam')}>
                    <i className="fa-solid fa-ban" />
                  </button>
                  <button className="em-icon" title="Hapus" onClick={() => act([openThread.id], 'trash')}>
                    <i className="fa-solid fa-trash" />
                  </button>
                  <button className="em-icon" title="Tandai belum dibaca" onClick={() => act([openThread.id], 'unread')}>
                    <i className="fa-solid fa-envelope" />
                  </button>
                  <button
                    className={`em-icon${openThread.starred ? ' gold' : ''}`}
                    title="Bintangi"
                    onClick={() => toggleStar(openThread.id)}
                  >
                    <i className={`${openThread.starred ? 'fa-solid' : 'fa-regular'} fa-star`} />
                  </button>
                </div>
              </div>
              <div className="em-labels">
                {openThread.labels.map((id) => {
                  const l = LABELS.find((x) => x.id === id);
                  return (
                    <span key={id} className="em-label" style={{ background: l.color + '22', color: l.color }}>
                      {l.label}
                    </span>
                  );
                })}
                {openThread.folder !== 'inbox' && (
                  <span className="em-label" style={{ background: 'var(--bg-panel)', color: 'var(--text-muted)' }}>
                    {FOLDERS.find((f) => f.id === openThread.folder)?.label}
                  </span>
                )}
              </div>

              <div className="em-thread">
                {openThread.messages.map((m, i) => {
                  const isLast = i === openThread.messages.length - 1;
                  const isCollapsed = collapsed[m.id] ?? !isLast;
                  return (
                    <div className="em-msg" key={m.id}>
                      <div className="em-msg-head" onClick={() => setCollapsed((c) => ({ ...c, [m.id]: !isCollapsed }))}>
                        <Avatar name={m.from.name} />
                        <div className="em-msg-meta">
                          <div>
                            <b>{m.from.name}</b> <small>&lt;{m.from.email}&gt;</small>
                          </div>
                          <small>
                            {isCollapsed
                              ? stripHtml(m.html).slice(0, 90)
                              : `kepada ${m.to.map((e) => (e === ME.email ? 'saya' : e)).join(', ')}${m.cc?.length ? `, cc ${m.cc.join(', ')}` : ''}`}
                          </small>
                        </div>
                        <small className="em-msg-time">{fmtFull(m.ts)}</small>
                      </div>
                      {!isCollapsed && (
                        <>
                          <div className="em-body" dangerouslySetInnerHTML={{ __html: sanitize(m.html) }} />
                          {m.attachments?.length > 0 && (
                            <div className="em-attach-list">
                              {m.attachments.map((a) => (
                                <button className="em-attach" key={a.name} onClick={() => showToast(`Mengunduh ${a.name}...`)}>
                                  <i className={`fa-solid ${fileIcon(a.name)}`} /> {a.name} <small>{fmtSize(a.size)}</small>{' '}
                                  <i className="fa-solid fa-download" />
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="em-replybar">
                <button className="btn btn-secondary" onClick={() => reply(openThread)}>
                  <i className="fa-solid fa-reply" /> Balas
                </button>
                <button className="btn btn-secondary" onClick={() => reply(openThread, true)}>
                  <i className="fa-solid fa-reply-all" /> Balas Semua
                </button>
                <button className="btn btn-secondary" onClick={() => forward(openThread)}>
                  <i className="fa-solid fa-share" /> Teruskan
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {compose && (
        <ComposeWindow key={compose.key} init={compose} onSend={send} onSaveDraft={saveDraft} onDiscard={discard} showToast={showToast} />
      )}
    </section>
  );
}
