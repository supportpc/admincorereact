// ---------------------------------------------------------------------------
// Invoice data layer. Everything on the invoice page is computed from an
// "invoice" object shaped like the ones below, so to go live just replace
// getInvoices()/getInvoiceById() with calls to your backend/API.
// ---------------------------------------------------------------------------

const COMPANY = {
  name: 'PT Nusa Core Teknologi',
  tagline: 'Enterprise Solutions & Services',
  address: ['Gedung Nusa Tower Lt. 12, Jl. Jend. Sudirman Kav. 45', 'Jakarta Selatan 12930, Indonesia'],
  npwp: '01.234.567.8-012.000',
  phone: '+62 21 5555 0100',
  email: 'finance@ReactCore.id',
  website: 'www.ReactCore.id',
};

const BANK = { bank: 'Bank Central Asia (BCA)', account: '123 456 7890', holder: 'PT Nusa Core Teknologi', branch: 'KCU Sudirman' };

const TERMS = [
  'Pembayaran dilakukan paling lambat pada tanggal jatuh tempo melalui transfer ke rekening di atas.',
  'Mohon cantumkan nomor invoice pada berita transfer.',
  'Keterlambatan pembayaran dikenakan denda 2% per bulan dari total tagihan.',
  'Barang yang sudah diterima tidak dapat dikembalikan kecuali ada kesepakatan tertulis.',
];

const invoices = [
  {
    id: 'INV-2026-001',
    issueDate: '2026-05-25',
    dueDate: '2026-06-24',
    status: 'Unpaid',
    poNumber: 'PO/SJ/05/2026/118',
    paymentTerms: 'Net 30',
    salesperson: 'Rina Wijaya',
    customer: {
      name: 'PT Sinar Jaya',
      contact: 'Budi Hartono',
      email: 'finance@sinarjaya.test',
      phone: '+62 21 7788 9900',
      address: ['Jl. Contoh No. 10, Kebayoran Baru', 'Jakarta Selatan 12120'],
      npwp: '02.345.678.9-123.000',
    },
    shipTo: { name: 'PT Sinar Jaya - Gudang Cikarang', address: ['Kawasan Industri Jababeka Blok C-12', 'Cikarang, Bekasi 17530'] },
    items: [
      {
        sku: 'SRV-001',
        name: 'ERP Implementation Package',
        desc: 'Setup modul Finance, Inventory & Sales',
        qty: 1,
        unit: 'paket',
        price: 15000000,
        discountPct: 0,
        taxPct: 11,
      },
      {
        sku: 'LIC-010',
        name: 'User License (Annual)',
        desc: 'Lisensi pengguna tahunan - Professional',
        qty: 10,
        unit: 'user',
        price: 750000,
        discountPct: 10,
        taxPct: 11,
      },
      {
        sku: 'TRN-002',
        name: 'On-site Training',
        desc: 'Pelatihan tim operasional (2 hari)',
        qty: 2,
        unit: 'hari',
        price: 2500000,
        discountPct: 0,
        taxPct: 11,
      },
      {
        sku: 'SUP-100',
        name: 'Premium Support 12 Bulan',
        desc: 'Dukungan prioritas 24/7',
        qty: 1,
        unit: 'tahun',
        price: 4800000,
        discountPct: 5,
        taxPct: 11,
      },
    ],
    shipping: 250000,
    payments: [{ date: '2026-05-28', method: 'Transfer BCA', ref: 'TRX-88213', amount: 10000000 }],
    notes: 'Terima kasih atas kepercayaan Anda. Implementasi dijadwalkan mulai 2 Juni 2026.',
  },
  {
    id: 'INV-2026-002',
    issueDate: '2026-05-25',
    dueDate: '2026-06-09',
    status: 'Unpaid',
    poNumber: 'PO-MJ-0523',
    paymentTerms: 'Net 15',
    salesperson: 'Andi Pratama',
    customer: {
      name: 'CV Maju Lancar',
      contact: 'Sari Dewi',
      email: 'sari@majulancar.test',
      phone: '+62 22 4455 667',
      address: ['Jl. Asia Afrika No. 88', 'Bandung 40111'],
      npwp: '03.456.789.0-234.000',
    },
    shipTo: { name: 'CV Maju Lancar', address: ['Jl. Asia Afrika No. 88', 'Bandung 40111'] },
    items: [
      {
        sku: 'HW-210',
        name: 'Barcode Scanner 2D',
        desc: 'USB, auto-sense',
        qty: 5,
        unit: 'unit',
        price: 650000,
        discountPct: 0,
        taxPct: 11,
      },
      { sku: 'HW-305', name: 'Thermal Printer 80mm', desc: 'USB + LAN', qty: 2, unit: 'unit', price: 1450000, discountPct: 0, taxPct: 11 },
    ],
    shipping: 75000,
    payments: [],
    notes: '',
  },
  {
    id: 'INV-2026-003',
    issueDate: '2026-04-02',
    dueDate: '2026-04-17',
    status: 'Overdue',
    poNumber: 'PO/TKA/0412',
    paymentTerms: 'Net 15',
    salesperson: 'Rina Wijaya',
    customer: {
      name: 'Toko Komputer AA',
      contact: 'Agus Salim',
      email: 'agus@tokoaa.test',
      phone: '+62 274 889 120',
      address: ['Jl. Malioboro No. 21', 'Yogyakarta 55213'],
      npwp: '04.567.890.1-345.000',
    },
    shipTo: { name: 'Toko Komputer AA', address: ['Jl. Malioboro No. 21', 'Yogyakarta 55213'] },
    items: [
      {
        sku: 'SW-011',
        name: 'POS Software License',
        desc: 'Lisensi POS 1 outlet',
        qty: 3,
        unit: 'lisensi',
        price: 1800000,
        discountPct: 0,
        taxPct: 11,
      },
      {
        sku: 'SRV-020',
        name: 'Instalasi & Konfigurasi',
        desc: 'Remote installation',
        qty: 3,
        unit: 'sesi',
        price: 350000,
        discountPct: 0,
        taxPct: 11,
      },
    ],
    shipping: 0,
    payments: [],
    notes: 'Invoice ini telah melewati jatuh tempo. Mohon segera lakukan pembayaran.',
  },
  {
    id: 'INV-2026-004',
    issueDate: '2026-03-10',
    dueDate: '2026-04-09',
    status: 'Paid',
    poNumber: 'PO-BS-2203',
    paymentTerms: 'Net 30',
    salesperson: 'Andi Pratama',
    customer: {
      name: 'PT Bumi Sejahtera',
      contact: 'Hendra Gunawan',
      email: 'ap@bumisejahtera.test',
      phone: '+62 31 5566 778',
      address: ['Jl. Tunjungan No. 5', 'Surabaya 60275'],
      npwp: '05.678.901.2-456.000',
    },
    shipTo: { name: 'PT Bumi Sejahtera', address: ['Jl. Tunjungan No. 5', 'Surabaya 60275'] },
    items: [
      {
        sku: 'CON-050',
        name: 'Konsultasi Proses Bisnis',
        desc: 'Business process review',
        qty: 8,
        unit: 'jam',
        price: 1250000,
        discountPct: 0,
        taxPct: 11,
      },
      {
        sku: 'RPT-007',
        name: 'Custom Report Development',
        desc: '5 laporan kustom',
        qty: 5,
        unit: 'laporan',
        price: 900000,
        discountPct: 0,
        taxPct: 11,
      },
    ],
    shipping: 0,
    payments: [{ date: '2026-04-05', method: 'Transfer BCA', ref: 'TRX-77120', amount: 16095000 }],
    notes: 'Lunas. Terima kasih.',
  },
].map((i) => ({ company: COMPANY, bank: BANK, terms: TERMS, currency: 'IDR', ...i }));

// ---- data access (swap these for API calls) ----
export function getInvoices() {
  return invoices;
}
export function getInvoiceById(id) {
  return invoices.find((i) => i.id === id) || null;
}

// ---- calculations ----
export function calcInvoice(inv) {
  const lines = inv.items.map((it) => {
    const gross = it.qty * it.price;
    const disc = Math.round((gross * (it.discountPct || 0)) / 100);
    const net = gross - disc;
    const tax = Math.round((net * (it.taxPct || 0)) / 100);
    return { ...it, gross, disc, net, tax, total: net + tax };
  });
  const sum = (k) => lines.reduce((a, l) => a + l[k], 0);
  const subtotal = sum('gross');
  const discount = sum('disc');
  const taxable = sum('net');
  const tax = sum('tax');
  const shipping = inv.shipping || 0;
  const total = taxable + tax + shipping;
  const paid = (inv.payments || []).reduce((a, p) => a + p.amount, 0);
  const due = Math.max(0, total - paid);
  const status = due === 0 && total > 0 ? 'Paid' : paid > 0 ? 'Partial' : inv.status;
  return { lines, subtotal, discount, taxable, tax, shipping, total, paid, due, status };
}

// ---- formatting ----
export const idr = (n) => 'Rp ' + Math.round(n).toLocaleString('id-ID');
const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
export function fmtDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

const SATUAN = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];
export function terbilang(n) {
  n = Math.floor(n);
  if (n === 0) return 'nol';
  const t = (x) => {
    if (x < 12) return SATUAN[x];
    if (x < 20) return t(x - 10) + ' belas';
    if (x < 100) return t(Math.floor(x / 10)) + ' puluh' + (x % 10 ? ' ' + t(x % 10) : '');
    if (x < 200) return 'seratus' + (x - 100 ? ' ' + t(x - 100) : '');
    if (x < 1000) return t(Math.floor(x / 100)) + ' ratus' + (x % 100 ? ' ' + t(x % 100) : '');
    if (x < 2000) return 'seribu' + (x - 1000 ? ' ' + t(x - 1000) : '');
    if (x < 1e6) return t(Math.floor(x / 1e3)) + ' ribu' + (x % 1e3 ? ' ' + t(x % 1e3) : '');
    if (x < 1e9) return t(Math.floor(x / 1e6)) + ' juta' + (x % 1e6 ? ' ' + t(x % 1e6) : '');
    if (x < 1e12) return t(Math.floor(x / 1e9)) + ' miliar' + (x % 1e9 ? ' ' + t(x % 1e9) : '');
    return t(Math.floor(x / 1e12)) + ' triliun' + (x % 1e12 ? ' ' + t(x % 1e12) : '');
  };
  return t(n);
}

export const STATUS_BADGE = { Paid: 'badge-success', Partial: 'badge-primary', Unpaid: 'badge-gray', Overdue: 'badge-danger' };
export const STATUS_LABEL = { Paid: 'LUNAS', Partial: 'DIBAYAR SEBAGIAN', Unpaid: 'BELUM DIBAYAR', Overdue: 'JATUH TEMPO' };
