import { useAdmin } from '@/components/AdminProvider';

export default function DetailsView() {
  const { showToast } = useAdmin();
  return (
    <section id="page-details" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Detail Pages</h1>
          <p className="page-desc">
            Contoh halaman detail untuk user, transaksi, invoice, dan ticket supaya action tidak semua dipaksa lewat modal.
          </p>
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => {
            showToast('Print detail page');
          }}
        >
          <i className="fa-solid fa-print" /> Print
        </button>
      </div>
      <div className="detail-hero mb-6">
        <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2>INV-2026-001</h2>
            <p style={{ color: '#dbeafe', marginTop: '6px' }}>PT Sinar Jaya • VA BRI • Paid</p>
          </div>
          <span className="badge badge-success">PAID</span>
        </div>
        <div className="detail-grid">
          <div className="detail-meta">
            <small>Total</small>
            <h3>Rp 2.500.000</h3>
          </div>
          <div className="detail-meta">
            <small>Admin Fee</small>
            <h3>Rp 2.500</h3>
          </div>
          <div className="detail-meta">
            <small>Settlement</small>
            <h3>25 Mei 2026</h3>
          </div>
          <div className="detail-meta">
            <small>Reference</small>
            <h3>BRIVA-88921</h3>
          </div>
        </div>
      </div>
      <div className="grid-main">
        <div className="card">
          <div className="card-header">Transaction Timeline</div>
          <div className="card-body">
            <div className="timeline-compact">
              <div className="timeline-row">
                <div className="timeline-dot" />
                <div>
                  <b>Invoice dibuat</b>
                  <p className="text-sm text-muted">25 Mei 2026 09:00</p>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-dot" style={{ background: 'var(--warning)' }} />
                <div>
                  <b>Menunggu pembayaran</b>
                  <p className="text-sm text-muted">VA dikirim ke customer</p>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-dot" style={{ background: 'var(--success)' }} />
                <div>
                  <b>Pembayaran berhasil</b>
                  <p className="text-sm text-muted">Callback diterima dan tervalidasi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Customer Detail</div>
          <div className="card-body">
            <p>
              <b>PT Sinar Jaya</b>
            </p>
            <p className="text-sm text-muted mt-2">finance@sinarjaya.test</p>
            <p className="text-sm text-muted mt-2">Jl. Contoh No. 10, Jakarta</p>
            <button className="btn btn-primary w-full mt-2">Open Customer</button>
          </div>
        </div>
      </div>
    </section>
  );
}
