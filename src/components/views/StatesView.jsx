
import { useAdmin } from '@/components/AdminProvider';

export default function StatesView() {
  const { showToast } = useAdmin();
  return (
    <section id="page-states" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Loading, Empty & Error States</h1>
          <p className="page-desc">Komponen state saat API loading, data kosong, request gagal, atau perlu retry.</p>
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => {
            showToast('Simulasi reload state');
          }}
        >
          <i className="fa-solid fa-rotate" /> Simulate Reload
        </button>
      </div>
      <div className="grid-3 mb-6">
        <div className="state-demo">
          <div className="flex items-center gap-3 mb-4">
            <div className="loading-spinner" />
            <div>
              <b>Loading Spinner</b>
              <p className="text-sm text-muted">Untuk submit, fetch API, atau reload table.</p>
            </div>
          </div>
          <button className="btn btn-primary w-full">Loading...</button>
        </div>
        <div className="state-demo">
          <div className="flex gap-3 mb-4">
            <div className="skeleton skeleton-avatar" />
            <div style={{ flex: '1' }}>
              <div className="skeleton skeleton-line" style={{ width: '70%' }} />
              <div className="skeleton skeleton-line" style={{ width: '45%' }} />
              <div className="skeleton skeleton-line" style={{ width: '90%' }} />
            </div>
          </div>
          <div className="skeleton skeleton-card" />
        </div>
        <div className="state-demo">
          <div className="empty-state">
            <i className="fa-solid fa-inbox icon-lg mb-3" />
            <h3>Data kosong</h3>
            <p className="text-sm text-muted mt-2">Belum ada data yang dapat ditampilkan.</p>
            <button className="btn btn-primary mt-2">Tambah Data</button>
          </div>
        </div>
      </div>
      <div className="grid-2">
        <div className="state-demo">
          <div className="alert alert-danger">
            <i className="fa-solid fa-triangle-exclamation" />
            <div>
              <b>API gagal dimuat</b>
              <p>Server tidak merespons. Coba ulangi beberapa saat lagi.</p>
            </div>
          </div>
          <button className="btn btn-secondary">
            <i className="fa-solid fa-rotate" /> Retry
          </button>
        </div>
        <div className="state-demo">
          <div className="alert alert-warning">
            <i className="fa-solid fa-clock" />
            <div>
              <b>Session hampir habis</b>
              <p>User perlu memperpanjang sesi agar tidak otomatis logout.</p>
            </div>
          </div>
          <button className="btn btn-primary">Extend Session</button>
        </div>
      </div>
    </section>
  );
}
