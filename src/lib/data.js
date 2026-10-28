// Dummy data (ported from js/app.js). Replace with API calls later.

export const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Super Admin', area: 'Global', status: 'Active', last: 'Baru saja' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', area: 'Jakarta', status: 'Active', last: '10 menit lalu' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Cashier', area: 'Bandung', status: 'Pending', last: 'Kemarin' },
  { id: 4, name: 'Sarah Connor', email: 'sarah@example.com', role: 'Operator', area: 'Global', status: 'Banned', last: '3 hari lalu' },
  { id: 5, name: 'Abdul Haris', email: 'dev@example.com', role: 'Admin', area: 'Cirebon', status: 'Active', last: '1 jam lalu' },
];

export const transactions = [
  { inv: 'INV-2026-001', cust: 'PT Sinar Jaya', method: 'VA BRI', total: 'Rp 2.500.000', status: 'Paid', date: '25 Mei 2026' },
  { inv: 'INV-2026-002', cust: 'CV Maju Lancar', method: 'QRIS', total: 'Rp 450.000', status: 'Pending', date: '25 Mei 2026' },
  { inv: 'INV-2026-003', cust: 'Budi Santoso', method: 'Transfer', total: 'Rp 125.000', status: 'Failed', date: '24 Mei 2026' },
  { inv: 'INV-2026-004', cust: 'Toko Komputer AA', method: 'VA BCA', total: 'Rp 3.200.000', status: 'Refunded', date: '24 Mei 2026' },
];

export const audits = [
  ['25 Mei 2026 10:21', 'Admin User', 'Update permission Cashier', '103.88.22.1', 'Medium'],
  ['25 Mei 2026 09:14', 'Jane Smith', 'Create new user', '103.88.22.2', 'Low'],
  ['24 Mei 2026 21:10', 'System', 'Failed login detected', '114.10.10.7', 'High'],
  ['24 Mei 2026 18:45', 'Admin User', 'Export report transaksi', '103.88.22.1', 'Low'],
];

export const permissions = [
  'Dashboard View',
  'User Create',
  'User Update',
  'User Delete',
  'Role Manage',
  'Transaction View',
  'Transaction Refund',
  'Report Export',
  'Audit View',
  'Settings Update',
  'Notification Send',
  'Profile Update',
];

export const errorTemplates = {
  404: {
    code: '404',
    icon: 'fa-map-signs',
    title: 'Halaman tidak ditemukan',
    desc: 'Route yang diakses tidak tersedia atau sudah dipindahkan.',
  },
  403: { code: '403', icon: 'fa-user-lock', title: 'Akses ditolak', desc: 'User tidak memiliki permission untuk membuka halaman ini.' },
  500: {
    code: '500',
    icon: 'fa-bug',
    title: 'Server error',
    desc: 'Terjadi kesalahan pada server. Tampilkan tombol retry atau hubungi support.',
  },
  maintenance: {
    code: 'MAINT',
    icon: 'fa-screwdriver-wrench',
    title: 'Maintenance Mode',
    desc: 'Sistem sedang dalam pemeliharaan terjadwal.',
  },
  session: { code: 'SESSION', icon: 'fa-clock', title: 'Session expired', desc: 'Sesi login sudah berakhir. User perlu login ulang.' },
  soon: { code: 'SOON', icon: 'fa-rocket', title: 'Coming soon', desc: 'Fitur ini sedang disiapkan dan belum tersedia untuk user.' },
};

const BADGES = {
  Active: 'badge-success',
  Pending: 'badge-warning',
  Banned: 'badge-danger',
  Paid: 'badge-success',
  Failed: 'badge-danger',
  Refunded: 'badge-gray',
  Low: 'badge-success',
  Medium: 'badge-warning',
  High: 'badge-danger',
};
export const badgeClass = (s) => BADGES[s] || 'badge-primary';
