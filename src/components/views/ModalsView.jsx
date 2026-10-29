import { useAdmin } from '@/components/AdminProvider';

export default function ModalsView() {
  const { closeModal, modals, openModal, showToast, showToastVariant } = useAdmin();
  return (
    <>
      <section id="page-modals" className="page-view active">
        <div className="page-head">
          <div>
            <h1 className="page-title">Modals</h1>
            <p className="page-desc">Demo berbagai jenis modal dan notifikasi toast untuk implementasi.</p>
          </div>
        </div>
        <div className="grid-main">
          <div className="card">
            <div className="card-header">Default Modal</div>
            <div className="card-body">
              <p className="text-sm text-muted mb-3">
                Modal standar dengan header, body, dan footer. Cocok untuk konfirmasi sederhana atau menampilkan informasi.
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    openModal('demoModalDefault');
                  }}
                >
                  Open Modal
                </button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Confirmation Modal</div>
            <div className="card-body">
              <p className="text-sm text-muted mb-3">
                Modal konfirmasi dengan aksi berbahaya (border merah). Cocok untuk delete, suspend, atau aksi irreversible.
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    openModal('demoModalConfirm');
                  }}
                >
                  Open Confirm
                </button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Form Modal</div>
            <div className="card-body">
              <p className="text-sm text-muted mb-3">Modal dengan form input. Berguna untuk quick create/edit data tanpa pindah halaman.</p>
              <div className="flex gap-2 flex-wrap">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    openModal('demoModalForm');
                  }}
                >
                  Open Form
                </button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Large Modal</div>
            <div className="card-body">
              <p className="text-sm text-muted mb-3">
                Modal ukuran besar untuk konten yang lebih banyak seperti detail item atau form kompleks.
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    openModal('demoModalLarge');
                  }}
                >
                  Open Large
                </button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Toast Notifications</div>
            <div className="card-body">
              <p className="text-sm text-muted mb-3">
                Toast notifikasi dengan berbagai tipe: success, error, warning, info. Auto dismiss 4 detik.
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    showToastVariant('success', 'Data berhasil disimpan!');
                  }}
                >
                  Success
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    showToastVariant('error', 'Gagal memproses data.');
                  }}
                >
                  Error
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    showToastVariant('warning', 'Perhatikan batas kuota anda.');
                  }}
                >
                  Warning
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    showToastVariant('info', 'Maintenance malam ini pukul 23:00.');
                  }}
                >
                  Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={`modal-backdrop${modals.demoModalDefault ? ' show' : ''}`} id="demoModalDefault">
        <div className="modal">
          <div className="modal-header">
            <h3>Konfirmasi Aksi</h3>
            <button
              onClick={() => {
                closeModal('demoModalDefault');
              }}
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <div className="modal-body">
            <p className="text-sm text-muted">
              Apakah anda yakin ingin melanjutkan aksi ini? Tindakan ini dapat diproses lebih lanjut oleh sistem dan akan tercatat di audit
              log.
            </p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => {
                closeModal('demoModalDefault');
              }}
            >
              Batal
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                closeModal('demoModalDefault');
                showToast('Aksi dikonfirmasi');
              }}
            >
              Konfirmasi
            </button>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop${modals.demoModalConfirm ? ' show' : ''}`} id="demoModalConfirm">
        <div className="modal" style={{ borderTop: '4px solid var(--danger)', width: 'min(450px,100%)' }}>
          <div className="modal-header">
            <h3 style={{ color: 'var(--danger)' }}>Hapus Data</h3>
            <button
              onClick={() => {
                closeModal('demoModalConfirm');
              }}
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <div className="modal-body">
            <div className="flex items-center gap-3 mb-3">
              <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '28px', color: 'var(--danger)', flexShrink: '0' }} />
              <p className="text-sm">
                Data yang sudah dihapus tidak dapat dikembalikan. Pastikan anda telah membackup data penting sebelum melanjutkan.
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => {
                closeModal('demoModalConfirm');
              }}
            >
              Batal
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                closeModal('demoModalConfirm');
                showToast('Data berhasil dihapus');
              }}
            >
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop${modals.demoModalForm ? ' show' : ''}`} id="demoModalForm">
        <div className="modal" style={{ width: 'min(540px,100%)' }}>
          <div className="modal-header">
            <h3>Tambah Data Baru</h3>
            <button
              onClick={() => {
                closeModal('demoModalForm');
              }}
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Nama</label>
              <input className="form-control" placeholder="Masukkan nama" />
            </div>
            <div className="form-group">
              <label className="form-label">Deskripsi</label>
              <textarea className="form-control" rows="3" placeholder="Deskripsi..." />
            </div>
            <div className="form-group">
              <label className="form-label">Kategori</label>
              <select className="form-control">
                <option>Umum</option>
                <option>Prioritas</option>
                <option>Internal</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => {
                closeModal('demoModalForm');
              }}
            >
              Batal
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                closeModal('demoModalForm');
                showToast('Data berhasil disimpan');
              }}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop${modals.demoModalLarge ? ' show' : ''}`} id="demoModalLarge">
        <div className="modal" style={{ width: 'min(860px,95%)', maxHeight: '85vh' }}>
          <div className="modal-header">
            <h3>Detail Lengkap</h3>
            <button
              onClick={() => {
                closeModal('demoModalLarge');
              }}
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <div className="modal-body">
            <p className="text-sm text-muted mb-3">
              Modal ini menampung konten yang lebih banyak. Berguna untuk detail item, preview data, atau form kompleks dengan banyak field.
            </p>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Field 1</label>
                <input className="form-control" defaultValue="Sample data" />
              </div>
              <div className="form-group">
                <label className="form-label">Field 2</label>
                <input className="form-control" defaultValue="Sample data" />
              </div>
              <div className="form-group">
                <label className="form-label">Field 3</label>
                <input className="form-control" defaultValue="Sample data" />
              </div>
              <div className="form-group">
                <label className="form-label">Field 4</label>
                <input className="form-control" defaultValue="Sample data" />
              </div>
              <div className="form-group">
                <label className="form-label">Field 5</label>
                <input className="form-control" defaultValue="Sample data" />
              </div>
              <div className="form-group">
                <label className="form-label">Field 6</label>
                <input className="form-control" defaultValue="Sample data" />
              </div>
            </div>
            <div className="alert alert-info">Modal ini mendukung scroll penuh ketika konten melebihi batas layar.</div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => {
                closeModal('demoModalLarge');
              }}
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
