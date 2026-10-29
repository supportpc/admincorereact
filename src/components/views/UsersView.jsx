import { useState } from 'react';
import { useAdmin } from '../AdminProvider';
import { badgeClass } from '@/lib/data';

export default function UsersView() {
  const { users, openUserModal, deleteUser } = useAdmin();
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  const q = search.toLowerCase();
  const rows = users.filter(
    (u) =>
      (!role || u.role === role) &&
      (!status || u.status === status) &&
      [u.name, u.email, u.role, u.area].join(' ').toLowerCase().includes(q),
  );

  return (
    <section id="page-users" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-desc">Kelola akun admin, staff, status, area, dan akses login.</p>
        </div>
        <button className="btn btn-primary" onClick={() => openUserModal()}>
          + Tambah User
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="toolbar">
            <div className="search-box">
              <span>
                <i className="fa-solid fa-magnifying-glass" />
              </span>
              <input
                className="form-control"
                id="userSearch"
                placeholder="Cari nama, email, role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select className="form-control" id="roleFilter" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Semua Role</option>
                <option>Super Admin</option>
                <option>Admin</option>
                <option>Cashier</option>
                <option>Operator</option>
              </select>
              <select className="form-control" id="statusFilter" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Semua Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Banned</option>
              </select>
            </div>
          </div>
        </div>

        <div className="table-responsive table-card-view">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Area</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody id="usersTbody">
              {rows.map((u) => (
                <tr key={u.id}>
                  <td data-label="User">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        {u.name
                          .split(' ')
                          .map((x) => x[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <div>
                        <b>{u.name}</b>
                        <p className="text-xs text-muted">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td data-label="Role">
                    <span className="badge badge-primary">{u.role}</span>
                  </td>
                  <td data-label="Area">{u.area}</td>
                  <td data-label="Status">
                    <span className={`badge ${badgeClass(u.status)}`}>{u.status}</span>
                  </td>
                  <td data-label="Last Login">{u.last}</td>
                  <td data-label="Aksi">
                    <div className="flex gap-1">
                      <button className="btn btn-secondary btn-sm" onClick={() => openUserModal(u.id)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteUser(u.id)}>
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">Tidak ada user ditemukan.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <span className="text-sm text-muted" id="userCount">
            {rows.length} data ditampilkan
          </span>
          <div className="flex gap-1">
            <button className="page-btn">Prev</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">Next</button>
          </div>
        </div>
      </div>
    </section>
  );
}
