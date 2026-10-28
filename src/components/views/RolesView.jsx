
import { useAdmin } from '@/components/AdminProvider';
import PermissionGrid from '@/components/PermissionGrid';

export default function RolesView() {
  const { showToast } = useAdmin();
  return (
    <section id="page-roles" className="page-view active">
      <div className="page-head">
        <div>
          <h1 className="page-title">Role & Permission</h1>
          <p className="page-desc">Mapping akses menu dan aksi agar UI tidak terlalu teknis untuk user operasional.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            showToast('Role baru ditambahkan');
          }}
        >
          + Tambah Role
        </button>
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header">Daftar Role</div>
          <div className="card-body">
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <b>Super Admin</b>
                    <p className="text-xs text-muted">Akses penuh</p>
                  </td>
                  <td>
                    <span className="badge badge-success">Full</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Admin</b>
                    <p className="text-xs text-muted">Kelola operasional</p>
                  </td>
                  <td>
                    <span className="badge badge-primary">Manage</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Cashier</b>
                    <p className="text-xs text-muted">Transaksi & laporan terbatas</p>
                  </td>
                  <td>
                    <span className="badge badge-warning">Limited</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Operator</b>
                    <p className="text-xs text-muted">Input & monitoring</p>
                  </td>
                  <td>
                    <span className="badge badge-gray">Basic</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Permission Matrix</div>
          <div className="card-body">
            <PermissionGrid />
          </div>
          <div className="card-footer">
            <button className="btn btn-secondary">Reset</button>
            <button
              className="btn btn-primary"
              onClick={() => {
                showToast('Permission disimpan');
              }}
            >
              Simpan Permission
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
