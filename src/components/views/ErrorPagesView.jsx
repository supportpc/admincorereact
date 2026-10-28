
import { useState } from 'react';
import { useAdmin } from '@/components/AdminProvider';
import { errorTemplates } from '@/lib/data';

export default function ErrorPagesView() {
  const { goTo, showToast } = useAdmin();
  const [err, setErr] = useState('404');
  const tpl = errorTemplates[err] || errorTemplates['404'];
  return (
    <section id="page-error-pages" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Error & System Pages</h1>
          <p className="page-desc">Template 403, 404, 500, maintenance, session expired, dan coming soon.</p>
        </div>
      </div>
      <div className="tabs">
        <button className={`tab-btn error-tab${err === '404' ? ' active' : ''}`} onClick={() => setErr('404')}>
          404
        </button>
        <button className={`tab-btn error-tab${err === '403' ? ' active' : ''}`} onClick={() => setErr('403')}>
          403
        </button>
        <button className={`tab-btn error-tab${err === '500' ? ' active' : ''}`} onClick={() => setErr('500')}>
          500
        </button>
        <button className={`tab-btn error-tab${err === 'maintenance' ? ' active' : ''}`} onClick={() => setErr('maintenance')}>
          Maintenance
        </button>
        <button className={`tab-btn error-tab${err === 'session' ? ' active' : ''}`} onClick={() => setErr('session')}>
          Session Expired
        </button>
        <button className={`tab-btn error-tab${err === 'soon' ? ' active' : ''}`} onClick={() => setErr('soon')}>
          Coming Soon
        </button>
      </div>
      <div className="error-preview" id="errorPreview">
        <div>
          <i className={`fa-solid ${tpl.icon} icon-lg mb-3`} style={{ color: 'var(--primary)' }} />
          <div className="error-code">{tpl.code}</div>
          <h2 className="mb-2">{tpl.title}</h2>
          <p className="text-muted mb-4">{tpl.desc}</p>
          <div className="flex gap-2" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => goTo('page-dashboard')}>
              Back to Dashboard
            </button>
            <button className="btn btn-secondary" onClick={() => showToast('Retry action')}>
              Retry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
