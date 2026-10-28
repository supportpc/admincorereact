
import { useAdmin } from '@/components/AdminProvider';

export default function ReportsView() {
  const { showToast } = useAdmin();
  return (
    <section id="page-reports" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Reports</h1>
          <p className="page-desc">Filter laporan sederhana: periode, tipe data, status, dan export.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            showToast('Report generated');
          }}
        >
          Generate
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="grid-4">
            <div className="form-group">
              <label className="form-label">Tanggal Mulai</label>
              <input type="date" className="form-control" />
            </div>
            <div className="form-group">
              <label className="form-label">Tanggal Akhir</label>
              <input type="date" className="form-control" />
            </div>
            <div className="form-group">
              <label className="form-label">Tipe Laporan</label>
              <select className="form-control">
                <option>Transaksi</option>
                <option>User</option>
                <option>Revenue</option>
                <option>Audit</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Format</label>
              <select className="form-control">
                <option>Excel</option>
                <option>CSV</option>
                <option>PDF</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-3">
        <div className="stat-card">
          <div className="stat-title">Gross Revenue</div>
          <div className="stat-value">Rp 128jt</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Net Revenue</div>
          <div className="stat-value">Rp 94jt</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Refund</div>
          <div className="stat-value">Rp 2,1jt</div>
        </div>
      </div>
    </section>
  );
}
