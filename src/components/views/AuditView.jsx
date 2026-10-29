import { useAdmin } from '@/components/AdminProvider';
import { audits, badgeClass } from '@/lib/data';

export default function AuditView() {
  const { showToast } = useAdmin();
  return (
    <section id="page-audit" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Audit Log</h1>
          <p className="page-desc">Jejak aktivitas admin untuk kebutuhan keamanan dan investigasi.</p>
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => {
            showToast('Audit log diexport');
          }}
        >
          Export Log
        </button>
      </div>
      <div className="card">
        <div className="table-responsive table-card-view">
          <table className="table">
            <thead>
              <tr>
                <th>Waktu</th>
                <th>User</th>
                <th>Aktivitas</th>
                <th>IP</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody id="auditTbody">
              {audits.map((a, i) => (
                <tr key={i}>
                  <td data-label="Waktu">{a[0]}</td>
                  <td data-label="User">
                    <b>{a[1]}</b>
                  </td>
                  <td data-label="Aktivitas">{a[2]}</td>
                  <td data-label="IP">
                    <span className="kbd">{a[3]}</span>
                  </td>
                  <td data-label="Severity">
                    <span className={`badge ${badgeClass(a[4])}`}>{a[4]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
