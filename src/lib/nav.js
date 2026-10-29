// Single source of truth for sidebar, top navbar, breadcrumb and command palette.

export const navSections = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', icon: 'fa-house', href: '/dashboard' },
      { label: 'User Management', icon: 'fa-users', href: '/users', pill: '12' },
      { label: 'Role & Permission', icon: 'fa-shield-halved', href: '/roles' },
      { label: 'Products / Catalog', icon: 'fa-boxes-stacked', href: '/products' },
      { label: 'Orders / Tickets', icon: 'fa-truck', href: '/orders' },
      { label: 'Transactions', icon: 'fa-credit-card', href: '/transactions' },
      { label: 'Invoices', icon: 'fa-file-invoice-dollar', href: '/invoice' },
      { label: 'Data Table', icon: 'fa-table', href: '/data-table' },
      { label: 'Billing', icon: 'fa-wallet', href: '/billing' },
      { label: 'Advanced Forms', icon: 'fa-pen-to-square', href: '/advanced-forms' },
      { label: 'DataTables', icon: 'fa-table-list', href: '/datatables' },
    ],
  },
  {
    title: 'Operational',
    items: [
      { label: 'Notifications', icon: 'fa-bell', href: '/notifications', pill: '5' },
      { label: 'Email', icon: 'fa-envelope', href: '/email', pill: '4' },
      { label: 'Chat', icon: 'fa-comments', href: '/chat', pill: '2' },
      { label: 'File Manager', icon: 'fa-folder-open', href: '/file-manager' },
      { label: 'Reports', icon: 'fa-chart-line', href: '/reports' },
      { label: 'Audit Log', icon: 'fa-clipboard-list', href: '/audit' },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Settings', icon: 'fa-gear', href: '/settings' },
      { label: 'Profile', icon: 'fa-user-gear', href: '/profile' },
      { label: 'API & Integrations', icon: 'fa-plug', href: '/api-integrations' },
      { label: 'Docs', icon: 'fa-book', href: '/docs' },
    ],
  },
  {
    title: 'Showcase',
    items: [
      { label: 'UI Components', icon: 'fa-layer-group', href: '/components' },
      { label: 'Auth Pages', icon: 'fa-right-to-bracket', href: '/auth' },
      { label: 'Loading States', icon: 'fa-spinner', href: '/states' },
      { label: 'Layout Variants', icon: 'fa-window-restore', href: '/layouts' },
      { label: 'Onboarding Wizard', icon: 'fa-route', href: '/onboarding' },
      { label: 'Detail Pages', icon: 'fa-circle-info', href: '/details' },
      { label: 'Permission Preview', icon: 'fa-user-shield', href: '/permission-preview' },
      { label: 'Modals', icon: 'fa-window-maximize', href: '/modals' },
      { label: 'Error Pages', icon: 'fa-triangle-exclamation', href: '/error-pages' },
    ],
  },
];

export const allNavItems = navSections.flatMap((s) => s.items);

export function findNavLabel(pathname) {
  const hit = allNavItems.find((i) => pathname === i.href || pathname.startsWith(i.href + '/'));
  return hit ? hit.label : 'Dashboard';
}

// target = route ("page-xxx" -> "/xxx"), action = named quick action
export const commandItems = [
  { title: 'Dashboard', desc: 'Ringkasan aplikasi', icon: 'fa-house', target: 'page-dashboard' },
  { title: 'User Management', desc: 'Kelola user dan role', icon: 'fa-users', target: 'page-users' },
  { title: 'Transaksi', desc: 'Monitoring pembayaran', icon: 'fa-credit-card', target: 'page-transactions' },
  { title: 'Billing', desc: 'Paket, invoice, usage limit', icon: 'fa-wallet', target: 'page-billing' },
  { title: 'File Manager', desc: 'Upload dan media library', icon: 'fa-folder-open', target: 'page-file-manager' },
  { title: 'Error Pages', desc: '403, 404, 500, maintenance', icon: 'fa-triangle-exclamation', target: 'page-error-pages' },
  { title: 'Loading States', desc: 'Skeleton, empty, retry', icon: 'fa-spinner', target: 'page-states' },
  { title: 'Layout Variants', desc: 'Sidebar, topbar, compact', icon: 'fa-window-restore', target: 'page-layouts' },
  { title: 'Documentation', desc: 'Panduan penggunaan library', icon: 'fa-book', target: 'page-docs' },
  { title: 'Modals', desc: 'Modal dan toast demo', icon: 'fa-window-maximize', target: 'page-modals' },
  { title: 'Login Page', desc: 'Halaman login standalone', icon: 'fa-right-to-bracket', target: 'page-login' },
  { title: 'Invoices', desc: 'Invoice ERP profesional', icon: 'fa-file-invoice-dollar', target: 'page-invoice' },
  { title: 'Data Table', desc: 'Tabel lengkap: filter, sort, export', icon: 'fa-table', target: 'page-data-table' },
  { title: 'Email', desc: 'Inbox, kirim, tulis, balas', icon: 'fa-envelope', target: 'page-email' },
  { title: 'Chat', desc: 'Pesan, foto, video, voice note', icon: 'fa-comments', target: 'page-chat' },
  { title: 'Tambah User', desc: 'Quick action create user', icon: 'fa-user-plus', action: 'addUser' },
  { title: 'Open Settings', desc: 'Pengaturan aplikasi', icon: 'fa-gear', target: 'page-settings' },
];
