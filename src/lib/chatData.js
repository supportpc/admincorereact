// Dummy chats for /chat. Replace seedChats() and the send/receive logic with your realtime backend (WebSocket, Firebase, ...).
export const ME = { id: 'me', name: 'Admin User' };

export const EMOJIS = [
  '😀',
  '😃',
  '😄',
  '😁',
  '😆',
  '😅',
  '😂',
  '🤣',
  '😊',
  '😇',
  '🙂',
  '😉',
  '😍',
  '🥰',
  '😘',
  '😋',
  '😎',
  '🤩',
  '🥳',
  '🤔',
  '😐',
  '😴',
  '😢',
  '😭',
  '😡',
  '🤯',
  '😱',
  '🙏',
  '👍',
  '👎',
  '👏',
  '🙌',
  '💪',
  '🤝',
  '👌',
  '✌️',
  '🔥',
  '✨',
  '🎉',
  '❤️',
  '💙',
  '💯',
  '✅',
  '❌',
  '⚠️',
  '📌',
  '📎',
  '📷',
  '🎥',
  '📄',
  '💼',
  '📊',
  '📈',
  '☕',
  '🍕',
  '🚀',
  '⏰',
  '📞',
  '💡',
];

export const REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

export function svgImage(c1, c2) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='420' viewBox='0 0 640 420'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c1}'/><stop offset='1' stop-color='${c2}'/></linearGradient></defs><rect width='640' height='420' fill='url(#g)'/><circle cx='500' cy='110' r='48' fill='rgba(255,255,255,.6)'/><path d='M0 340 L150 190 L260 290 L380 150 L520 300 L640 230 V420 H0Z' fill='rgba(0,0,0,.22)'/></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

export function seedChats(now) {
  const ago = (min) => new Date(now.getTime() - min * 60000).toISOString();
  let n = 0;
  const mk = (chat, from, type, min, props = {}) => ({
    id: `${chat}-${++n}`,
    from,
    type,
    ts: ago(min),
    status: 'read',
    reactions: {},
    ...props,
  });

  const rina = { id: 'rina', name: 'Rina Wijaya' };
  const andi = { id: 'andi', name: 'Andi Pratama' };
  const dewi = { id: 'dewi', name: 'Dewi Lestari' };

  const c1 = [
    mk('rina', 'rina', 'text', 1500, { text: 'Pagi! Invoice Sinar Jaya sudah saya kirim ya.' }),
    mk('rina', 'me', 'text', 1490, { text: 'Siap, terima kasih Rin 🙏' }),
    mk('rina', 'rina', 'image', 120, { src: svgImage('#2563eb', '#7c3aed'), text: 'Screenshot bukti transfer DP' }),
    mk('rina', 'me', 'text', 112, { text: 'Oke sudah masuk Rp 10 juta. Sisanya kapan jatuh tempo?', reactions: { rina: '👍' } }),
    mk('rina', 'rina', 'text', 108, { text: 'Jatuh tempo 24 Juni, termin Net 30.' }),
    mk('rina', 'rina', 'file', 105, { name: 'INV-2026-001.pdf', size: 248000 }),
    mk('rina', 'me', 'text', 20, { text: 'Noted. Nanti saya follow up ke Pak Budi.', replyTo: null }),
    mk('rina', 'rina', 'text', 4, { text: 'Sip! Kabari kalau ada kendala ya 👍' }),
  ];
  const c2 = [
    mk('support', 'andi', 'text', 2900, { text: 'Tim, ada update fitur export Excel di tabel produk.' }),
    mk('support', 'dewi', 'video', 2880, { src: '/media/demo-video.mp4', duration: 3, text: 'Demo singkat fiturnya' }),
    mk('support', 'me', 'text', 2870, { text: 'Keren! Sudah bisa export yang terpilih saja?', status: 'read' }),
    mk('support', 'dewi', 'text', 2860, { text: 'Bisa. Kalau tidak ada yang dipilih, export semua hasil filter.' }),
    mk('support', 'andi', 'audio', 300, { src: '/media/voice-sample.wav', duration: 3 }),
    mk('support', 'rina', 'text', 240, { text: 'Besok jam 10 kita review bareng ya.' }),
  ];
  const c3 = [
    mk('budi', 'me', 'text', 1800, { text: 'Selamat siang Pak Budi, jadwal implementasi 2 Juni sudah kami konfirmasi.' }),
    mk('budi', 'budi', 'text', 90, { text: 'Terima kasih. Mohon kirim agenda training per hari ya.', status: 'delivered' }),
    mk('budi', 'budi', 'text', 88, { text: 'Dan daftar user yang perlu kami siapkan.' }),
  ];
  const c4 = [
    mk('andi', 'andi', 'text', 700, { text: 'Laporan Oktober sudah saya taruh di email.' }),
    mk('andi', 'me', 'text', 690, { text: 'Thanks Ndi!' }),
    mk('andi', 'andi', 'audio', 60, { src: '/media/voice-sample.wav', duration: 3 }),
  ];
  const c5 = [
    mk('dewi', 'me', 'text', 3000, { text: 'Dew, PR #42 sudah saya review.' }),
    mk('dewi', 'dewi', 'text', 2990, { text: 'Mantap, makasih. Nanti saya merge.' }),
    mk('dewi', 'dewi', 'image', 2985, { src: svgImage('#0ea5e9', '#10b981'), text: 'Hasil tampilan dark mode' }),
  ];
  const c6 = [
    mk('sari', 'sari', 'text', 4000, { text: 'Selamat pagi, penawaran lisensinya sudah kami terima.' }),
    mk('sari', 'me', 'text', 3990, { text: 'Baik Bu Sari, kabari jika ada pertanyaan.' }),
  ];
  const c7 = [
    mk('dev', 'dewi', 'text', 500, { text: 'Deploy production jam 22:00 malam ini.' }),
    mk('dev', 'andi', 'text', 495, { text: 'Oke, freeze merge dari jam 20:00 ya.' }),
    mk('dev', 'me', 'text', 490, { text: '👍' }),
  ];

  const unreadOf = (arr, lastFrom) => arr.filter((m) => m.from !== 'me').slice(-lastFrom).length;

  return [
    {
      id: 'rina',
      type: 'dm',
      name: 'Rina Wijaya',
      about: 'Finance · NusaCore',
      phone: '+62 812-1111-0001',
      online: true,
      pinned: true,
      muted: false,
      unread: 0,
      draft: '',
      members: [rina],
      messages: c1,
    },
    {
      id: 'support',
      type: 'group',
      name: 'Tim Support',
      about: 'Grup koordinasi support & produk',
      online: false,
      pinned: true,
      muted: false,
      unread: 1,
      draft: '',
      members: [rina, andi, dewi],
      messages: c2,
    },
    {
      id: 'budi',
      type: 'dm',
      name: 'Budi Hartono',
      about: 'PT Sinar Jaya',
      phone: '+62 21-7788-9900',
      online: false,
      lastSeen: ago(35),
      pinned: false,
      muted: false,
      unread: unreadOf(c3, 2),
      draft: '',
      members: [{ id: 'budi', name: 'Budi Hartono' }],
      messages: c3,
    },
    {
      id: 'andi',
      type: 'dm',
      name: 'Andi Pratama',
      about: 'Sales · NusaCore',
      phone: '+62 812-1111-0002',
      online: true,
      pinned: false,
      muted: false,
      unread: 1,
      draft: '',
      members: [andi],
      messages: c4,
    },
    {
      id: 'dewi',
      type: 'dm',
      name: 'Dewi Lestari',
      about: 'Engineer · NusaCore',
      phone: '+62 812-1111-0003',
      online: false,
      lastSeen: ago(300),
      pinned: false,
      muted: false,
      unread: 0,
      draft: '',
      members: [dewi],
      messages: c5,
    },
    {
      id: 'sari',
      type: 'dm',
      name: 'Sari Dewi',
      about: 'CV Maju Lancar',
      phone: '+62 22-4455-667',
      online: false,
      lastSeen: ago(2000),
      pinned: false,
      muted: true,
      unread: 0,
      draft: '',
      members: [{ id: 'sari', name: 'Sari Dewi' }],
      messages: c6,
    },
    {
      id: 'dev',
      type: 'group',
      name: 'Dev Team',
      about: 'Deploy, bug, dan code review',
      online: false,
      pinned: false,
      muted: false,
      unread: 0,
      draft: '',
      members: [andi, dewi],
      messages: c7,
    },
  ];
}

// ---- helpers ----
const pad = (x) => String(x).padStart(2, '0');
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
export const hhmm = (iso) => {
  const d = new Date(iso);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
export function dayLabel(iso, now) {
  const d = new Date(iso);
  const diff = Math.round((new Date(now.toDateString()) - new Date(d.toDateString())) / 86400000);
  if (diff === 0) return 'Hari ini';
  if (diff === 1) return 'Kemarin';
  return `${d.getDate()} ${MON[d.getMonth()]} ${d.getFullYear()}`;
}
export function listTime(iso, now) {
  const diff = Math.round((new Date(now.toDateString()) - new Date(new Date(iso).toDateString())) / 86400000);
  if (diff === 0) return hhmm(iso);
  if (diff === 1) return 'Kemarin';
  const d = new Date(iso);
  return `${d.getDate()}/${d.getMonth() + 1}/${String(d.getFullYear()).slice(2)}`;
}
export const fmtDur = (s) => `${Math.floor(s / 60)}:${pad(Math.round(s % 60))}`;
export const fmtSize = (b) => (b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB');
export const previewOf = (m) => {
  if (!m) return '';
  if (m.deleted) return '🚫 Pesan ini telah dihapus';
  if (m.type === 'image') return '📷 ' + (m.text || 'Foto');
  if (m.type === 'video') return '🎥 ' + (m.text || 'Video');
  if (m.type === 'audio') return '🎤 Pesan suara ' + fmtDur(m.duration || 0);
  if (m.type === 'file') return '📄 ' + m.name;
  return m.text;
};
const COLORS = ['#2563eb', '#7c3aed', '#16a34a', '#f59e0b', '#ef4444', '#0ea5e9', '#db2777', '#0d9488'];
export const colorFor = (s) => COLORS[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length];
export const initials = (name) =>
  name
    .split(' ')
    .map((x) => x[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
