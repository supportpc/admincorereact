import { Link } from 'react-router-dom';
import { errorTemplates } from '@/lib/data';

export default function NotFoundView() {
  const e = errorTemplates['404'];
  return (
    <section className="page-view active">
      <div className="error-preview">
        <div>
          <i className={`fa-solid ${e.icon} icon-lg mb-3`} style={{ color: 'var(--primary)' }} />
          <div className="error-code">{e.code}</div>
          <h2 className="mb-2">{e.title}</h2>
          <p className="text-muted mb-4">{e.desc}</p>
          <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
        </div>
      </div>
    </section>
  );
}
