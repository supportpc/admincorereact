
import { useAdmin } from '@/components/AdminProvider';

export default function ApiIntegrationsView() {
  const { showToast } = useAdmin();
  return (
    <section id="page-api" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">API & Integrations</h1>
          <p className="page-desc">Kelola API keys, webhook endpoints, dan integrasi layanan pihak ketiga.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            showToast('API key baru dibuat');
          }}
        >
          + Generate Key
        </button>
      </div>
      <div className="card">
        <div className="card-header">
          API Keys <span className="badge badge-gray">2 active</span>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label className="form-label">Production Key</label>
            <div className="api-key-display">
              <span className="key">ac_live_••••••••••••••••a3f8</span>
              <div className="flex gap-2">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    showToast('Key copied');
                  }}
                >
                  <i className="fa-solid fa-copy" /> Copy
                </button>{' '}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    showToast('Key revoked');
                  }}
                >
                  Revoke
                </button>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Development Key</label>
            <div className="api-key-display">
              <span className="key">ac_test_••••••••••••••••b2c4</span>
              <div className="flex gap-2">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    showToast('Key copied');
                  }}
                >
                  <i className="fa-solid fa-copy" /> Copy
                </button>{' '}
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    showToast('Key regenerated');
                  }}
                >
                  Regenerate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          Integrations <span className="badge badge-gray">6 tersedia</span>
        </div>
        <div className="card-body">
          <div className="integration-grid">
            <div className="integration-card">
              <div className="integration-icon slack">
                <i className="fa-brands fa-slack" />
              </div>
              <div className="integration-name">Slack</div>
              <div className="integration-desc">Notifikasi ke channel Slack untuk event tertentu.</div>
              <div className="integration-status">
                <span className="dot green" /> Connected
              </div>
            </div>
            <div className="integration-card">
              <div className="integration-icon stripe">
                <i className="fa-brands fa-stripe-s" />
              </div>
              <div className="integration-name">Stripe</div>
              <div className="integration-desc">Pembayaran kartu kredit & transfer via Stripe.</div>
              <div className="integration-status">
                <span className="dot green" /> Connected
              </div>
            </div>
            <div className="integration-card">
              <div className="integration-icon mailchimp">
                <i className="fa-brands fa-mailchimp" />
              </div>
              <div className="integration-name">Mailchimp</div>
              <div className="integration-desc">Sinkronisasi kontak dan campaign email.</div>
              <div className="integration-status">
                <span className="dot gray" /> Not Connected
              </div>
            </div>
            <div className="integration-card">
              <div className="integration-icon twilio">
                <i className="fa-brands fa-twilio" />
              </div>
              <div className="integration-name">Twilio</div>
              <div className="integration-desc">SMS & WhatsApp notification gateway.</div>
              <div className="integration-status">
                <span className="dot green" /> Connected
              </div>
            </div>
            <div className="integration-card">
              <div className="integration-icon github">
                <i className="fa-brands fa-github" />
              </div>
              <div className="integration-name">GitHub</div>
              <div className="integration-desc">Webhook deploy & activity logging.</div>
              <div className="integration-status">
                <span className="dot gray" /> Not Connected
              </div>
            </div>
            <div className="integration-card">
              <div className="integration-icon docker">
                <i className="fa-brands fa-docker" />
              </div>
              <div className="integration-name">Docker</div>
              <div className="integration-desc">Deploy container & monitor registry.</div>
              <div className="integration-status">
                <span className="dot gray" /> Not Connected
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          Webhook Endpoints{' '}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              showToast('Webhook endpoint ditambahkan');
            }}
          >
            + Tambah
          </button>
        </div>
        <div className="card-body">
          <div className="webhook-row">
            <div>
              <b>Payment Success</b>
              <div className="webhook-url">https://api.example.com/webhooks/payment/success</div>
            </div>
            <span className="badge badge-success">Active</span>
          </div>
          <div className="webhook-row">
            <div>
              <b>User Created</b>
              <div className="webhook-url">https://api.example.com/webhooks/users/new</div>
            </div>
            <span className="badge badge-success">Active</span>
          </div>
          <div className="webhook-row">
            <div>
              <b>Order Shipped</b>
              <div className="webhook-url">https://api.example.com/webhooks/orders/shipped</div>
            </div>
            <span className="badge badge-gray">Inactive</span>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">Rate Limits</div>
        <div className="card-body">
          <div className="grid-3">
            <div className="stat-card">
              <div className="stat-title">Requests / Menit</div>
              <div className="stat-value" style={{ fontSize: '20px' }}>
                60
              </div>
              <div className="stat-trend">Batas: 1.000/menit</div>
            </div>
            <div className="stat-card">
              <div className="stat-title">Hari Ini</div>
              <div className="stat-value" style={{ fontSize: '20px' }}>
                12.430
              </div>
              <div className="stat-trend">Batas: 100.000/hari</div>
            </div>
            <div className="stat-card">
              <div className="stat-title">Error Rate</div>
              <div className="stat-value" style={{ fontSize: '20px', color: 'var(--success)' }}>
                0.12%
              </div>
              <div className="stat-trend">Threshold: 1%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
