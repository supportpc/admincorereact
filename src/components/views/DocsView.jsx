
export default function DocsView() {
  return (
    <section id="page-docs" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Documentation</h1>
          <p className="page-desc">Panduan penggunaan third-party libraries yang terintegrasi di NusaCore.</p>
        </div>
      </div>
      <div className="docs-grid">
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-layer-group" /> Layout
          </h3>
          <p>Struktur halaman: sidebar kiri, topbar header, dan main container dengan inner content.</p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <div className="docs-code">
            <code>
              {
                '<aside class="sidebar">\n  <div class="sidebar-content">...</div>\n  <div class="sidebar-footer">...</div>\n</aside>\n\n<main class="main-wrapper">\n  <div class="main-container">\n    <header class="topbar">...</header>\n    <div class="inner-content">\n      <div class="page-head">\n        <h1 class="page-title">Judul</h1>\n        <p class="page-desc">Deskripsi</p>\n      </div>\n    </div>\n  </div>\n</main>'
              }
            </code>
          </div>
          <p>
            <strong>Collapsed sidebar:</strong> tambah class <code>{'.collapsed'}</code> ke <code>{'.sidebar'}</code>. Beralih via{' '}
            <code>{'sidebarToggle'}</code>.
          </p>
          <p>
            <strong>Mobile:</strong> <code>{'.sidebar-backdrop'}</code> untuk overlay. Sidebar otomatis <code>{'position:fixed'}</code> di
            HP.
          </p>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-square-up-right" /> Buttons
          </h3>
          <p>
            Tombol dengan class <code>{'.btn'}</code> + variant. Bisa <code>{'<button>'}</code> atau <code>{'<a>'}</code>.
          </p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <div className="docs-demo">
            <div className="docs-demo-label">Preview</div>
            <button className="btn btn-primary">Primary</button> <button className="btn btn-secondary">Secondary</button>{' '}
            <button className="btn btn-success">Success</button> <button className="btn btn-warning">Warning</button>{' '}
            <button className="btn btn-danger">Danger</button> <button className="btn btn-outline">Outline</button>{' '}
            <button className="btn btn-primary btn-sm">Small</button>{' '}
            <button className="btn btn-secondary btn-icon">
              <i className="fa-solid fa-plus" />
            </button>
          </div>
          <div className="docs-code">
            <code>
              {
                '<button class="btn btn-primary">Primary</button>\n<button class="btn btn-secondary">Secondary</button>\n<button class="btn btn-danger">Danger</button>\n<button class="btn btn-outline">Outline</button>\n<button class="btn btn-primary btn-sm">Small</button>\n<button class="btn btn-secondary btn-icon">\n  <i class="fa-solid fa-plus"></i>\n</button>'
              }
            </code>
          </div>
          <table className="docs-table">
            <tbody>
              <tr>
                <th>Class</th>
                <th>Guna</th>
              </tr>
              <tr>
                <td>
                  <code>{'.btn'}</code>
                </td>
                <td>Base (wajib)</td>
              </tr>
              <tr>
                <td>
                  <code>{'.btn-primary'}</code>
                </td>
                <td>Aksi utama</td>
              </tr>
              <tr>
                <td>
                  <code>{'.btn-secondary'}</code>
                </td>
                <td>Aksi kedua</td>
              </tr>
              <tr>
                <td>
                  <code>{'.btn-success'}</code>
                </td>
                <td>Simpan/sukses</td>
              </tr>
              <tr>
                <td>
                  <code>{'.btn-warning'}</code>
                </td>
                <td>Peringatan</td>
              </tr>
              <tr>
                <td>
                  <code>{'.btn-danger'}</code>
                </td>
                <td>Hapus/danger</td>
              </tr>
              <tr>
                <td>
                  <code>{'.btn-outline'}</code>
                </td>
                <td>Outline primary</td>
              </tr>
              <tr>
                <td>
                  <code>{'.btn-sm'}</code>
                </td>
                <td>Ukuran kecil</td>
              </tr>
              <tr>
                <td>
                  <code>{'.btn-icon'}</code>
                </td>
                <td>Icon saja (34×34)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-tags" /> Badges
          </h3>
          <p>
            Label status dengan <code>{'<span class="badge">'}</code> + variant warna.
          </p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <div className="docs-demo">
            <div className="docs-demo-label">Preview</div>
            <span className="badge badge-primary">Primary</span> <span className="badge badge-success">Success</span>{' '}
            <span className="badge badge-warning">Pending</span> <span className="badge badge-danger">Failed</span>{' '}
            <span className="badge badge-gray">Draft</span> <span className="badge badge-purple">Premium</span>
          </div>
          <div className="docs-code">
            <code>
              {
                '<span class="badge badge-primary">Active</span>\n<span class="badge badge-success">Completed</span>\n<span class="badge badge-warning">Pending</span>\n<span class="badge badge-danger">Failed</span>\n<span class="badge badge-gray">Draft</span>\n<span class="badge badge-purple">Premium</span>'
              }
            </code>
          </div>
          <table className="docs-table">
            <tbody>
              <tr>
                <th>Class</th>
                <th>Guna</th>
              </tr>
              <tr>
                <td>
                  <code>{'.badge-primary'}</code>
                </td>
                <td>Aktif / default</td>
              </tr>
              <tr>
                <td>
                  <code>{'.badge-success'}</code>
                </td>
                <td>Sukses / selesai</td>
              </tr>
              <tr>
                <td>
                  <code>{'.badge-warning'}</code>
                </td>
                <td>Pending / warning</td>
              </tr>
              <tr>
                <td>
                  <code>{'.badge-danger'}</code>
                </td>
                <td>Error / gagal</td>
              </tr>
              <tr>
                <td>
                  <code>{'.badge-gray'}</code>
                </td>
                <td>Inactive / draft</td>
              </tr>
              <tr>
                <td>
                  <code>{'.badge-purple'}</code>
                </td>
                <td>Premium / spesial</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-credit-card" /> Cards
          </h3>
          <p>
            Wadah konten <code>{'.card'}</code> dengan header, body, dan footer opsional.
          </p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <div className="docs-code">
            <code>
              {
                '<div class="card">\n  <div class="card-header">Judul Card</div>\n  <div class="card-body">\n    Konten utama...\n  </div>\n  <div class="card-footer">\n    <button class="btn btn-secondary">Batal</button>\n    <button class="btn btn-primary">Simpan</button>\n  </div>\n</div>'
              }
            </code>
          </div>
          <p>
            <strong>Header</strong> <code>{'display:flex; justify-content:space-between'}</code> — bisa diisi <code>{'select'}</code> atau
            badge di kanan.
          </p>
          <p>
            <strong>Footer</strong> <code>{'justify-content:flex-end'}</code> — tempat tombol aksi.
          </p>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-chart-simple" /> Stat Cards
          </h3>
          <p>Kartu metrik untuk dashboard: icon, judul, value, dan trend.</p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <div className="docs-demo" style={{ flexDirection: 'column', gap: '10px' }}>
            <div className="docs-demo-label">Preview</div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div className="stat-card" style={{ flex: '1', minWidth: '140px' }}>
                <div className="stat-header">
                  <div>
                    <div className="stat-title">Total User</div>
                    <div className="stat-value">12.450</div>
                  </div>
                  <div className="stat-icon blue">
                    <i className="fa-solid fa-users" />
                  </div>
                </div>
                <div className="stat-trend">
                  <span className="trend-up">▲ 15%</span> vs bulan lalu
                </div>
              </div>
              <div className="stat-card" style={{ flex: '1', minWidth: '140px' }}>
                <div className="stat-header">
                  <div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">Rp 45jt</div>
                  </div>
                  <div className="stat-icon green">
                    <i className="fa-solid fa-money-bill-trend-up" />
                  </div>
                </div>
                <div className="stat-trend">
                  <span className="trend-up">▲ 8,2%</span> vs bulan lalu
                </div>
              </div>
            </div>
          </div>
          <div className="docs-code">
            <code>
              {
                '<div class="stat-card">\n  <div class="stat-header">\n    <div>\n      <div class="stat-title">Total User</div>\n      <div class="stat-value">12.450</div>\n    </div>\n    <div class="stat-icon blue">\n      <i class="fa-solid fa-users"></i>\n    </div>\n  </div>\n  <div class="stat-trend">\n    <span class="trend-up">&#9650; 15%</span> vs bulan lalu\n  </div>\n</div>'
              }
            </code>
          </div>
          <table className="docs-table">
            <tbody>
              <tr>
                <th>Class</th>
                <th>Warna icon</th>
              </tr>
              <tr>
                <td>
                  <code>{'.stat-icon.blue'}</code>
                </td>
                <td>Biru (primary)</td>
              </tr>
              <tr>
                <td>
                  <code>{'.stat-icon.green'}</code>
                </td>
                <td>Hijau (success)</td>
              </tr>
              <tr>
                <td>
                  <code>{'.stat-icon.orange'}</code>
                </td>
                <td>Orange (warning)</td>
              </tr>
              <tr>
                <td>
                  <code>{'.stat-icon.red'}</code>
                </td>
                <td>Merah (danger)</td>
              </tr>
              <tr>
                <td>
                  <code>{'.stat-icon.purple'}</code>
                </td>
                <td>Ungu</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-keyboard" /> Form Elements
          </h3>
          <p>Input, select, textarea, checkbox, radio, dan switch toggle — semua sudah di-custom.</p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <p>
            <strong>Input / Select / Textarea:</strong>
          </p>
          <div className="docs-code">
            <code>
              {
                '<div class="form-group">\n  <label class="form-label">Nama</label>\n  <input class="form-control" placeholder="...">\n  <p class="form-help">Pesan bantuan</p>\n</div>\n\n<select class="form-control">\n  <option>...</option>\n</select>\n\n<textarea class="form-control" rows="3"></textarea>'
              }
            </code>
          </div>
          <p>
            <strong>Custom Checkbox & Radio:</strong>
          </p>
          <div className="docs-code">
            <code>
              {
                '<label class="form-check">\n  <input class="form-check-input" type="checkbox">\n  <span class="form-check-label">Label</span>\n</label>\n\n<label class="form-check">\n  <input class="form-check-input" type="radio" name="g">\n  <span class="form-check-label">Radio</span>\n</label>'
              }
            </code>
          </div>
          <p>
            <strong>Switch Toggle:</strong>
          </p>
          <div className="docs-code">
            <code>{'<label class="switch">\n  <input type="checkbox">\n  <span class="slider"></span>\n</label>'}</code>
          </div>
          <p>
            <strong>Focus:</strong> <code>{'.form-control'}</code> otomatis dapat <code>{'box-shadow'}</code> biru saat focus. Dark mode
            didukung penuh.
          </p>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-table" /> Tables
          </h3>
          <p>
            Tabel dengan <code>{'.table'}</code> dalam <code>{'.table-responsive'}</code>. Mobile card view via{' '}
            <code>{'.table-card-view'}</code>.
          </p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <div className="docs-code">
            <code>
              {
                '<div class="table-responsive">\n  <table class="table">\n    <thead>\n      <tr><th>Nama</th><th>Status</th></tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>John Doe</td>\n        <td>\n          <span class="badge badge-success">Active</span>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>'
              }
            </code>
          </div>
          <p>
            <strong>Card view mobile:</strong> tambah <code>{'.table-card-view'}</code> ke <code>{'.table-responsive'}</code> agar tabel
            jadi kartu di HP. <code>{'data-label'}</code> di setiap <code>{'<td>'}</code> untuk judul field.
          </p>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-circle-exclamation" /> Alerts
          </h3>
          <p>
            Notifikasi in-page dengan <code>{'.alert'}</code> + variant. Bisa ditutup via JS.
          </p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <div className="docs-demo" style={{ flexDirection: 'column', gap: '6px' }}>
            <div className="docs-demo-label">Preview</div>
            <div className="alert alert-success" style={{ margin: '0', width: '100%' }}>
              <i className="fa-solid fa-check-circle" /> Data berhasil disimpan.
            </div>
            <div className="alert alert-info" style={{ margin: '0', width: '100%' }}>
              <i className="fa-solid fa-circle-info" /> Maintenance pukul 02.00 WIB.
            </div>
            <div className="alert alert-warning" style={{ margin: '0', width: '100%' }}>
              <i className="fa-solid fa-triangle-exclamation" /> Storage hampir penuh.
            </div>
            <div className="alert alert-danger" style={{ margin: '0', width: '100%' }}>
              <i className="fa-solid fa-circle-xmark" /> Koneksi database gagal.
            </div>
          </div>
          <div className="docs-code">
            <code>
              {
                '<div class="alert alert-success">\n  <i class="fa-solid fa-check-circle"></i> Sukses!\n</div>\n<div class="alert alert-info">...</div>\n<div class="alert alert-warning">...</div>\n<div class="alert alert-danger">...</div>'
              }
            </code>
          </div>
          <p>
            Tombol close:{' '}
            <code>{'<span class="close-btn" onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark"></i></span>'}</code> di dalam
            alert.
          </p>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-window-maximize" /> Modals
          </h3>
          <p>Dialog popup dengan backdrop, header, body, dan footer.</p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <div className="docs-code">
            <code>
              {
                '<div class="modal-backdrop" id="modalSaya">\n  <div class="modal">\n    <div class="modal-header">\n      <h3>Judul</h3>\n      <button onclick="closeModal(\'modalSaya\')">\n        <i class="fa-solid fa-xmark"></i>\n      </button>\n    </div>\n    <div class="modal-body">Konten...</div>\n    <div class="modal-footer">\n      <button class="btn btn-secondary"\n        onclick="closeModal(\'modalSaya\')">Batal</button>\n      <button class="btn btn-primary">Simpan</button>\n    </div>\n  </div>\n</div>'
              }
            </code>
          </div>
          <p>
            <strong>JS:</strong> <code>{"openModal('id')"}</code> dan <code>{"closeModal('id')"}</code> di <code>{'app.js'}</code>. Cukup
            toggle class <code>{'.show'}</code> pada <code>{'.modal-backdrop'}</code>.
          </p>
          <p>
            <strong>Animasi:</strong> <code>{'@keyframes modalFadeIn'}</code> — scale .95 → 1 + fade.
          </p>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-bullhorn" /> Toasts
          </h3>
          <p>
            Notifikasi popup pojok kanan bawah. Dua mode: simple <code>{'.toast'}</code> dan stacked <code>{'.toast-variant'}</code>.
          </p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <p>
            <strong>Simple (via JS):</strong>
          </p>
          <div className="docs-code">
            <code>{"// Panggil dari onclick / JS\nshowToast('Pesan berhasil');\nshowToast('Terjadi kesalahan');"}</code>
          </div>
          <p>
            <strong>Variant (HTML manual):</strong>
          </p>
          <div className="docs-code">
            <code>
              {
                '<div class="toast-variant toast-success">\n  <i class="fa-solid fa-check-circle"></i> Tersimpan!\n</div>\n<div class="toast-variant toast-error">\n  <i class="fa-solid fa-circle-xmark"></i> Gagal!\n</div>\n<div class="toast-variant toast-warning">\n  <i class="fa-solid fa-triangle-exclamation"></i> Perhatian!\n</div>\n<div class="toast-variant toast-info">\n  <i class="fa-solid fa-circle-info"></i> Info.\n</div>'
              }
            </code>
          </div>
          <p>
            <strong>Animasi:</strong> <code>{'@keyframes slideInToast'}</code> — slide dari kanan .3s.
          </p>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-table-columns" /> Tabs
          </h3>
          <p>
            Navigasi tab horizontal: <code>{'.tabs'}</code> berisi <code>{'.tab-btn'}</code>. Aktif dengan class <code>{'.active'}</code>.
          </p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <div className="docs-code">
            <code>
              {
                '<div class="tabs">\n  <button class="tab-btn active">Tab 1</button>\n  <button class="tab-btn">Tab 2</button>\n  <button class="tab-btn">Tab 3</button>\n</div>'
              }
            </code>
          </div>
          <p>
            <strong>JS:</strong> toggle class <code>{'.active'}</code> antar tab-btn dan tampilkan <code>{'.tab-content'}</code> sesuai
            data-target. Lihat <code>{'components.html'}</code> untuk contoh JS.
          </p>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-ellipsis" /> Pagination
          </h3>
          <p>
            Navigasi halaman dengan <code>{'.pagination'}</code> wrapper dan <code>{'.page-btn'}</code> untuk tiap nomor.
          </p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <div className="docs-demo">
            <div className="docs-demo-label">Preview</div>
            <button className="page-btn">
              <i className="fa-solid fa-chevron-left" />
            </button>{' '}
            <button className="page-btn active">1</button> <button className="page-btn">2</button> <button className="page-btn">3</button>{' '}
            <button className="page-btn">...</button> <button className="page-btn">10</button>{' '}
            <button className="page-btn">
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
          <div className="docs-code">
            <code>
              {
                '<div class="pagination">\n  <button class="page-btn">\n    <i class="fa-solid fa-chevron-left"></i>\n  </button>\n  <button class="page-btn active">1</button>\n  <button class="page-btn">2</button>\n  <button class="page-btn">3</button>\n  <button class="page-btn">\n    <i class="fa-solid fa-chevron-right"></i>\n  </button>\n</div>'
              }
            </code>
          </div>
          <p>
            Gunakan <code>{'disabled'}</code> pada prev/next jika di awal/akhir halaman.
          </p>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-bars" /> Navigation
          </h3>
          <p>
            Item sidebar dengan <code>{'.nav-item'}</code>, <code>{'.nav-icon'}</code>, <code>{'.nav-text'}</code>,{' '}
            <code>{'.nav-pill'}</code>, dan <code>{'.nav-label'}</code>.
          </p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <div className="docs-code">
            <code>
              {
                '<a class="nav-item active" href="...">\n  <i class="fa-solid fa-users nav-icon"></i>\n  <span class="nav-text">Users</span>\n  <span class="nav-pill">12</span>\n</a>\n\n<div class="nav-label">Menu Utama</div>'
              }
            </code>
          </div>
          <p>
            <strong>States:</strong> <code>{'.active'}</code> untuk halaman aktif (warna biru). <code>{'.nav-pill'}</code> untuk counter.{' '}
            <code>{'.nav-label'}</code> untuk pemisah grup menu.
          </p>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-user-circle" /> Avatars
          </h3>
          <p>
            Lingkaran inisial user dengan <code>{'.avatar'}</code>. Bisa diberi variant warna atau ukuran inline.
          </p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <div className="docs-demo">
            <div className="docs-demo-label">Preview</div>
            <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '11px' }}>
              AH
            </div>
            <div className="avatar" style={{ width: '40px', height: '40px' }}>
              JD
            </div>
            <div className="avatar" style={{ width: '48px', height: '48px', fontSize: '16px' }}>
              AK
            </div>
            <div className="avatar green">JD</div>
            <div className="avatar orange">AH</div>
          </div>
          <div className="docs-code">
            <code>
              {
                '<div class="avatar">AH</div>\n<div class="avatar green">JD</div>\n<div class="avatar orange">AH</div>\n\n// Ukuran kustom via inline\n<div class="avatar"\n  style="width:48px;height:48px;font-size:16px">\n  AK\n</div>'
              }
            </code>
          </div>
          <p>
            Default 32×32px. Varian: <code>{'.green'}</code>, <code>{'.orange'}</code>.
          </p>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-spinner" /> Loading States
          </h3>
          <p>
            Komponen untuk loading, data kosong, dan error. Lihat demo di{' '}
            <a href="/states" style={{ color: 'var(--primary)', fontWeight: '700' }}>
              states.html
            </a>
            .
          </p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <p>
            <strong>Loading Spinner:</strong>
          </p>
          <div className="docs-code">
            <code>{'<div class="loading-spinner"></div>'}</code>
          </div>
          <p>
            <strong>Skeleton Loading:</strong>
          </p>
          <div className="docs-code">
            <code>
              {
                '<div class="skeleton skeleton-avatar"></div>\n<div class="skeleton skeleton-line"\n  style="width:70%"></div>\n<div class="skeleton skeleton-card"></div>'
              }
            </code>
          </div>
          <p>
            <strong>Empty State:</strong>
          </p>
          <div className="docs-code">
            <code>
              {
                '<div class="empty-state">\n  <i class="fa-solid fa-inbox icon-lg mb-3"></i>\n  <h3>Data kosong</h3>\n  <p class="text-sm text-muted mt-2">\n    Belum ada data.</p>\n  <button class="btn btn-primary mt-2">\n    Tambah Data\n  </button>\n</div>'
              }
            </code>
          </div>
          <p>
            <strong>Animasi:</strong> spinner <code>{'@keyframes spin'}</code> .8s, skeleton <code>{'@keyframes skeleton'}</code> 1.35s
            (shimmer).
          </p>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-gauge-high" /> Progress Bar
          </h3>
          <p>
            Indikator progres dengan <code>{'.progress'}</code> (track) dan <code>{'.progress-fill'}</code> (bar).
          </p>
          <span className="docs-badge">CSS</span>
          <div className="docs-demo" style={{ flexDirection: 'column', gap: '10px' }}>
            <div className="docs-demo-label">Preview</div>
            <div style={{ width: '100%' }}>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Storage</span>
                <span className="text-sm text-muted">78%</span>
              </div>
              <div className="progress">
                <div className="progress-fill" style={{ width: '78%' }} />
              </div>
            </div>
            <div style={{ width: '100%' }}>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Bandwidth</span>
                <span className="text-sm text-muted">45%</span>
              </div>
              <div className="progress">
                <div className="progress-fill" style={{ width: '45%', background: 'var(--warning)' }} />
              </div>
            </div>
          </div>
          <div className="docs-code">
            <code>
              {
                '<div class="progress">\n  <div class="progress-fill"\n    style="width:78%"></div>\n</div>\n\n// Warna kustom via background\n<div class="progress-fill"\n  style="width:45%;background:var(--warning)">\n</div>'
              }
            </code>
          </div>
          <p>
            Default biru. Bisa diubah via <code>{'background'}</code> inline. CSS ada di <code>{'components.html'}</code> (page-specific).
          </p>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-toolbox" /> Utility Classes
          </h3>
          <p>Helper untuk spacing, alignment, typography, dan layout grid.</p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <table className="docs-table">
            <tbody>
              <tr>
                <th>Kategori</th>
                <th>Class</th>
              </tr>
              <tr>
                <td>Display</td>
                <td>
                  <code>{'.flex'}</code> <code>{'.flex-col'}</code> <code>{'.hidden'}</code>
                </td>
              </tr>
              <tr>
                <td>Alignment</td>
                <td>
                  <code>{'.items-center'}</code> <code>{'.justify-between'}</code> <code>{'.justify-end'}</code>
                </td>
              </tr>
              <tr>
                <td>Gap</td>
                <td>
                  <code>{'.gap-1'}</code> (3px) – <code>{'.gap-4'}</code> (12px)
                </td>
              </tr>
              <tr>
                <td>Margin</td>
                <td>
                  <code>{'.mb-2'}</code> (6px) – <code>{'.mb-6'}</code> (18px), <code>{'.mt-2'}</code> (6px)
                </td>
              </tr>
              <tr>
                <td>Text</td>
                <td>
                  <code>{'.text-sm'}</code> <code>{'.text-xs'}</code> <code>{'.text-muted'}</code> <code>{'.font-medium'}</code>{' '}
                  <code>{'.font-bold'}</code>
                </td>
              </tr>
              <tr>
                <td>Grid</td>
                <td>
                  <code>{'.grid-2'}</code> <code>{'.grid-3'}</code> <code>{'.grid-4'}</code> <code>{'.grid-main'}</code>
                </td>
              </tr>
              <tr>
                <td>Icon</td>
                <td>
                  <code>{'.icon-sm'}</code> (14px) <code>{'.icon-md'}</code> (18px) <code>{'.icon-lg'}</code> (22px)
                </td>
              </tr>
              <tr>
                <td>Responsive</td>
                <td>
                  <code>{'.hide-mobile'}</code> (sembunyi di HP)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-cubes" /> Komponen Lain
          </h3>
          <p>Komponen pelengkap untuk dashboard dan halaman fungsional.</p>
          <span className="docs-badge">CSS</span>
          <p>
            <strong>Quick Action:</strong>
          </p>
          <div className="docs-code">
            <code>
              {
                '<div class="quick-action">\n  <div>\n    <b>Tambah User</b>\n    <p class="text-xs text-muted">...</p>\n  </div>\n  <button class="btn btn-primary btn-sm">Buka</button>\n</div>'
              }
            </code>
          </div>
          <p>
            <strong>Activity List (timeline):</strong>
          </p>
          <div className="docs-code">
            <code>
              {
                '<div class="activity-item">\n  <div class="activity-dot"></div>\n  <div>\n    <p class="font-bold text-sm">Aktivitas</p>\n    <span class="text-xs text-muted">Waktu</span>\n  </div>\n</div>'
              }
            </code>
          </div>
          <p>
            <strong>Toolbar + Search:</strong>
          </p>
          <div className="docs-code">
            <code>
              {
                '<div class="toolbar">\n  <div class="search-box">\n    <span><i class="fa-solid fa-search"></i></span>\n    <input class="form-control" placeholder="Cari...">\n  </div>\n  <button class="btn btn-primary">+ Tambah</button>\n</div>'
              }
            </code>
          </div>
          <p>
            <strong>Error Preview:</strong> <code>{'.error-preview'}</code> + <code>{'.error-code'}</code> untuk halaman 404/403/500.
          </p>
          <p>
            <strong>Pricing Card:</strong> <code>{'.pricing-card'}</code> + <code>{'.featured'}</code>, <code>{'.pricing-price'}</code>,{' '}
            <code>{'.feature-list'}</code>.
          </p>
          <p>
            <strong>Notif Card:</strong> <code>{'.notif-card'}</code> untuk daftar notifikasi.
          </p>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-magnifying-glass" /> Command Palette
          </h3>
          <p>
            Pencarian global via shortcut{' '}
            <kbd
              style={{
                background: '#f1f5f9',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '11px',
                border: '1px solid var(--border-normal)',
              }}
            >
              Ctrl+K
            </kbd>
            .
          </p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <div className="docs-code">
            <code>
              {
                '<div class="command-backdrop" id="commandPalette">\n  <div class="command-modal">\n    <div class="command-input">\n      <i class="fa-solid fa-magnifying-glass"></i>\n      <input id="commandSearch" placeholder="Cari...">\n    </div>\n    <div class="command-list" id="commandList"></div>\n    <div class="command-footer">\n      <span>Ctrl+K buka/tutup</span>\n    </div>\n  </div>\n</div>'
              }
            </code>
          </div>
          <p>
            <strong>JS:</strong> <code>{'openCommandPalette()'}</code>, <code>{'closeCommandPalette()'}</code>,{' '}
            <code>{'renderCommandItems()'}</code> di <code>{'app.js'}</code>. Data menu dari array <code>{'commandItems'}</code>.
          </p>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-circle-half-stroke" /> Dark Mode
          </h3>
          <p>
            Tema gelap/terang via toggle class <code>{'body.dark-mode'}</code>.
          </p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <div className="docs-code">
            <code>
              {
                '<button class="theme-toggle"\n  onclick="toggleTheme()">\n  <i class="fa-solid fa-moon"></i>\n  <span>Dark</span>\n</button>'
              }
            </code>
          </div>
          <p>
            <strong>JS:</strong> <code>{'toggleTheme()'}</code> di <code>{'app.js'}</code> — toggle class, simpan ke localStorage (
            <code>{'admincore-theme'}</code>), update icon/teks.
          </p>
          <p>
            <strong>Sistem:</strong> semua komponen otomatis menyesuaikan karena pakai CSS custom properties (<code>{'--bg-white'}</code>,{' '}
            <code>{'--text-main'}</code>, <code>{'--border-normal'}</code>, dll).
          </p>
        </div>
        <div className="docs-card">
          <h3>
            <i className="fa-solid fa-palette" /> Color System
          </h3>
          <p>CSS custom properties untuk palet warna konsisten di seluruh komponen.</p>
          <span className="docs-badge">CSS</span> <span className="docs-tag">Framework</span>
          <div className="docs-demo" style={{ flexDirection: 'column', gap: '6px' }}>
            <div className="docs-demo-label">Core Colors</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--primary)' }} />
                <code className="text-xs">{'--primary'}</code>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--success)' }} />
                <code className="text-xs">{'--success'}</code>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--danger)' }} />
                <code className="text-xs">{'--danger'}</code>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--warning)' }} />
                <code className="text-xs">{'--warning'}</code>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--info)' }} />
                <code className="text-xs">{'--info'}</code>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--purple)' }} />
                <code className="text-xs">{'--purple'}</code>
              </div>
            </div>
          </div>
          <div className="docs-code">
            <code>
              {
                ':root {\n  --primary: #2563eb;\n  --success: #10b981;\n  --danger: #ef4444;\n  --warning: #f59e0b;\n  --info: #0ea5e9;\n  --purple: #7c3aed;\n  --bg-body: #eef2f7;\n  --bg-white: #fff;\n  --text-main: #111827;\n  --text-muted: #64748b;\n  --border-normal: #e2e8f0;\n  --radius: 14px;\n}'
              }
            </code>
          </div>
          <p>Semua komponen (badge, btn, alert, stat-icon) menggunakan warna dari variable ini dan menyesuaikan otomatis di dark mode.</p>
        </div>
      </div>
    </section>
  );
}
