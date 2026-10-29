import { useState } from 'react';

export default function PermissionPreviewView() {
  const [role, setRole] = useState('Super Admin');
  const RULES = {
    'Super Admin': ['create', 'export', 'refund', 'delete'],
    Admin: ['create', 'export', 'refund'],
    Cashier: ['create'],
    Operator: ['export'],
  };
  const allow = RULES[role] || [];
  return (
    <section id="page-permission-preview" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Permission-Based UI Preview</h1>
          <p className="page-desc">Contoh tampilan UI berdasarkan role agar developer tahu elemen mana yang harus di-hide/disable.</p>
        </div>
        <select
          className="form-control"
          style={{ maxWidth: '190px' }}
          id="previewRole"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Super Admin</option>
          <option>Admin</option>
          <option>Cashier</option>
          <option>Operator</option>
        </select>
      </div>
      <div className="permission-preview mb-6">
        <div className="grid-4">
          <div className="stat-card">
            <div className="stat-title">Current Role</div>
            <div className="stat-value" id="previewRoleTitle" style={{ fontSize: '22px' }}>
              {role}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Can Refund</div>
            <div className="stat-value" id="canRefund" style={{ fontSize: '22px' }}>
              {allow.includes('refund') ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Can Delete</div>
            <div className="stat-value" id="canDelete" style={{ fontSize: '22px' }}>
              {allow.includes('delete') ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Can Export</div>
            <div className="stat-value" id="canExport" style={{ fontSize: '22px' }}>
              {allow.includes('export') ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">Action Visibility</div>
        <div className="card-body">
          <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
            <button className={`btn btn-primary permission-action${allow.includes('create') ? '' : ' disabled-ui'}`}>Create</button>
            <button className={`btn btn-secondary permission-action${allow.includes('export') ? '' : ' disabled-ui'}`}>Export</button>
            <button className={`btn btn-warning permission-action${allow.includes('refund') ? '' : ' disabled-ui'}`}>Refund</button>
            <button className={`btn btn-danger permission-action${allow.includes('delete') ? '' : ' disabled-ui'}`}>Delete</button>
          </div>
          <div className="no-access mt-2" id="noAccessInfo">
            Role {role}: action yang tidak punya akses dibuat disabled/hidden.
          </div>
        </div>
      </div>
    </section>
  );
}
