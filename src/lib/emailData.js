// Dummy mailbox for /email. Replace seedEmails() with your mail API (IMAP/Gmail/Graph ...).
export const ME = { name: 'Admin User', email: 'admin@nusacore.id' };

export const FOLDERS = [
  { id: 'inbox', label: 'Inbox', icon: 'fa-inbox' },
  { id: 'starred', label: 'Berbintang', icon: 'fa-star' },
  { id: 'sent', label: 'Terkirim', icon: 'fa-paper-plane' },
  { id: 'drafts', label: 'Draft', icon: 'fa-file-lines' },
  { id: 'archive', label: 'Arsip', icon: 'fa-box-archive' },
  { id: 'spam', label: 'Spam', icon: 'fa-ban' },
  { id: 'trash', label: 'Sampah', icon: 'fa-trash' },
];

export const LABELS = [
  { id: 'work', label: 'Pekerjaan', color: '#2563eb' },
  { id: 'finance', label: 'Finance', color: '#16a34a' },
  { id: 'client', label: 'Klien', color: '#7c3aed' },
  { id: 'personal', label: 'Personal', color: '#f59e0b' },
];

export const CONTACTS = [
  { name: 'Rina Wijaya', email: 'rina@nusacore.id' },
  { name: 'Andi Pratama', email: 'andi@nusacore.id' },
  { name: 'Budi Hartono', email: 'budi@sinarjaya.test' },
  { name: 'Sari Dewi', email: 'sari@majulancar.test' },
  { name: 'HR Department', email: 'hr@nusacore.id' },
  { name: 'Dewi Lestari', email: 'dewi@nusacore.id' },
];

const P = (name, email) => ({ name, email });
const me = P(ME.name, ME.email);

export function seedEmails(now) {
  const ago = (min) => new Date(now.getTime() - min * 60000).toISOString();
  let n = 0;
  const m = (from, to, min, html, attachments = [], extra = {}) => ({
    id: `m${++n}`,
    from,
    to,
    cc: [],
    ts: ago(min),
    html,
    attachments,
    ...extra,
  });

  const rina = P('Rina Wijaya', 'rina@nusacore.id');
  const budi = P('Budi Hartono', 'budi@sinarjaya.test');
  const andi = P('Andi Pratama', 'andi@nusacore.id');
  const hr = P('HR Department', 'hr@nusacore.id');

  return [
    {
      id: 't1',
      subject: 'Invoice INV-2026-001 menunggu pembayaran',
      folder: 'inbox',
      unread: true,
      starred: false,
      labels: ['finance'],
      messages: [
        m(me, [rina.email], 2600, '<p>Hai Rina, tolong cek status pembayaran INV-2026-001 dari PT Sinar Jaya ya.</p>'),
        m(
          rina,
          [ME.email],
          38,
          '<p>Halo Admin,</p><p>Invoice <b>INV-2026-001</b> sebesar <b>Rp 35.004.100</b> sudah kami kirim ke PT Sinar Jaya. Uang muka Rp 10.000.000 sudah masuk, sisa <b>Rp 25.004.100</b> jatuh tempo 24 Juni.</p><ul><li>Termin: Net 30</li><li>Metode: Transfer BCA</li></ul><p>Salinan invoice terlampir. Mohon konfirmasi jika ada koreksi.</p><p>Salam,<br>Rina</p>',
          [{ name: 'INV-2026-001.pdf', size: 248000 }],
        ),
      ],
    },
    {
      id: 't2',
      subject: 'Re: Jadwal implementasi ERP',
      folder: 'inbox',
      unread: true,
      starred: true,
      labels: ['client', 'work'],
      messages: [
        m(budi, [ME.email], 1900, '<p>Selamat siang, kami ingin konfirmasi jadwal implementasi ERP mulai awal bulan depan.</p>'),
        m(
          me,
          [budi.email],
          1500,
          '<p>Selamat siang Pak Budi, jadwal tersedia mulai 2 Juni. Tim kami akan on-site selama 2 hari untuk training.</p>',
        ),
        m(
          budi,
          [ME.email],
          95,
          '<p>Baik, 2 Juni kami setuju. Berikut daftar user dan hak akses yang perlu disiapkan (lampiran).</p><p>Mohon kirim juga agenda training per hari.</p><p>Terima kasih,<br>Budi Hartono<br>PT Sinar Jaya</p>',
          [
            { name: 'daftar-user-akses.xlsx', size: 56000 },
            { name: 'denah-gudang.png', size: 812000 },
          ],
        ),
      ],
    },
    {
      id: 't3',
      subject: 'Undangan rapat bulanan - Jumat 14:00',
      folder: 'inbox',
      unread: true,
      starred: false,
      labels: ['work'],
      messages: [
        m(
          hr,
          [ME.email],
          180,
          '<p>Dear Team,</p><p>Rapat bulanan akan dilaksanakan <b>Jumat pukul 14:00 WIB</b> di Ruang Meeting Lt. 12 (atau via Google Meet).</p><p>Agenda:</p><ol><li>Review target bulan ini</li><li>Update proyek ERP</li><li>Rencana rekrutmen Q4</li></ol><p>Mohon konfirmasi kehadiran.</p>',
        ),
      ],
    },
    {
      id: 't4',
      subject: '[nusacore/admin] Pull request #42 merged',
      folder: 'inbox',
      unread: false,
      starred: false,
      labels: [],
      messages: [
        m(
          P('GitHub', 'noreply@github.com'),
          [ME.email],
          340,
          '<p><b>dewi-lestari</b> merged pull request <b>#42: Add data-table export</b> into <code>main</code>.</p><p>3 files changed, +214 -12.</p>',
        ),
      ],
    },
    {
      id: 't5',
      subject: 'Laporan penjualan Oktober',
      folder: 'inbox',
      unread: false,
      starred: true,
      labels: ['work', 'finance'],
      messages: [
        m(
          andi,
          [ME.email],
          1700,
          '<p>Hi, laporan penjualan Oktober terlampir. Highlight: revenue naik <b>8,2%</b> dibanding bulan lalu, konversi 4,8%.</p><p>Detail per region ada di sheet kedua.</p>',
          [{ name: 'laporan-penjualan-okt.xlsx', size: 184000 }],
        ),
      ],
    },
    {
      id: 't6',
      subject: 'Peringatan keamanan: login baru terdeteksi',
      folder: 'inbox',
      unread: true,
      starred: false,
      labels: [],
      messages: [
        m(
          P('Security Alert', 'security@accounts.test'),
          [ME.email],
          620,
          '<p>Kami mendeteksi login baru ke akun Anda dari <b>Chrome di Windows</b> (Jakarta, ID).</p><p>Jika ini bukan Anda, segera ganti password.</p>',
        ),
      ],
    },
    {
      id: 't7',
      subject: 'Weekly Digest: tren dashboard & UX 2026',
      folder: 'inbox',
      unread: false,
      starred: false,
      labels: ['personal'],
      messages: [
        m(
          P('Design Weekly', 'news@designweekly.test'),
          [ME.email],
          4300,
          '<p>Minggu ini: 7 tren dashboard admin 2026, dark mode yang benar, dan tabel data yang cepat.</p><p><a href="#">Baca selengkapnya</a></p>',
        ),
      ],
    },
    {
      id: 't8',
      subject: 'Notifikasi mutasi rekening',
      folder: 'inbox',
      unread: true,
      starred: false,
      labels: ['finance'],
      messages: [
        m(
          P('Bank Central', 'info@bank.test'),
          [ME.email],
          55,
          '<p>Dana masuk <b>Rp 10.000.000</b> ke rekening 123 456 7890 pada hari ini. Ref: TRX-88213.</p>',
        ),
      ],
    },
    {
      id: 't9',
      subject: 'Penawaran harga lisensi ERP',
      folder: 'sent',
      unread: false,
      starred: false,
      labels: ['client'],
      messages: [
        m(
          me,
          ['sari@majulancar.test'],
          2900,
          '<p>Selamat pagi Ibu Sari,</p><p>Terlampir penawaran lisensi ERP untuk 10 user (Professional). Penawaran berlaku 14 hari.</p><p>Salam,<br>Admin User</p>',
          [{ name: 'Penawaran-MajuLancar.pdf', size: 320000 }],
        ),
      ],
    },
    {
      id: 't10',
      subject: 'Proposal kerja sama distribusi',
      folder: 'drafts',
      unread: false,
      starred: false,
      labels: [],
      messages: [
        m(me, ['andi@nusacore.id'], 400, '<p>Hi Andi, berikut draft proposal kerja sama distribusi untuk wilayah Jawa Barat...</p>', [], {
          draft: true,
        }),
      ],
    },
    {
      id: 't11',
      subject: 'SELAMAT! Anda memenangkan hadiah Rp 500 juta!!!',
      folder: 'spam',
      unread: true,
      starred: false,
      labels: [],
      messages: [
        m(P('Promo Hadiah', 'win@scam.test'), [ME.email], 5000, '<p>Klik link berikut untuk klaim hadiah Anda sekarang juga!</p>'),
      ],
    },
    {
      id: 't12',
      subject: 'Kontrak vendor 2026 (final)',
      folder: 'archive',
      unread: false,
      starred: false,
      labels: ['work'],
      messages: [
        m(
          P('Legal', 'legal@nusacore.id'),
          [ME.email],
          9000,
          '<p>Kontrak vendor 2026 versi final sudah ditandatangani kedua pihak. Arsip terlampir.</p>',
          [{ name: 'kontrak-vendor-2026.pdf', size: 1240000 }],
        ),
      ],
    },
    {
      id: 't13',
      subject: 'Test email',
      folder: 'trash',
      prev: 'inbox',
      unread: false,
      starred: false,
      labels: [],
      messages: [m(P('Dewi Lestari', 'dewi@nusacore.id'), [ME.email], 12000, '<p>Test 123</p>')],
    },
  ];
}

// ---- helpers ----
export const sanitize = (h = '') =>
  h
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '');

export const stripHtml = (h = '') =>
  h
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const pad = (x) => String(x).padStart(2, '0');
export function fmtShort(iso, now) {
  const d = new Date(iso);
  if (d.toDateString() === now.toDateString()) return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  if (d.getFullYear() === now.getFullYear()) return `${d.getDate()} ${MON[d.getMonth()]}`;
  return `${d.getDate()} ${MON[d.getMonth()]} ${d.getFullYear()}`;
}
export const fmtFull = (iso) => {
  const d = new Date(iso);
  return `${d.getDate()} ${MON[d.getMonth()]} ${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
export const fmtSize = (b) => (b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB');
export const initials = (name) =>
  name
    .split(' ')
    .map((x) => x[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
const COLORS = ['#2563eb', '#7c3aed', '#16a34a', '#f59e0b', '#ef4444', '#0ea5e9', '#db2777', '#0d9488'];
export const colorFor = (s) => COLORS[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length];
export const fileIcon = (name = '') => {
  const e = name.split('.').pop().toLowerCase();
  if (e === 'pdf') return 'fa-file-pdf';
  if (['xls', 'xlsx', 'csv'].includes(e)) return 'fa-file-excel';
  if (['doc', 'docx'].includes(e)) return 'fa-file-word';
  if (['ppt', 'pptx'].includes(e)) return 'fa-file-powerpoint';
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(e)) return 'fa-file-image';
  if (['zip', 'rar', '7z'].includes(e)) return 'fa-file-zipper';
  if (['mp4', 'mov', 'webm'].includes(e)) return 'fa-file-video';
  return 'fa-file';
};
