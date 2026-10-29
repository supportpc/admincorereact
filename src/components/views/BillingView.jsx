import { useAdmin } from '@/components/AdminProvider';

export default function BillingView() {
  const { showToast } = useAdmin();
  return (
    <section id="page-billing" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Billing & Subscription</h1>
          <p className="page-desc">Kelola paket, invoice subscription, metode pembayaran, usage limit, upgrade dan downgrade.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            showToast('Checkout upgrade dibuka');
          }}
        >
          <i className="fa-solid fa-arrow-up-right-dots" /> Upgrade Plan
        </button>
      </div>
      <div className="grid-3 mb-6">
        <div className="pricing-card">
          <span className="badge badge-gray">Starter</span>
          <div className="pricing-price">Rp 99rb</div>
          <p className="text-sm text-muted">Untuk bisnis kecil dan testing internal.</p>
          <ul className="feature-list">
            <li>
              <i className="fa-solid fa-check" /> 3 Admin
            </li>
            <li>
              <i className="fa-solid fa-check" /> 1.000 transaksi/bulan
            </li>
            <li>
              <i className="fa-solid fa-check" /> Basic support
            </li>
          </ul>
          <button className="btn btn-secondary w-full">Current</button>
        </div>
        <div className="pricing-card featured">
          <span className="badge badge-primary">Recommended</span>
          <div className="pricing-price">Rp 249rb</div>
          <p className="text-sm text-muted">Untuk operasional yang mulai aktif.</p>
          <ul className="feature-list">
            <li>
              <i className="fa-solid fa-check" /> 10 Admin
            </li>
            <li>
              <i className="fa-solid fa-check" /> 10.000 transaksi/bulan
            </li>
            <li>
              <i className="fa-solid fa-check" /> Priority support
            </li>
          </ul>
          <button className="btn btn-primary w-full">Upgrade</button>
        </div>
        <div className="pricing-card">
          <span className="badge badge-purple">Enterprise</span>
          <div className="pricing-price">Custom</div>
          <p className="text-sm text-muted">Untuk multi cabang dan volume besar.</p>
          <ul className="feature-list">
            <li>
              <i className="fa-solid fa-check" /> Unlimited admin
            </li>
            <li>
              <i className="fa-solid fa-check" /> Dedicated support
            </li>
            <li>
              <i className="fa-solid fa-check" /> SLA & custom integration
            </li>
          </ul>
          <button className="btn btn-secondary w-full">Contact</button>
        </div>
      </div>
      <div className="grid-main">
        <div className="card">
          <div className="card-header">Invoice Subscription</div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>SUB-001</b>
                  </td>
                  <td>Starter</td>
                  <td>Rp 99.000</td>
                  <td>
                    <span className="badge badge-success">Paid</span>
                  </td>
                  <td>01 Mei 2026</td>
                </tr>
                <tr>
                  <td>
                    <b>SUB-002</b>
                  </td>
                  <td>Starter</td>
                  <td>Rp 99.000</td>
                  <td>
                    <span className="badge badge-warning">Upcoming</span>
                  </td>
                  <td>01 Jun 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Usage Limit</div>
          <div className="card-body">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <b>Transactions</b>
                <span className="text-sm text-muted">720 / 1.000</span>
              </div>
              <div className="usage-bar">
                <div className="usage-fill" style={{ width: '72%' }} />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <b>Storage</b>
                <span className="text-sm text-muted">78%</span>
              </div>
              <div className="usage-bar">
                <div className="usage-fill" style={{ width: '78%' }} />
              </div>
            </div>
            <button className="btn btn-primary w-full">Manage Payment Method</button>
          </div>
        </div>
      </div>
    </section>
  );
}
