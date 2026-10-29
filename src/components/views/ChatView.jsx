import { useEffect, useMemo, useRef, useState } from 'react';
import { useAdmin } from '@/components/AdminProvider';
import { ME, EMOJIS, REACTIONS, seedChats, hhmm, dayLabel, listTime, fmtDur, fmtSize, previewOf, colorFor, initials } from '@/lib/chatData';

const REPLIES = [
  'Baik, siap!',
  'Oke, terima kasih 🙏',
  'Sebentar ya, saya cek dulu.',
  'Noted 👍',
  'Siap, nanti saya kabari lagi.',
  'Terima kasih infonya!',
  'Boleh, kita bahas besok pagi ya.',
  'Mantap 🔥',
];
const MEDIA_REPLIES = ['Sudah saya terima 👍', 'Terima kasih, sudah saya lihat!', 'Oke, noted 🙏'];

const Avatar = ({ name, size = 44, group }) => (
  <div className="wa-avatar" style={{ width: size, height: size, background: colorFor(name), fontSize: size * 0.36 }}>
    {group ? <i className="fa-solid fa-user-group" /> : initials(name)}
  </div>
);

const Ticks = ({ status }) => (
  <i className={`fa-solid ${status === 'sent' ? 'fa-check' : 'fa-check-double'} wa-tick${status === 'read' ? ' read' : ''}`} />
);

const hash = (s) => [...s].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) % 997;

function Highlight({ text, q }) {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.split(re).map((p, i) => (p.toLowerCase() === q.toLowerCase() ? <mark key={i}>{p}</mark> : p));
}

/* ---------- voice note bubble ---------- */
function VoiceBubble({ m }) {
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const audio = useRef(null);
  const dur = m.duration || 1;
  const bars = useMemo(() => Array.from({ length: 30 }, (_, i) => 6 + Math.abs(Math.sin((hash(m.id) + i) * 1.7)) * 16), [m.id]);
  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (playing) a.pause();
    else a.play().catch(() => {});
  };
  return (
    <div className="wa-voice">
      <button onClick={toggle}>
        <i className={`fa-solid ${playing ? 'fa-pause' : 'fa-play'}`} />
      </button>
      <div className="wa-wave">
        {bars.map((h, i) => (
          <span key={i} style={{ height: h, opacity: i / bars.length < pos ? 1 : 0.4 }} />
        ))}
      </div>
      <small>{fmtDur(playing ? pos * dur : dur)}</small>
      <audio
        ref={audio}
        src={m.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setPos(0);
        }}
        onTimeUpdate={(e) => setPos(Math.min(1, e.target.currentTime / dur))}
      />
    </div>
  );
}

/* ---------- one message bubble ---------- */
function Bubble({ m, chat, q, onMenu, onOpenMedia, onJump, now }) {
  const mine = m.from === 'me';
  const sender = chat.members.find((x) => x.id === m.from);
  const quoted = m.replyTo && chat.messages.find((x) => x.id === m.replyTo);
  const qName = quoted ? (quoted.from === 'me' ? 'Anda' : chat.members.find((x) => x.id === quoted.from)?.name || chat.name) : '';
  const reacts = Object.values(m.reactions || {});
  return (
    <div className={`wa-row ${mine ? 'out' : 'in'}`} id={`msg-${m.id}`}>
      <div className={`wa-bubble${m.deleted ? ' deleted' : ''}${m.type === 'image' || m.type === 'video' ? ' media' : ''}`}>
        <button
          className="wa-chev"
          onClick={(e) => {
            e.stopPropagation();
            onMenu(m.id);
          }}
        >
          <i className="fa-solid fa-chevron-down" />
        </button>
        {chat.type === 'group' && !mine && (
          <div className="wa-sender" style={{ color: colorFor(sender?.name || 'x') }}>
            {sender?.name}
          </div>
        )}
        {m.deleted ? (
          <div className="wa-text">
            <i className="fa-solid fa-ban" /> Pesan ini telah dihapus
          </div>
        ) : (
          <>
            {quoted && (
              <div className="wa-quote" onClick={() => onJump(quoted.id)}>
                <b style={{ color: colorFor(qName) }}>{qName}</b>
                <span>{previewOf(quoted)}</span>
              </div>
            )}
            {m.type === 'image' && <img className="wa-img" src={m.src} alt={m.text || 'foto'} onClick={() => onOpenMedia(m)} />}
            {m.type === 'video' && (
              <div className="wa-video" onClick={() => onOpenMedia(m)}>
                <video src={m.src} preload="metadata" muted playsInline />
                <span className="wa-play">
                  <i className="fa-solid fa-play" />
                </span>
                {m.duration > 0 && <small>{fmtDur(m.duration)}</small>}
              </div>
            )}
            {m.type === 'audio' && <VoiceBubble m={m} />}
            {m.type === 'file' && (
              <div className="wa-file">
                <i
                  className={`fa-solid ${/\.pdf$/i.test(m.name) ? 'fa-file-pdf' : /\.xlsx?$/i.test(m.name) ? 'fa-file-excel' : /\.docx?$/i.test(m.name) ? 'fa-file-word' : 'fa-file'}`}
                />
                <div>
                  <b>{m.name}</b>
                  <small>{fmtSize(m.size || 0)}</small>
                </div>
                <a href={m.src || '#'} download={m.name} onClick={(e) => !m.src && e.preventDefault()}>
                  <i className="fa-solid fa-download" />
                </a>
              </div>
            )}
            {m.text && m.type !== 'audio' && (
              <div className="wa-text">
                <Highlight text={m.text} q={q} />
              </div>
            )}
          </>
        )}
        <div className="wa-meta">
          {m.starred && <i className="fa-solid fa-star" />}
          <span>{hhmm(m.ts)}</span>
          {mine && !m.deleted && <Ticks status={m.status} />}
        </div>
        {reacts.length > 0 && (
          <div className="wa-reacts">
            {[...new Set(reacts)].join('')}
            {reacts.length > 1 && <small>{reacts.length}</small>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
export default function ChatView() {
  const { showToast } = useAdmin();
  const [now, setNow] = useState(null);
  const [chats, setChats] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [typing, setTyping] = useState({});
  const [replyTo, setReplyTo] = useState(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [attachOpen, setAttachOpen] = useState(false);
  const [menu, setMenu] = useState(null);
  const [headMenu, setHeadMenu] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [preview, setPreview] = useState(null); // { files:[{type,url,name,size}], caption }
  const [rec, setRec] = useState(null); // { sec }
  const [findOpen, setFindOpen] = useState(false);
  const [findQ, setFindQ] = useState('');
  const timers = useRef([]);
  const seq = useRef(1000);
  const bottom = useRef(null);
  const mediaInput = useRef(null);
  const docInput = useRef(null);
  const textRef = useRef(null);
  const recorder = useRef(null);
  const recTimer = useRef(null);
  const activeIdRef = useRef(null);

  useEffect(() => {
    const n = new Date();
    setNow(n);
    setChats(seedChats(n));
    return () => {
      timers.current.forEach(clearTimeout);
      clearInterval(recTimer.current);
    };
  }, []);

  const active = chats?.find((c) => c.id === activeId);
  activeIdRef.current = activeId;
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const updChat = (id, fn) => setChats((l) => l.map((c) => (c.id === id ? fn(c) : c)));
  const updMsg = (cid, mid, fn) => updChat(cid, (c) => ({ ...c, messages: c.messages.map((m) => (m.id === mid ? fn(m) : m)) }));

  useEffect(() => {
    bottom.current?.scrollIntoView({ block: 'end' });
  }, [activeId, active?.messages.length, typing[activeId]]);
  useEffect(() => {
    if (!menu && !headMenu && !emojiOpen && !attachOpen) return;
    const close = () => {
      setMenu(null);
      setHeadMenu(false);
      setAttachOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [menu, headMenu, emojiOpen, attachOpen]);

  const list = useMemo(() => {
    if (!chats) return [];
    const q = search.trim().toLowerCase();
    return chats
      .filter((c) => (filter === 'unread' ? c.unread > 0 : filter === 'groups' ? c.type === 'group' : true))
      .filter((c) => !q || c.name.toLowerCase().includes(q) || c.messages.some((m) => (m.text || '').toLowerCase().includes(q)))
      .sort((a, b) => b.pinned - a.pinned || new Date(b.messages.at(-1)?.ts || 0) - new Date(a.messages.at(-1)?.ts || 0));
  }, [chats, search, filter]);

  if (!chats)
    return (
      <section className="page-view active">
        <div className="empty-state">
          <div className="loading-spinner" style={{ margin: '0 auto' }} />
        </div>
      </section>
    );

  const openChat = (id) => {
    setActiveId(id);
    setReplyTo(null);
    setFindOpen(false);
    setFindQ('');
    setEmojiOpen(false);
    updChat(id, (c) => ({ ...c, unread: 0 }));
    setTimeout(() => textRef.current?.focus(), 50);
  };

  /* ---------- sending ---------- */
  const pushMessage = (cid, partial) => {
    const m = {
      id: `${cid}-${++seq.current}`,
      from: 'me',
      ts: new Date().toISOString(),
      status: 'sent',
      reactions: {},
      replyTo: replyTo?.id || null,
      ...partial,
    };
    updChat(cid, (c) => ({ ...c, draft: '', messages: [...c.messages, m] }));
    setReplyTo(null);
    const chat = chats.find((c) => c.id === cid);
    later(() => updMsg(cid, m.id, (x) => ({ ...x, status: 'delivered' })), 700);
    if (chat.online || chat.type === 'group') later(() => updMsg(cid, m.id, (x) => ({ ...x, status: 'read' })), 1900);
    // simulated reply
    if (chat.online || chat.type === 'group') {
      later(() => setTyping((t) => ({ ...t, [cid]: chat.members[0]?.id })), 2000);
      later(() => {
        const from = chat.members[Math.floor(Math.random() * chat.members.length)].id;
        const pool = m.type === 'text' ? REPLIES : MEDIA_REPLIES;
        const reply = {
          id: `${cid}-${++seq.current}`,
          from,
          type: 'text',
          text: pool[Math.floor(Math.random() * pool.length)],
          ts: new Date().toISOString(),
          status: 'read',
          reactions: {},
        };
        setTyping((t) => ({ ...t, [cid]: null }));
        setChats((l) =>
          l.map((c) =>
            c.id === cid ? { ...c, unread: c.id === activeIdRef.current ? 0 : c.unread + 1, messages: [...c.messages, reply] } : c,
          ),
        );
      }, 4200);
    }
    return m;
  };

  const sendText = () => {
    const text = active.draft.trim();
    if (!text) return;
    pushMessage(active.id, { type: 'text', text });
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendText();
    }
  };

  const pickMedia = (e) => {
    const files = [...e.target.files].map((f) => ({
      type: f.type.startsWith('video') ? 'video' : 'image',
      url: URL.createObjectURL(f),
      name: f.name,
      size: f.size,
    }));
    e.target.value = '';
    if (files.length) setPreview({ files, caption: '' });
  };
  const sendPreview = () => {
    preview.files.forEach((f, i) =>
      pushMessage(active.id, { type: f.type, src: f.url, text: i === 0 ? preview.caption : '', name: f.name, duration: 0 }),
    );
    setPreview(null);
  };
  const pickDoc = (e) => {
    [...e.target.files].forEach((f) => pushMessage(active.id, { type: 'file', name: f.name, size: f.size, src: URL.createObjectURL(f) }));
    e.target.value = '';
  };

  /* ---------- voice recording ---------- */
  const startRec = async () => {
    let real = false;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      const chunks = [];
      mr.ondataavailable = (e) => chunks.push(e.data);
      recorder.current = { mr, stream, chunks };
      mr.start();
      real = true;
    } catch (e) {
      recorder.current = null;
      showToast('Mikrofon tidak tersedia - mode simulasi pesan suara');
    }
    setRec({ sec: 0, real });
    recTimer.current = setInterval(() => setRec((r) => (r ? { ...r, sec: r.sec + 1 } : r)), 1000);
  };
  const stopRec = (send) => {
    clearInterval(recTimer.current);
    const r = rec;
    const handle = recorder.current;
    setRec(null);
    const sec = Math.max(1, r?.sec || 1);
    if (handle) {
      handle.mr.onstop = () => {
        handle.stream.getTracks().forEach((t) => t.stop());
        if (send)
          pushMessage(active.id, {
            type: 'audio',
            src: URL.createObjectURL(new Blob(handle.chunks, { type: 'audio/webm' })),
            duration: sec,
          });
      };
      try {
        handle.mr.stop();
      } catch (e) {}
      recorder.current = null;
    } else if (send) {
      pushMessage(active.id, { type: 'audio', src: '/media/voice-sample.wav', duration: 3 });
    }
  };

  /* ---------- message actions ---------- */
  const msgAction = (kind, m) => {
    const cid = active.id;
    setMenu(null);
    if (kind === 'reply') {
      setReplyTo(m);
      textRef.current?.focus();
    }
    if (kind === 'copy') {
      navigator.clipboard?.writeText(m.text || '');
      showToast('Pesan disalin');
    }
    if (kind === 'forward') showToast('Pilih chat tujuan (demo)');
    if (kind === 'star') updMsg(cid, m.id, (x) => ({ ...x, starred: !x.starred }));
    if (kind === 'delete-me') updChat(cid, (c) => ({ ...c, messages: c.messages.filter((x) => x.id !== m.id) }));
    if (kind === 'delete-all') updMsg(cid, m.id, (x) => ({ ...x, deleted: true, text: '', src: '' }));
    if (kind.startsWith('react:')) {
      const e = kind.slice(6);
      updMsg(cid, m.id, (x) => {
        const r = { ...x.reactions };
        if (r.me === e) delete r.me;
        else r.me = e;
        return { ...x, reactions: r };
      });
    }
  };
  const jump = (id) => {
    const el = document.getElementById(`msg-${id}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el?.classList.add('flash');
    setTimeout(() => el?.classList.remove('flash'), 1200);
  };

  /* ---------- render ---------- */
  const items = [];
  if (active) {
    let prev = null;
    active.messages.forEach((m) => {
      const label = dayLabel(m.ts, now);
      if (label !== prev) {
        items.push({ sep: label });
        prev = label;
      }
      items.push({ m });
    });
  }
  const typer = active && typing[active.id] ? active.members.find((x) => x.id === typing[active.id])?.name : null;
  const matches = findQ ? active?.messages.filter((m) => (m.text || '').toLowerCase().includes(findQ.toLowerCase())).length : 0;
  const menuMsg = menu && active?.messages.find((m) => m.id === menu);
  const lastSeen = active?.lastSeen
    ? `terakhir dilihat ${dayLabel(active.lastSeen, now).toLowerCase()} ${hhmm(active.lastSeen)}`
    : 'offline';
  const subtitle = !active
    ? ''
    : typer
      ? active.type === 'group'
        ? `${typer} sedang mengetik...`
        : 'sedang mengetik...'
      : active.type === 'group'
        ? ['Anda', ...active.members.map((m) => m.name)].join(', ')
        : active.online
          ? 'online'
          : lastSeen;

  return (
    <section id="page-chat" className="page-view active">
      <div className={`wa card${active ? ' has-chat' : ''}`}>
        {/* ---------------- left: chat list ---------------- */}
        <aside className="wa-side">
          <div className="wa-side-head">
            <Avatar name={ME.name} size={40} />
            <b>Chat</b>
            <div>
              <button className="wa-icon" title="Chat baru" onClick={() => showToast('Pilih kontak untuk chat baru (demo)')}>
                <i className="fa-solid fa-message" />
              </button>
              <button className="wa-icon" title="Status" onClick={() => showToast('Status (demo)')}>
                <i className="fa-solid fa-circle-notch" />
              </button>
            </div>
          </div>
          <div className="wa-search">
            <i className="fa-solid fa-magnifying-glass" />
            <input placeholder="Cari chat atau mulai chat baru" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="wa-filters">
            {[
              ['all', 'Semua'],
              ['unread', 'Belum dibaca'],
              ['groups', 'Grup'],
            ].map(([k, l]) => (
              <button key={k} className={filter === k ? 'on' : ''} onClick={() => setFilter(k)}>
                {l}
              </button>
            ))}
          </div>
          <div className="wa-chats">
            {list.map((c) => {
              const last = c.messages.at(-1);
              return (
                <div key={c.id} className={`wa-chat${activeId === c.id ? ' active' : ''}`} onClick={() => openChat(c.id)}>
                  <Avatar name={c.name} group={c.type === 'group'} />
                  <div className="wa-chat-main">
                    <div className="wa-chat-top">
                      <b>{c.name}</b>
                      <small className={c.unread ? 'new' : ''}>{last && listTime(last.ts, now)}</small>
                    </div>
                    <div className="wa-chat-bot">
                      <span>
                        {typing[c.id] ? (
                          <em className="wa-typing">mengetik...</em>
                        ) : (
                          <>
                            {last?.from === 'me' && !last.deleted && <Ticks status={last.status} />}{' '}
                            {c.type === 'group' && last && last.from !== 'me' && (
                              <>{c.members.find((x) => x.id === last.from)?.name.split(' ')[0]}: </>
                            )}
                            {c.draft ? <em style={{ color: 'var(--success)' }}>Draft: {c.draft}</em> : previewOf(last)}
                          </>
                        )}
                      </span>
                      <div className="wa-chat-badges">
                        {c.muted && <i className="fa-solid fa-volume-xmark" />}
                        {c.pinned && <i className="fa-solid fa-thumbtack" />}
                        {c.unread > 0 && <b className={c.muted ? 'muted' : ''}>{c.unread}</b>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {list.length === 0 && <div className="empty-state">Tidak ada chat.</div>}
          </div>
        </aside>

        {/* ---------------- right: conversation ---------------- */}
        <div className="wa-main">
          {!active ? (
            <div className="wa-empty">
              <div className="wa-empty-icon">
                <i className="fa-solid fa-comments" />
              </div>
              <h2>NusaCore Chat</h2>
              <p>
                Kirim dan terima pesan, foto, video, pesan suara, dan dokumen.
                <br />
                Pilih chat di sebelah kiri untuk memulai.
              </p>
            </div>
          ) : (
            <>
              <div className="wa-head">
                <button className="wa-icon wa-back" onClick={() => setActiveId(null)}>
                  <i className="fa-solid fa-arrow-left" />
                </button>
                <Avatar name={active.name} size={40} group={active.type === 'group'} />
                <div
                  className="wa-head-info"
                  onClick={() => showToast(`${active.name} · ${active.about}${active.phone ? ' · ' + active.phone : ''}`)}
                >
                  <b>{active.name}</b>
                  <small className={typer || active.online ? 'on' : ''}>{subtitle}</small>
                </div>
                <div className="wa-head-tools">
                  <button className="wa-icon" title="Panggilan video" onClick={() => showToast(`Memanggil video ${active.name}...`)}>
                    <i className="fa-solid fa-video" />
                  </button>
                  <button className="wa-icon" title="Panggilan suara" onClick={() => showToast(`Memanggil ${active.name}...`)}>
                    <i className="fa-solid fa-phone" />
                  </button>
                  <button
                    className="wa-icon"
                    title="Cari"
                    onClick={() => {
                      setFindOpen((o) => !o);
                      setFindQ('');
                    }}
                  >
                    <i className="fa-solid fa-magnifying-glass" />
                  </button>
                  <div style={{ position: 'relative' }}>
                    <button
                      className="wa-icon"
                      title="Menu"
                      onClick={(e) => {
                        e.stopPropagation();
                        setHeadMenu((o) => !o);
                      }}
                    >
                      <i className="fa-solid fa-ellipsis-vertical" />
                    </button>
                    {headMenu && (
                      <div className="wa-menu right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            showToast(`${active.name} · ${active.about}`);
                            setHeadMenu(false);
                          }}
                        >
                          Info {active.type === 'group' ? 'grup' : 'kontak'}
                        </button>
                        <button
                          onClick={() => {
                            updChat(active.id, (c) => ({ ...c, muted: !c.muted }));
                            setHeadMenu(false);
                          }}
                        >
                          {active.muted ? 'Bunyikan notifikasi' : 'Bisukan notifikasi'}
                        </button>
                        <button
                          onClick={() => {
                            updChat(active.id, (c) => ({ ...c, pinned: !c.pinned }));
                            setHeadMenu(false);
                          }}
                        >
                          {active.pinned ? 'Lepas sematan' : 'Sematkan chat'}
                        </button>
                        <button
                          onClick={() => {
                            updChat(active.id, (c) => ({ ...c, messages: [] }));
                            setHeadMenu(false);
                            showToast('Chat dibersihkan');
                          }}
                        >
                          Bersihkan chat
                        </button>
                        <button
                          onClick={() => {
                            setChats((l) => l.filter((c) => c.id !== active.id));
                            setActiveId(null);
                            setHeadMenu(false);
                          }}
                        >
                          Hapus chat
                        </button>
                        <button
                          onClick={() => {
                            setActiveId(null);
                            setHeadMenu(false);
                          }}
                        >
                          Tutup chat
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {findOpen && (
                <div className="wa-find">
                  <i className="fa-solid fa-magnifying-glass" />
                  <input autoFocus placeholder="Cari di chat ini" value={findQ} onChange={(e) => setFindQ(e.target.value)} />
                  <small>{findQ ? `${matches} hasil` : ''}</small>
                  <button
                    className="wa-icon"
                    onClick={() => {
                      setFindOpen(false);
                      setFindQ('');
                    }}
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>
                </div>
              )}

              <div className="wa-messages">
                {items.length === 0 && <div className="wa-sep">Belum ada pesan. Sapa {active.name}!</div>}
                {items.map((it, i) =>
                  it.sep ? (
                    <div className="wa-sep" key={'s' + i}>
                      {it.sep}
                    </div>
                  ) : (
                    <Bubble
                      key={it.m.id}
                      m={it.m}
                      chat={active}
                      q={findQ}
                      now={now}
                      onMenu={(id) => setMenu(menu === id ? null : id)}
                      onOpenMedia={setLightbox}
                      onJump={jump}
                    />
                  ),
                )}
                {typer && (
                  <div className="wa-row in">
                    <div className="wa-bubble wa-typing-bubble">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                )}
                <div ref={bottom} />
              </div>

              {menuMsg && (
                <div className="wa-ctx" onClick={(e) => e.stopPropagation()}>
                  <div className="wa-react-bar">
                    {REACTIONS.map((e) => (
                      <button key={e} onClick={() => msgAction('react:' + e, menuMsg)}>
                        {e}
                      </button>
                    ))}
                  </div>
                  {!menuMsg.deleted && (
                    <button onClick={() => msgAction('reply', menuMsg)}>
                      <i className="fa-solid fa-reply" /> Balas
                    </button>
                  )}
                  {menuMsg.text && (
                    <button onClick={() => msgAction('copy', menuMsg)}>
                      <i className="fa-regular fa-copy" /> Salin
                    </button>
                  )}
                  <button onClick={() => msgAction('forward', menuMsg)}>
                    <i className="fa-solid fa-share" /> Teruskan
                  </button>
                  <button onClick={() => msgAction('star', menuMsg)}>
                    <i className="fa-regular fa-star" /> {menuMsg.starred ? 'Lepas bintang' : 'Bintangi'}
                  </button>
                  <button onClick={() => msgAction('delete-me', menuMsg)}>
                    <i className="fa-regular fa-trash-can" /> Hapus untuk saya
                  </button>
                  {menuMsg.from === 'me' && !menuMsg.deleted && (
                    <button onClick={() => msgAction('delete-all', menuMsg)}>
                      <i className="fa-solid fa-trash" /> Hapus untuk semua
                    </button>
                  )}
                </div>
              )}

              {replyTo && (
                <div className="wa-replying">
                  <div>
                    <b>{replyTo.from === 'me' ? 'Anda' : active.members.find((x) => x.id === replyTo.from)?.name}</b>
                    <span>{previewOf(replyTo)}</span>
                  </div>
                  <button className="wa-icon" onClick={() => setReplyTo(null)}>
                    <i className="fa-solid fa-xmark" />
                  </button>
                </div>
              )}

              {emojiOpen && (
                <div className="wa-emoji" onClick={(e) => e.stopPropagation()}>
                  {EMOJIS.map((e) => (
                    <button key={e} onClick={() => updChat(active.id, (c) => ({ ...c, draft: c.draft + e }))}>
                      {e}
                    </button>
                  ))}
                </div>
              )}

              {rec ? (
                <div className="wa-composer rec">
                  <button className="wa-icon danger" title="Batal" onClick={() => stopRec(false)}>
                    <i className="fa-solid fa-trash" />
                  </button>
                  <span className="wa-recdot" /> <b>{fmtDur(rec.sec)}</b>
                  <div className="wa-recwave">
                    {Array.from({ length: 28 }, (_, i) => (
                      <span key={i} style={{ animationDelay: `${i * 60}ms` }} />
                    ))}
                  </div>
                  <button className="wa-send" title="Kirim" onClick={() => stopRec(true)}>
                    <i className="fa-solid fa-paper-plane" />
                  </button>
                </div>
              ) : (
                <div className="wa-composer" onClick={(e) => e.stopPropagation()}>
                  <button className={`wa-icon${emojiOpen ? ' on' : ''}`} title="Emoji" onClick={() => setEmojiOpen((o) => !o)}>
                    <i className="fa-regular fa-face-smile" />
                  </button>
                  <div style={{ position: 'relative' }}>
                    <button className="wa-icon" title="Lampirkan" onClick={() => setAttachOpen((o) => !o)}>
                      <i className="fa-solid fa-paperclip" />
                    </button>
                    {attachOpen && (
                      <div className="wa-attach">
                        <button
                          onClick={() => {
                            mediaInput.current.click();
                            setAttachOpen(false);
                          }}
                        >
                          <span style={{ background: '#7c3aed' }}>
                            <i className="fa-solid fa-image" />
                          </span>{' '}
                          Foto & Video
                        </button>
                        <button
                          onClick={() => {
                            docInput.current.click();
                            setAttachOpen(false);
                          }}
                        >
                          <span style={{ background: '#2563eb' }}>
                            <i className="fa-solid fa-file" />
                          </span>{' '}
                          Dokumen
                        </button>
                      </div>
                    )}
                  </div>
                  <input ref={mediaInput} type="file" accept="image/*,video/*" multiple hidden onChange={pickMedia} />
                  <input ref={docInput} type="file" multiple hidden onChange={pickDoc} />
                  <textarea
                    ref={textRef}
                    rows={1}
                    placeholder="Ketik pesan"
                    value={active.draft}
                    onChange={(e) => {
                      const v = e.target.value;
                      updChat(active.id, (c) => ({ ...c, draft: v }));
                      e.target.style.height = 'auto';
                      e.target.style.height = Math.min(e.target.scrollHeight, 110) + 'px';
                    }}
                    onKeyDown={onKey}
                  />
                  {active.draft.trim() ? (
                    <button className="wa-send" title="Kirim" onClick={sendText}>
                      <i className="fa-solid fa-paper-plane" />
                    </button>
                  ) : (
                    <button className="wa-send" title="Rekam pesan suara" onClick={startRec}>
                      <i className="fa-solid fa-microphone" />
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* media preview before sending */}
      {preview && (
        <div className="wa-overlay">
          <div className="wa-preview">
            <button className="wa-icon wa-close" onClick={() => setPreview(null)}>
              <i className="fa-solid fa-xmark" />
            </button>
            <div className="wa-preview-files">
              {preview.files.map((f) =>
                f.type === 'video' ? <video key={f.url} src={f.url} controls /> : <img key={f.url} src={f.url} alt={f.name} />,
              )}
            </div>
            <div className="wa-preview-bar">
              <input
                placeholder="Tambahkan keterangan..."
                value={preview.caption}
                onChange={(e) => setPreview((p) => ({ ...p, caption: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && sendPreview()}
              />
              <button className="wa-send" onClick={sendPreview}>
                <i className="fa-solid fa-paper-plane" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* lightbox */}
      {lightbox && (
        <div className="wa-overlay" onClick={() => setLightbox(null)}>
          <button className="wa-icon wa-close" onClick={() => setLightbox(null)}>
            <i className="fa-solid fa-xmark" />
          </button>
          <div onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
            {lightbox.type === 'video' ? (
              <video src={lightbox.src} controls autoPlay className="wa-light" />
            ) : (
              <img src={lightbox.src} alt="" className="wa-light" />
            )}
            {lightbox.text && <p style={{ color: '#fff', marginTop: 10 }}>{lightbox.text}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
